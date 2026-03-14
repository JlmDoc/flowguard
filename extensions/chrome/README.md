# FlowGuard Chrome Extension

## 安装步骤

1. 打开 Chrome，访问 `chrome://extensions/`
2. 启用"开发者模式"（右上角开关）
3. 点击"加载已解压的扩展程序"
4. 选择此目录

## 图标

需要手动添加以下图标到 `icons/` 目录：
- `icon16.png` (16x16)
- `icon32.png` (32x32)
- `icon48.png` (48x48)
- `icon128.png` (128x128)

可以使用任何蓝色盾牌图标，或从主项目生成。

## 功能

- 点击扩展图标查看当前标签页数量
- 点击"捕获快照"保存当前窗口所有标签页
- 使用快捷键 `Ctrl+Shift+S` (Mac: `Cmd+Shift+S`) 快速捕获

## 开发

修改代码后，在 `chrome://extensions/` 点击刷新按钮即可更新。
