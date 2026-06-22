import React from 'react';
import { AppBar, Toolbar, Typography, Container, CssBaseline } from '@mui/material';
import { Outlet } from 'react-router-dom';
import NotificationSnackbar from '../components/NotificationSnackbar';
import AppThemeProvider from '../theme/ThemeProvider';
import styles from './AppLayout.module.css';

/**
 * Main application layout wrapping all page views.
 * Renders a dark-themed toolbar header and wraps child routes in a centered grid layout.
 */
export const AppLayout: React.FC = () => {
  return (
    <AppThemeProvider>
      <CssBaseline />
      <div className={styles.layoutContainer}>
        <AppBar position="static" elevation={0} className={styles.appBar}>
          <Toolbar>
            <Typography variant="h6" component="div" className={styles.title}>
              ZappySales
            </Typography>
          </Toolbar>
        </AppBar>

        <Container component="main" className={styles.mainContent}>
          <Outlet />
        </Container>
      </div>
      <NotificationSnackbar />
    </AppThemeProvider>
  );
};

export default AppLayout;
