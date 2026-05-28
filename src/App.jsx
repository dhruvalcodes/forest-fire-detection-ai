import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import UploadPage from "./Pages/UploadPage";
import OutputPage from "./Pages/ResultPage";
import InfoPage from "./Pages/InfoPage"; // <-- new info page


function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<LandingPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/result" element={<OutputPage />} />
        <Route path="/about" element={<InfoPage />} />
        <Route path="/contact" element={<InfoPage />} />
        <Route path="/privacy" element={<InfoPage />} />
        <Route path="/terms" element={<InfoPage />} />
        <Route path="/support" element={<InfoPage />} />
      </Routes>
    </Router>
  );
}

export default App;