import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LeaderBoard from "./pages/LeaderBoard";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer";
import FooterContext from './contexts/FooterContext'
import { useState } from "react";


export default function App() {
  // GLobal state for footer
  const [showFooter, setShowFooter] = useState(false)
  
  return (
    <HashRouter>
      <FooterContext.Provider value={{showFooter, setShowFooter}}>
      <ToastContainer theme="dark" />
      <Routes>
        <Route path="/leaderboard" element={<LeaderBoard />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
      </FooterContext.Provider>
    </HashRouter>
  );
}
