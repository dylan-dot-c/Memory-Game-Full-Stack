import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LeaderBoard from "./pages/LeaderBoard";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer";

export default function App() {
  return (
    <HashRouter>
      <ToastContainer theme="dark" />
      <Routes>
        <Route path="/leaderboard" element={<LeaderBoard />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </HashRouter>
  );
}
