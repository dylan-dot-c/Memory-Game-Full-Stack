import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/supabase";

const supabaseUrl = "https://qghagugmtmouezndorpd.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPEBASE_ANON_KEY;
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;
