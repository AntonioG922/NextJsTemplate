"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function ContributingSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contributing</CardTitle>
        <CardDescription>
          Help improve this template for everyone
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          This template is designed to be a starting point for your projects. 
          If you find bugs, have suggestions for improvements, or want to add new features, 
          contributions are welcome!
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            <span className="flex items-center gap-2">
              Report Issues <ArrowRight className="h-4 w-4" />
            </span>
          </Button>
          <Button variant="outline" size="sm" disabled>
            <span className="flex items-center gap-2">
              Submit PR <ArrowRight className="h-4 w-4" />
            </span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}