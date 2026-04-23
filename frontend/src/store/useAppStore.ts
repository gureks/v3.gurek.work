import { create } from 'zustand';

interface AppState {
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
}

export const useAppStore = create<AppState>((set) => ({
  theme: 'dark', // default to dark per design
  setTheme: (theme) => set({ theme }),
}));
