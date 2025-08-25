"use client"
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface Theme {
  name: string;
  color: string;
  gradient: string;
  className: string;
}

interface Themes {
  [key: string]: Theme;
}

interface ThemeContextType {
  currentTheme: string;
  changeTheme: (themeName: string) => void;
  getCurrentTheme: () => Theme;
  themes: Themes;
}

const themes: Themes = {
  'orange peel': {
    name: 'orange peel',
    color: '#FFA630',
    gradient: 'linear-gradient(135deg, #FFA630 0%, #FF8C42 100%)',
    className: 'theme-orange-peel'
  },
  'green tea': {
    name: 'green tea',
    color: '#D0F0C0',
    gradient: 'linear-gradient(135deg, #D0F0C0 0%, #A8D5BA 100%)',
    className: 'theme-green-tea'
  },
  'moonstone': {
    name: 'moonstone',
    color: '#4DA1A9',
    gradient: 'linear-gradient(135deg, #4DA1A9 0%, #2E8B57 100%)',
    className: 'theme-moonstone'
  },
  'tropical indigo': {
    name: 'tropical indigo',
    color: '#A390E4',
    gradient: 'linear-gradient(135deg, #A390E4 0%, #667eea 100%)',
    className: 'theme-tropical-indigo'
  },
  'rose': {
    name: 'rose',
    color: '#FF0083',
    gradient: 'linear-gradient(135deg, #FF0083 0%, #FF6B9D 100%)',
    className: 'theme-rose'
  }
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [currentTheme, setCurrentTheme] = useState<string>('tropical indigo');

  const changeTheme = (themeName: string): void => {
    setCurrentTheme(themeName);
    
    // Apply theme class to document
    const currentThemeData = themes[themeName];
    if (currentThemeData) {
      // Remove all existing theme classes
      Object.values(themes).forEach(theme => {
        document.documentElement.classList.remove(theme.className);
      });
      
      // Add new theme class
      document.documentElement.classList.add(currentThemeData.className);
    }
  };

  const getCurrentTheme = (): Theme => themes[currentTheme];

  // Initialize theme on mount
  useEffect(() => {
    const currentThemeData = themes[currentTheme];
    if (currentThemeData) {
      document.documentElement.classList.add(currentThemeData.className);
    }
  }, [currentTheme]);

  const value: ThemeContextType = {
    currentTheme,
    changeTheme,
    getCurrentTheme,
    themes
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};