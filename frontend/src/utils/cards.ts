import { nanoid } from "nanoid";

export const defineCards = (numOfCards: number) => {
    // function to return an array of cards in random order
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
        .sort(() => Math.random() - 0.5) //sort in random order
        .slice(0, numOfCards); // select first numOfCards
    const combinedCards = [...randomLimit, ...randomLimit]; //doubling cards
    const randomCards = combinedCards.sort(() => Math.random() - 0.5); //randomize again

    const result = randomCards.map((card) => {
        return {
            name: card,
            isFlipped: false,
            id: nanoid(),
        };
    });

    return result;
};
