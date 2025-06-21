import * as React from 'react';
import { Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function ModeToggle() {
  const [theme, setThemeState] = React.useState<
    'light' | 'dark' | 'system'
  >('system');

  React.useEffect(() => {
    // Initialize theme from localStorage or system preference
    const getStoredTheme = () => {
      if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
        const stored = localStorage.getItem('theme');
        return stored === 'dark' ? 'dark' : 'light';
      }
      return 'system';
    };
    
    setThemeState(getStoredTheme());
  }, []);

  React.useEffect(() => {
    const applyTheme = (newTheme: 'light' | 'dark' | 'system') => {
      const isDark = newTheme === 'dark' || 
        (newTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
      
      document.documentElement.classList.toggle('dark', isDark);
      
      // Store actual theme preference (not 'system')
      if (typeof localStorage !== 'undefined') {
        if (newTheme === 'system') {
          localStorage.removeItem('theme');
        } else {
          localStorage.setItem('theme', newTheme);
        }
      }
    };

    applyTheme(theme);

    // Listen for system theme changes when in system mode
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyTheme('system');
      
      // Use addEventListener for better Safari compatibility
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
      } else {
        // Fallback for older Safari versions
        mediaQuery.addListener(handleChange);
        return () => mediaQuery.removeListener(handleChange);
      }
    }
  }, [theme]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="bg-transparent">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setThemeState('light')}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setThemeState('dark')}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setThemeState('system')}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
