"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, FileText } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            Privacy Policy
          </h1>
          <p className="text-muted-foreground">
            Placeholder privacy policy for your application
          </p>
        </div>
      </div>

      {/* Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Privacy Policy Template
          </CardTitle>
          <CardDescription>
            This is a placeholder privacy policy page. Replace this content with your actual privacy policy.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-6 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">🚧 Template Notice</h3>
            <p className="text-sm text-muted-foreground mb-4">
              This is a template page. You should replace this content with your actual privacy policy 
              that complies with applicable privacy laws and regulations in your jurisdiction.
            </p>
            
            <div className="space-y-3 text-sm">
              <p><strong>What you should include:</strong></p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>What personal information you collect</li>
                <li>How you use the information</li>
                <li>How you share information with third parties</li>
                <li>How you protect user data</li>
                <li>User rights regarding their data</li>
                <li>Contact information for privacy inquiries</li>
                <li>Cookie policy (if applicable)</li>
                <li>GDPR compliance information (if applicable)</li>
              </ul>
            </div>
          </div>

          <div className="p-6 border border-yellow-200 bg-yellow-50 rounded-lg">
            <h3 className="font-semibold mb-2 text-yellow-800">⚠️ Important</h3>
            <p className="text-sm text-yellow-700">
              Privacy policies are legal documents that vary by jurisdiction and business model. 
              Always consult with a legal professional to ensure your privacy policy meets all 
              applicable requirements for your specific situation.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}