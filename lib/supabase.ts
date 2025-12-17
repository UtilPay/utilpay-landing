import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Lazy initialization to avoid build-time errors when env vars aren't set
let _supabase: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  if (_supabase) return _supabase;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  _supabase = createClient(supabaseUrl, supabaseAnonKey);
  return _supabase;
}

// Server client with service role for API routes
export function createServerClient(): SupabaseClient | null {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl) {
    return null;
  }

  // Use service role if available, otherwise fall back to anon key
  const key = supabaseServiceKey || supabaseAnonKey;
  if (!key) {
    return null;
  }

  return createClient(supabaseUrl, key);
}

// Types for the waitlist table
export interface WaitlistEntry {
  id: string;
  email: string;
  language_preference: 'sr' | 'en' | 'hu' | 'de' | 'ru';
  user_type: 'homeowner' | 'landlord' | 'property_manager' | 'business' | 'other';
  property_count?: number;
  city?: string;
  referral_code?: string;
  referred_by?: string;
  own_referral_code: string;
  referral_count: number;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  status: 'pending' | 'confirmed' | 'invited' | 'converted' | 'unsubscribed';
  confirmed_at?: string;
  invited_at?: string;
  created_at: string;
  updated_at: string;
  ip_address?: string;
  user_agent?: string;
}

export interface WaitlistInsert {
  email: string;
  language_preference?: string | null;
  user_type?: string | null;
  property_count?: number | null;
  city?: string | null;
  referral_code?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  ip_address?: string | null;
  user_agent?: string | null;
}
