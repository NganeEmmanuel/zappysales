import React from 'react';
import { ThemeProvider } from '@mui/material';
import { darkTheme } from './theme';

interface AppThemeProviderProps {
  children: React.ReactNode;
}

/**
 * Centrally managed ThemeProvider wrapping children in ZappySales' custom dark theme.
 */
export const AppThemeProvider: React.FC<AppThemeProviderProps> = ({ children }) => {
  return <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>;
};

export default AppThemeProvider;
