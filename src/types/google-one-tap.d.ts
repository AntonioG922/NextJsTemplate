declare module 'google-one-tap' {
  export interface CredentialResponse {
    credential: string
    select_by: string
  }

  export interface GoogleOneTapConfig {
    client_id: string
    callback: (response: CredentialResponse) => void
    nonce?: string
    use_fedcm_for_prompt?: boolean
    auto_select?: boolean
    itp_support?: boolean
    context?: 'signin' | 'signup' | 'use'
    ux_mode?: 'popup' | 'redirect'
  }

  export interface GoogleSignInButtonConfig {
    type?: 'standard' | 'icon'
    theme?: 'outline' | 'filled_blue' | 'filled_black'
    size?: 'large' | 'medium' | 'small'
    text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin'
    shape?: 'rectangular' | 'rounded' | 'pill' | 'circle' | 'square'
    logo_alignment?: 'left' | 'center'
    width?: string
    locale?: string
  }

  export interface accounts {
    id: {
      initialize: (config: GoogleOneTapConfig) => void
      prompt: () => void
      renderButton: (element: HTMLElement, config: GoogleSignInButtonConfig) => void
      cancel: () => void
      disableAutoSelect: () => void
      storeCredential: (credential: CredentialResponse, callback: () => void) => void
      revoke: (hint: string, callback: () => void) => void
    }
  }
}