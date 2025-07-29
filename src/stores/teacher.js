import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { fetchData, submitData } from '../utils/dataManager.js'
import { useDataSourceStore } from './dataSource.js'

// mock教师数据
export const mockTeachers = [
  {
    id: 1,
    name: '张伟',
    gender: 1,
    age: 35,
    phone: '13800138001',
    email: 'zhangwei@example.com',
    title: '讲师',
    specialty: 'Python',
    education: '计算机科学硕士',
    experience: '5年编程教育经验',
    joinDate: '2024-01-15',
    status: 1,
    bio: '专注于Python编程教学，擅长面向对象编程和Web开发',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    courseCount: 8,
    studentCount: 45
  },
  {
    id: 2,
    name: '李娜',
    gender: 0,
    age: 32,
    phone: '13800138002',
    email: 'lina@example.com',
    title: '高级讲师',
    specialty: 'Java',
    education: '软件工程硕士',
    experience: '7年企业级开发经验',
    joinDate: '2024-02-01',
    status: 1,
    bio: 'Java企业级开发专家，擅长Spring框架和微服务架构',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b976?w=150&h=150&fit=crop&crop=face',
    courseCount: 12,
    studentCount: 68
  },
  {
    id: 3,
    name: '王强',
    gender: 1,
    age: 35,
    phone: '13800138003',
    email: 'wangqiang@example.com',
    title: '教学总监',
    specialty: 'Web开发',
    education: '计算机科学博士',
    experience: '10年全栈开发经验',
    joinDate: '2023-12-01',
    status: 1,
    bio: '全栈开发专家，精通前端和后端技术栈',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    courseCount: 15,
    studentCount: 89
  },
  {
    id: 4,
    name: '陈思',
    gender: 0,
    age: 29,
    phone: '13800138004',
    email: 'chensi@example.com',
    title: '讲师',
    specialty: '人工智能',
    education: '人工智能硕士',
    experience: '4年AI算法开发经验',
    joinDate: '2024-03-01',
    status: 1,
    bio: 'AI算法专家，专注于机器学习和深度学习教学',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    courseCount: 6,
    studentCount: 32
  },
  {
    id: 5,
    name: '刘洋',
    gender: 1,
    age: 31,
    phone: '13800138005',
    email: 'liuyang@example.com',
    title: '讲师',
    specialty: '少儿编程',
    education: '教育学硕士',
    experience: '6年少儿编程教育经验',
    joinDate: '2024-01-20',
    status: 1,
    bio: '少儿编程教育专家，擅长Scratch和Python基础教学',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    courseCount: 10,
    studentCount: 56
  }
]

export const useTeacherStore = defineStore('teacher', () => {
  // 获取数据源store
  const dataSourceStore = useDataSourceStore()
  
  // 响应式数据
  const teachers = ref([])
  const loading = ref(false)
  const pagination = ref({
    current: 1,
    size: 10,
    total: 0
  })

  // 计算属性
  const getTeachers = computed(() => teachers.value)
  const getLoading = computed(() => loading.value)
  const getPagination = computed(() => pagination.value)
  const getDataSourceType = computed(() => dataSourceStore.getDataSourceType)

  // Actions
  // 获取教师列表
  const fetchTeachers = async (params = {}) => {
    loading.value = true
    try {
      const useMock = dataSourceStore.type === 'mock'
      
      if (useMock) {
        teachers.value = mockTeachers
        pagination.value = {
          current: params.page || 1,
          size: params.size || 12,
          total: mockTeachers.length
        }
        console.log('教师mock数据:', teachers.value)
        console.log('分页信息:', pagination.value)
        loading.value = false
        return
      }

      // API模式
      const queryParams = new URLSearchParams({
        page: params.page || 1,
      size: params.size || 10,
        ...params
      }).toString()
      const url = `/teachers?${queryParams}`
      
      const response = await fetchData(url)
      teachers.value = response.records || []
      pagination.value = {
        current: response.pagination?.current || 1,
        size: response.pagination?.size || 10,
        total: response.total || 0
      }
      
      console.log(`📊 教师数据获取成功 (数据源: ${getDataSourceType.value})`)
    return response
    } catch (error) {
      console.error('获取教师列表失败:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  // 添加教师
  const addTeacher = async (teacherData) => {
    if (!Array.isArray(teachers.value)) teachers.value = []
    try {
      const mockResponse = {
        id: Date.now(),
        ...teacherData,
        username: teacherData.username || teacherData.name.toLowerCase().replace(/[^a-z]/g, '') + Math.floor(Math.random() * 1000),
        joinDate: new Date().toISOString().slice(0, 10),
        status: 1,
        avatar: '',
        courseCount: 0,
        studentCount: 0
      }

      const response = await submitData(
        '/teachers',
        teacherData,
        mockResponse,
        { method: 'post' }
      )

      // 模拟数据模式下，直接添加到本地列表以直观显示变化
      if (getDataSourceType.value === 'mock') {
        teachers.value.unshift(response)
        pagination.value.total++
      }
      console.log(`✅ 教师添加成功 (数据源: ${getDataSourceType.value})`)
      return response
    } catch (error) {
      console.error('添加教师失败:', error)
      throw error
    }
  }

  // 更新教师
  const updateTeacher = async (id, teacherData) => {
    if (!Array.isArray(teachers.value)) teachers.value = []
    try {
      const response = await submitData(
        `/teachers/${id}`,
        teacherData,
        { id, ...teacherData },
        { method: 'put' }
      )

      // 模拟数据模式下，更新本地列表以直观显示变化
      if (getDataSourceType.value === 'mock') {
        const index = teachers.value.findIndex(t => t.id === id)
        if (index !== -1) {
          teachers.value[index] = response
        }
      }
      console.log(`✅ 教师更新成功 (数据源: ${getDataSourceType.value})`)
      return response
      } catch (error) {
      console.error('更新教师失败:', error)
      throw error
    }
  }

  // 删除教师
  const deleteTeacher = async (id) => {
    if (!Array.isArray(teachers.value)) teachers.value = []
    try {
      const response = await submitData(
        `/teachers/${id}`,
        {},
        { success: true },
        { method: 'delete' }
      )

      // 模拟数据模式下，从本地列表移除以直观显示变化
      if (getDataSourceType.value === 'mock') {
        const index = teachers.value.findIndex(t => t.id === id)
        if (index !== -1) {
          teachers.value.splice(index, 1)
          pagination.value.total--
        }
      }
      console.log(`✅ 教师删除成功 (数据源: ${getDataSourceType.value})`)
      return response
    } catch (error) {
      console.error('删除教师失败:', error)
      throw error
    }
  }

  // 获取教师详情
  const getTeacherById = async (id) => {
    try {
      const response = await fetchData(
        `/teachers/${id}`,
        {}, // 模拟数据为空，实际从 API 获取
        { forceMock: false }
      )

      console.log(`✅ 教师详情获取成功 (数据源: ${getDataSourceType.value})`)
      return response
    } catch (error) {
      console.error('获取教师详情失败:', error)
      throw error
    }
  }

  // 获取教师统计
  const getTeacherStats = async () => {
    try {
      const response = await fetchData(
        '/teachers/stats',
        {}, // 模拟数据为空，实际从 API 获取
        { forceMock: false }
      )

      console.log(`✅ 教师统计获取成功 (数据源: ${getDataSourceType.value})`)
      return response
    } catch (error) {
      console.error('获取教师统计失败:', error)
      throw error
    }
  }

  // 监听数据源切换，自动刷新数据
  watch(() => dataSourceStore.type, () => {
    fetchTeachers()
  })

  return {
    // 状态
    teachers,
    loading,
    pagination,

    // Getters
    getTeachers,
    getLoading,
    getPagination,
    getDataSourceType,

    // Actions
    fetchTeachers,
    addTeacher,
    updateTeacher,
    deleteTeacher,
    getTeacherById,
    getTeacherStats
  }
})