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

logger.info('应用启动', '初始化Vue应用')

// 开发环境数据预加载
if (import.meta.env.DEV) {
  logger.info('开发环境检测', '准备预加载数据')
    
  // 异步加载和初始化数据
  const loadTasks = [
    { module: './stores/student.js', store: 'useStudentStore', method: 'loadStudents' },
    { module: './stores/teacher.js', store: 'useTeacherStore', method: 'loadTeachers' },
    { module: './stores/course.js', store: 'useCourseStore', method: 'loadCourses' },
    { module: './stores/financeData.js', store: 'useFinanceStore', method: 'loadFinanceRecords' },
    { module: './stores/notification.js', store: 'useNotificationStore', method: 'loadNotifications' }
  ]
  
  // 使用 Promise.all 并行加载所有数据
  Promise.all(
    loadTasks.map(async task => {
      try {
        const storeModule = await import(/* @vite-ignore */ task.module)
        const store = storeModule[task.store]()
        await store[task.method]()
        logger.info(`数据加载完成: ${task.store}`)
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
