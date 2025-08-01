# Class Management System 📚

<div align="center">
  <h3>现代化教务管理系统</h3>
  <p>基于 Vue 3 + Element Plus 的高效教务管理平台</p>
  
  ![Vue.js](https://img.shields.io/badge/Vue.js-3.3.4-4FC08D?style=flat-square&logo=vue.js&logoColor=white)
  ![Element Plus](https://img.shields.io/badge/Element%20Plus-2.3.8-409EFF?style=flat-square&logo=element&logoColor=white)
  ![Vite](https://img.shields.io/badge/Vite-5.4.19-646CFF?style=flat-square&logo=vite&logoColor=white)
  ![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)
  ![Node](https://img.shields.io/badge/Node.js-16%2B-green?style=flat-square&logo=node.js&logoColor=white)
</div>

---

## 📋 目录

- [✨ 特性](#-特性)
- [🚀 快速开始](#-快速开始)
- [📦 安装](#-安装)
- [🛠️ 使用说明](#️-使用说明)
- [🏗️ 技术栈](#️-技术栈)
- [📁 项目结构](#-项目结构)
- [🧪 测试](#-测试)
- [📖 API文档](#-api文档)
- [🤝 贡献](#-贡献)
- [📄 许可证](#-许可证)
- [📞 联系方式](#-联系方式)

---

## ✨ 特性

### 🎯 核心功能
- 🧑‍🏫 **教师管理** - 完整的教师信息管理，支持批量操作
- 👨‍🎓 **学生管理** - 学生档案管理，包含详细联系信息
- 📚 **课程管理** - 课程信息维护，支持分类和状态管理
- 🏫 **班级管理** - 班级创建和管理，实时状态统计
- 📅 **排课管理** - 灵活的日程安排，支持多种视图模式
- 💰 **财务管理** - 收支记录管理，支持审核流程
- 📢 **系统公告** - 公告发布管理，重要消息标记

### 🎨 用户界面
- 📱 **响应式设计** - 完美适配各种设备屏幕
- 🌙 **主题切换** - 支持亮色/暗色主题
- 📊 **数据可视化** - 直观的图表展示
- ⚡ **实时更新** - 数据变更即时同步
- 🎛️ **可定制界面** - 灵活的布局配置

### 🛠️ 技术特性
- 🔄 **双数据模式** - 模拟数据与真实API无缝切换
- 📦 **状态管理** - 基于Pinia的集中化状态管理
- 🧩 **组件化架构** - 高度模块化的组件设计
- 🛡️ **错误处理** - 完善的错误处理和用户提示
- 📝 **日志系统** - 分级日志记录和监控
- ⚡ **性能优化** - 代码分割和懒加载

---

## 🚀 快速开始

```bash
# 克隆项目
git clone https://github.com/DLshujin/Class-Management-System.git

# 进入项目目录
cd Class-Management-System

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

🎉 访问 `http://localhost:5173` 即可使用系统！

---

## 📦 安装

### 环境要求

- **Node.js** `18.0+`
- **npm** `10.0+` 或 **yarn** `1.22+`

### 安装步骤

1. **克隆仓库**
   ```bash
   git clone https://github.com/DLshujin/Class-Management-System.git
   cd Class-Management-System
   ```

2. **安装依赖**
   ```bash
   npm install
   # 或使用 yarn
   yarn install
   ```

3. **启动开发环境**
   ```bash
   npm run dev
   ```

4. **构建生产版本**
   ```bash
   npm run build
   ```

---

## 🛠️ 使用说明

### 数据模式切换

系统支持两种数据操作模式：

- **🔧 模拟数据模式** - 使用本地Mock数据，适合开发和演示
- **🌐 API数据模式** - 连接真实后端API，用于生产环境

在右上角切换器中可以快速切换数据模式。

### 主要功能模块

| 模块 | 功能描述 | 特性 |
|------|----------|------|
| 教师管理 | 教师信息的增删改查 | 批量操作、导入导出 |
| 学生管理 | 学生档案和联系信息管理 | 详细资料、状态跟踪 |
| 课程管理 | 课程信息和分类管理 | 状态管理、时间安排 |
| 班级管理 | 班级组织和统计 | 实时统计、状态监控 |
| 排课管理 | 课程时间和地点安排 | 多视图、冲突检测 |
| 财务管理 | 收支记录和审核 | 审核流程、统计报表 |
| 系统公告 | 公告发布和管理 | 重要标记、定时发布 |

### 快捷键支持

| 快捷键 | 功能 |
|--------|------|
| `Ctrl + /` | 显示快捷键帮助 |
| `Ctrl + S` | 保存当前表单 |
| `Ctrl + N` | 新建记录 |
| `Esc` | 关闭对话框 |

---

## 🏗️ 技术栈

### 前端框架
- ![Vue.js](https://img.shields.io/badge/Vue.js-3.3.4-4FC08D?style=flat-square&logo=vue.js&logoColor=white) **Vue 3** - 渐进式JavaScript框架
- ![Element Plus](https://img.shields.io/badge/Element%20Plus-2.3.8-409EFF?style=flat-square) **Element Plus** - Vue 3组件库
- ![Pinia](https://img.shields.io/badge/Pinia-2.1.6-yellow?style=flat-square) **Pinia** - 状态管理库
- ![Vue Router](https://img.shields.io/badge/Vue%20Router-4.2.4-4FC08D?style=flat-square) **Vue Router** - 路由管理器

### 数据可视化
- ![ECharts](https://img.shields.io/badge/ECharts-5.4.3-red?style=flat-square) **ECharts** - 数据可视化图表库
- ![FullCalendar](https://img.shields.io/badge/FullCalendar-6.1.18-blue?style=flat-square) **FullCalendar** - 日历组件

### 开发工具
- ![Vite](https://img.shields.io/badge/Vite-5.4.19-646CFF?style=flat-square&logo=vite&logoColor=white) **Vite** - 下一代前端构建工具
- ![Axios](https://img.shields.io/badge/Axios-1.4.0-purple?style=flat-square) **Axios** - HTTP客户端

---

## 📁 项目结构

```
Class-Management-System/
├── 📁 src/                    # 源代码目录
│   ├── 📁 components/         # 公共组件
│   │   ├── 🧩 ShortcutHelp.vue       # 快捷键帮助
│   │   ├── 🔔 NotificationList.vue   # 通知列表
│   │   └── 💰 FinanceApproval.vue    # 财务审批
│   ├── 📁 views/              # 页面组件
│   │   ├── 🏠 Home.vue               # 首页仪表板
│   │   ├── 👨‍🏫 Teacher.vue            # 教师管理
│   │   ├── 👨‍🎓 Student.vue            # 学生管理
│   │   ├── 📚 Course.vue             # 课程管理
│   │   ├── 🏫 Class.vue              # 班级管理
│   │   ├── 📅 Schedule.vue           # 排课管理
│   │   ├── 💰 Finance.vue            # 财务管理
│   │   ├── 📢 Notifications.vue      # 系统公告
│   │   └── ⚙️ Settings.vue           # 系统设置
│   ├── 📁 stores/             # Pinia 状态管理
│   │   ├── 👨‍🏫 teacher.js             # 教师数据
│   │   ├── 👨‍🎓 student.js             # 学生数据
│   │   ├── 📚 course.js              # 课程数据
│   │   ├── 🏫 class.js               # 班级数据
│   │   ├── 📅 schedule.js            # 排课数据
│   │   ├── 💰 financeData.js         # 财务数据
│   │   ├── 🔔 notification.js        # 通知数据
│   │   └── 🔧 dataSource.js          # 数据源管理
│   ├── 📁 utils/              # 工具函数库
│   │   ├── 🌐 api.js                 # API接口管理
│   │   ├── 📝 logger.js              # 日志系统
│   │   ├── ⚠️ errorHandler.js        # 错误处理
│   │   ├── ⏳ loadingManager.js      # 加载状态管理
│   │   ├── 📊 dataManager.js         # 数据管理工具
│   │   ├── 📅 dateUtils.js           # 日期处理工具
│   │   └── 📋 statusEnums.js         # 状态枚举
│   ├── 📁 styles/             # 样式文件
│   ├── 📁 assets/             # 静态资源
│   ├── 🛣️ router.js           # 路由配置
│   ├── 📱 App.vue             # 主应用组件
│   └── 🚀 main.js             # 应用入口
├── 📁 test/                   # 测试文件
├── 📁 public/                 # 静态资源
├── 📦 package.json            # 项目配置
├── ⚙️ vite.config.js          # 构建配置
└── 📄 README.md               # 项目文档
```

---

## 🧪 测试

### 运行测试

```bash
# 运行所有测试
npm run test

# 运行认证测试
npm run test:auth

# 运行完整测试套件
npm run test:all
```

### 测试覆盖

- ✅ **功能测试** - 核心业务逻辑测试
- ✅ **API测试** - 接口调用和数据验证
- ✅ **UI测试** - 用户界面组件测试
- ✅ **集成测试** - 模块间集成测试

---

## 📖 API文档

### 认证相关

```javascript
// 用户登录
POST /api/auth/login
{
  "username": "admin",
  "password": "password"
}

// 获取用户信息
GET /api/auth/profile
```

### 数据管理

```javascript
// 获取教师列表
GET /api/teachers?page=1&limit=10

// 添加新教师
POST /api/teachers
{
  "name": "张老师",
  "subject": "数学",
  "phone": "13800138000"
}

// 更新教师信息
PUT /api/teachers/:id
```

### 错误处理

所有API请求都遵循统一的错误处理格式：

```javascript
{
  "success": false,
  "message": "错误描述",
  "code": "ERROR_CODE",
  "data": null
}
```

---

## 🤝 贡献

我们欢迎所有形式的贡献！

### 贡献方式

1. 🍴 Fork 本项目
2. 🌿 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 💾 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 📤 推送到分支 (`git push origin feature/AmazingFeature`)
5. 🔄 创建 Pull Request

### 开发规范

- 📝 遵循 ESLint 代码规范
- 🧪 为新功能添加测试
- 📚 更新相关文档
- 💬 使用清晰的提交信息

### Bug 报告

发现bug？请[创建 Issue](https://github.com/DLshujin/Class-Management-System/issues/new) 并提供：

- 🐛 Bug 描述
- 🔄 复现步骤
- 💻 环境信息
- 📸 截图（如有必要）

---

## 📄 许可证

本项目基于 [MIT](LICENSE) 许可证开源。

```
MIT License

Copyright (c) 2025 shujin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

---

## 📞 联系方式

<div align="center">

**shujin** - 项目维护者

📧 **Email**: [adilei.shujin@gmail.com](mailto:adilei.shujin@gmail.com)

🔗 **GitHub**: [@DLshujin](https://github.com/DLshujin)

📦 **项目链接**: [https://github.com/DLshujin/Class-Management-System](https://github.com/DLshujin/Class-Management-System)

---

⭐ 如果这个项目对你有帮助，请给它一个星标！

</div>

---

<div align="center">
  <sub>基于 ❤️ 使用 Vue.js 构建</sub>
</div>