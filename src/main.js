// =============================================
// 文件：main.js
// 说明：前端入口文件，初始化Vue应用、路由、状态管理等
// 主要依赖：Vue 3, Element Plus, Pinia, Vue Router
// 作者：
// 日期：2024-xx-xx
// =============================================
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import App from './App.vue'
import router from './router.js'

// 引入全局样式
import './styles/global.css'
import './styles/fixes.css'
import './styles/attendance.css'

// 引入日志系统
import { logger } from './utils/logger.js'

const app = createApp(App)
const pinia = createPinia()

// 注册 Element Plus Icons
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(pinia)
app.use(ElementPlus)
app.use(router)

// 初始化主题
import { useThemeStore } from './stores/theme.js'
const themeStore = useThemeStore()
themeStore.initTheme()

logger.info('应用启动', '初始化Vue应用和主题')

// 开发环境数据预加载 - 暂时禁用，因为后端还未完成
if (import.meta.env.DEV && false) {
  logger.info('开发环境检测', '准备预加载数据')
    
  // 异步加载和初始化数据 - 暂时注释掉，等后端完成后再启用
  const loadTasks = [
    { module: './stores/student.js', store: 'useStudentStore', method: 'fetchStudents' },
    { module: './stores/teacher.js', store: 'useTeacherStore', method: 'fetchTeachers' },
    { module: './stores/course.js', store: 'useCourseStore', method: 'fetchCourses' },
    { module: './stores/financeData.js', store: 'useFinanceStore', method: 'fetchFinanceRecords' },
    { module: './stores/notification.js', store: 'useNotificationStore', method: 'fetchNotifications' }
  ]
  
  // 使用 Promise.all 并行加载所有数据
  Promise.all(
    loadTasks.map(async task => {
      try {
        const storeModule = await import(/* @vite-ignore */ task.module)
        const store = storeModule[task.store]()
        if (typeof store[task.method] === 'function') {
          await store[task.method]()
          logger.info(`数据加载完成: ${task.store}`)
        } else {
          logger.warn(`方法不存在: ${task.store}.${task.method}`)
        }
      } catch (error) {
        logger.error(`数据加载失败: ${task.store}`, error)
      }
    })
  ).then(() => {
    logger.info('所有数据预加载完成')
  }).catch(error => {
    logger.error('数据预加载过程中出现错误', error)
  })
}

app.mount('#app')
