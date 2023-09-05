import { useEffect, useState } from "react";

import { HashRouter, Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import LeaderBoard from "./pages/LeaderBoard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/leaderboard" element={<LeaderBoard />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
