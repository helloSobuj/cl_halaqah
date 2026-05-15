"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Locale } from "@/i18n";

interface AppState {
  locale: Locale;
  theme: "light" | "dark";
  sidebarOpen: boolean;
  setLocale: (locale: Locale) => void;
  toggleTheme: () => void;
  setTheme: (theme: "light" | "dark") => void;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      locale: "bn",
      theme: "light",
      sidebarOpen: false,
      setLocale: (locale) => set({ locale }),
      toggleTheme: () =>
        set((s) => ({ theme: s.theme === "light" ? "dark" : "light" })),
      setTheme: (theme) => set({ theme }),
      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
    }),
    { name: "halaqah-app" }
  )
);
