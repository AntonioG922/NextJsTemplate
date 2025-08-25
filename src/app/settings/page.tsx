"use client";

import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuthContext } from '../components/providers/AuthProvider';
import { Settings } from 'lucide-react';
import { AppearanceSettings } from './_components/AppearanceSettings';
import { AccountSettings } from './_components/AccountSettings';
import { DangerZone } from './_components/DangerZone';

export default function SettingsPage() {
  const { currentTheme, changeTheme, themes } = useTheme();
  const { user, signOut } = useAuthContext();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Settings className="h-8 w-8 text-primary" />
            Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your application preferences and account settings
          </p>
        </div>
      </div>

      <AppearanceSettings 
        currentTheme={currentTheme}
        changeTheme={changeTheme}
        themes={themes}
      />

      <AccountSettings 
        user={user}
        onSignOut={handleSignOut}
      />

      <DangerZone />
    </div>
  );
}