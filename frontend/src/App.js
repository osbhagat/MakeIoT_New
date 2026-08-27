import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "@/pages/Landing";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import AssessmentPage from "@/pages/AssessmentPage";
import VerifyCertificate from "@/pages/VerifyCertificate";
import EmbeddedSTM32 from "@/pages/EmbeddedSTM32";
import ArduinoIoT from "@/pages/ArduinoIoT";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/program/embedded-stm32" element={<EmbeddedSTM32 />} />
          <Route path="/program/arduino-iot" element={<ArduinoIoT />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/assessment/:enrollmentId" element={<AssessmentPage />} />
          <Route path="/verify/:certificateId" element={<VerifyCertificate />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
