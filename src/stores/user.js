import { defineStore } from 'pinia'
import api from '../utils/api.js'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  // 状态
  const token = ref(localStorage.getItem('token') || '')
  const userInfo = ref(JSON.parse(localStorage.getItem('userInfo') || '{}'))
  const role = ref(localStorage.getItem('userRole') || '')
  const permissions = ref(JSON.parse(localStorage.getItem('permissions') || '[]'))
  const unreadMessageCount = ref(0)
  
  // Getters
  const isLoggedIn = computed(() => !!token.value)
  const getUserInfo = computed(() => userInfo.value)
  const getRole = computed(() => role.value)
  const getPermissions = computed(() => permissions.value)
  
  // Actions
  // 登录
  const login = async (loginData) => {
    try {
      const response = await api.post('/auth/login', loginData)
      const { token: newToken, userInfo: newUserInfo } = response
      
      // 保存到状态
      token.value = newToken
      userInfo.value = {
        id: newUserInfo.id || 1,
        name: newUserInfo.name || 'admin',
        username: newUserInfo.username || 'admin',
        email: newUserInfo.email || 'admin@example.com',
        phone: newUserInfo.phone || '13800138000',
        avatar: newUserInfo.avatar || '',
        role: newUserInfo.role || 'admin',
        status: newUserInfo.status || 'active',
        gender: newUserInfo.gender || '',
        birthday: newUserInfo.birthday || '',
        address: newUserInfo.address || '',
        location: newUserInfo.location || '',
        bio: newUserInfo.bio || '',
        joinDate: newUserInfo.joinDate || '2024-01-01',
        lastLoginTime: newUserInfo.lastLoginTime || new Date().toISOString(),
        permissions: newUserInfo.permissions || []
      }
      role.value = newUserInfo.role || 'admin'
      permissions.value = newUserInfo.permissions || []
      
      // 保存到本地存储
      localStorage.setItem('token', newToken)
      localStorage.setItem('userInfo', JSON.stringify(userInfo.value))
      localStorage.setItem('userRole', userInfo.value.role)
      localStorage.setItem('permissions', JSON.stringify(userInfo.value.permissions))
      
      return true
    } catch (error) {
      console.error('登录失败:', error)
      
      // 如果是开发环境，使用模拟登录
      if (process.env.NODE_ENV === 'development') {
        console.log('开发环境使用模拟登录')
        return mockLogin(loginData)
      }
      
      return Promise.reject(error)
    }
  }
  
  // 模拟登录（开发环境用）
  const mockLogin = (loginData) => {
    const { loginType } = loginData
    
    if (loginType === 'admin') {
      // 管理员登录
      const { username, password } = loginData
      if (username === 'admin' && password === 'admin123') {
        const mockUserInfo = {
          id: 1,
          name: 'admin',
          username: 'admin',
          email: 'admin@example.com',
          phone: '13800138000',
          avatar: '',
          role: 'admin',
          status: 'active',
          gender: 'male',
          birthday: '1990-01-01',
          address: '北京市朝阳区',
          location: '北京',
          bio: '系统管理员',
          joinDate: '2024-01-01',
          lastLoginTime: new Date().toISOString(),
          permissions: ['manage_teachers', 'manage_students', 'manage_courses', 'manage_classes', 'manage_schedules', 'manage_finance', 'manage_settings', 'view_notices']
        }
        
        token.value = 'mock-admin-token-' + Date.now()
        userInfo.value = mockUserInfo
        role.value = 'admin'
        permissions.value = mockUserInfo.permissions
        
        localStorage.setItem('token', token.value)
        localStorage.setItem('userInfo', JSON.stringify(userInfo.value))
        localStorage.setItem('userRole', userInfo.value.role)
        localStorage.setItem('permissions', JSON.stringify(userInfo.value.permissions))
        
        return true
      } else {
        throw new Error('用户名或密码错误')
      }
    } else if (loginType === 'teacher') {
      // 教师登录
      const { name, phone, password } = loginData
      
      // 模拟教师数据
      const mockTeachers = [
        {
          id: 2,
          name: '张老师',
          username: 'zhanglaoshi',
          email: 'zhang@example.com',
          phone: '13800138001',
          avatar: '',
          role: 'teacher',
          status: 'active',
          gender: 'female',
          birthday: '1985-05-15',
          address: '上海市浦东新区',
          location: '上海',
          bio: 'Python编程教师',
          joinDate: '2024-02-01',
          lastLoginTime: new Date().toISOString(),
          permissions: ['view_students', 'view_courses', 'view_classes', 'view_schedules', 'manage_own_courses', 'view_notices']
        },
        {
          id: 3,
          name: '李老师',
          username: 'lilaoshi',
          email: 'li@example.com',
          phone: '13800138002',
          avatar: '',
          role: 'teacher',
          status: 'active',
          gender: 'male',
          birthday: '1988-08-20',
          address: '广州市天河区',
          location: '广州',
          bio: 'Java编程教师',
          joinDate: '2024-01-15',
          lastLoginTime: new Date().toISOString(),
          permissions: ['view_students', 'view_courses', 'view_classes', 'view_schedules', 'manage_own_courses', 'view_notices']
        }
      ]
      
      // 查找匹配的教师
      const teacher = mockTeachers.find(t => 
        t.name === name && t.phone === phone && password === '123456'
      )
      
      if (teacher) {
        token.value = 'mock-teacher-token-' + Date.now()
        userInfo.value = teacher
        role.value = 'teacher'
        permissions.value = teacher.permissions
        
        localStorage.setItem('token', token.value)
        localStorage.setItem('userInfo', JSON.stringify(userInfo.value))
        localStorage.setItem('userRole', userInfo.value.role)
        localStorage.setItem('permissions', JSON.stringify(userInfo.value.permissions))
        
        return true
      } else {
        throw new Error('教师姓名、手机号或密码错误')
      }
    }
    
    throw new Error('不支持的登录类型')
  }
  
  // 登出
  const logout = () => {
    // 清除状态
    token.value = ''
    userInfo.value = {}
    role.value = ''
    permissions.value = []
    
    // 清除本地存储
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
    localStorage.removeItem('userRole')
    localStorage.removeItem('permissions')
  }
  
  // 更新用户信息
  const updateUserInfo = (info) => {
    userInfo.value = { ...userInfo.value, ...info }
    localStorage.setItem('userInfo', JSON.stringify(userInfo.value))
  }
  
  // 更新用户头像
  const updateUserAvatar = (avatarUrl) => {
    userInfo.value.avatar = avatarUrl
    localStorage.setItem('userInfo', JSON.stringify(userInfo.value))
  }
  
  // 更新用户状态
  const updateUserStatus = (status) => {
    userInfo.value.status = status
    localStorage.setItem('userInfo', JSON.stringify(userInfo.value))
  }
  
  // 设置角色
  const setRole = (newRole) => {
    role.value = newRole
    userInfo.value.role = newRole
    localStorage.setItem('userRole', newRole)
    localStorage.setItem('userInfo', JSON.stringify(userInfo.value))
  }
  
  // 检查权限
  const hasPermission = (permissionName) => {
    if (role.value === 'admin') return true
    return permissions.value.includes(permissionName)
  }
  
  // 获取未读消息数量
  const fetchUnreadMessageCount = async () => {
    try {
      const response = await api.get('/messages/unread/count')
      unreadMessageCount.value = response || 0
      return unreadMessageCount.value
    } catch (error) {
      console.error('获取未读消息数量失败:', error)
      return 0
    }
  }
  
  // 标记消息为已读
  const markAsRead = async (messageId) => {
    try {
      await api.put(`/messages/${messageId}/read`)
      if (unreadMessageCount.value > 0) {
        unreadMessageCount.value--
      }
      return true
    } catch (error) {
      console.error('标记消息已读失败:', error)
      return false
    }
  }
  
  // 标记所有消息为已读
  const markAllAsRead = async () => {
    try {
      await api.put('/messages/read/all')
      unreadMessageCount.value = 0
      return true
    } catch (error) {
      console.error('标记所有消息已读失败:', error)
      return false
    }
  }
  
  // 获取用户个人资料
  const fetchUserProfile = async () => {
    try {
      const response = await api.get('/users/profile')
      updateUserInfo(response)
      return response
    } catch (error) {
      console.error('获取用户资料失败:', error)
      return null
    }
  }
  
  // 更新用户个人资料
  const updateUserProfile = async (profileData) => {
    try {
      const response = await api.put('/users/profile', profileData)
      updateUserInfo(response)
      return response
    } catch (error) {
      console.error('更新用户资料失败:', error)
      throw error
    }
  }
  
  // 修改密码
  const changePassword = async (passwordData) => {
    try {
      const response = await api.post(`/users/${userInfo.value.id}/change-password`, passwordData)
      return response
    } catch (error) {
      console.error('修改密码失败:', error)
      throw error
    }
  }
  
  // 上传头像
  const uploadAvatar = async (file) => {
    try {
      const formData = new FormData()
      formData.append('avatar', file)
      
      const response = await api.post('/users/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      
      updateUserAvatar(response.avatarUrl)
      return response
    } catch (error) {
      console.error('上传头像失败:', error)
      throw error
    }
  }
  
  // 自动登录（开发环境用）
  const autoLogin = () => {
    if (process.env.NODE_ENV === 'development' && !isLoggedIn.value) {
      login({
        username: 'admin',
        password: 'admin123'
      }).catch(console.error);
    }
  }
  
  return {
    // 状态
    token,
    userInfo,
    role,
    permissions,
    unreadMessageCount,
    
    // Getters
    isLoggedIn,
    getUserInfo,
    getRole,
    getPermissions,
    
    // Actions
    login,
    logout,
    updateUserInfo,
    updateUserAvatar,
    updateUserStatus,
    setRole,
    hasPermission,
    fetchUnreadMessageCount,
    markAsRead,
    markAllAsRead,
    fetchUserProfile,
    updateUserProfile,
    changePassword,
    uploadAvatar,
    autoLogin
  }
})