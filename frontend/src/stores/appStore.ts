import { create } from 'zustand';

/**
 * Interface defining the global application state and associated actions.
 */
interface AppState {
  loading: boolean;
  error: string | null;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

/**
 * Zustand hook store for managing global application loading and error alerts.
 */
export const useAppStore = create<AppState>((set) => ({
  loading: false,
  error: null,
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
}));

export default useAppStore;
