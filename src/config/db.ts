import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mzesvrtnjyoqhqbwrxob.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16ZXN2cnRuanlvcWhxYndyeG9iIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgwMzUyMjMsImV4cCI6MjAxMzYxMTIyM30._DCwMToNZwT96w5t_Nn63S1mT6cuLARN7p7Abq67aBo";
export const supabase = createClient(supabaseUrl, supabaseKey);
