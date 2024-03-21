export const difficultyData: DiffType[] = [
    {
        id: 1,
        name: "easy",
        cards: 4,
    },
    {
        id: 2,
        name: "medium",
        cards: 8,
    },
    {
        id: 3,
        name: "hard",
        cards: 12,
    },
];

export type DiffType = {
    id: number;
    name: "easy" | "medium" | "hard";
    cards: number;
};

export const noHighScore = [
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

export interface Time {
    minutes: number;
    seconds: number;
}

export interface DifficultyScore {
    name: string;
    flips: number;
    time: Time;
}

export type HighScore = DifficultyScore;
