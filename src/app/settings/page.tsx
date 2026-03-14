"use client";

import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Bell, Clock, Palette, Chrome, FileCode } from "lucide-react";

export default function SettingsPage() {
  return (
    <>
      <Navigation />
      <main className="container py-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">设置</h1>
          <p className="text-muted-foreground">
            配置 FlowGuard 以适应你的工作流
          </p>
        </div>

        <div className="grid gap-6">
          {/* Integrations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                集成
              </CardTitle>
              <CardDescription>
                连接你的开发工具以捕获上下文
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Chrome className="h-5 w-5" />
                  <div>
                    <p className="font-medium">Chrome 扩展</p>
                    <p className="text-sm text-muted-foreground">
                      捕获浏览器标签页
                    </p>
                  </div>
                </div>
                <Button variant="outline">安装</Button>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <FileCode className="h-5 w-5" />
                  <div>
                    <p className="font-medium">VS Code 扩展</p>
                    <p className="text-sm text-muted-foreground">
                      捕获打开的文件
                    </p>
                  </div>
                </div>
                <Button variant="outline">安装</Button>
              </div>
            </CardContent>
          </Card>

          {/* Focus Timer */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                专注计时器
              </CardTitle>
              <CardDescription>
                自定义你的专注时间设置
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">默认专注时长</span>
                <select className="border rounded px-3 py-1">
                  <option>25 分钟</option>
                  <option>45 分钟</option>
                  <option>90 分钟</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">休息时长</span>
                <select className="border rounded px-3 py-1">
                  <option>5 分钟</option>
                  <option>10 分钟</option>
                  <option>15 分钟</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">自动开始休息</span>
                <input type="checkbox" className="h-4 w-4" />
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                通知
              </CardTitle>
              <CardDescription>
                配置通知和提醒
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">专注结束提醒</span>
                <input type="checkbox" defaultChecked className="h-4 w-4" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">休息提醒</span>
                <input type="checkbox" defaultChecked className="h-4 w-4" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">桌面通知</span>
                <input type="checkbox" className="h-4 w-4" />
              </div>
            </CardContent>
          </Card>

          {/* Appearance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                外观
              </CardTitle>
              <CardDescription>
                自定义界面外观
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">主题</span>
                <select className="border rounded px-3 py-1">
                  <option>系统</option>
                  <option>浅色</option>
                  <option>深色</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
