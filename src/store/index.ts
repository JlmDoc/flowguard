import { create } from "zustand";
import type { Snapshot, FocusSession, DailyStats } from "@/types";

interface AppState {
  // Focus Timer State
  isFocusMode: boolean;
  focusStartTime: Date | null;
  focusDuration: number; // minutes
  currentFocusSession: FocusSession | null;

  // Snapshots
  recentSnapshots: Snapshot[];
  currentSnapshot: Snapshot | null;

  // Stats
  todayStats: DailyStats | null;

  // Actions
  startFocus: (duration: number) => void;
  stopFocus: () => void;
  setRecentSnapshots: (snapshots: Snapshot[]) => void;
  setCurrentSnapshot: (snapshot: Snapshot | null) => void;
  setTodayStats: (stats: DailyStats) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Initial State
  isFocusMode: false,
  focusStartTime: null,
  focusDuration: 0,
  currentFocusSession: null,
  recentSnapshots: [],
  currentSnapshot: null,
  todayStats: null,

  // Actions
  startFocus: (duration) =>
    set({
      isFocusMode: true,
      focusStartTime: new Date(),
      focusDuration: duration,
    }),

  stopFocus: () =>
    set({
      isFocusMode: false,
      focusStartTime: null,
      focusDuration: 0,
      currentFocusSession: null,
    }),

  setRecentSnapshots: (snapshots) => set({ recentSnapshots: snapshots }),

  setCurrentSnapshot: (snapshot) => set({ currentSnapshot: snapshot }),

  setTodayStats: (stats) => set({ todayStats: stats }),
}));
