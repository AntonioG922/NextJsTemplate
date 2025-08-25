"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Shield, LogOut } from 'lucide-react';

interface User {
  id: string;
  email?: string;
}

interface AccountSettingsProps {
  user: User | null;
  onSignOut: () => Promise<void>;
}

export function AccountSettings({ user, onSignOut }: AccountSettingsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Account
        </CardTitle>
        <CardDescription>
          Manage your account and security settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h4 className="font-medium">Account Information</h4>
          <div className="bg-muted p-3 rounded-lg">
            <p className="text-sm">
              <span className="font-medium">Email:</span> {user?.email}
            </p>
            <p className="text-sm">
              <span className="font-medium">Account ID:</span> {user?.id}
            </p>
          </div>
        </div>

        <Separator />

        <div className="space-y-3">
          <h4 className="font-medium">Actions</h4>
          <div className="space-y-2">
            <Button
              variant="outline"
              onClick={onSignOut}
              className="w-full sm:w-auto flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}