"use client"
import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Check, Palette, X } from 'lucide-react';
import { cn } from '@/utils';

interface ThemePickerProps {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
}

const ThemePicker: React.FC<ThemePickerProps> = ({ currentTheme, onThemeChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { themes } = useTheme();

  const handleThemeSelect = (theme: string): void => {
    onThemeChange(theme);
    setIsMenuOpen(false);
  };

  const currentThemeData = themes[currentTheme] || themes['tropical indigo'];

  return (
    <>
      {/* Desktop Theme Picker */}
      <div className="fixed bottom-6 left-6 z-50 hidden md:block">
        <div className="flex flex-col gap-3">
          {Object.values(themes).map((theme) => (
            <Button
              key={theme.name}
              variant="ghost"
              size="icon"
              className={cn(
                "w-10 h-10 rounded-full border-[3px] border-white shadow-md",
                "hover:scale-110 hover:shadow-lg transition-all duration-300",
                "relative flex items-center justify-center",
                currentTheme === theme.name && "border-gray-800 shadow-lg"
              )}
              style={{ backgroundColor: theme.color }}
              onClick={() => handleThemeSelect(theme.name)}
              title={theme.name}
            >
              {currentTheme === theme.name && (
                <Check className="w-4 h-4 text-white drop-shadow" />
              )}
            </Button>
          ))}
        </div>
      </div>

      {/* Mobile Theme Picker */}
      <div className="fixed bottom-6 left-6 z-50 md:hidden">
        <Popover open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="w-12 h-12 rounded-full border-[3px] border-white shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300"
              style={{ backgroundColor: currentThemeData.color }}
            >
              <Palette className="w-5 h-5 text-white" />
            </Button>
          </PopoverTrigger>
          <PopoverContent 
            side="top" 
            align="start" 
            className="w-48 p-0"
          >
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-gray-800">Choose Theme</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <Separator />
              <CardContent className="pt-3">
                <div className="space-y-2">
                  {Object.values(themes).map((theme) => (
                    <Button
                      key={theme.name}
                      variant="ghost"
                      className={cn(
                        "w-full justify-start gap-3 h-10",
                        currentTheme === theme.name && "bg-blue-50"
                      )}
                      onClick={() => handleThemeSelect(theme.name)}
                    >
                      <div 
                        className={cn(
                          "w-6 h-6 rounded-full border-2",
                          currentTheme === theme.name ? "border-blue-500" : "border-gray-200"
                        )}
                        style={{ backgroundColor: theme.color }}
                      />
                      <span className="text-sm capitalize text-gray-700">{theme.name}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};

export default ThemePicker;