import React from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Programs from "../components/Programs";
import Curriculum from "../components/Curriculum";
import PartnerColleges from "../components/PartnerColleges";
import WorkshopCards from "../components/WorkshopCards";
import Success from "../components/Success";
import VideoSection from "../components/VideoSection";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import FloatingCTA from "../components/FloatingCTA";
import EnrollmentModal from "../components/EnrollmentModal";

export default function Landing() {
  const [params] = useSearchParams();
  const refFromUrl = params.get("ref") || "";
  const [enrollOpen, setEnrollOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const [initialRef, setInitialRef] = React.useState(refFromUrl);
  const [ctaLocation, setCtaLocation] = React.useState("home_unknown");

  React.useEffect(() => {
    // If URL has ?ref=... auto-open the enrollment modal after mount
    if (refFromUrl) {
      setInitialRef(refFromUrl);
      setCtaLocation("referral_auto_open");
      setEnrollOpen(true);
    }
  }, [refFromUrl]);

  const openEnroll = (programId, source = "home_unknown") => {
    setSelected(programId || null);
    setCtaLocation(source);
    setEnrollOpen(true);
  };

  return (
    <div className="min-h-screen bg-white" data-testid="landing-page">
      <Navbar onEnrollClick={() => openEnroll(null, "home_navbar")} />
      <Hero onEnrollClick={() => openEnroll(null, "home_hero")} />
      <Programs onEnroll={(programId) => openEnroll(programId, "home_program_card")} />
      <Curriculum />
      <PartnerColleges />
      <WorkshopCards />
      <Success />
      <VideoSection />
      <Contact />
      <Footer />
      <FloatingCTA />
      <EnrollmentModal
        open={enrollOpen}
        initialProgram={selected}
        initialRef={initialRef}
        ctaLocation={ctaLocation}
        onClose={() => setEnrollOpen(false)}
      />
    </div>
  );
}
