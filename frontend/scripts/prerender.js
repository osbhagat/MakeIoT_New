const fs = require("fs");
const path = require("path");
const http = require("http");
const puppeteer = require("puppeteer");

const BUILD_DIR = path.resolve(__dirname, "../build");
const INDEX_FILE = path.join(BUILD_DIR, "index.html");
const SPA_FALLBACK_FILE = path.join(BUILD_DIR, "spa.html");

const PORT = 4173;
const SITE_URL = "https://makeiot.in";

/*
  Public pages we want search engines and AI crawlers to receive
  as fully rendered HTML.

  title / description are only supplied where the React page does
  not already provide route-specific SEO metadata.
*/
const routes = [
  {
    path: "/",
    title: "MakeIoT — Master Embedded Systems & IoT Internships",
    description:
      "MakeIoT provides hands-on Embedded Systems, STM32, Arduino and IoT internship programs for engineering students.",
  },
  {
    path: "/program/embedded-stm32",
  },
  {
    path: "/program/arduino-iot",
  },
  {
    path: "/workshops",
    title:
      "Embedded Systems & IoT Workshops for Engineering Students | Make IoT",
    description:
      "Explore real Make IoT workshops conducted at engineering colleges, covering Embedded Systems, STM32, Arduino, ESP32, IoT and hands-on technical learning.",
  },
];

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".pdf": "application/pdf",
};

if (!fs.existsSync(INDEX_FILE)) {
  console.error(
    "Build folder not found. Run the normal React build before prerendering."
  );
  process.exit(1);
}

/*
  CRACO has just generated this file.
  Keep the ORIGINAL SPA shell in memory before we overwrite build/index.html
  with the prerendered homepage.
*/
const originalIndexHtml = fs.readFileSync(INDEX_FILE, "utf8");

/*
  Dynamic routes such as:
    /admin/login
    /admin/dashboard
    /assessment/:id
    /verify/:id

  should NOT receive the prerendered homepage as their server response.

  We therefore keep a separate SPA fallback document. It is marked noindex
  because those dynamic/private routes are not SEO landing pages.
*/
function createSpaFallback(html) {
  let output = html.replace(
    /<meta\s+name=["']robots["'][^>]*>/gi,
    ""
  );

  output = output.replace(
    "</head>",
    '    <meta name="robots" content="noindex, nofollow" />\n</head>'
  );

  return output;
}

fs.writeFileSync(
  SPA_FALLBACK_FILE,
  createSpaFallback(originalIndexHtml),
  "utf8"
);

function sendFile(filePath, response) {
  const extension = path.extname(filePath).toLowerCase();

  response.writeHead(200, {
    "Content-Type":
      mimeTypes[extension] || "application/octet-stream",
  });

  fs.createReadStream(filePath).pipe(response);
}

/*
  Tiny local server used only while building.

  Real static assets are served from /build.
  React routes receive the ORIGINAL CRA index document so React can
  render the correct route before Puppeteer captures the result.
*/
const server = http.createServer((request, response) => {
  try {
    const requestUrl = new URL(
      request.url,
      `http://localhost:${PORT}`
    );

    const pathname = decodeURIComponent(requestUrl.pathname);
    const relativePath = pathname.replace(/^\/+/, "");

    const candidatePath = path.resolve(
      BUILD_DIR,
      relativePath
    );

    /*
      Prevent path traversal and serve existing build files normally.
    */
    if (
      candidatePath.startsWith(BUILD_DIR) &&
      fs.existsSync(candidatePath) &&
      fs.statSync(candidatePath).isFile()
    ) {
      return sendFile(candidatePath, response);
    }

    /*
      React Router route:
      always start from the original SPA shell while prerendering.
    */
    response.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
    });

    response.end(originalIndexHtml);
  } catch (error) {
    response.writeHead(500);
    response.end("Internal prerender server error");
  }
});

function routeToOutputPath(routePath) {
  if (routePath === "/") {
    return INDEX_FILE;
  }

  return path.join(
    BUILD_DIR,
    routePath.replace(/^\/+|\/+$/g, ""),
    "index.html"
  );
}

async function prerender() {
  await new Promise((resolve) => {
    server.listen(PORT, "127.0.0.1", resolve);
  });

  console.log(`Prerender server running on port ${PORT}`);
  console.log(`Production site URL: ${SITE_URL}`);

  const browser = await puppeteer.launch({
    headless: true,
  });

  try {
    for (const route of routes) {
      console.log(`Rendering ${route.path}`);

      const page = await browser.newPage();

      /*
        Block third-party network calls during the BUILD itself.
        We still keep the original analytics/payment script tags in the
        generated HTML so they work normally for real visitors.
      */
      await page.setRequestInterception(true);

      page.on("request", (request) => {
        const url = request.url();

        const allowed =
          url.startsWith(`http://127.0.0.1:${PORT}`) ||
          url.startsWith(`http://localhost:${PORT}`) ||
          url.startsWith("data:");

        if (allowed) {
          request.continue();
        } else {
          request.abort();
        }
      });

      await page.goto(
        `http://127.0.0.1:${PORT}${route.path}`,
        {
          waitUntil: "domcontentloaded",
          timeout: 30000,
        }
      );

      /*
        Wait until React has produced meaningful page content.
      */
      await page.waitForFunction(
        () => {
          const root = document.getElementById("root");

          return (
            root &&
            root.children.length > 0 &&
            document.body.innerText.trim().length > 100
          );
        },
        {
          timeout: 15000,
        }
      );

      /*
        Give route-level useEffect metadata a moment to finish.
      */
      await new Promise((resolve) =>
        setTimeout(resolve, 500)
      );

      const productionUrl =
        route.path === "/"
          ? `${SITE_URL}/`
          : `${SITE_URL}${route.path}`;

      /*
        Clean runtime-only tracking nodes and normalize SEO metadata.
      */
      await page.evaluate(
        ({ productionUrl, title, description }) => {
          /*
            Clarity and PostHog bootstrap code in public/index.html
            dynamically inserts external scripts.

            Remove those dynamically inserted copies from the captured DOM.
            The ORIGINAL bootstrap scripts remain in the HTML and will load
            these services normally when a real visitor opens the page.
          */
          document
            .querySelectorAll(
              [
                'script[src*="clarity.ms/tag/"]',
                'script[src*="posthog.com/"]',
                'script[src*="posthog"]',
              ].join(",")
            )
            .forEach((script) => script.remove());

          /*
            Ensure every public prerendered page has exactly one
            production canonical URL.
          */
          document
            .querySelectorAll('link[rel="canonical"]')
            .forEach((node) => node.remove());

          const canonical = document.createElement("link");

          canonical.setAttribute(
            "rel",
            "canonical"
          );

          canonical.setAttribute(
            "href",
            productionUrl
          );

          document.head.appendChild(canonical);

          /*
            Ensure index/follow for these four public SEO pages.
          */
          let robots = document.querySelector(
            'meta[name="robots"]'
          );

          if (!robots) {
            robots = document.createElement("meta");

            robots.setAttribute(
              "name",
              "robots"
            );

            document.head.appendChild(robots);
          }

          robots.setAttribute(
            "content",
            "index, follow"
          );

          /*
            Fix / add Open Graph URL.
          */
          let ogUrl = document.querySelector(
            'meta[property="og:url"]'
          );

          if (!ogUrl) {
            ogUrl = document.createElement("meta");

            ogUrl.setAttribute(
              "property",
              "og:url"
            );

            document.head.appendChild(ogUrl);
          }

          ogUrl.setAttribute(
            "content",
            productionUrl
          );

          /*
            Homepage and Workshops currently use generic CRA metadata.
            Give them meaningful route-specific metadata here.

            Program pages already generate their own strong title and
            description, so for those routes title/description are undefined
            and we leave React's values untouched.
          */
          if (title) {
            document.title = title;

            let ogTitle = document.querySelector(
              'meta[property="og:title"]'
            );

            if (!ogTitle) {
              ogTitle = document.createElement("meta");

              ogTitle.setAttribute(
                "property",
                "og:title"
              );

              document.head.appendChild(ogTitle);
            }

            ogTitle.setAttribute(
              "content",
              title
            );
          }

          if (description) {
            let metaDescription =
              document.querySelector(
                'meta[name="description"]'
              );

            if (!metaDescription) {
              metaDescription =
                document.createElement("meta");

              metaDescription.setAttribute(
                "name",
                "description"
              );

              document.head.appendChild(
                metaDescription
              );
            }

            metaDescription.setAttribute(
              "content",
              description
            );

            let ogDescription =
              document.querySelector(
                'meta[property="og:description"]'
              );

            if (!ogDescription) {
              ogDescription =
                document.createElement("meta");

              ogDescription.setAttribute(
                "property",
                "og:description"
              );

              document.head.appendChild(
                ogDescription
              );
            }

            ogDescription.setAttribute(
              "content",
              description
            );
          }
        },
        {
          productionUrl,
          title: route.title || null,
          description: route.description || null,
        }
      );

      /*
        Capture the fully rendered DOM.
      */
      let html = await page.content();

      /*
        Some route components generate schema / canonical / offer URLs
        from window.location.origin.

        While prerendering that origin is localhost.
        Replace every remaining local build origin with the real
        production origin, including JSON-LD.
      */
      html = html
        .replaceAll(
          `http://127.0.0.1:${PORT}`,
          SITE_URL
        )
        .replaceAll(
          `http://localhost:${PORT}`,
          SITE_URL
        );

      /*
        Safety checks:
        fail the build instead of silently deploying bad SEO.
      */
      if (
        html.includes(
          `http://127.0.0.1:${PORT}`
        ) ||
        html.includes(
          `http://localhost:${PORT}`
        )
      ) {
        throw new Error(
          `Localhost URL remained in prerendered output for ${route.path}`
        );
      }

      if (
        !html.includes(
          `rel="canonical"`
        ) ||
        !html.includes(productionUrl)
      ) {
        throw new Error(
          `Production canonical missing for ${route.path}`
        );
      }

      const outputPath =
        routeToOutputPath(route.path);

      fs.mkdirSync(
        path.dirname(outputPath),
        {
          recursive: true,
        }
      );

      fs.writeFileSync(
        outputPath,
        html,
        "utf8"
      );

      console.log(
        `Saved: ${outputPath}`
      );

      console.log(
        `Canonical: ${productionUrl}`
      );

      await page.close();
    }

    console.log("");
    console.log(
      "Prerender completed successfully."
    );

    console.log(
      `SPA fallback saved: ${SPA_FALLBACK_FILE}`
    );
  } finally {
    await browser.close();
    server.close();
  }
}

prerender().catch((error) => {
  console.error(
    "Prerender failed:"
  );

  console.error(error);

  server.close();

  process.exit(1);
});