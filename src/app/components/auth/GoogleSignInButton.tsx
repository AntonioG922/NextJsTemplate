'use client'

import Script from 'next/script'
import { createClient } from '@/supabase/client'
import type { accounts, CredentialResponse } from 'google-one-tap'
import { useEffect, useRef, useCallback } from 'react'
import { generateNonce, getGoogleClientId, getDefaultSignInButtonConfig } from '@/utils/googleAuth'

declare const google: { accounts: accounts }

interface GoogleSignInButtonProps {
  onSuccess?: () => void
  onError?: (error: Error) => void
  className?: string
  children?: React.ReactNode
}

const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({ 
  onSuccess, 
  onError, 
  className = '',
  children 
}) => {
  const supabase = createClient()
  const buttonRef = useRef<HTMLDivElement>(null)
  const initialized = useRef(false)

  const initializeGoogleSignIn = useCallback(() => {
    // Check if Google script is loaded and available
    if (typeof google === 'undefined' || !google.accounts || !google.accounts.id) {
      console.log('Google script not loaded yet, retrying...')
      // Retry after a short delay
      setTimeout(initializeGoogleSignIn, 100)
      return
    }

    if (initialized.current || !buttonRef.current) return
    initialized.current = true

    console.log('Initializing Google Sign-In Button')
    
    // Use an immediately invoked async function to handle the async operations
    ;(async () => {
      try {
        const [nonce, hashedNonce] = await generateNonce()
        console.log('Nonce generated successfully')

        google.accounts.id.initialize({
          client_id: getGoogleClientId(),
          callback: async (response: CredentialResponse) => {
            try {
              console.log('Google Sign-In callback received')
              
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
              console.log('Successfully logged in with Google')
              
              // Call success callback
              onSuccess?.()
            } catch (error) {
              console.error('Error logging in with Google', error)
              onError?.(error as Error)
            }
          },
          nonce: hashedNonce,
          // With chrome's removal of third-party cookies, we need to use FedCM instead
          use_fedcm_for_prompt: true,
        })
        
        // Render the sign-in button
        if (buttonRef.current) {
          google.accounts.id.renderButton(buttonRef.current, getDefaultSignInButtonConfig())
        }
      } catch (error) {
        console.error('Error initializing Google Sign-In Button:', error)
        onError?.(error as Error)
      }
    })()
  }, [supabase.auth, onSuccess, onError])

  useEffect(() => {
    // Try to initialize when component mounts
    initializeGoogleSignIn()
  }, [initializeGoogleSignIn])

  return (
    <>
      <Script 
        src="https://accounts.google.com/gsi/client" 
        onReady={initializeGoogleSignIn}
        strategy="afterInteractive"
      />
      <div 
        ref={buttonRef} 
        className={className}
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        {children}
      </div>
    </>
  )
}

export default GoogleSignInButton 