"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Camera, AlertCircle, TrendingUp } from "lucide-react";

interface StatsCardsProps {
  todayFocusMinutes: number;
  snapshotCount: number;
  interruptCount: number;
}

export function StatsCards({
  todayFocusMinutes,
  snapshotCount,
  interruptCount,
}: StatsCardsProps) {
  const hours = Math.floor(todayFocusMinutes / 60);
  const minutes = todayFocusMinutes % 60;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">今日专注</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {hours}小时{minutes}分钟
          </div>
          <p className="text-xs text-muted-foreground">
            较昨日 +12%
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">快照数量</CardTitle>
          <Camera className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{snapshotCount}</div>
          <p className="text-xs text-muted-foreground">
            今日创建的上下文快照
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">打断次数</CardTitle>
          <AlertCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{interruptCount}</div>
          <p className="text-xs text-muted-foreground">
            较昨日 -2 次
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">效率指数</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">87%</div>
          <p className="text-xs text-muted-foreground">
            专注时间占比
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
