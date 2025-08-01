# 贡献指南 🤝

感谢您对教务管理系统的关注！我们欢迎所有形式的贡献，无论是错误报告、功能建议、文档改进还是代码提交。

## 📋 目录

- [开发环境设置](#开发环境设置)
- [提交规范](#提交规范)
- [分支策略](#分支策略)
- [代码规范](#代码规范)
- [测试指南](#测试指南)
- [文档贡献](#文档贡献)
- [Issue 指南](#issue-指南)
- [Pull Request 指南](#pull-request-指南)

## 🛠️ 开发环境设置

### 环境要求
- Node.js 16.0+
- npm 7.0+ 或 yarn 1.22+
- Git 2.0+

### 设置步骤

1. **Fork 并克隆项目**
   ```bash
   git clone https://github.com/YOUR_USERNAME/Class-Management-System.git
   cd Class-Management-System
   ```

2. **添加上游仓库**
   ```bash
   git remote add upstream https://github.com/DLshujin/Class-Management-System.git
   ```

3. **安装依赖**
   ```bash
   npm install
   ```

4. **启动开发服务器**
   ```bash
   npm run dev
   ```

5. **运行测试**
   ```bash
   npm run test
   ```

## 📝 提交规范

我们使用[约定式提交](https://www.conventionalcommits.org/zh-hans/)规范：

### 提交格式
```
<类型>[可选的作用域]: <描述>

[可选的正文]

[可选的脚注]
```

### 类型说明
- `feat`: 新功能
- `fix`: 错误修复
- `docs`: 文档修改
- `style`: 代码格式修改（不影响代码运行）
- `refactor`: 代码重构
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动
- `ci`: CI/CD 相关修改

### 示例
```bash
feat(teacher): 添加教师批量导入功能

- 支持Excel文件导入
- 添加数据验证
- 提供导入进度显示

Closes #123
```

## 🌿 分支策略

- `main`: 主分支，包含最新的稳定代码
- `develop`: 开发分支，包含最新的开发代码
- `feature/*`: 功能分支，用于开发新功能
- `fix/*`: 修复分支，用于修复bug
- `docs/*`: 文档分支，用于文档更新

### 分支命名规范
```bash
feature/teacher-batch-import
fix/student-search-bug
docs/api-documentation
```

## 📐 代码规范

### JavaScript/Vue 规范
- 使用 ES6+ 语法
- 使用 2 空格缩进
- 使用单引号
- 行尾不加分号（除非必要）
- 遵循 ESLint 配置

### Vue 组件规范
```vue
<template>
  <div class="component-name">
    <!-- 内容 -->
  </div>
</template>

<script>
export default {
  name: 'ComponentName',
  // 组件选项按顺序排列
  props: {},
  emits: [],
  setup() {
    // Composition API
  }
}
</script>

<style scoped>
.component-name {
  /* 样式 */
}
</style>
```

### 命名规范
- **组件名**: PascalCase (`TeacherList.vue`)
- **文件名**: kebab-case (`teacher-list.js`)
- **变量名**: camelCase (`teacherList`)
- **常量名**: UPPER_SNAKE_CASE (`API_BASE_URL`)

## 🧪 测试指南

### 运行测试
```bash
# 运行所有测试
npm run test

# 运行特定测试
npm run test:auth

# 监听模式
npm run test:watch
```

### 测试规范
- 为新功能编写单元测试
- 测试覆盖率保持在 80% 以上
- 使用描述性的测试名称
- 遵循 AAA 模式（Arrange, Act, Assert）

### 测试示例
```javascript
describe('TeacherService', () => {
  it('should create a new teacher successfully', async () => {
    // Arrange
    const teacherData = { name: '张老师', subject: '数学' }
    
    // Act
    const result = await TeacherService.create(teacherData)
    
    // Assert
    expect(result.success).toBe(true)
    expect(result.data.name).toBe('张老师')
  })
})
```

## 📚 文档贡献

### 文档类型
- **README.md**: 项目概述和快速开始
- **API文档**: 接口说明和示例
- **用户指南**: 功能使用说明
- **开发文档**: 开发相关说明

### 文档规范
- 使用 Markdown 格式
- 提供清晰的示例
- 包含必要的截图
- 保持语言简洁明了

## 🐛 Issue 指南

### 创建 Issue 前
1. 搜索现有的 Issues
2. 阅读相关文档
3. 尝试重现问题

### Bug 报告应包含
- 清晰的问题描述
- 重现步骤
- 期望行为
- 实际行为
- 环境信息
- 相关截图

### 功能请求应包含
- 功能描述
- 使用场景
- 实现建议
- 替代方案

## 🔄 Pull Request 指南

### 提交 PR 前
1. 确保代码符合规范
2. 运行所有测试
3. 更新相关文档
4. 同步最新的主分支

### PR 流程
1. **创建功能分支**
   ```bash
   git checkout -b feature/new-feature
   ```

2. **开发和测试**
   ```bash
   # 开发代码
   git add .
   git commit -m "feat: 添加新功能"
   ```

3. **推送分支**
   ```bash
   git push origin feature/new-feature
   ```

4. **创建 Pull Request**
   - 填写 PR 模板
   - 关联相关 Issue
   - 请求代码审查

### 代码审查
- 所有 PR 需要至少一个审查员批准
- 解决所有审查意见
- 确保 CI/CD 检查通过

## 🚀 发布流程

### 版本号规范
遵循[语义化版本](https://semver.org/lang/zh-CN/)：
- `MAJOR.MINOR.PATCH`
- 主版本号：不兼容的API修改
- 次版本号：向下兼容的功能性新增
- 修订号：向下兼容的问题修正

### 发布检查清单
- [ ] 所有测试通过
- [ ] 文档已更新
- [ ] CHANGELOG.md 已更新
- [ ] 版本号已更新
- [ ] 创建发布标签

## 🎉 成为贡献者

### 贡献认可
- 活跃贡献者将被添加到贡献者列表
- 持续贡献者可获得项目权限
- 优秀贡献将在版本发布中特别提及

### 联系方式
- **项目维护者**: shujin (adilei.shujin@gmail.com)
- **最后更新**: 2025-08-01
- **讨论群组**: [创建 Discussion](https://github.com/DLshujin/Class-Management-System/discussions)

---

再次感谢您的贡献！您的每一个贡献都让这个项目变得更好。🙏