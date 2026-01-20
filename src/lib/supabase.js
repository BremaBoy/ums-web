import { createClient } from '@supabase/supabase-js';

// TODO: Replace with your actual Supabase project URL and Anon Key
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://cbhbfsfhduneyfmowcbd.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNiaGJmc2ZoZHVuZXlmbW93Y2JkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5MTY5MzEsImV4cCI6MjA4NDQ5MjkzMX0.SdOVGn5927KAoONf5gEsQpekuYLMTQPUAy9B51RgmWw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
