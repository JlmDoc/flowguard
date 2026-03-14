"use client";

import { Navigation } from "@/components/navigation";
import { RecentSnapshots } from "@/components/dashboard/recent-snapshots";
import { CreateSnapshotDialog } from "@/components/snapshot/create-snapshot-dialog";
import type { Snapshot } from "@/types";

// Mock data
const mockSnapshots: Snapshot[] = [
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
];

export default function SnapshotsPage() {
  return (
    <>
      <Navigation />
      <main className="container py-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">上下文快照</h1>
            <p className="text-muted-foreground">
              管理你的工作状态快照，一键恢复
            </p>
          </div>
          <CreateSnapshotDialog
            onCreate={async (input) => {
              console.log("Creating snapshot:", input);
            }}
          />
        </div>

        <RecentSnapshots
          snapshots={mockSnapshots}
          onRestore={(snapshot) => console.log("Restoring:", snapshot)}
        />
      </main>
    </>
  );
}
