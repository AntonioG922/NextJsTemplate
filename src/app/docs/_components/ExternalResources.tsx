"use client";

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

export function ExternalResources() {
  const externalResources = [
    {
      name: "Next.js Documentation",
      url: "https://nextjs.org/docs",
      description: "Official Next.js 15 documentation"
    },
    {
      name: "Supabase Docs",
      url: "https://supabase.com/docs",
      description: "Complete Supabase documentation"
    },
    {
      name: "TanStack Query",
      url: "https://tanstack.com/query/latest",
      description: "Powerful data fetching for React"
    },
    {
      name: "Shadcn/ui",
      url: "https://ui.shadcn.com",
      description: "Beautiful and accessible components"
    },
    {
      name: "Tailwind CSS",
      url: "https://tailwindcss.com/docs",
      description: "Utility-first CSS framework"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ExternalLink className="h-5 w-5" />
          External Resources
        </CardTitle>
        <CardDescription>
          Helpful links to learn more about the technologies used
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {externalResources.map((resource, index) => (
            <Button
              key={index}
              variant="outline"
              asChild
              className="h-auto p-4 flex flex-col items-start gap-2"
            >
              <Link href={resource.url} target="_blank" rel="noopener noreferrer">
                <div className="flex items-center gap-2 w-full">
                  <span className="font-medium text-sm">{resource.name}</span>
                  <ExternalLink className="h-3 w-3 ml-auto" />
                </div>
                <p className="text-xs text-muted-foreground text-left">
                  {resource.description}
                </p>
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}