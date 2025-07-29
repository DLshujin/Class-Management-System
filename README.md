# 教务管理系统

**作者：shujin**  
**联系方式：adilei.shujin@gmail.com**

## 项目简介

教务管理系统是一个基于 Vue 3 + Element Plus 的现代化教务管理平台，提供完整的教务管理功能，包括教师管理、学生管理、课程管理、班级管理、排课管理、财务管理、系统公告等核心模块。

## 功能特性

### 🎯 核心功能
- **教师管理**：教师信息的增删改查，支持批量操作
- **学生管理**：学生信息管理，包括基本信息、联系方式等
- **课程管理**：课程信息维护，支持课程分类和状态管理
- **班级管理**：班级创建和管理，支持班级状态统计
- **排课管理**：灵活的排课系统，支持月视图、周视图、日视图
- **财务管理**：收入支出记录，支持审核状态管理
- **系统公告**：公告发布和管理，支持重要公告标记

### 🎨 界面特性
- **响应式设计**：适配各种屏幕尺寸
- **现代化UI**：基于 Element Plus 的美观界面
- **数据可视化**：图表展示关键数据指标
- **实时更新**：操作后数据实时同步显示
- **暗色主题**：支持亮色/暗色主题切换

### 🔧 技术特性
- **双数据模式**：支持模拟数据和真实API数据切换
- **状态管理**：基于 Pinia 的集中式状态管理
- **组件化开发**：高度模块化的组件设计
- **自动化测试**：完整的测试脚本和测试用例
- **统一日志系统**：专业的日志管理和错误处理
- **加载状态管理**：完善的加载状态控制

### 🛡️ 质量保证
- **统一错误处理**：友好的错误提示和完善的错误上报
- **日志管理**：分级日志记录，生产环境自动过滤调试信息
- **加载状态**：全局加载状态管理，提升用户体验
- **类型安全**：完善的数据验证和类型检查

## 技术栈

### 前端技术
- **Vue 3**：渐进式 JavaScript 框架
- **Element Plus**：Vue 3 的组件库
- **Pinia**：Vue 的状态管理库
- **Vue Router**：Vue.js 官方路由管理器
- **ECharts**：数据可视化图表库
- **FullCalendar**：专业的日历组件

### 开发工具
- **Vite**：下一代前端构建工具
- **ESLint**：代码质量检查工具
- **Prettier**：代码格式化工具

### 系统工具
- **统一日志系统**：`src/utils/logger.js` - 分级日志管理
- **错误处理系统**：`src/utils/errorHandler.js` - 统一错误处理
- **加载状态管理**：`src/utils/loadingManager.js` - 全局加载控制
- **工具函数库**：`src/utils/index.js` - 通用工具函数

## 项目结构

```
Class_cancellation/
├── src/
│   ├── components/          # 公共组件
│   ├── views/              # 页面组件
│   ├── stores/             # Pinia 状态管理
│   ├── utils/              # 工具函数
│   │   ├── logger.js       # 日志管理系统
│   │   ├── errorHandler.js # 错误处理系统
│   │   ├── loadingManager.js # 加载状态管理
│   │   ├── api.js          # API接口管理
│   │   └── index.js        # 通用工具函数
│   ├── router/             # 路由配置
│   └── assets/             # 静态资源
├── test/                   # 测试脚本
├── docs/                   # 文档
└── README.md              # 项目说明
```

## 安装和运行

### 环境要求
- Node.js 16.0+
- npm 或 yarn

### 安装依赖
```bash
cd Class_cancellation
npm install
```

### 开发环境运行
```bash
npm run dev
```

### 生产环境构建
```bash
npm run build
```

### 运行测试
```bash
npm run test
```

## 使用说明

### 数据模式切换
系统支持两种数据模式：
- **模拟数据模式**：使用本地模拟数据，适合开发和测试
- **API数据模式**：连接真实后端API，用于生产环境

在页面右上角可以切换数据模式。

### 日志系统使用
```javascript
import { logger } from '@/utils/logger.js'

// 不同级别的日志
logger.debug('调试信息')
logger.info('一般信息', 'MODULE')
logger.warn('警告信息', 'MODULE')
logger.error('错误信息', error, 'MODULE')

// API日志
logger.api.request(url, method, data)
logger.api.response(url, method, data, duration)
logger.api.error(url, method, error)

// 数据操作日志
logger.data.load('MODULE', count, 'source')
logger.data.operation('添加', 'MODULE', true)

// 用户操作日志
logger.user.action('登录', 'admin')
logger.user.error('登录失败', error)
```

### 错误处理使用
```javascript
import { errorHandler } from '@/utils/errorHandler.js'

// API错误处理
try {
  await api.post('/students', data)
} catch (error) {
  errorHandler.handleApiError(error, {
    module: 'STUDENT',
    operation: '添加学生',
    showType: 'message'
  })
}

// 表单验证错误
errorHandler.handleValidationError(errors, formRef)

// 业务错误
errorHandler.handleBusinessError('操作失败', details)

// 成功提示
errorHandler.showSuccess('操作成功')

// 确认对话框
const confirmed = await errorHandler.confirm('确定删除吗？')
```

### 加载状态管理
```javascript
import { loadingManager } from '@/utils/loadingManager.js'

// 基本使用
const taskId = loadingManager.start('myTask', { text: '处理中...' })
// ... 执行操作
loadingManager.finish(taskId)

// 函数包装器
const asyncFunction = loadingManager.withLoading(async () => {
  // 异步操作
}, { text: '加载中...', showGlobal: true })

// 批量处理
await loadingManager.batch([
  () => loadData1(),
  () => loadData2()
], { concurrent: true })
```

### 主要功能操作
1. **教师管理**：添加、编辑、删除教师信息
2. **学生管理**：维护学生档案和联系信息
3. **课程管理**：创建和管理课程信息
4. **班级管理**：组织班级并管理班级状态
5. **排课管理**：安排课程时间和地点
6. **财务管理**：记录和管理财务收支
7. **系统公告**：发布和管理系统公告

## 开发文档

- [前端开发文档](./开发文档说明.md)
- [后端开发文档](./后端开发文档.md)
- [功能测试清单](./test_functionality.md)

## 代码质量

### 性能特性
- ⚡ **快速启动**：Vite 构建工具，开发环境秒级启动
- 🚀 **懒加载**：路由级别的代码分割
- 📦 **优化打包**：自动代码分割和资源优化
- 🔄 **实时热更新**：开发时实时更新，无需刷新页面

### 代码规范
- 📝 **统一代码风格**：ESLint + Prettier 保证代码质量
- 🛡️ **类型安全**：完善的数据验证和错误处理
- 📊 **日志系统**：分级日志，生产环境自动过滤
- ⚠️ **错误监控**：统一错误处理和用户友好提示

## 贡献指南

欢迎提交 Issue 和 Pull Request 来改进项目。

## 许可证

本项目采用 MIT 许可证。

## 更新日志

### v1.1.0 (2025-01-28)
- 🛡️ **全新错误处理系统** - 统一的错误处理和用户友好提示
- 📊 **专业日志系统** - 分级日志管理，生产环境优化
- ⚡ **加载状态管理** - 全局加载状态控制，提升用户体验
- 🧹 **代码质量优化** - 清理调试信息，提升代码专业性
- 🔧 **API接口优化** - 统一的API日志记录和错误处理

### v1.0.0 (2025-01-27)
- ✨ 完成核心功能开发
- 🎨 优化用户界面设计
- 🔧 完善数据管理模式
- 📝 添加完整文档
- 🧪 实现自动化测试 