import { Navigation } from "@/components/navigation";
import { FocusTimer } from "@/components/focus/focus-timer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp } from "lucide-react";

export default function FocusPage() {
  return (
    <>
      <Navigation />
      <main className="container py-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">专注模式</h1>
          <p className="text-muted-foreground">
            进入深度工作状态，保护你的专注时间
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FocusTimer
            onStart={(duration) => console.log("Focus started:", duration)}
            onStop={() => console.log("Focus stopped")}
            onComplete={() => console.log("Focus completed")}
          />

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                本周专注统计
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">周一</span>
                  <div className="flex-1 mx-4 h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: "75%" }} />
                  </div>
                  <span className="text-sm font-medium">3h 45m</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">周二</span>
                  <div className="flex-1 mx-4 h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: "90%" }} />
                  </div>
                  <span className="text-sm font-medium">4h 30m</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">周三</span>
                  <div className="flex-1 mx-4 h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: "60%" }} />
                  </div>
                  <span className="text-sm font-medium">3h 00m</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">周四</span>
                  <div className="flex-1 mx-4 h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: "85%" }} />
                  </div>
                  <span className="text-sm font-medium">4h 15m</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">周五</span>
                  <div className="flex-1 mx-4 h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: "40%" }} />
                  </div>
                  <span className="text-sm font-medium">2h 00m</span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">本周总计</span>
                  <span className="text-lg font-bold flex items-center gap-1">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    17h 30m
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
