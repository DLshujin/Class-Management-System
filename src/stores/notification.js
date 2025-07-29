import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '../utils/api.js'

export const useNotificationStore = defineStore('notification', () => {
  // 状态 - 初始化时就使用模拟数据
  const notifications = ref([
    {
      id: 1,
      title: '系统更新通知',
      content: '系统将于今晚22:00进行维护更新，预计持续2小时，期间可能影响正常使用',
      time: '2024-03-15 10:30',
      read: false,
      type: 'system'
    },
    {
      id: 2,
      title: '新学员注册',
      content: '学员张三已完成注册，请及时安排课程并联系家长确认上课时间',
      time: '2024-03-15 09:15',
      read: false,
      type: 'student'
    },
    {
      id: 3,
      title: '课程提醒',
      content: '您有一节Python基础课程将在30分钟后开始，请提前准备教学材料',
      time: '2024-03-15 08:45',
      read: true,
      type: 'course'
    },
    {
      id: 4,
      title: '财务通知',
      content: '本月财务报表已生成，请及时查看收支明细和学费收缴情况',
      time: '2024-03-14 18:00',
      read: true,
      type: 'finance'
    },
    {
      id: 5,
      title: '作业提醒',
      content: 'Java程序设计课程的作业截止日期为明天18:00，请督促学员按时提交',
      time: '2024-03-14 16:30',
      read: false,
      type: 'course'
    },
    {
      id: 6,
      title: '成绩更新',
      content: '学员李四的Python基础测验成绩已录入，得分：85分，表现良好',
      time: '2024-03-14 14:15',
      read: true,
      type: 'student'
    },
    {
      id: 7,
      title: '教学资源更新',
      content: '人工智能入门课程新增了5个实战项目案例，请查看课程资料库',
      time: '2024-03-14 11:20',
      read: false,
      type: 'system'
    },
    {
      id: 8,
      title: '活动邀请',
      content: '编程大赛报名开始！欢迎推荐优秀学员参加，奖品丰厚',
      time: '2024-03-13 20:45',
      read: true,
      type: 'activity'
    },
    {
      id: 9,
      title: '课程调整通知',
      content: '由于教室维修，网页设计基础课程临时调整至B教室进行',
      time: '2024-03-13 17:30',
      read: false,
      type: 'course'
    }
  ])
  const notices = ref([
    {
      id: 1,
      title: '系统维护通知',
      content: '为了提供更好的服务体验，系统将于2024年3月20日22:00-24:00进行维护升级，期间可能会影响部分功能的正常使用，请您提前做好相关准备。维护期间如有紧急情况，请联系管理员。感谢您的理解与支持！',
      createTime: '2024-03-15 14:30:00',
      author: '系统管理员',
      priority: 'high',
      status: 'published'
    },
    {
      id: 2,
      title: '新功能上线公告',
      content: '亲爱的用户，我们很高兴地宣布，消息中心功能已经全面升级！新版本包含了更直观的界面设计、更便捷的消息管理功能以及更好的用户体验。请大家及时体验新功能，如有任何问题或建议，欢迎随时反馈。',
      createTime: '2024-03-14 16:45:00',
      author: '产品团队',
      priority: 'normal',
      status: 'published'
    },
    {
      id: 3,
      title: '编程大赛报名通知',
      content: '2024年春季青少年编程大赛现已开始报名！比赛分为初级组（Scratch）、中级组（Python）、高级组（Java/AI）三个组别。获奖学员将获得丰厚奖品和证书，还有机会参加全国总决赛。报名截止日期：3月25日。',
      createTime: '2024-03-10 13:45:00',
      author: '活动组委会',
      priority: 'high',
      status: 'published'
    }
  ])
  const unreadCount = computed(() => notifications.value.filter(n => !n.read).length)
  const loading = ref(false)

  // Getters
  const getNotifications = computed(() => notifications.value)
  const getUnreadCount = computed(() => unreadCount.value)
  const isLoading = computed(() => loading.value)

  // Actions
  // 获取通知列表
  const fetchNotifications = async () => {
    loading.value = true
    try {
      // 直接使用本地模拟数据，不调用API
      console.log('使用本地模拟数据')
      loading.value = false
      return notifications.value
    } catch (error) {
      console.error('获取通知失败:', error)
      loading.value = false
      return notifications.value
    }
  }

  // 标记通知为已读
  const markAsRead = async (notificationId) => {
    try {
      // 直接本地更新，不调用API
      const notification = notifications.value.find(n => n.id === notificationId)
      if (notification && !notification.read) {
        notification.read = true
      }
      return true
    } catch (error) {
      console.error('标记通知已读失败:', error)
      return false
    }
  }

  // 标记所有通知为已读
  const markAllAsRead = async () => {
    try {
      // 直接本地更新，不调用API
      notifications.value.forEach(n => n.read = true)
      return true
    } catch (error) {
      console.error('标记所有通知已读失败:', error)
      return false
    }
  }

  // 删除通知
  const deleteNotification = async (notificationId) => {
    try {
      // 直接本地删除，不调用API
      const index = notifications.value.findIndex(n => n.id === notificationId)
      if (index > -1) {
        notifications.value.splice(index, 1)
      }
      return true
    } catch (error) {
      console.error('删除通知失败:', error)
      return false
    }
  }

  // 添加新通知
  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      title: notification.title,
      content: notification.content,
      time: new Date().toLocaleString('zh-CN'),
      read: false,
      type: notification.type || 'system'
    }
    notifications.value.unshift(newNotification)
    unreadCount.value++
  }

  // 清空所有通知
  const clearAllNotifications = async () => {
    try {
      await api.delete('/notifications/all')
      notifications.value = []
      unreadCount.value = 0
      return true
    } catch (error) {
      console.error('清空通知失败:', error)
      notifications.value = []
      unreadCount.value = 0
      return false
    }
  }

  // 获取通知统计
  const getNotificationStats = () => {
    const total = notifications.value.length
    const unread = unreadCount.value
    const read = total - unread
    
    const typeStats = {
      system: notifications.value.filter(n => n.type === 'system').length,
      student: notifications.value.filter(n => n.type === 'student').length,
      course: notifications.value.filter(n => n.type === 'course').length,
      finance: notifications.value.filter(n => n.type === 'finance').length
    }

    return {
      total,
      unread,
      read,
      typeStats
    }
  }

  // 更新通知
  const updateNotification = async (id, data) => {
    try {
      await api.put(`/notifications/${id}`, data)
      const idx = notifications.value.findIndex(n => n.id === id)
      if (idx > -1) {
        notifications.value[idx] = { ...notifications.value[idx], ...data }
      }
      return true
    } catch (error) {
      // mock模式下本地更新
      const idx = notifications.value.findIndex(n => n.id === id)
      if (idx > -1) {
        notifications.value[idx] = { ...notifications.value[idx], ...data }
      }
      return false
    }
  }

  // 获取系统公告列表
  const fetchNotices = async () => {
    loading.value = true
    try {
      // 直接使用本地模拟数据，不调用API
      console.log('使用本地模拟公告数据')
      loading.value = false
      return notices.value
    } catch (error) {
      console.error('获取系统公告失败:', error)
      loading.value = false
      return notices.value
    }
  }

  // 删除系统公告
  const deleteNotice = async (noticeId) => {
    try {
      await api.delete(`/notices/${noticeId}`)
      const index = notices.value.findIndex(n => n.id === noticeId)
      if (index > -1) {
        notices.value.splice(index, 1)
      }
      return true
    } catch (error) {
      console.error('删除公告失败:', error)
      // mock模式下本地删除
      const index = notices.value.findIndex(n => n.id === noticeId)
      if (index > -1) {
        notices.value.splice(index, 1)
      }
      return true
    }
  }

  // 添加系统公告
  const addNotice = (notice) => {
    const newNotice = {
      id: Date.now(),
      title: notice.title,
      content: notice.content,
      createTime: new Date().toLocaleString('zh-CN'),
      author: notice.author || '系统管理员',
      priority: notice.priority || 'normal',
      status: 'published'
    }
    notices.value.unshift(newNotice)
  }

  // 更新系统公告
  const updateNotice = async (id, data) => {
    try {
      await api.put(`/notices/${id}`, data)
      const idx = notices.value.findIndex(n => n.id === id)
      if (idx > -1) {
        notices.value[idx] = { ...notices.value[idx], ...data }
      }
      return true
    } catch (error) {
      // mock模式下本地更新
      const idx = notices.value.findIndex(n => n.id === id)
      if (idx > -1) {
        notices.value[idx] = { ...notices.value[idx], ...data }
      }
      return true
    }
  }

  return {
    // 状态
    notifications,
    notices,
    unreadCount,
    loading,

    // Getters
    getNotifications,
    getUnreadCount,
    isLoading,

    // Actions
    fetchNotifications,
    fetchNotices,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    deleteNotice,
    addNotification,
    addNotice,
    clearAllNotifications,
    getNotificationStats,
    updateNotification,
    updateNotice
  }
}) 