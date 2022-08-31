import { User } from '@full-stack/types';
import create from 'zustand';
import { devtools } from 'zustand/middleware';

export interface State {
  user: User | null;
  setUser: (user: User) => void;
  reset: () => void;
}

export const useAuthStore = create<State>()(
  devtools((set) => ({
    user: null,
    setUser: (user: User) =>
      set(() => ({
        user: user,
      })),
    reset: () => {
      set((state) => ({ user: null }));
      localStorage.removeItem('user_token');
    },
  }))
);
