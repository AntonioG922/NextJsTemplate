"use client"
import { useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

const useBodyBackground = (): void => {
  const { getCurrentTheme } = useTheme();
  const currentTheme = getCurrentTheme();

  useEffect(() => {
    // Apply the gradient to the body element with full page coverage
    document.body.style.background = currentTheme.gradient;
    document.body.style.backgroundAttachment = 'fixed';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundPosition = 'center center';
    document.body.style.minHeight = '100vh';
    document.body.style.margin = '0';
    document.body.style.padding = '0';

    // Also apply to html element to ensure full coverage
    document.documentElement.style.background = currentTheme.gradient;
    document.documentElement.style.backgroundAttachment = 'fixed';
    document.documentElement.style.backgroundSize = 'cover';
    document.documentElement.style.backgroundRepeat = 'no-repeat';
    document.documentElement.style.backgroundPosition = 'center center';
    document.documentElement.style.minHeight = '100vh';

    // Cleanup function to reset styles when component unmounts
    return () => {
      document.body.style.background = '';
      document.body.style.backgroundAttachment = '';
      document.body.style.backgroundSize = '';
      document.body.style.backgroundRepeat = '';
      document.body.style.backgroundPosition = '';
      document.body.style.minHeight = '';
      document.body.style.margin = '';
      document.body.style.padding = '';
      
      document.documentElement.style.background = '';
      document.documentElement.style.backgroundAttachment = '';
      document.documentElement.style.backgroundSize = '';
      document.documentElement.style.backgroundRepeat = '';
      document.documentElement.style.backgroundPosition = '';
      document.documentElement.style.minHeight = '';
    };
  }, [currentTheme.gradient]);
};

export default useBodyBackground;