import { Goal, User } from '@full-stack/types';
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  resetUser: () => void;
}

export interface GoalState {
  goals: Goal[];
  addGoal: (goal: Goal) => void;
  resetGoal: () => void;
  setAllGoals: (goals: Goal[]) => void;
  removeGoal: (id: string) => void;
}

export const useAuthStore = create<UserState>()(
  devtools((set) => ({
    user: null,
    setUser: (user: User) => {
      set(() => ({
        user: user,
      }));
      localStorage.setItem('user_token', JSON.stringify(user));
    },
    resetUser: () => {
      set((state) => ({ user: null }));
      localStorage.removeItem('user_token');
    },
  }))
);

export const useGoalState = create<GoalState>()(
  devtools(
    persist(
      (set) => ({
        goals: [],
        resetGoal: () => {
          set(() => ({ goals: [] }));
          localStorage.clear();
        },
        addGoal: (goal) => {
          set((state) => ({ goals: [...state.goals, goal] }));
        },
        setAllGoals: (goals) => {
          set({ goals });
        },
        removeGoal: (id) => {
          set((state) => ({
            goals: state.goals.filter((goal) => goal.id !== id),
          }));
        },
      }),
      { name: 'goal' }
    )
  )
);
