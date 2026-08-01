import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL;

export default function VerifyCertificate() {
  const { certificateId } = useParams();

  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [invalid, setInvalid] = useState(false);

  useEffect(() => {
    const verify = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/certificates/verify/${certificateId}`
        );

        setCertificate(response.data);
      } catch (error) {
        setInvalid(true);
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [certificateId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-lg text-slate-600">
          Verifying certificate...
        </p>
      </div>
    );
  }

  if (invalid) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white shadow-lg rounded-2xl p-10 max-w-xl w-full text-center">

          <div className="text-5xl mb-4">❌</div>

          <h1 className="text-3xl font-bold text-slate-900 mb-3">
            Certificate Not Found
          </h1>

          <p className="text-slate-600">
            We could not verify this credential in the Make IoT
            certificate database.
          </p>

        </div>
      </div>
    );
  }

  const issuedDate = certificate.issued_at
    ? new Date(certificate.issued_at).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">

      <div className="bg-white shadow-lg rounded-2xl max-w-2xl w-full overflow-hidden">

        <div className="bg-green-50 text-center p-8">

          <div className="text-5xl mb-3">✓</div>

          <h1 className="text-3xl font-bold text-green-800">
            Verified Credential
          </h1>

          <p className="text-green-700 mt-2">
            This certificate is authentic and issued by Make IoT.
          </p>

        </div>

        <div className="p-8">

          <div className="mb-7">
            <p className="text-sm text-slate-500 mb-1">
              Student
            </p>

            <p className="text-2xl font-bold text-slate-900">
              {certificate.student_name}
            </p>
          </div>

          <div className="mb-7">
            <p className="text-sm text-slate-500 mb-1">
              Internship Program
            </p>

            <p className="text-xl font-semibold text-slate-900">
              {certificate.program_name}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 border-t pt-6">

            <div>
              <p className="text-sm text-slate-500">
                Certificate ID
              </p>

              <p className="font-semibold text-slate-900 break-all">
                {certificate.certificate_id}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Issued
              </p>

              <p className="font-semibold text-slate-900">
                {issuedDate}
              </p>
            </div>

          </div>

          <div className="mt-8 border-t pt-6 text-center">

            <p className="font-bold text-xl text-slate-900">
              Make IoT
            </p>

            <p className="text-sm text-slate-500 mt-1">
              Internship Credential Verification
            </p>

          </div>

        </div>
      </div>
    </div>
  );
}