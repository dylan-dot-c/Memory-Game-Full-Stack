import supabase from "../supabase";
import { QueryData } from "@supabase/supabase-js";

// supabase supports type generation for tables and queries
export const addHighScore = async (
    difficulty: number,
    seconds: number,
    userId: number,
    flips: number
) => {
    const { data, error } = await supabase
        .from("scores")
        .insert([
            {
                difficulty,
                flips,
                seconds,
                user_id: userId,
            },
        ])
        .select();

    console.log(data);
    console.log(error);

    return { data, error };
};

// having an issue when passing a dynamic value to .eq("difficulty", 1)
// so I used a constant as the base just to generate the type
const baseHighScoreQuery = supabase
    .from("scores")
    .select(`*, users (id, username)`)
    .eq("difficulty", 1)
    .order("flips")
    .order("seconds")
    .limit(10);

export type HighScoreType = QueryData<typeof baseHighScoreQuery>;

export const getHighScores = async (difficulty_id?: number) => {
    const result = await supabase
        .from("scores")
        .select(`*, users (id, username)`)
        .eq("difficulty", difficulty_id || 1)
        .order("flips")
        .order("seconds")
        .limit(10);

    const { data, error } = result;

    console.log(data, error);

    return { data, error };
};
