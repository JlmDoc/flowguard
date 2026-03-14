"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Play, Pause, Square, Coffee } from "lucide-react";

const PRESET_DURATIONS = [25, 45, 90];

interface FocusTimerProps {
  onStart?: (duration: number) => void;
  onStop?: () => void;
  onComplete?: () => void;
}

export function FocusTimer({ onStart, onStop, onComplete }: FocusTimerProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [duration, setDuration] = useState(25); // minutes
  const [remainingSeconds, setRemainingSeconds] = useState(25 * 60);
  const [selectedPreset, setSelectedPreset] = useState(0);

  const progress = ((duration * 60 - remainingSeconds) / (duration * 60)) * 100;

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && !isPaused && remainingSeconds > 0) {
      interval = setInterval(() => {
        setRemainingSeconds((prev) => prev - 1);
      }, 1000);
    } else if (remainingSeconds === 0 && isRunning) {
      setIsRunning(false);
      onComplete?.();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, isPaused, remainingSeconds, onComplete]);

  const handleStart = useCallback(() => {
    setIsRunning(true);
    setIsPaused(false);
    onStart?.(duration);
  }, [duration, onStart]);

  const handlePause = useCallback(() => {
    setIsPaused(!isPaused);
  }, [isPaused]);

  const handleStop = useCallback(() => {
    setIsRunning(false);
    setIsPaused(false);
    setRemainingSeconds(duration * 60);
    onStop?.();
  }, [duration, onStop]);

  const handlePresetClick = useCallback((minutes: number, index: number) => {
    if (!isRunning) {
      setDuration(minutes);
      setRemainingSeconds(minutes * 60);
      setSelectedPreset(index);
    }
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Coffee className="h-5 w-5" />
          专注计时器
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-6">
          {/* Timer Display */}
          <div className="text-6xl font-mono font-bold">
            {formatTime(remainingSeconds)}
          </div>

          {/* Progress Bar */}
          <div className="w-full max-w-sm">
            <Progress value={progress} className="h-2" />
          </div>

          {/* Preset Durations */}
          {!isRunning && (
            <div className="flex gap-2">
              {PRESET_DURATIONS.map((mins, index) => (
                <Button
                  key={mins}
                  variant={selectedPreset === index ? "default" : "outline"}
                  onClick={() => handlePresetClick(mins, index)}
                >
                  {mins} 分钟
                </Button>
              ))}
            </div>
          )}

          {/* Control Buttons */}
          <div className="flex gap-2">
            {!isRunning ? (
              <Button onClick={handleStart} size="lg">
                <Play className="h-5 w-5 mr-2" />
                开始专注
              </Button>
            ) : (
              <>
                <Button onClick={handlePause} variant="secondary" size="lg">
                  {isPaused ? (
                    <>
                      <Play className="h-5 w-5 mr-2" />
                      继续
                    </>
                  ) : (
                    <>
                      <Pause className="h-5 w-5 mr-2" />
                      暂停
                    </>
                  )}
                </Button>
                <Button onClick={handleStop} variant="destructive" size="lg">
                  <Square className="h-5 w-5 mr-2" />
                  结束
                </Button>
              </>
            )}
          </div>

          {/* Status */}
          {isRunning && (
            <p className="text-sm text-muted-foreground">
              {isPaused ? "已暂停" : "专注中...保持专注！"}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
