import { create } from 'zustand';

interface User {
  uid: string;
  customId: string;
  role: 'user' | 'agent' | 'promoter' | 'admin';
  status: 'active' | 'pending';
  email: string;
  name: string;
  walletBalance: number;
}

interface AppState {
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  user: User | null;
  setUser: (user: User | null) => void;
  isInitialLoading: boolean;
  setInitialLoading: (loading: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  theme: 'dark',
  setTheme: (theme) => set({ theme }),
  user: null,
  setUser: (user) => set({ user }),
  isInitialLoading: true,
  setInitialLoading: (loading) => set({ isInitialLoading: loading }),
}));
