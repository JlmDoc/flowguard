"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, ExternalLink, RefreshCw } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { zhCN } from "date-fns/locale";
import type { Snapshot } from "@/types";

interface RecentSnapshotsProps {
  snapshots: Snapshot[];
  onRestore?: (snapshot: Snapshot) => void;
}

export function RecentSnapshots({ snapshots, onRestore }: RecentSnapshotsProps) {
  if (snapshots.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>最近快照</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Clock className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-sm text-muted-foreground">
              暂无快照，开始你的第一个专注会话吧
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>最近快照</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {snapshots.map((snapshot) => (
            <div
              key={snapshot.id}
              className="flex items-start justify-between p-3 rounded-lg border hover:bg-accent/50 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <h4 className="font-medium truncate">{snapshot.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(snapshot.createdAt), {
                    addSuffix: true,
                    locale: zhCN,
                  })}
                </p>
                <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                  {snapshot.browserTabs && snapshot.browserTabs.length > 0 && (
                    <span className="flex items-center gap-1">
                      <ExternalLink className="h-3 w-3" />
                      {snapshot.browserTabs.length} 个标签页
                    </span>
                  )}
                  {snapshot.tags && snapshot.tags.length > 0 && (
                    <span className="text-primary">
                      #{snapshot.tags[0]}
                    </span>
                  )}
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRestore?.(snapshot)}
              >
                <RefreshCw className="h-4 w-4 mr-1" />
                恢复
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
