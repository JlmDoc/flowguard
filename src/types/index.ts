// FlowGuard Types

export interface BrowserTab {
  title: string;
  url: string;
  favIconUrl?: string;
}

export interface VSCodeFile {
  path: string;
  name: string;
  language?: string;
}

export interface Snapshot {
  id: string;
  userId: string;
  createdAt: Date;
  title: string;
  note?: string;
  browserTabs: BrowserTab[];
  vscodeFiles: VSCodeFile[];
  focusSessionId?: string;
  tags: string[];
}

export interface FocusSession {
  id: string;
  userId: string;
  startedAt: Date;
  endedAt?: Date;
  durationMinutes: number;
  interrupted: boolean;
  tags: string[];
}

export interface Interrupt {
  id: string;
  userId: string;
  focusSessionId?: string;
  occurredAt: Date;
  appName: string;
  durationSeconds?: number;
}

export interface DailyStats {
  date: Date;
  snapshotCount: number;
  totalFocusMinutes: number;
  interruptCount: number;
}

// API Types
export interface CreateSnapshotInput {
  title: string;
  note?: string;
  browserTabs: BrowserTab[];
  vscodeFiles: VSCodeFile[];
  tags?: string[];
}

export interface CreateFocusSessionInput {
  durationMinutes: number;
  tags?: string[];
}

export interface CreateInterruptInput {
  focusSessionId?: string;
  appName: string;
  durationSeconds?: number;
}
