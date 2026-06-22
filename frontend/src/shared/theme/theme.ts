import { createTheme } from '@mui/material';
import { colors } from './colors';

/**
 * Centrally defined Material-UI theme using our color palette.
 */
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: colors.primary,
    },
    background: {
      default: colors.background.default,
      paper: colors.background.paper,
    },
  },
  typography: {
    fontFamily: '"Outfit", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export default darkTheme;
