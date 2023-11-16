import { useEffect, useState } from "react";
import { useStopwatch } from "react-timer-hook";
import Card from "./Card";
// import axios from "axios";
import api from "../api";

import Confetti from "react-confetti";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";

export default function Deck({
  difficulty,
  setGame,
  highScore,
  updateHighScore,
  userInfo,
}) {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [foundCards, setFoundCards] = useState([]);
  const [cardsMatched, setCardsMatched] = useState(0);
  const [won, setWon] = useState(false);
  const [flips, setFlips] = useState(0);
  const cardNum = difficulty.cards;

  const { seconds, minutes, pause, reset } = useStopwatch({ autoStart: true });

  async function addToLeaderBoard() {
    const endpoint = "/scores/newScore";

    try {
      const data = await api.post(endpoint, {
        id: userInfo.id,
        flips: flips,
        seconds: seconds + minutes * 60,
        difficulty: difficulty.name,
      });

      console.log("HighScore Added to DB");
      console.log(data);
    } catch (err) {
      toast.error("Failed to add HS");
    }
  }

  useEffect(() => {
    newGame();
  }, []);

  function newGame() {
    setCards(defineCards());
    setSelectedCards([]);
    setFoundCards([]);
    setCardsMatched(0);
    setWon(false);
    setFlips(0);
    reset();
  }

  function defineCards() {
    const cardImages = [
      "js",
      "node-js",
      "python",
      "react",
      "swift",
      "vite",
      "vue",
      "typescript",
      "gitlab",
      "github",
      "aws",
      "angular",
    ];
    // selecting 6 random cards
    const randomLimit = cardImages
      .sort(() => Math.random() - 0.5)
      .slice(0, cardNum);
    const combinedCards = [...randomLimit, ...randomLimit];
    const randomCards = combinedCards.sort(() => Math.random() - 0.5);

    const result = randomCards.map((card) => {
      return {
        name: card,
        isFlipped: false,
        id: nanoid(),
      };
    });

    return result;
  }

  function flipCard(id, name) {
    // console.log(name, id);
    // console.log("Founded", foundCards);

    setCards((oldCards) => {
      const newCards = oldCards.map((card) => {
        return card.id === id ? { ...card, isFlipped: !card.isFlipped } : card;
      });
      return newCards;
    });

    setSelectedCards((prevCards) => {
      const flipped = { id, name };
      const newCards = [...prevCards, flipped];
      return newCards;
    });
  }

  function compareHighScore() {
    // function that compares the current highscore and the stored one
    // and updates the highscore for the scores difficulty if it is greater

    const currentScore = {
      name: difficulty.name,
      flips: flips,
      time: {
        minutes: minutes,
        seconds: seconds,
      },
    };

    const storedHS = highScore.map((highScore) => {
      if (highScore.name == difficulty.name) {
        return highScore;
      }
    });

    const oldHS = storedHS[0];

    const shouldWeUpdate = compare(currentScore, oldHS);

    if (shouldWeUpdate) {
      // toast("")
      toast("Congrats!! New HighScore!!", {
        icon: "🏆",
        position: "top-right",
        theme: "dark",
      });
      addToLeaderBoard();
      updateHighScore((prevHS) => {
        const newHS = prevHS.map((highScore) => {
          if (highScore.name == difficulty.name) {
            return currentScore;
          } else {
            return highScore;
          }
        });

        return newHS;
      });
    }
  }

  function compare(current, old) {
    if (!old) {
      return true;
    }

    const currentTime = getTotalTime(current.time);
    const oldTime = getTotalTime(old.time);

    if (
      old.flips === 0 ||
      (current.flips <= old.flips && currentTime <= oldTime)
    ) {
      return true;
    } else {
      return false;
    }
  }

  // function compare(current, old) {
  //     const currentTime = getTotalTime(current.time)
  //     const oldTime = getTotalTime(old.time)

  //     if(old.flips == 0) {
  //         return true
  //     }
  //     if(current.flips <= old.flips && (currentTime <= oldTime)) {
  //         return true
  //     }else {
  //         return false
  //     }
  // }

  function getTotalTime(time) {
    const { minutes, seconds } = time;
    return minutes * 60 + seconds;
  }

  useEffect(() => {
    if (selectedCards.length == 2) {
      const first = selectedCards.at(0);
      const second = selectedCards.at(1);

      if (first.name == second.name) {
        setCardsMatched(true);

        setTimeout(() => {
          setCardsMatched(false);
        }, 10);

        console.log("matched", foundCards);

        setFoundCards((prevCards) => {
          const newCards = [...prevCards, selectedCards[0]];

          return newCards;
        });
      } else {
        // unflip the cards and empty array
        setTimeout(() => {
          flipCard(first.id, first.name);
          flipCard(second.id, second.name);
          setCardsMatched(cardsMatched + 1);
        }, 300);
      }
    }
  }, [selectedCards]);

  useEffect(() => {
    setSelectedCards([]);
  }, [cardsMatched]);

  useEffect(() => {
    if (foundCards.length == cardNum) {
      setWon(true);
      compareHighScore();
      pause();
    }
  }, [foundCards]);

  return (
    <>
      <p className="text-center">
        Difficultly:{" "}
        <span className="capitalize text-red-600">{difficulty.name}</span>
      </p>
      <div className="flex justify-between ">
        <p className=" text-xl shadow-black my-2">
          Flips: <span className="text-red-500 font-mono">{flips}</span>{" "}
        </p>
        {/* <p>SECONDS: {seconds} Minutes: {minutes}</p> */}
        <p className="text-black text-xl my-2">
          TIME:{" "}
          <span className="text-red-500 font-mono">
            {("00" + minutes).slice(-2)}:{("00" + seconds).slice(-2)}
          </span>
        </p>
      </div>
      <div className="grid grid-cols-4 gap-6 md:grid-cols-6 md:gap-6 flex-wrap justify-center">
        {cards.map((card, index) => {
          return (
            <Card
              name={card.name}
              id={card.id}
              isFlipped={card.isFlipped}
              flipCard={() => {
                flipCard(card.id, card.name);
                setFlips((prev) => prev + 1);
              }}
              key={index}
            />
          );
        })}
      </div>

      {won && <Confetti />}
      {/* {won && <img src="https://media1.giphy.com/media/YrUD55uLZtdab4CriB/source.gif" width="200px" alt="" /> } */}

      <div className="flex justify-between mt-4">
        <button className="btn bg-cyan-500" onClick={newGame}>
          New Game
        </button>
        <button
          className="btn bg-purple-500"
          onClick={() => {
            setGame(false);
          }}
        >
          Return Home
        </button>
      </div>
    </>
  );
}
