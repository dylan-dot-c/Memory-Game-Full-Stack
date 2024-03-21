// fixed error when a user dont have a name they cant view leaderboard

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { difficultyData } from "../data.js";
import { getHighScores } from "../lib/queries/scores.js";
import { Tables } from "../types/supabase.js";
import useLocalStorage from "../hooks/useLocalStorage.js";
import { HighScoreType } from "../lib/queries/scores.js";
import { usefooterState } from "../stores/FooterStore.js";

const LeaderBoard = () => {
    const updateFooter = usefooterState((state) => state.toggleFooter);

    const [difficulty, setDifficulty] = useState(1);
    const [scores, setScores] = useState<HighScoreType>([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    const [userInfo, setUserInfo] = useState<Tables<"users"> | null>(null);
    const userData = useLocalStorage<Tables<"users">>("player_details");

    const getScores = async () => {
        const value = await getHighScores(difficulty);
        if (value.data) {
            setScores(value.data);
            setLoading(false);
        }
        if (error) {
            setError(true);
        }
    };

    useEffect(() => {
        updateFooter(false);
        document.title = "Leaderboard - Clever Amnesia";
        const value = userData.getStoredData();

        if (value) {
            setUserInfo(value);
        }
        getScores();
    }, [difficulty]);

    if (loading) {
        return (
            <div className='w-screen h-screen flex items-center justify-center text-center flex-col'>
                <div className='border-4 border-black border-t-transparent animate-spin w-10 h-10 rounded-full mb-2'></div>
                <p>Loading...</p>
            </div>
        );
    }
    if (error) {
        return (
            <div className='min-h-screen flex items-center justify-center text-center'>
                <div>
                    <img
                        src='https://global-uploads.webflow.com/63a9fb94e473f36dbe99c1b1/64a2fa0b3f2c905474407ea8_a0HrWxO7QBKUYqZA2caN.svg'
                        alt='Error getting results lol'
                    />
                    <p className='  mb-4'>
                        Sorry, error getting data. Try again later.
                    </p>
                    <Link to='/' className='no-underline'>
                        Return Home
                    </Link>
                </div>
            </div>
        );
    }
    return (
        <div className='max-w-full md:max-w-[600px] lg:max-w-[600px] mx-auto py-2 px-3'>
            <Link to='/'>
                <span className='btn w-fit mx-auto text-center bg-green-600 text-white flex gap-2 mb-5'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-6 h-6'>
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3'
                        />
                    </svg>
                    Return Home
                </span>
            </Link>
            <h1 className='btn text-center mx-auto w-fit mb-5'>LeaderBoard</h1>
            <div className='flex justify-between mb-5'>
                {difficultyData.map((data, index) => {
                    return (
                        <button
                            key={index}
                            className={`${
                                difficulty == data.id && "bg-red-600 text-white"
                            } btn`}
                            onClick={() => {
                                setDifficulty(data.id);
                            }}>
                            {data.name}
                        </button>
                    );
                })}
            </div>
            <p className=' my-4 text-center text-gray-800'>
                Showing Top Scores for
                <span className='pl-1 underline text-red-600 uppercase'>
                    {difficultyData[difficulty - 1].name}
                </span>
            </p>

            {scores.length > 0 ? (
                <table className='table-fixed border-collapse border border-black w-full text-center'>
                    <thead className='text-white bg-black font-mono '>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Flips</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scores.map((score, index) => {
                            return (
                                <tr
                                    className={`border border-black my-2 text-center ${
                                        // if userInfo dont exist it wont run
                                        score.users?.id == userInfo?.id &&
                                        "bg-black text-white"
                                    }`}
                                    key={index}>
                                    <td className='py-1'>{index + 1}</td>
                                    <td className='py-1'>
                                        {score.users?.username}
                                    </td>
                                    <td className='py-1'>{score.flips}</td>
                                    <td className='py-1'>{score.seconds}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            ) : (
                <div className='flex flex-col items-center'>
                    <img
                        src='/prohibited.png'
                        alt='no data available'
                        className=''
                        width={100}
                    />
                    <p className=''>No Data Available</p>
                </div>
            )}
            {/* <p>HELLO</p> */}
        </div>
    );
};

export default LeaderBoard;
