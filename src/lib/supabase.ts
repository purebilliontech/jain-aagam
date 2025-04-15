import { createClient, SupabaseClient } from "@supabase/supabase-js";

const globalForSupabase = globalThis as unknown as {
    supabase: SupabaseClient | undefined;
};

export const getSupabaseClient = () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
    const supabaseSecretKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

    if (!supabaseUrl || !supabaseSecretKey) {
        throw new Error("Supabase URL and Secret Key must be provided.");
    }

    return (
        globalForSupabase.supabase ?? createClient(supabaseUrl, supabaseSecretKey)
    );
};

export const supabase = getSupabaseClient();
