/**
 * 时间处理工具函数
 * 最后更新时间: 2025-07-31 16:30:50
 */

export const DateUtils = {
  /**
   * 格式化日期为 YYYY-MM-DD 格式
   * @param {Date|string} date - 日期对象或字符串
   * @returns {string} 格式化后的日期字符串
   */
  formatDate(date) {
    if (!date) return ''
    
    try {
      const dateObj = typeof date === 'string' ? new Date(date) : date
      if (isNaN(dateObj.getTime())) return ''
      
      return dateObj.toISOString().slice(0, 10)
    } catch (error) {
      console.warn('Date formatting error:', error)
      return ''
    }
  },

  /**
   * 格式化日期时间为 ISO 格式
   * @param {Date|string} datetime - 日期时间对象或字符串
   * @returns {string} ISO格式的时间字符串
   */
  formatDateTime(datetime) {
    if (!datetime) return ''
    
    try {
      const dateObj = typeof datetime === 'string' ? new Date(datetime) : datetime
      if (isNaN(dateObj.getTime())) return ''
      
      return dateObj.toISOString()
    } catch (error) {
      console.warn('DateTime formatting error:', error)
      return ''
    }
  },

  /**
   * 格式化显示用的日期时间（中文格式）
   * @param {Date|string} datetime - 日期时间对象或字符串
   * @returns {string} 中文格式的时间字符串
   */
  formatDisplayDateTime(datetime) {
    if (!datetime) return ''
    
    try {
      const dateObj = typeof datetime === 'string' ? new Date(datetime) : datetime
      if (isNaN(dateObj.getTime())) return ''
      
      return dateObj.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    } catch (error) {
      console.warn('Display DateTime formatting error:', error)
      return ''
    }
  },

  /**
   * 格式化显示用的日期（中文格式）
   * @param {Date|string} date - 日期对象或字符串
   * @returns {string} 中文格式的日期字符串
   */
  formatDisplayDate(date) {
    if (!date) return ''
    
    try {
      const dateObj = typeof date === 'string' ? new Date(date) : date
      if (isNaN(dateObj.getTime())) return ''
      
      return dateObj.toLocaleDateString('zh-CN')
    } catch (error) {
      console.warn('Display Date formatting error:', error)
      return ''
    }
  },

  /**
   * 解析日期字符串为 Date 对象
   * @param {string} dateStr - 日期字符串
   * @returns {Date|null} Date对象或null
   */
  parseDate(dateStr) {
    if (!dateStr) return null
    
    try {
      const dateObj = new Date(dateStr)
      return isNaN(dateObj.getTime()) ? null : dateObj
    } catch (error) {
      console.warn('Date parsing error:', error)
      return null
    }
  },

  /**
   * 获取当前时间的ISO字符串
   * @returns {string} 当前时间的ISO字符串
   */
  getCurrentISOString() {
    return new Date().toISOString()
  },

  /**
   * 获取当前日期的YYYY-MM-DD字符串
   * @returns {string} 当前日期字符串
   */
  getCurrentDateString() {
    return this.formatDate(new Date())
  },

  /**
   * 计算年龄
   * @param {Date|string} birthday - 生日
   * @returns {number|null} 年龄或null
   */
  calculateAge(birthday) {
    if (!birthday) return null
    
    try {
      const birthDate = typeof birthday === 'string' ? new Date(birthday) : birthday
      if (isNaN(birthDate.getTime())) return null
      
      const today = new Date()
      let age = today.getFullYear() - birthDate.getFullYear()
      const monthDiff = today.getMonth() - birthDate.getMonth()
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }
      
      return age >= 0 ? age : null
    } catch (error) {
      console.warn('Age calculation error:', error)
      return null
    }
  },

  /**
   * 验证日期格式是否正确
   * @param {string} dateStr - 日期字符串
   * @param {string} format - 期望的格式 ('date' 或 'datetime')
   * @returns {boolean} 是否有效
   */
  isValidDateFormat(dateStr, format = 'date') {
    if (!dateStr) return false
    
    const datePattern = /^\d{4}-\d{2}-\d{2}$/
    const datetimePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/
    
    if (format === 'date') {
      return datePattern.test(dateStr) && !isNaN(new Date(dateStr).getTime())
    } else if (format === 'datetime') {
      return datetimePattern.test(dateStr) && !isNaN(new Date(dateStr).getTime())
    }
    
    return false
  },

  /**
   * 标准化日期时间格式（用于数据提交）
   * @param {Object} data - 包含日期字段的数据对象
   * @param {Array} dateFields - 日期字段数组
   * @param {Array} datetimeFields - 日期时间字段数组
   * @returns {Object} 标准化后的数据对象
   */
  standardizeDataDates(data, dateFields = [], datetimeFields = []) {
    const standardized = { ...data }
    
    // 处理日期字段
    dateFields.forEach(field => {
      if (standardized[field]) {
        standardized[field] = this.formatDate(standardized[field])
      }
    })
    
    // 处理日期时间字段
    datetimeFields.forEach(field => {
      if (standardized[field]) {
        standardized[field] = this.formatDateTime(standardized[field])
      }
    })
    
    return standardized
  },

  /**
   * 时间范围查询格式化
   * @param {string|Date} startDate - 开始日期
   * @param {string|Date} endDate - 结束日期
   * @returns {Object} 格式化后的时间范围对象
   */
  formatDateRange(startDate, endDate) {
    const range = {}
    
    if (startDate) {
      range.start_date = this.formatDate(startDate)
    }
    
    if (endDate) {
      range.end_date = this.formatDate(endDate)
    }
    
    return range
  },

  /**
   * 获取相对时间（如：2小时前，3天前）
   * @param {Date|string} date - 日期
   * @returns {string} 相对时间字符串
   */
  getRelativeTime(date) {
    if (!date) return ''
    
    try {
      const dateObj = typeof date === 'string' ? new Date(date) : date
      if (isNaN(dateObj.getTime())) return ''
      
      const now = new Date()
      const diffMs = now.getTime() - dateObj.getTime()
      const diffSeconds = Math.floor(diffMs / 1000)
      const diffMinutes = Math.floor(diffSeconds / 60)
      const diffHours = Math.floor(diffMinutes / 60)
      const diffDays = Math.floor(diffHours / 24)
      
      if (diffSeconds < 60) {
        return '刚刚'
      } else if (diffMinutes < 60) {
        return `${diffMinutes}分钟前`
      } else if (diffHours < 24) {
        return `${diffHours}小时前`
      } else if (diffDays < 30) {
        return `${diffDays}天前`
      } else {
        return this.formatDisplayDate(dateObj)
      }
    } catch (error) {
      console.warn('Relative time calculation error:', error)
      return ''
    }
  }
}

// 常用日期字段名数组（用于批量处理）
export const COMMON_DATE_FIELDS = [
  'join_date', 'birthday', 'start_date', 'end_date', 
  'due_date', 'transaction_date', 'publish_date'
]

export const COMMON_DATETIME_FIELDS = [
  'created_at', 'updated_at', 'deleted_at', 'last_login_at',
  'approved_at', 'published_at', 'expired_at'
]

export default DateUtils