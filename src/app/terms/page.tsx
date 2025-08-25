"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Scale } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Scale className="h-8 w-8 text-primary" />
            Terms of Service
          </h1>
          <p className="text-muted-foreground">
            Placeholder terms of service for your application
          </p>
        </div>
      </div>

      {/* Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Terms of Service Template
          </CardTitle>
          <CardDescription>
            This is a placeholder terms of service page. Replace this content with your actual terms of service.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-6 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">🚧 Template Notice</h3>
            <p className="text-sm text-muted-foreground mb-4">
              This is a template page. You should replace this content with your actual terms of service 
              that governs the use of your application and protects your business interests.
            </p>
            
            <div className="space-y-3 text-sm">
              <p><strong>What you should typically include:</strong></p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>Acceptance of terms</li>
                <li>Description of your service</li>
                <li>User accounts and responsibilities</li>
                <li>Acceptable use policy</li>
                <li>Intellectual property rights</li>
                <li>Payment terms (if applicable)</li>
                <li>Termination conditions</li>
                <li>Limitation of liability</li>
                <li>Dispute resolution</li>
                <li>Governing law and jurisdiction</li>
              </ul>
            </div>
          </div>

          <div className="p-6 border border-orange-200 bg-orange-50 rounded-lg">
            <h3 className="font-semibold mb-2 text-orange-800">⚖️ Legal Notice</h3>
            <p className="text-sm text-orange-700">
              Terms of service are legal contracts between you and your users. The specific terms 
              you need depend on your business model, location, and applicable laws. Always 
              consult with a legal professional to create terms that properly protect your business.
            </p>
          </div>

          <div className="p-6 border border-blue-200 bg-blue-50 rounded-lg">
            <h3 className="font-semibold mb-2 text-blue-800">💡 Tip</h3>
            <p className="text-sm text-blue-700">
              Consider using services like Terms of Service generators or legal template services 
              as a starting point, but always have them reviewed by a qualified attorney for your 
              specific use case.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}