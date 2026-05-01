import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  toast: { message: string; id: string } | null;
  showToast: (message: string) => void;
  dismissToast: () => void;
}

const getSystemTheme = (): 'dark' | 'light' => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'dark';
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: getSystemTheme(),
      setTheme: (theme) => set({ theme }),
      toast: null,
      showToast: (message: string) => set({ toast: { message, id: crypto.randomUUID() } }),
      dismissToast: () => set({ toast: null }),
    }),
    {
      name: 'theme-storage',
      partialize: (state) => ({ theme: state.theme }), // Only persist theme, NOT toast (ephemeral)
    }
  )
);
