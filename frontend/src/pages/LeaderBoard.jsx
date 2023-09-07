// fixed error when a user dont have a name they cant view leaderboard

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

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

const LeaderBoard = () => {
  const [difficulty, setDifficulty] = useState("EASY");
  const [scores, setScores] = useState([]);
  const [error, setError] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  async function getScores() {
    const endpoint = `/scores/all?difficulty=${difficulty}`;
    try {
      const data = await api.get(endpoint);
      console.log(data.data.data);
      setScores(data.data.data);
    } catch {
      // alert(err);
      setError(true);
    }
  }

  useEffect(() => {
    document.title = "Leaderboard - Clever Amnesia";
    const value = JSON.parse(localStorage.getItem("userInfo"));

    console.log(value);

    if (value) {
      setUserInfo(value);
    }
  }, []);

  useEffect(() => {
    console.log("HELLO");
    getScores();
  }, []);

  useEffect(() => {
    getScores();
  }, [difficulty]);

  if (error) {
    return <h1>Sorry, failed to fetch Data</h1>;
  }
  return (
    <div className="max-w-full md:max-w-[600px] lg:max-w-[600px] mx-auto max-h-screen py-2 px-3">
      <Link to="/">
        <h2 className="btn w-fit mx-auto text-center bg-green-600 text-white flex gap-2 mb-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
            />
          </svg>
          Return Home
        </h2>
      </Link>
      <h1 className="btn text-center mx-auto w-fit mb-5">LeaderBoard</h1>
      <div className="flex justify-between mb-5">
        {difficultyData.map((data, index) => {
          return (
            <button
              key={index}
              className={`${
                difficulty == data.name && "bg-red-600 text-white"
              } btn`}
              onClick={() => {
                setDifficulty(data.name);
              }}
            >
              {data.name}
            </button>
          );
        })}
      </div>
      <p>
        Showing Top Scores for
        <span className="pl-1 underline text-red-600 uppercase">
          {difficulty}
        </span>
      </p>

      <table className="table-fixed border-collapse border border-black w-full text-center">
        <thead className="text-white bg-green-600 font-mono ">
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
                  score.userId == userInfo?.id && "bg-black text-white"
                }`}
                key={index}
              >
                <td className="py-1">{index + 1}</td>
                <td className="py-1">{score.user.username}</td>
                <td className="py-1">{score.flips}</td>
                <td className="py-1">{score.seconds}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* <p>HELLO</p> */}
    </div>
  );
};

export default LeaderBoard;
