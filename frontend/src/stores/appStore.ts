import { create } from 'zustand';

export interface AppNotification {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'warning' | 'info';
}

/**
 * Interface defining the global application state and associated actions.
 */
interface AppState {
  loading: boolean;
  error: string | null;
  notification: AppNotification;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  showNotification: (message: string, severity?: 'success' | 'error' | 'warning' | 'info') => void;
  closeNotification: () => void;
}

/**
 * Zustand hook store for managing global application loading, error alerts, and snackbar notifications.
 */
export const useAppStore = create<AppState>((set) => ({
  loading: false,
  error: null,
  notification: {
    open: false,
    message: '',
    severity: 'info'
  },
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
  showNotification: (message, severity = 'info') => set({
    notification: {
      open: true,
      message,
      severity
    }
  }),
  closeNotification: () => set((state) => ({
    notification: {
      ...state.notification,
      open: false
    }
  }))
}));

export default useAppStore;
