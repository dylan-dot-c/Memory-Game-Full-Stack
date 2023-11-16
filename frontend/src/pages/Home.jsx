import { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { noHighScore, difficultyData } from "../data";
import HighScoreLayout from "../components/HighScoreLayout";
import FooterContext from "../contexts/FooterContext";
import Deck from "../components/Deck";
import api from "../api";
import useLocalStorage from "../hooks/useLocalStorage";

export default function Home() {
  const highScores = useLocalStorage("highScores");
  const userData = useLocalStorage("userInfo");
  const [game, setGame] = useState(false);
  const [user, setUser] = useState(null);
  const [difficulty, setDifficulty] = useState(difficultyData[0]);
  const footerContext = useContext(FooterContext);
  // initially set to no highscore and then if highscore update it
  const [highScoreData, setHighScoreData] = useState(getHighScore());
  // const [highScoreData, setHighScoreData] = useState(() => {
  //   const data = JSON.parse(localStorage.getItem("highScores"));
  //   return data ?? noHighScore;
  // });

  // gonna create a custom jhook for the localstorage api

  //
  function getHighScore() {
    const score = highScores.getStoredData();
    if (score) {
      return score;
    } else {
      return noHighScore;
    }
  }

  useEffect(() => {
    // for not showing footer on game page
    footerContext.setShowFooter(!game);
  }, [game]);

  useEffect(() => {
    const endpoint = "/users/add";
    const addNewUser = async (name) => {
      try {
        const data = await api.post(endpoint, { username: name });
        // console.log(data.data);
        setUser({ username: name, id: data.data.id });
      } catch (err) {
        toast("An error Occured");
        // console.log(err);
        userData.removeItem();
      }
    };
    const userInfo = userData.getStoredData();

    if (userInfo != null) {
      setUser(userInfo);
    } else if (!userInfo) {
      const name = prompt("Please enter your name");
      if (name) {
        addNewUser(name);
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
    document.title = "Home - Clever Amnesia";
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

  return (
    <main className='max-w-full md:max-w-[700px] lg:max-w-[1000px] mx-auto py-2 px-3'>
      {game ? (
        <Deck
          difficulty={difficulty}
          setGame={setGame}
          highScore={highScoreData}
          updateHighScore={setHighScoreData}
          userInfo={user}
        />
      ) : (
        <div>
          <header className='text-center'>
            <h1 className='text-3xl font-bold underline'>Clever Amnesia</h1>
            <p className='text-black/40'>@fullStackDev</p>
            <Link to='/leaderboard'>
              <h2 className='btn w-fit text-center mx-auto no-underline'>
                View LeaderBoard
              </h2>
            </Link>
          </header>
          <p className='text-xl text-black md:w-3/5'>
            Welcome! <br /> Want to find the best way to remember all that you
            need to become a fullStackDev? Well this is the game for you to
            play.
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
                      difficulty.name == data.name && "bg-red-600 text-white"
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
            onClick={() => setGame(true)}>
            Start Game
          </button>

          <h2 className='text-2xl text-center mt-6 btn mx-auto whitespace-nowrap w-fit'>
            My HighScores
          </h2>

          <HighScoreLayout highScoreData={highScoreData} />
        </div>
      )}
    </main>
  );
}
