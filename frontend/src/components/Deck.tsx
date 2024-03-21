import { useEffect, useState } from "react";
import { useStopwatch } from "react-timer-hook";
import Card from "./Card";
import { addHighScore } from "../lib/queries/scores";
import Confetti from "react-confetti";
import { toast } from "react-toastify";
import { Tables } from "../types/supabase";
import { DiffType, HighScore } from "../data";
import { defineCards } from "../utils/cards";
import { compareHighScores } from "../utils/highScore";

type CardType = {
    name: string;
    isFlipped: boolean;
    id: string;
};

type DeckProps = {
    difficulty: DiffType;
    setGame: React.Dispatch<React.SetStateAction<boolean>>;
    highScore: HighScore[];
    updateHighScoreData: React.Dispatch<React.SetStateAction<HighScore[]>>;
    userInfo: Tables<"users">;
};
export default function Deck({
    difficulty,
    setGame,
    highScore,
    updateHighScoreData,
    userInfo,
}: DeckProps) {
    const [cards, setCards] = useState<CardType[]>([]);
    const [selectedCards, setSelectedCards] = useState<CardType[]>([]);
    const [foundCards, setFoundCards] = useState<CardType[]>([]);
    // util state so when two cards are flipped and dont match a change in state will unflip the selected cards
    const [cardsMatched, setCardsMatched] = useState(0);
    const [won, setWon] = useState(false);
    const [flips, setFlips] = useState(0);
    const numOfCards = difficulty.cards;

    const { seconds, minutes, pause, reset } = useStopwatch({
        autoStart: true,
    });

    async function addToLeaderBoard() {
        const { data, error } = await addHighScore(
            difficulty.id,
            seconds + minutes * 60,
            userInfo.id,
            flips
        );

        if (data) {
            toast.success("HighScore has been saved!");
        }
        if (error) {
            toast.error("Failed to send highscore");
        }
    }

    const newGame = () => {
        setCards(defineCards(numOfCards));
        setSelectedCards([]);
        setFoundCards([]);
        setCardsMatched(0);
        setWon(false);
        setFlips(0);
        reset();
    };

    const flipCard = (id: string, name: string) => {
        setCards((oldCards) => {
            const newCards = oldCards.map((card) => {
                return card.id === id
                    ? { ...card, isFlipped: !card.isFlipped }
                    : card;
            });
            return newCards;
        });

        setSelectedCards((prevCards) => {
            const flipped: CardType = { id, name, isFlipped: true };
            const newCards = [...prevCards, flipped];
            return newCards;
        });
    };

    useEffect(() => {
        newGame();
    }, []);

    useEffect(() => {
        if (selectedCards.length == 2) {
            const first = selectedCards.at(0)!;
            const second = selectedCards.at(1)!;

            if (first.name == second.name) {
                setCardsMatched(cardsMatched + 1);

                setTimeout(() => {
                    setCardsMatched(0);
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

    // whenever cardsMatched changes it will flip and cards that are selected and not matched
    useEffect(() => {
        setSelectedCards([]);
    }, [cardsMatched]);

    useEffect(() => {
        if (foundCards.length == numOfCards) {
            // they found all cards so they won
            pause(); //pauses timer

            setWon(true);
            const currentScore = {
                name: difficulty.name,
                flips: flips,
                time: {
                    minutes: minutes,
                    seconds: seconds,
                },
            };

            const oldHighScore = highScore.find(
                (score) => score.name == difficulty.name
            );
            const updateHighScore = compareHighScores(
                currentScore,
                oldHighScore
            );
            if (updateHighScore) {
                toast("Congrats!! New HighScore!!", {
                    icon: "🏆",
                    position: "top-right",
                    theme: "dark",
                });
                addToLeaderBoard();
                updateHighScoreData((prevHS) => {
                    const newHS = prevHS.map((highScore) => {
                        if (highScore.name == difficulty.name) {
                            return currentScore;
                        } else {
                            return highScore;
                        }
                    });

                    return newHS;
                });
            } else {
                toast.info(
                    "You came close, but didn't beat your highscore. Try Again"
                );
            }
        }
    }, [foundCards]);

    return (
        <>
            <p className='text-center'>
                Difficultly:{" "}
                <span className='capitalize text-red-600'>
                    {difficulty.name}
                </span>
            </p>
            <div className='flex justify-between '>
                <p className=' text-xl shadow-black my-2'>
                    Flips:{" "}
                    <span className='text-red-500 font-mono'>{flips}</span>{" "}
                </p>
                <p className='text-black text-xl my-2'>
                    TIME:{" "}
                    <span className='text-red-500 font-mono'>
                        {("00" + minutes).slice(-2)}:
                        {("00" + seconds).slice(-2)}
                    </span>
                </p>
            </div>
            <div className='grid grid-cols-4 gap-6 md:grid-cols-6 md:gap-6 flex-wrap justify-center'>
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

            <div className='flex justify-between mt-4'>
                <button className='btn bg-cyan-500' onClick={newGame}>
                    New Game
                </button>
                <button
                    className='btn bg-purple-500'
                    onClick={() => {
                        setGame(false);
                    }}>
                    Return Home
                </button>
            </div>
        </>
    );
}
