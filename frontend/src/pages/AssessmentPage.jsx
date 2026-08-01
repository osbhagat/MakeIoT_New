import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL;

export default function AssessmentPage() {
  const { enrollmentId } = useParams();

  const [assessment, setAssessment] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadAssessment = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/assessment/${enrollmentId}`
        );

        setAssessment(response.data);
      } catch (err) {
        if (err.response?.status === 403) {
          setError(
            "This assessment is available only after successful payment."
          );
        } else if (err.response?.status === 404) {
          setError("Enrollment not found.");
        } else {
          setError("Unable to load the assessment. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    loadAssessment();
  }, [enrollmentId]);

  const selectAnswer = (questionId, optionIndex) => {
    setAnswers((previous) => ({
      ...previous,
      [questionId]: optionIndex,
    }));
  };

  const submitAssessment = async () => {
    if (!assessment) return;

    if (Object.keys(answers).length !== assessment.questions.length) {
      setError("Please answer all questions before submitting.");
      return;
    }

    setError("");
    setSubmitting(true);

    const orderedAnswers = assessment.questions.map(
      (question) => answers[question.id]
    );

    try {
      const response = await axios.post(
        `${API_URL}/api/assessment/submit`,
        {
          enrollment_id: enrollmentId,
          answers: orderedAnswers,
        }
      );

      setResult(response.data);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Unable to submit the assessment. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const tryAgain = () => {
    setAnswers({});
    setResult(null);
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-lg text-slate-600">Loading assessment...</p>
      </div>
    );
  }

  if (error && !assessment) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white shadow-md rounded-xl p-8 max-w-lg w-full text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">
            Make IoT
          </h1>

          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  // PASS SCREEN
  if (result?.passed) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
        <div className="bg-white shadow-lg rounded-2xl p-8 max-w-2xl w-full text-center">

          <div className="text-5xl mb-4">🎓</div>

          <h1 className="text-3xl font-bold text-slate-900 mb-3">
            Congratulations, {assessment.student_name.split(" ")[0]}!
          </h1>

          <p className="text-lg text-slate-600 mb-6">
            You have successfully completed the Internship Certification
            Assessment.
          </p>

          <div className="bg-green-50 rounded-xl p-6 mb-6">
            <p className="text-sm text-slate-500 mb-1">Your Score</p>

            <p className="text-4xl font-bold text-green-700">
              {result.score}%
            </p>
          </div>

          <p className="text-slate-700 mb-2">
            Your verified internship certificate has been sent to your
            registered email address.
          </p>

          <div className="mt-6 bg-slate-50 rounded-lg p-4">
            <p className="text-sm text-slate-500">Certificate ID</p>

            <p className="font-semibold text-slate-900 break-all">
              {result.certificate_id}
            </p>
          </div>

          <p className="text-sm text-slate-500 mt-6">
            Please check your inbox and spam folder if you don't see the email.
          </p>

        </div>
      </div>
    );
  }

  // FAIL SCREEN
  if (result && !result.passed) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
        <div className="bg-white shadow-lg rounded-2xl p-8 max-w-xl w-full text-center">

          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            Assessment Result
          </h1>

          <p className="text-slate-600 mb-6">
            You scored
          </p>

          <p className="text-5xl font-bold text-orange-600 mb-6">
            {result.score}%
          </p>

          <p className="text-slate-700 mb-2">
            A score of {result.passing_score}% is required to complete the
            certification assessment.
          </p>

          <p className="text-slate-500 mb-7">
            Review the course material and try again when you're ready.
          </p>

          <button
            onClick={tryAgain}
            className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-8 py-3 rounded-lg"
          >
            Try Again
          </button>

        </div>
      </div>
    );
  }

  // ASSESSMENT
  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">

      <div className="max-w-3xl mx-auto">

        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold text-slate-900">
            Internship Certification Assessment
          </h1>

          <p className="text-slate-600 mt-2">
            {assessment.program_name}
          </p>

        </div>

        <div className="bg-white shadow-sm rounded-xl p-6 mb-6">

          <p className="text-lg">
            Hi <strong>{assessment.student_name}</strong>,
          </p>

          <p className="text-slate-600 mt-2">
            Complete the following assessment to qualify for your verified
            internship certificate.
          </p>

          <div className="flex flex-wrap gap-3 mt-5 text-sm">

            <span className="bg-blue-50 text-blue-800 px-3 py-2 rounded-lg">
              {assessment.questions.length} Questions
            </span>

            <span className="bg-blue-50 text-blue-800 px-3 py-2 rounded-lg">
              Passing Score: {assessment.passing_score}%
            </span>

            <span className="bg-blue-50 text-blue-800 px-3 py-2 rounded-lg">
              Unlimited Attempts
            </span>

          </div>

        </div>

        {assessment.questions.map((question, questionIndex) => (
          <div
            key={question.id}
            className="bg-white shadow-sm rounded-xl p-6 mb-5"
          >

            <p className="font-semibold text-lg text-slate-900 mb-4">
              {questionIndex + 1}. {question.question}
            </p>

            <div className="space-y-3">

              {question.options.map((option, optionIndex) => (
                <label
                  key={optionIndex}
                  className={`flex items-center gap-3 border rounded-lg p-4 cursor-pointer transition ${
                    answers[question.id] === optionIndex
                      ? "border-blue-600 bg-blue-50"
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
                >

                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    checked={answers[question.id] === optionIndex}
                    onChange={() =>
                      selectAnswer(question.id, optionIndex)
                    }
                  />

                  <span>{option}</span>

                </label>
              ))}

            </div>

          </div>
        ))}

        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-5">
            {error}
          </div>
        )}

        <button
          onClick={submitAssessment}
          disabled={submitting}
          className="w-full bg-blue-700 hover:bg-blue-800 disabled:opacity-60 text-white font-semibold text-lg py-4 rounded-xl"
        >
          {submitting ? "Submitting..." : "Submit Assessment"}
        </button>

      </div>
    </div>
  );
}