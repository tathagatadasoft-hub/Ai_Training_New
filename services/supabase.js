/*
=========================================
Supabase Service
=========================================
*/

const SUPABASE_URL =

"https://kxfvygnmcgvzsizwwlop.supabase.co";

const SUPABASE_KEY = "sb_publishable_KPc7MdTlw9p79t1YGboASg_y94Ct98v";

const supabaseClient = supabase.createClient(

    SUPABASE_URL,

    SUPABASE_KEY

);

export {

    supabaseClient

};

console.log("Supabase Loaded Successfully");
