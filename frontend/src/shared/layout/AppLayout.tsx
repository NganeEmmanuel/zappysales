import React from 'react';
import { AppBar, Toolbar, Typography, Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    background: {
      default: '#0a192f',
      paper: '#172a45',
    },
  },
  typography: {
    fontFamily: '"Outfit", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

/**
 * Main application layout wrapping all page views.
 * Renders a dark-themed toolbar header and wraps child routes in a centered grid layout.
 */
export const AppLayout: React.FC = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="flex flex-col min-h-screen bg-[#0a192f]">
        <AppBar position="static" elevation={0} className="border-b border-white/10 bg-[#172a45]">
          <Toolbar>
            <Typography variant="h6" component="div" className="flex-grow font-bold tracking-wide">
              ZappySales
            </Typography>
          </Toolbar>
        </AppBar>

        <Container component="main" className="flex-grow py-8 flex flex-col">
          <Outlet />
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default AppLayout;
