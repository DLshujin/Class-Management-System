/**
 * 统一日志管理系统
 * 根据环境变量控制日志输出，生产环境只输出错误信息
 */

// 日志级别
const LOG_LEVELS = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3
}

// 当前环境的日志级别
const isProduction = () => {
  try {
    return import.meta.env.PROD === true
  } catch {
    return process.env.NODE_ENV === 'production'
  }
}
const CURRENT_LOG_LEVEL = isProduction() ? LOG_LEVELS.ERROR : LOG_LEVELS.DEBUG

// 日志样式
const LOG_STYLES = {
  DEBUG: 'color: #909399; font-weight: normal;',
  INFO: 'color: #409EFF; font-weight: bold;',
  WARN: 'color: #E6A23C; font-weight: bold;',
  ERROR: 'color: #F56C6C; font-weight: bold;'
}

/**
 * 格式化日志前缀
 */
const formatPrefix = (level, module = '') => {
  const timestamp = new Date().toLocaleTimeString()
  const moduleStr = module ? `[${module}]` : ''
  return `[${timestamp}]${moduleStr}[${level}]`
}

/**
 * 上报错误到监控系统（占位，可接入真实监控）
 */
const reportError = (error, context = {}) => {
  if (isProduction()) {
    // 这里可以接入实际的错误监控服务，如 Sentry
    // Sentry.captureException(error, { extra: context })
    console.error('[ERROR_REPORT]', error, context)
  }
}

// 错误过滤函数
const shouldIgnoreError = (message) => {
  if (typeof message !== 'string') {
    message = String(message);
  }
  
  const ignoredPatterns = [
    'AttaTransport',
    'message port closed',
    'Extension context invalidated',
    'chrome-extension://',
    'addReadyCallback',
    'inject success',
    'DevTools is now available',
    'A request to'
  ];
  
  return ignoredPatterns.some(pattern => message.includes(pattern));
};

/**
 * 统一日志管理器
 */
export const logger = {
  /**
   * 调试信息
   */
  debug: (message, ...args) => {
    if (CURRENT_LOG_LEVEL <= LOG_LEVELS.DEBUG) {
      console.log(`%c${formatPrefix('DEBUG')} ${message}`, LOG_STYLES.DEBUG, ...args)
    }
  },

  /**
   * 一般信息
   */
  info: (message, module = '', ...args) => {
    if (CURRENT_LOG_LEVEL <= LOG_LEVELS.INFO) {
      console.log(`%c${formatPrefix('INFO', module)} ${message}`, LOG_STYLES.INFO, ...args)
    }
  },

  /**
   * 警告信息
   */
  warn: (message, module = '', ...args) => {
    if (CURRENT_LOG_LEVEL <= LOG_LEVELS.WARN) {
      // 过滤扩展相关的警告
      if (shouldIgnoreError(message)) {
        return;
      }
      console.warn(`%c${formatPrefix('WARN', module)} ${message}`, LOG_STYLES.WARN, ...args)
    }
  },

  /**
   * 错误信息
   */
  error: (message, error = null, module = '', context = {}) => {
    // 过滤扩展相关的错误
    if (shouldIgnoreError(message)) {
      return;
    }
    
    const errorMsg = `${formatPrefix('ERROR', module)} ${message}`
    console.error(`%c${errorMsg}`, LOG_STYLES.ERROR, error)
    
    // 在生产环境上报错误
    if (error && isProduction()) {
      reportError(error, { message, module, ...context })
    }
  },

  /**
   * API请求日志
   */
  api: {
    request: (url, method, data = null) => {
      logger.debug(`API请求: ${method.toUpperCase()} ${url}`, data)
    },
    
    response: (url, method, data, duration) => {
      logger.debug(`API响应: ${method.toUpperCase()} ${url} (${duration}ms)`, data)
    },
    
    error: (url, method, error) => {
      logger.error(`API错误: ${method.toUpperCase()} ${url}`, error, 'API')
    }
  },

  /**
   * 数据操作日志
   */
  data: {
    load: (module, count, source = 'unknown') => {
      logger.info(`数据加载完成，数量: ${count}，来源: ${source}`, module)
    },
    
    operation: (operation, module, result = true) => {
      const status = result ? '成功' : '失败'
      logger.info(`${operation}${status}`, module)
    }
  },

  /**
   * 用户操作日志
   */
  user: {
    action: (action, details = '') => {
      logger.info(`用户操作: ${action} ${details}`, 'USER')
    },
    
    error: (action, error) => {
      logger.error(`用户操作失败: ${action}`, error, 'USER')
    }
  }
}

export default logger 