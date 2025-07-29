/**
 * 统一错误处理系统
 * 提供友好的错误提示和完善的错误处理逻辑
 */

import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'
import { logger } from './logger.js'

// 错误类型定义
export const ERROR_TYPES = {
  NETWORK: 'NETWORK_ERROR',
  AUTH: 'AUTH_ERROR', 
  VALIDATION: 'VALIDATION_ERROR',
  PERMISSION: 'PERMISSION_ERROR',
  SERVER: 'SERVER_ERROR',
  UNKNOWN: 'UNKNOWN_ERROR'
}

// 错误代码映射
const ERROR_CODE_MAP = {
  400: { type: ERROR_TYPES.VALIDATION, message: '请求参数错误' },
  401: { type: ERROR_TYPES.AUTH, message: '用户未认证，请重新登录' },
  403: { type: ERROR_TYPES.PERMISSION, message: '权限不足，无法执行此操作' },
  404: { type: ERROR_TYPES.SERVER, message: '请求的资源不存在' },
  422: { type: ERROR_TYPES.VALIDATION, message: '数据验证失败' },
  429: { type: ERROR_TYPES.SERVER, message: '请求过于频繁，请稍后再试' },
  500: { type: ERROR_TYPES.SERVER, message: '服务器内部错误' },
  502: { type: ERROR_TYPES.NETWORK, message: '网关错误' },
  503: { type: ERROR_TYPES.SERVER, message: '服务暂时不可用' },
  504: { type: ERROR_TYPES.NETWORK, message: '请求超时' }
}

/**
 * 解析错误信息
 */
const parseError = (error) => {
  // 网络错误
  if (!error.response) {
    return {
      type: ERROR_TYPES.NETWORK,
      message: '网络连接失败，请检查网络设置',
      code: 'NETWORK_ERROR',
      details: error.message
    }
  }

  const { status, data } = error.response
  const errorConfig = ERROR_CODE_MAP[status]

  if (errorConfig) {
    return {
      type: errorConfig.type,
      message: data?.message || errorConfig.message,
      code: status,
      details: data?.details || error.message
    }
  }

  return {
    type: ERROR_TYPES.UNKNOWN,
    message: data?.message || '未知错误',
    code: status || 'UNKNOWN',
    details: error.message
  }
}

/**
 * 显示错误提示
 */
const showErrorMessage = (errorInfo, options = {}) => {
  const { 
    showType = 'message', // message | notification | confirm
    duration = 4000,
    showDetails = false
  } = options

  const message = showDetails && errorInfo.details 
    ? `${errorInfo.message}\n详细信息：${errorInfo.details}`
    : errorInfo.message

  switch (showType) {
    case 'notification':
      ElNotification({
        title: '操作失败',
        message,
        type: 'error',
        duration,
        position: 'top-right'
      })
      break
    
    case 'confirm':
      ElMessageBox.alert(message, '错误提示', {
        confirmButtonText: '确定',
        type: 'error'
      })
      break
    
    default:
      ElMessage({
        message,
        type: 'error',
        duration,
        showClose: true
      })
  }
}

/**
 * 统一错误处理器
 */
export const errorHandler = {
  /**
   * API错误处理
   */
  handleApiError: (error, options = {}) => {
    const {
      module = '',
      operation = '操作',
      showMessage = true,
      showType = 'message',
      onError = null
    } = options

    const errorInfo = parseError(error)
    
    // 记录错误日志
    logger.error(`${operation}失败`, error, module, {
      type: errorInfo.type,
      code: errorInfo.code
    })

    // 显示用户提示
    if (showMessage) {
      showErrorMessage(errorInfo, { showType })
    }

    // 执行自定义错误处理
    if (onError && typeof onError === 'function') {
      onError(errorInfo, error)
    }

    // 特殊错误处理
    if (errorInfo.type === ERROR_TYPES.AUTH) {
      // 认证失败，跳转到登录页
      setTimeout(() => {
        window.location.href = '/login'
      }, 1500)
    }

    return errorInfo
  },

  /**
   * 表单验证错误处理
   */
  handleValidationError: (errors, formRef = null) => {
    if (formRef && formRef.value) {
      // 聚焦到第一个错误字段
      formRef.value.validate((valid, fields) => {
        if (!valid) {
          const firstField = Object.keys(fields)[0]
          const firstInput = formRef.value.$el.querySelector(`[prop="${firstField}"] input`)
          if (firstInput) {
            firstInput.focus()
          }
        }
      })
    }

    const errorMessages = Array.isArray(errors) 
      ? errors.join('；') 
      : (typeof errors === 'string' ? errors : '表单验证失败')

    ElMessage({
      message: errorMessages,
      type: 'warning',
      duration: 3000
    })

    logger.warn('表单验证失败', 'FORM', errors)
  },

  /**
   * 业务错误处理
   */
  handleBusinessError: (message, details = null, options = {}) => {
    const {
      type = 'warning',
      module = '',
      showType = 'message'
    } = options

    logger.warn(`业务错误: ${message}`, module, details)

    if (showType === 'notification') {
      ElNotification({
        title: '操作提示',
        message,
        type,
        duration: 4000
      })
    } else {
      ElMessage({
        message,
        type,
        duration: 3000
      })
    }
  },

  /**
   * 成功提示
   */
  showSuccess: (message, options = {}) => {
    const { 
      type = 'message',
      duration = 2000,
      module = ''
    } = options

    logger.info(message, module)

    if (type === 'notification') {
      ElNotification({
        title: '操作成功',
        message,
        type: 'success',
        duration
      })
    } else {
      ElMessage({
        message,
        type: 'success',
        duration
      })
    }
  },

  /**
   * 确认对话框
   */
  confirm: async (message, title = '确认操作', options = {}) => {
    const {
      confirmButtonText = '确定',
      cancelButtonText = '取消',
      type = 'warning'
    } = options

    try {
      await ElMessageBox.confirm(message, title, {
        confirmButtonText,
        cancelButtonText,
        type
      })
      return true
    } catch {
      return false
    }
  }
}

/**
 * 创建带错误处理的异步函数包装器
 */
export const withErrorHandling = (asyncFn, options = {}) => {
  return async (...args) => {
    try {
      const result = await asyncFn(...args)
      return { success: true, data: result, error: null }
    } catch (error) {
      const errorInfo = errorHandler.handleApiError(error, options)
      return { success: false, data: null, error: errorInfo }
    }
  }
}

export default errorHandler 