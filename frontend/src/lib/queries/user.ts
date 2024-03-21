import supabase from "../supabase";

export const addUser = async (name: string) => {
    const { data, error } = await supabase
        .from("users")
        .insert([
            {
                username: name,
            },
        ])
        .select();
    console.log(data, error);

    return { data, error };
};
