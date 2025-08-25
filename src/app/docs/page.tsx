"use client";

import React from 'react';
import { FileText } from 'lucide-react';
import { QuickStartGuide } from './_components/QuickStartGuide';
import { DocumentationSections } from './_components/DocumentationSections';
import { ExternalResources } from './_components/ExternalResources';
import { ContributingSection } from './_components/ContributingSection';

export default function DocsPage() {

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <FileText className="h-8 w-8 text-primary" />
            Documentation
          </h1>
          <p className="text-muted-foreground">
            Learn how to build amazing applications with this template
          </p>
        </div>
      </div>

      <QuickStartGuide />

      <DocumentationSections />

      <ExternalResources />

      <ContributingSection />
    </div>
  );
}