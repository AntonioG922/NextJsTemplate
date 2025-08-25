import { createClient } from '@/supabase/client'
import { Profile, ProfileUpdate } from '@/types/types'
import type { SupabaseClient } from '@supabase/supabase-js'

export class ProfileService {
  private supabase = createClient()

  /**
   * Get profile for a user
   */
  async getProfile(userId: string, supabaseClient?: SupabaseClient): Promise<Profile | null> {
    const client = supabaseClient || this.supabase
    const { data, error } = await client
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return null // Not found
      }
      throw new Error(`Failed to fetch profile: ${error.message}`)
    }

    return data
  }

  /**
   * Update profile for a user
   */
  async updateProfile(userId: string, updateData: ProfileUpdate, supabaseClient?: SupabaseClient): Promise<Profile> {
    const client = supabaseClient || this.supabase
    const { data, error } = await client
      .from('profiles')
      .update(updateData)
      .eq('id', userId)
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to update profile: ${error.message}`)
    }

    return data
  }

  /**
   * Update avatar icon for a user
   */
  async updateAvatarIcon(userId: string, iconName: string, supabaseClient?: SupabaseClient): Promise<Profile> {
    return this.updateProfile(userId, { avatar_icon: iconName }, supabaseClient)
  }

  /**
   * Remove avatar icon for a user
   */
  async removeAvatarIcon(userId: string, supabaseClient?: SupabaseClient): Promise<Profile> {
    return this.updateProfile(userId, { avatar_icon: null }, supabaseClient)
  }
}

export const profileService = new ProfileService()