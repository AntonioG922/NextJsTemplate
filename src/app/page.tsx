"use client";

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Settings, 
  User, 
  ArrowRight, 
  Sparkles, 
  Zap, 
  Shield, 
  Smartphone,
  Code,
  Palette
} from 'lucide-react';
import { useAuthContext } from './components/providers/AuthProvider';

export default function Dashboard() {
  const { user } = useAuthContext();
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const features = [
    {
      title: "Next.js 15",
      description: "App Router with React 19",
      icon: Code,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      title: "Supabase Auth",
      description: "Complete authentication system",
      icon: Shield,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      title: "TanStack Query",
      description: "Powerful data fetching",
      icon: Zap,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200"
    },
    {
      title: "Tailwind CSS",
      description: "Modern styling framework",
      icon: Palette,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    },
    {
      title: "Mobile Ready",
      description: "Responsive design patterns",
      icon: Smartphone,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-200"
    },
    {
      title: "Shadcn/ui",
      description: "Beautiful components",
      icon: Sparkles,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Home className="h-8 w-8 text-primary" />
            Welcome to Your Template
          </h1>
          <p className="text-muted-foreground">
            {user ? `Hello ${user.email?.split('@')[0]}, ` : 'Hello, '}welcome to your Next.js starter template. Today is {today}.
          </p>
        </div>
      </div>

      {/* Quick Start Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Start</CardTitle>
          <CardDescription>
            Get familiar with your new template
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            <Link href="/settings" className="block">
              <Button variant="outline" className="w-full h-auto p-4 flex flex-col items-center gap-2 hover:bg-blue-50 hover:border-blue-300 transition-colors">
                <Settings className="h-6 w-6 text-blue-600" />
                <div className="text-center">
                  <div className="font-medium">Settings</div>
                  <div className="text-xs text-muted-foreground">Configure your preferences</div>
                </div>
              </Button>
            </Link>

            <Link href="/profile" className="block">
              <Button variant="outline" className="w-full h-auto p-4 flex flex-col items-center gap-2 hover:bg-green-50 hover:border-green-300 transition-colors">
                <User className="h-6 w-6 text-green-600" />
                <div className="text-center">
                  <div className="font-medium">Profile</div>
                  <div className="text-xs text-muted-foreground">Manage your profile</div>
                </div>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Tech Stack Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Tech Stack Features
          </CardTitle>
          <CardDescription>
            This template comes pre-configured with modern web development tools
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className={`p-4 rounded-lg border-2 ${feature.bgColor} ${feature.borderColor}`}>
                <div className="flex items-center gap-3 mb-2">
                  <feature.icon className={`h-5 w-5 ${feature.color}`} />
                  <h3 className="font-semibold">{feature.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Getting Started */}
      <Card>
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
          <CardDescription>
            Ready to build something amazing? Here are your next steps
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
            <Badge variant="outline" className="shrink-0">1</Badge>
            <div>
              <p className="font-medium">Customize your branding</p>
              <p className="text-sm text-muted-foreground">Update colors, logos, and app metadata in the layout and config files</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
            <Badge variant="outline" className="shrink-0">2</Badge>
            <div>
              <p className="font-medium">Set up your database</p>
              <p className="text-sm text-muted-foreground">Configure your Supabase project and update the schema as needed</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
            <Badge variant="outline" className="shrink-0">3</Badge>
            <div>
              <p className="font-medium">Add your features</p>
              <p className="text-sm text-muted-foreground">Build your application using the established patterns and components</p>
            </div>
          </div>

          <div className="pt-4 border-t">
            <Button asChild>
              <Link href="https://github.com/vercel/next.js/tree/canary/examples" className="inline-flex items-center gap-2">
                View Next.js Examples <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}