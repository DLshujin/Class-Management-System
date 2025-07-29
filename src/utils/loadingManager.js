/**
 * 统一加载状态管理系统
 * 提供全局加载状态控制和友好的加载提示
 */

import { ref, computed } from 'vue'
import { ElLoading } from 'element-plus'
import { logger } from './logger.js'

// 全局加载状态
const globalLoading = ref(false)
const loadingTasks = ref(new Map())
const loadingInstance = ref(null)

/**
 * 加载管理器
 */
export const loadingManager = {
  /**
   * 开始加载
   */
  start: (taskId = 'global', options = {}) => {
    const {
      text = '加载中...',
      target = null,
      background = 'rgba(0, 0, 0, 0.7)',
      customClass = ''
    } = options

    logger.debug(`开始加载任务: ${taskId}`)

    // 记录加载任务
    loadingTasks.value.set(taskId, {
      startTime: Date.now(),
      text,
      target
    })

    // 如果是全局加载且没有其他加载实例
    if (taskId === 'global' && !loadingInstance.value) {
      loadingInstance.value = ElLoading.service({
        text,
        background,
        customClass
      })
    }

    // 更新全局加载状态
    if (loadingTasks.value.size > 0) {
      globalLoading.value = true
    }

    return taskId
  },

  /**
   * 结束加载
   */
  finish: (taskId = 'global') => {
    const task = loadingTasks.value.get(taskId)
    
    if (task) {
      const duration = Date.now() - task.startTime
      logger.debug(`加载任务完成: ${taskId} (${duration}ms)`)
      
      loadingTasks.value.delete(taskId)
    }

    // 如果是全局加载
    if (taskId === 'global' && loadingInstance.value) {
      loadingInstance.value.close()
      loadingInstance.value = null
    }

    // 更新全局加载状态
    if (loadingTasks.value.size === 0) {
      globalLoading.value = false
    }
  },

  /**
   * 创建带加载状态的异步函数包装器
   */
  withLoading: (asyncFn, options = {}) => {
    return async (...args) => {
      const {
        taskId = `task_${Date.now()}`,
        showGlobal = false,
        ...loadingOptions
      } = options

      const actualTaskId = showGlobal ? 'global' : taskId

      try {
        loadingManager.start(actualTaskId, loadingOptions)
        const result = await asyncFn(...args)
        return result
      } finally {
        loadingManager.finish(actualTaskId)
      }
    }
  },

  /**
   * 批量处理加载状态
   */
  batch: async (tasks = [], options = {}) => {
    const {
      concurrent = false,
      batchId = `batch_${Date.now()}`,
      text = '批量处理中...'
    } = options

    loadingManager.start(batchId, { text })

    try {
      let results
      if (concurrent) {
        // 并发执行
        results = await Promise.all(tasks.map(task => 
          typeof task === 'function' ? task() : task
        ))
      } else {
        // 顺序执行
        results = []
        for (const task of tasks) {
          const result = await (typeof task === 'function' ? task() : task)
          results.push(result)
        }
      }
      
      return results
    } finally {
      loadingManager.finish(batchId)
    }
  },

  /**
   * 获取当前加载状态
   */
  isLoading: computed(() => globalLoading.value),
  
  /**
   * 获取当前加载任务数
   */
  getTaskCount: computed(() => loadingTasks.value.size),

  /**
   * 获取所有加载任务
   */
  getTasks: computed(() => Array.from(loadingTasks.value.entries())),

  /**
   * 清除所有加载状态
   */
  clearAll: () => {
    logger.debug('清除所有加载状态')
    
    // 关闭全局加载
    if (loadingInstance.value) {
      loadingInstance.value.close()
      loadingInstance.value = null
    }

    // 清除所有任务
    loadingTasks.value.clear()
    globalLoading.value = false
  }
}

/**
 * 页面加载管理
 */
export const pageLoadingManager = {
  /**
   * 页面初始化加载
   */
  initPage: async (initFunctions = [], pageName = '') => {
    const taskId = `page_init_${pageName || Date.now()}`
    
    try {
      loadingManager.start(taskId, { 
        text: `正在初始化${pageName}页面...` 
      })

      logger.info(`开始初始化页面: ${pageName}`, 'PAGE')

      const results = await loadingManager.batch(initFunctions, {
        concurrent: true,
        batchId: `${taskId}_batch`
      })

      logger.info(`页面初始化完成: ${pageName}`, 'PAGE')
      return results

    } catch (error) {
      logger.error(`页面初始化失败: ${pageName}`, error, 'PAGE')
      throw error
    } finally {
      loadingManager.finish(taskId)
    }
  }
}

export default loadingManager 