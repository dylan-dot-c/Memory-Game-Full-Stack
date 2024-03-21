import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LeaderBoard from "./pages/LeaderBoard";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer";
import { usefooterState } from "./stores/FooterStore";
export default function App() {
    const showFooter = usefooterState((state) => state.showFooter);

    return (
        <HashRouter>
            <ToastContainer theme='dark' />
            <Routes>
                <Route path='/leaderboard' element={<LeaderBoard />} />
                <Route path='/' element={<Home />} />
            </Routes>
            {showFooter && <Footer />}
        </HashRouter>
    );
}
