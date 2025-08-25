"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code } from 'lucide-react';

export function QuickStartGuide() {
  const steps = [
    { step: 1, text: "Clone or download this template" },
    { step: 2, text: "Run npm install to install dependencies", code: "npm install" },
    { step: 3, text: "Set up your .env.local file", code: ".env.local" },
    { step: 4, text: "Run npm run dev to start developing", code: "npm run dev" }
  ];

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code className="h-5 w-5 text-blue-600" />
          Quick Start Guide
        </CardTitle>
        <CardDescription>
          Get up and running in minutes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {steps.map((step) => (
            <div key={step.step} className="flex items-center gap-3">
              <Badge variant="outline" className="shrink-0">{step.step}</Badge>
              <span className="text-sm">
                {step.text}
                {step.code && (
                  <code className="bg-muted px-1 rounded ml-1">{step.code}</code>
                )}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}