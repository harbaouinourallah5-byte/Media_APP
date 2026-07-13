import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  isAdmin?: boolean;
  points?: number;
}

interface AuthState {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  updatePoints: (points: number) => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
      updatePoints: (pointsToAdd) => set((state) => ({ 
        user: state.user ? { ...state.user, points: (state.user.points || 0) + pointsToAdd } : null 
      })),
    }),
    {
      name: 'medina-auth',
    }
  )
);
