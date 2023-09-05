import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import "./App.css";
// import { HashRouter, Routes, Route } from "react-router-dom";

import Deck from "../components/Deck";

const difficultyData = [
  {
    name: "easy",
    cards: 4,
  },
  {
    name: "medium",
    cards: 8,
  },
  {
    name: "hard",
    cards: 12,
  },
];

const noHighScore = [
  {
    name: "easy",
    flips: 0,
    time: {
      minutes: 0,
      seconds: 0,
    },
  },
  {
    name: "medium",
    flips: 0,
    time: {
      minutes: 0,
      seconds: 0,
    },
  },
  {
    name: "hard",
    flips: 0,
    time: {
      minutes: 0,
      seconds: 0,
    },
  },
];

// import { useState } from 'react'
export default function Home() {
  const [game, setGame] = useState(false);
  const [user, setUser] = useState(null);
  const [difficulty, setDifficulty] = useState(difficultyData[0]);
  const [highScoreData, setHighScoreData] = useState(() => {
    const data = JSON.parse(localStorage.getItem("highScores"));

    return data ?? noHighScore;
  });

  useEffect(() => {
    const endpoint =
      "https://memory-game-full-stack-production.up.railway.app/users/add";
    const addNewUser = async (name) => {
      try {
        // const dataaxios.post(endpoint, {username: name})
        const data = await axios.post(endpoint, { username: name });

        console.log(data.data);
        setUser({ username: name, id: data.data.id });
      } catch (err) {
        alert("SOme Error!!");
        console.log(err);
        localStorage.removeItem("userInfo");
      }
    };
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (userInfo != null) {
      setUser(userInfo);
    } else if (!userInfo) {
      const name = prompt("Please enter your name");
      if (name) {
        addNewUser(name);
      } else {
        alert(
          "Without ur name you wont be able to play. Just reload to enter your name"
        );
      }
    }
    // console.log(userInfo.username);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("userInfo", JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("highScores", JSON.stringify(highScoreData));
  }, [highScoreData]);

  const hsLayout = highScoreData.map((highScore, index) => {
    const minutes = ("00" + highScore.time.minutes).slice(-2);
    const seconds = ("00" + highScore.time.seconds).slice(-2);

    return (
      <div className="flex justify-between items-center" key={index}>
        <p className="capitalize">{highScore.name}</p>
        <p>
          Flips: {highScore.flips} <br /> Time: {minutes}:{seconds}
        </p>
      </div>
    );
  });

  return (
    <main className="max-w-full md:max-w-[700px] lg:max-w-[1000px] mx-auto max-h-screen py-2 px-3">
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
          <header className="text-center">
            <h1 className="text-3xl font-bold underline">Memory Game</h1>
            <p className="text-black/40">@fullStackDev</p>
            <Link to="/leaderboard">
              <h2 className="btn w-fit text-center mx-auto">
                View LeaderBoard
              </h2>
            </Link>
          </header>
          <p className="text-xl text-black md:w-3/5">
            Welcome! <br /> Want to find the best way to remember all that you
            need to become a fullStackDev? Well this is the game for you to
            play.
          </p>

          <div>
            <p className="text-black/80 text-sm text-center mt-4 ">
              Select Difficulty
            </p>

            <div className="flex justify-between">
              {difficultyData.map((data, index) => {
                return (
                  <button
                    key={index}
                    className={`${
                      difficulty.name == data.name && "bg-red-500"
                    } btn`}
                    onClick={() => {
                      setDifficulty(data);
                    }}
                  >
                    {data.name}
                  </button>
                );
              })}
            </div>
          </div>
          <button
            className="bg-red-600 btn text-lg text-white mx-auto block"
            onClick={() => setGame(true)}
          >
            Start Game
          </button>

          <h2 className="text-2xl text-center mt-6 btn mx-auto whitespace-nowrap w-fit">
            My HighScores
          </h2>

          <div className="divide-y divide-black">{hsLayout}</div>
        </div>
      )}
    </main>
  );
}
