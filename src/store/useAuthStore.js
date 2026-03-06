import { create } from "zustand";

export const useAuthStore = create((set) => ({

  user: null,
  permissions: [],

  setUser: (user) => set({ user }),

  setPermissions: (permissions) => set({ permissions }),

  logout: () => set({
    user: null,
    permissions: []
  })

}));