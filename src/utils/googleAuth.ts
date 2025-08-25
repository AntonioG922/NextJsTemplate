/**
 * Google Authentication Utilities
 * Helper functions for Google One Tap and Sign-In functionality
 */

import type { CredentialResponse, GoogleOneTapConfig, GoogleSignInButtonConfig } from 'google-one-tap'

/**
 * Generate a nonce for Google ID token authentication
 * This provides additional security against replay attacks
 */
export const generateNonce = async (): Promise<string[]> => {
  const nonce = btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(32))))
  const encoder = new TextEncoder()
  const encodedNonce = encoder.encode(nonce)
  const hashBuffer = await crypto.subtle.digest('SHA-256', encodedNonce)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashedNonce = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
  return [nonce, hashedNonce]
}

/**
 * Validate Google Client ID format
 */
export const isValidGoogleClientId = (clientId: string): boolean => {
  // Google Client IDs typically end with .apps.googleusercontent.com
  return clientId.includes('.apps.googleusercontent.com') && clientId.length > 0
}

/**
 * Get Google Client ID from environment
 */
export const getGoogleClientId = (): string => {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
  if (!clientId) {
    throw new Error('NEXT_PUBLIC_GOOGLE_CLIENT_ID environment variable is not set')
  }
  if (!isValidGoogleClientId(clientId)) {
    throw new Error('Invalid Google Client ID format')
  }
  return clientId
}

/**
 * Check if Google authentication is properly configured
 */
export const isGoogleAuthConfigured = (): boolean => {
  try {
    getGoogleClientId()
    return true
  } catch {
    return false
  }
}


/**
 * Default Google One Tap configuration
 */
export const getDefaultOneTapConfig = (
  clientId: string,
  callback: (response: CredentialResponse) => void,
  nonce?: string
): GoogleOneTapConfig => ({
  client_id: clientId,
  callback,
  nonce,
  use_fedcm_for_prompt: true, // Required for Chrome's third-party cookie phase-out
  auto_select: true,
  itp_support: true,
  context: 'signin',
  ux_mode: 'popup',
})


/**
 * Default Google Sign-In button configuration
 */
export const getDefaultSignInButtonConfig = (): GoogleSignInButtonConfig => ({
  type: 'standard',
  theme: 'outline',
  size: 'large',
  text: 'signin_with',
  shape: 'rectangular',
  logo_alignment: 'left',
}) 