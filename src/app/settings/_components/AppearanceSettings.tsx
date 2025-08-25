"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Palette } from 'lucide-react';
import { cn } from '@/utils';

interface AppearanceSettingsProps {
  currentTheme: string;
  changeTheme: (themeName: string) => void;
  themes: Record<string, { name: string; color: string; gradient: string; className: string; }>;
}

export function AppearanceSettings({ currentTheme, changeTheme, themes }: AppearanceSettingsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Appearance
        </CardTitle>
        <CardDescription>
          Customize the look and feel of your application
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-medium mb-3">Theme</h4>
          <div className="grid grid-cols-3 gap-3">
            {Object.values(themes).map((theme) => (
              <button
                key={theme.name}
                onClick={() => changeTheme(theme.name)}
                className={cn(
                  "flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all",
                  currentTheme === theme.name 
                    ? "border-primary bg-primary/5" 
                    : "border-muted hover:border-primary/50"
                )}
              >
                <div 
                  className="w-12 h-12 rounded-full border-2 border-border"
                  style={{ backgroundColor: theme.color }}
                />
                <span className="text-sm font-medium capitalize">
                  {theme.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}