import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
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
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
        <AppBar position="static" elevation={0} sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.12)', bgcolor: 'background.paper' }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: '0.5px' }}>
              ZappySales
            </Typography>
          </Toolbar>
        </AppBar>

        <Container component="main" sx={{ flexGrow: 1, py: 4, display: 'flex', flexDirection: 'column' }}>
          <Outlet />
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default AppLayout;
