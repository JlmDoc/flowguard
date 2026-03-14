import { Navigation } from "@/components/navigation";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { RecentSnapshots } from "@/components/dashboard/recent-snapshots";
import { FocusTimer } from "@/components/focus/focus-timer";
import { CreateSnapshotDialog } from "@/components/snapshot/create-snapshot-dialog";

// Mock data for demo
const mockSnapshots = [
  {
    id: "1",
    userId: "user1",
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
    title: "CodeGuard PR 审查",
    note: "正在审查核心逻辑部分",
    browserTabs: [
      { title: "GitHub PR", url: "https://github.com" },
    ],
    vscodeFiles: [
      { path: "/src/index.ts", name: "index.ts" },
    ],
    tags: ["code-review"],
  },
  {
    id: "2",
    userId: "user1",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    title: "Halo 文档阅读",
    browserTabs: [
      { title: "Halo Docs", url: "https://halo.run" },
    ],
    vscodeFiles: [],
    tags: ["docs"],
  },
  {
    id: "3",
    userId: "user1",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
    title: "晨会笔记整理",
    note: "讨论了 Q2 目标",
    browserTabs: [],
    vscodeFiles: [],
    tags: ["meeting"],
  },
];

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main className="container py-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">仪表盘</h1>
            <p className="text-muted-foreground">
              保护你的上下文，让深度工作更高效
            </p>
          </div>
          <CreateSnapshotDialog
            onCreate={async (input) => {
              console.log("Creating snapshot:", input);
              // TODO: Implement API call
            }}
          />
        </div>

        {/* Stats */}
        <StatsCards
          todayFocusMinutes={200}
          snapshotCount={8}
          interruptCount={3}
        />

        {/* Main Content Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Focus Timer */}
          <FocusTimer
            onStart={(duration) => console.log("Focus started:", duration)}
            onStop={() => console.log("Focus stopped")}
            onComplete={() => console.log("Focus completed")}
          />

          {/* Recent Snapshots */}
          <RecentSnapshots
            snapshots={mockSnapshots}
            onRestore={(snapshot) => console.log("Restoring:", snapshot)}
          />
        </div>
      </main>
    </>
  );
}
