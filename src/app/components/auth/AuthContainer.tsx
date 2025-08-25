"use client"

import React, { useState } from 'react'
import { SignInForm } from './SignInForm'
import { SignUpForm } from './SignUpForm'
import GoogleOneTap from './GoogleOneTap'
import { Code, Sparkles, Shield, Zap, Palette, Smartphone } from 'lucide-react'

type AuthMode = 'signin' | 'signup'

interface AuthContainerProps {
  onSuccess?: () => void
}

export function AuthContainer({ onSuccess }: AuthContainerProps) {
  const [mode, setMode] = useState<AuthMode>('signin')

  const handleSwitchToSignUp = () => setMode('signup')
  const handleSwitchToSignIn = () => setMode('signin')

  const features = [
    {
      icon: Code,
      title: "Next.js 15",
      description: "Latest framework with App Router"
    },
    {
      icon: Shield,
      title: "Secure Auth",
      description: "Supabase authentication system"
    },
    {
      icon: Zap,
      title: "Fast Performance",
      description: "Optimized with TanStack Query"
    },
    {
      icon: Palette,
      title: "Beautiful UI",
      description: "Shadcn/ui components"
    },
    {
      icon: Smartphone,
      title: "Mobile Ready",
      description: "Responsive design patterns"
    },
    {
      icon: Sparkles,
      title: "Modern Stack",
      description: "TypeScript, Tailwind CSS"
    }
  ]

  return (
    <div className="min-h-screen flex">
      {/* Google One Tap - This will show automatically when user is not signed in */}
      <GoogleOneTap 
        onSuccess={onSuccess}
        onError={(error) => console.error('Google One Tap error:', error)}
      />
      
      {/* Left Panel - Features (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-12 flex-col justify-center shadow-lg">
        <div className="max-w-lg">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Next.js Starter Template
            </h1>
            <p className="text-lg text-gray-600">
              A modern, production-ready template with authentication, database integration, and beautiful UI components.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <feature.icon className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-xs text-gray-600 mt-1">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-white/50 rounded-lg border border-white/20">
            <p className="text-sm text-gray-600">
              ✨ <strong>Ready to use:</strong> Authentication, database setup, responsive design, 
              and modern development tools all configured out of the box.
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile header (shown only on mobile) */}
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Next.js Template
            </h1>
            <p className="text-sm text-gray-600">
              Modern starter template for web applications
            </p>
          </div>

          {mode === 'signin' ? (
            <SignInForm 
              onSuccess={onSuccess}
              onSwitchToSignUp={handleSwitchToSignUp}
            />
          ) : (
            <SignUpForm 
              onSuccess={onSuccess}
              onSwitchToSignIn={handleSwitchToSignIn}
            />
          )}
        </div>
      </div>
    </div>
  )
}