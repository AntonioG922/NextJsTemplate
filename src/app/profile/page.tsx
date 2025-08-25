"use client";

import React, { useState } from 'react';
import { useAuthContext } from '../components/providers/AuthProvider';
import { useProfile } from '@/hooks/useProfile';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { User, Save, Edit3 } from 'lucide-react';
import { AvatarSelector } from './_components/AvatarSelector';
import { AvatarPreview } from '@/components/ui/avatar-preview';
import { DEFAULT_AVATAR_ICON } from '@/constants/avatarIcons';

export default function ProfilePage() {
  const { user } = useAuthContext();
  const { profile, updateProfile, isUpdating } = useProfile();
  
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    first_name: profile?.first_name || '',
    last_name: profile?.last_name || '',
    avatar_icon: profile?.avatar_icon || DEFAULT_AVATAR_ICON
  });
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);

  const handleSave = async () => {
    const success = await updateProfile(editData);
    if (success) {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditData({
      first_name: profile?.first_name || '',
      last_name: profile?.last_name || '',
      avatar_icon: profile?.avatar_icon || DEFAULT_AVATAR_ICON
    });
    setIsEditing(false);
  };


  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <User className="h-8 w-8 text-primary" />
            Profile
          </h1>
          <p className="text-muted-foreground">
            Manage your personal information and preferences
          </p>
        </div>
      </div>

      {/* Profile Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Personal Information
            {!isEditing && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2"
              >
                <Edit3 className="h-4 w-4" />
                Edit
              </Button>
            )}
          </CardTitle>
          <CardDescription>
            Update your profile information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar Section */}
          <div className="flex items-center gap-4">
            <AvatarPreview 
              iconName={editData.avatar_icon} 
              size="lg"
              className="h-16 w-16"
            />
            <div className="space-y-2">
              <p className="font-medium">Profile Picture</p>
              {isEditing && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAvatarSelector(true)}
                >
                  Change Avatar
                </Button>
              )}
            </div>
          </div>

          <Separator />

          {/* Profile Fields */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={user?.email || ''}
                disabled
                className="bg-muted"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="first_name">First Name</Label>
              {isEditing ? (
                <Input
                  id="first_name"
                  value={editData.first_name}
                  onChange={(e) => setEditData(prev => ({ ...prev, first_name: e.target.value }))}
                  placeholder="Enter your first name"
                />
              ) : (
                <Input
                  value={profile?.first_name || 'Not set'}
                  disabled
                  className="bg-muted"
                />
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="last_name">Last Name</Label>
              {isEditing ? (
                <Input
                  id="last_name"
                  value={editData.last_name}
                  onChange={(e) => setEditData(prev => ({ ...prev, last_name: e.target.value }))}
                  placeholder="Enter your last name"
                />
              ) : (
                <Input
                  value={profile?.last_name || 'Not set'}
                  disabled
                  className="bg-muted"
                />
              )}
            </div>
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex items-center gap-2 pt-4">
              <Button
                onClick={handleSave}
                disabled={isUpdating}
                className="flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                {isUpdating ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button
                variant="outline"
                onClick={handleCancel}
                disabled={isUpdating}
              >
                Cancel
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Account Information */}
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>
            Your account details and membership
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label className="text-sm font-medium">Account Created</Label>
              <p className="text-sm text-muted-foreground mt-1">
                {profile?.created_at 
                  ? new Date(profile.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })
                  : 'Unknown'
                }
              </p>
            </div>
            <div>
              <Label className="text-sm font-medium">Last Updated</Label>
              <p className="text-sm text-muted-foreground mt-1">
                {profile?.updated_at 
                  ? new Date(profile.updated_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })
                  : 'Never'
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Avatar Selector Modal */}
      {showAvatarSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Choose Avatar</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAvatarSelector(false)}
              >
                ×
              </Button>
            </div>
            <AvatarSelector
              isOpen={true}
              onClose={() => setShowAvatarSelector(false)}
              currentIcon={editData.avatar_icon}
              onSelectIcon={(icon) => setEditData(prev => ({ ...prev, avatar_icon: icon }))}
              onSave={() => setShowAvatarSelector(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}