# FlowGuard - 智能上下文保护工具

> 开发者的"上下文保镖"——在你被打断前预警，被打断后快速恢复，让深度工作不再碎片化。

## 功能特性

### 🎯 核心功能

- **Context Snapshot（上下文快照）**：一键捕获当前工作状态，包括浏览器标签页、IDE 打开的文件等
- **Focus Timer（专注计时器）**：番茄钟 + 自定义时长，追踪深度工作时间
- **Interrupt Shield（打断护盾）**：记录打断事件，分析打断模式
- **Quick Resume（快速恢复）**：一键恢复之前的工作环境
- **Unified Dashboard（统一仪表盘）**：一目了然的工作状态视图

### 🔧 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS + shadcn/ui
- **认证**: Clerk (GitHub OAuth)
- **数据库**: Vercel Postgres + Drizzle ORM
- **图标**: Lucide Icons
- **状态管理**: Zustand

## 快速开始

### 环境要求

- Node.js 18+
- pnpm (推荐) 或 npm

### 本地开发

1. **克隆仓库**

```bash
git clone https://github.com/JlmDoc/flowguard.git
cd flowguard
```

2. **安装依赖**

```bash
pnpm install
```

3. **配置环境变量**

复制 `.env.example` 到 `.env.local` 并填写：

```bash
cp .env.example .env.local
```

需要配置的环境变量：
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk 发布密钥
- `CLERK_SECRET_KEY` - Clerk 密钥
- `POSTGRES_URL` - Vercel Postgres 连接字符串

4. **初始化数据库**

```bash
pnpm db:push
```

5. **启动开发服务器**

```bash
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000)

## 部署

### Vercel 部署

1. Fork 本仓库
2. 在 Vercel 导入项目
3. 配置环境变量
4. 部署

详细步骤请参考 [部署文档](./docs/deployment.md)

## 项目结构

```
flowguard/
├── src/
│   ├── app/              # Next.js App Router 页面
│   │   ├── api/          # API 路由
│   │   ├── sign-in/      # 登录页面
│   │   └── page.tsx      # 首页
│   ├── components/       # React 组件
│   │   ├── ui/           # shadcn/ui 组件
│   │   ├── dashboard/    # 仪表盘组件
│   │   ├── focus/        # 专注计时器组件
│   │   └── snapshot/     # 快照组件
│   ├── db/               # 数据库配置
│   ├── lib/              # 工具函数
│   ├── store/            # Zustand 状态管理
│   └── types/            # TypeScript 类型定义
├── public/               # 静态资源
├── drizzle.config.ts     # Drizzle 配置
├── tailwind.config.ts    # Tailwind 配置
└── vercel.json           # Vercel 部署配置
```

## 开发路线

### MVP (v0.1.0)

- [x] 项目初始化
- [x] 基础 UI 组件
- [x] 专注计时器
- [x] 快照创建功能
- [ ] Chrome 扩展（标签页捕获）
- [ ] VS Code 扩展（文件列表捕获）
- [ ] 完整的数据库集成

### v0.2.0 (计划中)

- [ ] 自动快照（定时 + 切换检测）
- [ ] 打断分析报告
- [ ] 快照恢复功能
- [ ] 数据统计图表

### v0.3.0 (计划中)

- [ ] 快捷键支持
- [ ] 标签系统
- [ ] 搜索功能
- [ ] 导出数据

## 贡献

欢迎贡献！请查看 [CONTRIBUTING.md](./CONTRIBUTING.md)

## 许可证

MIT License - 详见 [LICENSE](./LICENSE)

## 联系方式

- GitHub: [@JlmDoc](https://github.com/JlmDoc)
- Website: [zqcblog.com](https://zqcblog.com)
