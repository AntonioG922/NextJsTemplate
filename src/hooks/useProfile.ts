"use client"

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { profileService } from '@/services/profileService'
import { useAuthContext } from '@/app/components/providers/AuthProvider'

export function useProfile() {
  const { user } = useAuthContext()
  const queryClient = useQueryClient()

  const {
    data: profile,
    isLoading,
    error
  } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: () => user ? profileService.getProfile(user.id) : null,
    enabled: !!user?.id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  const updateProfileMutation = useMutation({
    mutationFn: ({ updates }: { updates: { avatar_icon?: string | null; first_name?: string | null; last_name?: string | null } }) => {
      if (!user?.id) throw new Error('User not authenticated')
      return profileService.updateProfile(user.id, updates)
    },
    onSuccess: (updatedProfile) => {
      // Update the profile in cache
      queryClient.setQueryData(['profile', user?.id], updatedProfile)
    },
    onError: (error) => {
      console.error('Failed to update profile:', error)
    }
  })

  const updateAvatarIconMutation = useMutation({
    mutationFn: ({ iconName }: { iconName: string }) => {
      if (!user?.id) throw new Error('User not authenticated')
      return profileService.updateAvatarIcon(user.id, iconName)
    },
    onSuccess: (updatedProfile) => {
      // Update the profile in cache
      queryClient.setQueryData(['profile', user?.id], updatedProfile)
    },
    onError: (error) => {
      console.error('Failed to update avatar icon:', error)
    }
  })

  return {
    profile,
    isLoading,
    error,
    updateProfile: (updates: { avatar_icon?: string | null; first_name?: string | null; last_name?: string | null }) =>
      updateProfileMutation.mutateAsync({ updates }),
    updateAvatarIcon: (iconName: string) =>
      updateAvatarIconMutation.mutateAsync({ iconName }),
    isUpdating: updateProfileMutation.isPending || updateAvatarIconMutation.isPending
  }
}