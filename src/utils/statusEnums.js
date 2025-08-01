/**
 * 状态枚举配置
 * 最后更新时间: 2025-07-31 16:30:50
 */

// 学生状态枚举
export const STUDENT_STATUS = {
  ACTIVE: {
    value: 'active',
    label: '在读',
    type: 'success',
    color: '#67C23A'
  },
  GRADUATED: {
    value: 'graduated', 
    label: '结业',
    type: 'info',
    color: '#909399'
  },
  SUSPENDED: {
    value: 'suspended',
    label: '停用', 
    type: 'warning',
    color: '#E6A23C'
  },
  WITHDRAWN: {
    value: 'withdrawn',
    label: '退学',
    type: 'danger', 
    color: '#F56C6C'
  }
}

// 老师状态枚举
export const TEACHER_STATUS = {
  ACTIVE: {
    value: 'active',
    label: '在职',
    type: 'success',
    color: '#67C23A'
  },
  INACTIVE: {
    value: 'inactive',
    label: '离职',
    type: 'info', 
    color: '#909399'
  },
  RESIGNED: {
    value: 'resigned',
    label: '辞职',
    type: 'warning',
    color: '#E6A23C'
  }
}

// 班级状态枚举
export const CLASS_STATUS = {
  PLANNING: {
    value: 'planning',
    label: '筹备中',
    type: 'info',
    color: '#409EFF'
  },
  ACTIVE: {
    value: 'active', 
    label: '进行中',
    type: 'success',
    color: '#67C23A'
  },
  COMPLETED: {
    value: 'completed',
    label: '已结业',
    type: 'primary',
    color: '#409EFF'
  },
  CANCELLED: {
    value: 'cancelled',
    label: '已取消',
    type: 'danger',
    color: '#F56C6C'
  }
}

// 课程状态枚举
export const COURSE_STATUS = {
  ACTIVE: {
    value: 'active',
    label: '启用',
    type: 'success',
    color: '#67C23A'
  },
  INACTIVE: {
    value: 'inactive',
    label: '停用',
    type: 'info',
    color: '#909399'
  },
  DRAFT: {
    value: 'draft',
    label: '草稿',
    type: 'warning',
    color: '#E6A23C'
  }
}

// 排课状态枚举
export const SCHEDULE_STATUS = {
  SCHEDULED: {
    value: 'scheduled',
    label: '已安排',
    type: 'primary',
    color: '#409EFF'
  },
  IN_PROGRESS: {
    value: 'in_progress',
    label: '进行中',
    type: 'success', 
    color: '#67C23A'
  },
  COMPLETED: {
    value: 'completed',
    label: '已完成',
    type: 'info',
    color: '#909399'
  },
  CANCELLED: {
    value: 'cancelled',
    label: '已取消',
    type: 'danger',
    color: '#F56C6C'
  }
}

// 财务记录状态枚举
export const FINANCE_STATUS = {
  PENDING: {
    value: 'pending',
    label: '待审批',
    type: 'warning',
    color: '#E6A23C'
  },
  APPROVED: {
    value: 'approved',
    label: '已通过',
    type: 'success',
    color: '#67C23A'
  },
  REJECTED: {
    value: 'rejected',
    label: '已拒绝',
    type: 'danger',
    color: '#F56C6C'
  },
  CANCELLED: {
    value: 'cancelled',
    label: '已取消',
    type: 'info',
    color: '#909399'
  }
}

// 通知优先级枚举
export const NOTIFICATION_PRIORITY = {
  LOW: {
    value: 'low',
    label: '低优先级',
    type: 'info',
    color: '#909399'
  },
  MEDIUM: {
    value: 'medium',
    label: '中优先级',
    type: 'primary',
    color: '#409EFF'
  },
  HIGH: {
    value: 'high',
    label: '高优先级',
    type: 'warning',
    color: '#E6A23C'
  },
  URGENT: {
    value: 'urgent',
    label: '紧急',
    type: 'danger',
    color: '#F56C6C'
  }
}

// 状态工具函数
export const StatusUtils = {
  /**
   * 根据模块和状态值获取状态配置
   */
  getStatusConfig(module, status) {
    const statusMaps = {
      student: STUDENT_STATUS,
      teacher: TEACHER_STATUS,
      class: CLASS_STATUS,
      course: COURSE_STATUS,
      schedule: SCHEDULE_STATUS,
      finance: FINANCE_STATUS,
      notification: NOTIFICATION_PRIORITY
    }
    
    const statusMap = statusMaps[module]
    if (!statusMap) return null
    
    // 查找匹配的状态
    for (const statusConfig of Object.values(statusMap)) {
      if (statusConfig.value === status) {
        return statusConfig
      }
    }
    
    return null
  },

  /**
   * 获取状态选项列表（用于下拉框）
   */
  getStatusOptions(module) {
    const statusMaps = {
      student: STUDENT_STATUS,
      teacher: TEACHER_STATUS,
      class: CLASS_STATUS,
      course: COURSE_STATUS,
      schedule: SCHEDULE_STATUS,
      finance: FINANCE_STATUS,
      notification: NOTIFICATION_PRIORITY
    }
    
    const statusMap = statusMaps[module]
    if (!statusMap) return []
    
    return Object.values(statusMap).map(config => ({
      value: config.value,
      label: config.label,
      type: config.type
    }))
  },

  /**
   * 验证状态值是否有效
   */
  isValidStatus(module, status) {
    return this.getStatusConfig(module, status) !== null
  },

  /**
   * 状态转换映射（兼容旧格式）
   */
  convertLegacyStatus(module, legacyStatus) {
    const conversionMaps = {
      student: {
        1: 'active',
        0: 'suspended',
        '在读': 'active',
        '结业': 'graduated',
        '停用': 'suspended',
        '退学': 'withdrawn'
      },
      teacher: {
        1: 'active',
        0: 'inactive',
        '在职': 'active',
        '离职': 'inactive',
        '辞职': 'resigned'
      },
      class: {
        '在读': 'active',
        '结业': 'completed',
        '停用': 'cancelled'
      }
    }
    
    const conversionMap = conversionMaps[module]
    if (!conversionMap) return legacyStatus
    
    return conversionMap[legacyStatus] || legacyStatus
  }
}

// 导出所有状态枚举
export const STATUS_ENUMS = {
  STUDENT: STUDENT_STATUS,
  TEACHER: TEACHER_STATUS,
  CLASS: CLASS_STATUS,
  COURSE: COURSE_STATUS,
  SCHEDULE: SCHEDULE_STATUS,
  FINANCE: FINANCE_STATUS,
  NOTIFICATION: NOTIFICATION_PRIORITY
}

export default StatusUtils