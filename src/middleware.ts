import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 简化版 middleware - 无认证模式
// 后续可配置 Clerk 认证
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
