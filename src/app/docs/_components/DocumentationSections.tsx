"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Code, 
  Database, 
  Palette, 
  Shield, 
  Zap,
  Smartphone
} from 'lucide-react';

export function DocumentationSections() {
  const sections = [
    {
      title: "Getting Started",
      description: "Setup and basic configuration",
      icon: Code,
      items: [
        { name: "Installation", description: "Set up your development environment" },
        { name: "Configuration", description: "Configure environment variables and settings" },
        { name: "First Steps", description: "Create your first components and pages" }
      ]
    },
    {
      title: "Authentication",
      description: "User management with Supabase",
      icon: Shield,
      items: [
        { name: "Setup Supabase", description: "Configure your Supabase project" },
        { name: "Authentication Flow", description: "Understand the auth system" },
        { name: "User Profiles", description: "Working with user data" }
      ]
    },
    {
      title: "Database",
      description: "Data layer and queries",
      icon: Database,
      items: [
        { name: "Schema Setup", description: "Database table configurations" },
        { name: "TanStack Query", description: "Data fetching patterns" },
        { name: "Services", description: "Organizing database operations" }
      ]
    },
    {
      title: "UI Components",
      description: "Styling and component system",
      icon: Palette,
      items: [
        { name: "Shadcn/ui", description: "Using the component library" },
        { name: "Tailwind CSS", description: "Styling conventions" },
        { name: "Custom Components", description: "Building your own components" }
      ]
    },
    {
      title: "Performance",
      description: "Optimization and best practices",
      icon: Zap,
      items: [
        { name: "Next.js 15 Features", description: "Leveraging App Router and React 19" },
        { name: "Caching Strategies", description: "Optimize data fetching" },
        { name: "Bundle Optimization", description: "Reduce bundle size" }
      ]
    },
    {
      title: "Mobile & Responsive",
      description: "Cross-device compatibility",
      icon: Smartphone,
      items: [
        { name: "Responsive Design", description: "Mobile-first approach" },
        { name: "Touch Interactions", description: "Mobile-friendly UI patterns" },
        { name: "Progressive Web App", description: "PWA configuration" }
      ]
    }
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {sections.map((section, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <section.icon className="h-5 w-5 text-primary" />
              {section.title}
            </CardTitle>
            <CardDescription>{section.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="p-3 bg-muted/50 rounded-lg">
                  <h4 className="font-medium text-sm mb-1">{item.name}</h4>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
              ))}
              <Button variant="ghost" size="sm" className="w-full mt-3" disabled>
                <span className="text-xs">Coming soon</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}