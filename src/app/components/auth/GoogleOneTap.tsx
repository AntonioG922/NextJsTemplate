'use client'

import Script from 'next/script'
import { createClient } from '@/supabase/client'
import type { accounts, CredentialResponse } from 'google-one-tap'
import { useEffect, useRef, useCallback } from 'react'
import { generateNonce, getGoogleClientId, getDefaultOneTapConfig } from '@/utils/googleAuth'
import GoogleSignInButton from './GoogleSignInButton'

declare const google: { accounts: accounts }

interface GoogleOneTapProps {
  onSuccess?: () => void
  onError?: (error: Error) => void
}

const GoogleOneTap: React.FC<GoogleOneTapProps> = ({ onSuccess, onError }) => {
  const supabase = createClient()
  const initialized = useRef(false)

  const initializeGoogleOneTap = useCallback(() => {
    // Check if Google script is loaded and available
    if (typeof google === 'undefined' || !google.accounts || !google.accounts.id) {
      console.log('Google script not loaded yet, retrying...')
      // Retry after a short delay
      setTimeout(initializeGoogleOneTap, 100)
      return
    }

    if (initialized.current) return
    initialized.current = true

    console.log('Initializing Google One Tap')
    
    // Use an immediately invoked async function to handle the async operations
    ;(async () => {
      try {
        const [nonce, hashedNonce] = await generateNonce()
        console.log('Nonce generated successfully')

        // Check if there's already an existing session before initializing the one-tap UI
        const { data, error } = await supabase.auth.getSession()
        if (error) {
          console.error('Error getting session', error)
          onError?.(error)
          return
        }
        
        if (data.session) {
          console.log('User already authenticated, redirecting...')
          onSuccess?.()
          return
        }

        const config = getDefaultOneTapConfig(getGoogleClientId(), async (response: CredentialResponse) => {
          try {
            console.log('Google One Tap callback received')
            
            // Send id token returned in response.credential to supabase
            const { data, error } = await supabase.auth.signInWithIdToken({
              provider: 'google',
              token: response.credential,
              nonce,
            })
            
            if (error) {
              console.error('Supabase sign in error:', error)
              throw error
            }
            
            console.log('Session data:', data)
            console.log('Successfully logged in with Google One Tap')
            
            // Call success callback and redirect
            onSuccess?.()
          } catch (error) {
            console.error('Error logging in with Google One Tap', error)
            onError?.(error as Error)
          }
        }, hashedNonce)
        
        google.accounts.id.initialize(config)
        
        google.accounts.id.prompt() // Display the One Tap UI
      } catch (error) {
        console.error('Error initializing Google One Tap:', error)
        onError?.(error as Error)
      }
    })()
  }, [supabase.auth, onSuccess, onError])

  useEffect(() => {
    // Only initialize if the script has loaded and google is available
    if (typeof google !== 'undefined' && google.accounts) {
      initializeGoogleOneTap()
    }
  }, [initializeGoogleOneTap])

  return (
    <>
      <Script 
        src="https://accounts.google.com/gsi/client" 
        onReady={initializeGoogleOneTap}
        strategy="afterInteractive"
      />
      
      {/* Always show the Google Sign-In button alongside One Tap */}
      <div className="fixed top-4 right-4 z-50">
        <GoogleSignInButton
          onSuccess={onSuccess}
          onError={onError}
          className="w-auto"
        />
      </div>
    </>
  )
}

export default GoogleOneTap 