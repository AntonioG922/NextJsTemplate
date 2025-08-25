// Database types matching Supabase schema
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: ProfileInsert;
        Update: ProfileUpdate;
      };
    };
  };
}

// Profiles table types
export interface Profile {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  avatar_icon: string | null;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

export interface ProfileInsert {
  id: string;
  email: string;
  first_name?: string | null;
  last_name?: string | null;
  avatar_icon?: string | null;
}

export interface ProfileUpdate {
  first_name?: string | null;
  last_name?: string | null;
  avatar_icon?: string | null;
}