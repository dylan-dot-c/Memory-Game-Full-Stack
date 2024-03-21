import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LeaderBoard from "./pages/LeaderBoard";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import supabase from "./lib/supabase";

export default function App() {
    // useEffect(() => {
    //     const getData = async () => {
    //         let { data: Countries, error } = await supabase
    //             .from("Countries")
    //             .select("*");
    //         console.log(Countries);
    //         return Countries;
    //     };
    //     getData();
    // }, []);

    return (
        <HashRouter>
            <ToastContainer theme='dark' />
            <Routes>
                <Route path='/leaderboard' element={<LeaderBoard />} />
                <Route path='/' element={<Home />} />
            </Routes>
            <Footer />
        </HashRouter>
    );
}
