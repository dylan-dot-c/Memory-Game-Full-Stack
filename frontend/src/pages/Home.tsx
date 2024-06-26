import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { noHighScore, difficultyData, HighScore } from "../data";
import HighScoreLayout from "../components/HighScoreLayout";
import Deck from "../components/Deck";
import useLocalStorage from "../hooks/useLocalStorage";
import { addUser } from "../lib/queries/user";
import { Tables } from "../types/supabase";
import { usefooterState } from "../stores/FooterStore";

export default function Home() {
    const highScores = useLocalStorage<HighScore[]>("player_highScores");
    const userData = useLocalStorage<Tables<"users">>("player_details");
    const [game, setGame] = useState(false);
    const [user, setUser] = useState<Tables<"users"> | null>(null);
    const [difficulty, setDifficulty] = useState(difficultyData[0]);
    const updateFooter = usefooterState((state) => state.toggleFooter);
    // initially set to no highscore and then if highscore update it
    const [highScoreData, setHighScoreData] = useState(getHighScore());

    function getHighScore() {
        const score = highScores.getStoredData();
        if (score) {
            return score;
        } else {
            return noHighScore;
        }
    }

    useEffect(() => {
        document.title = "Home | Clever Amnesia";
        updateFooter(true);
        const regUser = async () => {
            const userInfo = userData.getStoredData();
            if (userInfo != null) {
                setUser(userInfo);
            } else if (!userInfo) {
                const name = prompt("Please enter your name");
                if (name) {
                    const { data, error } = await addUser(name);
                    if (data) {
                        setUser(data[0]);
                    }
                } else {
                    toast.warn(
                        "Without your name you wont be able to see yourself on the leaderboard. Just reload to enter your name."
                    );
                }
            }
            // consuming my uselocalstorageHook
            const score = highScores.getStoredData();
            if (score) {
                setHighScoreData(score);
            }
        };
        regUser();
    }, []);

    useEffect(() => {
        if (user) {
            userData.setData(user);
        }
    }, [user]);

    useEffect(() => {
        highScores.setData(highScoreData);
        // localStorage.setItem("highScores", JSON.stringify(highScoreData));
    }, [highScoreData]);

    if (game) {
        return (
            <main className='max-w-full md:max-w-[700px] lg:max-w-[1000px] mx-auto py-2 px-3'>
                <Deck
                    difficulty={difficulty}
                    setGame={setGame}
                    highScore={highScoreData}
                    updateHighScoreData={setHighScoreData}
                    userInfo={user!}
                />
            </main>
        );
    }

    return (
        <main className='max-w-full md:max-w-[700px] lg:max-w-[1000px] mx-auto py-2 px-3'>
            <div>
                <header className='text-center'>
                    <h1 className='text-3xl font-bold underline'>
                        Clever Amnesia
                    </h1>
                    <p className='text-black/40'>@fullStackDev</p>
                    <Link to='/leaderboard'>
                        <h2 className='btn w-fit text-center mx-auto no-underline'>
                            View LeaderBoard
                        </h2>
                    </Link>
                </header>
                <p className='text-xl text-black md:w-3/5'>
                    Welcome! <br /> Want to find the best way to remember all
                    that you need to become a fullStackDev? Well this is the
                    game for you to play.
                </p>

                <div>
                    <p className='text-black/80 text-sm text-center mt-4 '>
                        Select Difficulty
                    </p>

                    <div className='flex justify-between'>
                        {difficultyData.map((data, index) => {
                            return (
                                <button
                                    key={index}
                                    className={`${
                                        difficulty.name == data.name &&
                                        "bg-red-600 text-white"
                                    } btn`}
                                    onClick={() => {
                                        setDifficulty(data);
                                    }}>
                                    {data.name}
                                </button>
                            );
                        })}
                    </div>
                </div>
                <button
                    className='bg-green-600 btn text-lg text-white mx-auto block'
                    onClick={() => {
                        setGame(true);
                        updateFooter(false);
                    }}>
                    Start Game
                </button>

                <h2 className='text-2xl text-center mt-6 btn mx-auto whitespace-nowrap w-fit'>
                    My HighScores
                </h2>

                <HighScoreLayout highScoreData={highScoreData} />
            </div>
        </main>
    );
}
