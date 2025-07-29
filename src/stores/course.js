import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { fetchData, submitData } from '../utils/dataManager.js'
import { useDataSourceStore } from './dataSource.js'

export const useCourseStore = defineStore('course', () => {
  // 状态
  const courses = ref([])
  const loading = ref(false)
  const pagination = ref({
    current: 1,
    size: 10,
    total: 0
  })

  // 数据源 store
  const dataSourceStore = useDataSourceStore()

  // 模拟课程数据
  const mockCourses = [
    {
      id: 1,
      name: 'Python基础入门',
      type: '编程基础', // 新增
      category: '编程基础',
      price: 3600,
      duration: 16,
      ageRange: '14-18岁',
      cover: 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?w=300&h=200&fit=crop',
      status: 1,
      description: 'Python编程语言基础入门课程，适合初学者',
      syllabus: [
        'Python环境搭建',
        '变量和数据类型',
        '控制流程',
        '函数和模块',
        '面向对象编程',
        '文件操作',
        '异常处理',
        '项目实战'
      ],
      teacherId: 1,
      teacherName: '张老师',
      maxStudents: 20,
      currentStudents: 15,
      difficulty: '初级',
      tags: ['Python', '编程基础', '入门'],
      createTime: '2024-01-01',
      updateTime: '2024-01-15'
    },
    {
      id: 2,
      name: 'Java程序设计',
      type: '编程基础', // 新增
      category: '编程基础',
      price: 4200,
      duration: 20,
      ageRange: '15-18岁',
      cover: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=300&h=200&fit=crop',
      status: 1,
      description: 'Java编程语言基础课程，培养面向对象编程思维',
      syllabus: [
        'Java开发环境',
        '基础语法',
        '面向对象编程',
        '集合框架',
        '异常处理',
        '多线程编程',
        '网络编程',
        '项目开发'
      ],
      teacherId: 2,
      teacherName: '李老师',
      maxStudents: 18,
      currentStudents: 12,
      difficulty: '中级',
      tags: ['Java', '面向对象', '企业级开发'],
      createTime: '2024-01-05',
      updateTime: '2024-01-20'
    },
    {
      id: 3,
      name: '人工智能入门',
      type: '前沿技术', // 新增
      category: '前沿技术',
      price: 4800,
      duration: 24,
      ageRange: '16-18岁',
      cover: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=300&h=200&fit=crop',
      status: 1,
      description: '人工智能基础课程，介绍机器学习和深度学习',
      syllabus: [
        'AI基础知识',
        '机器学习算法',
        '深度学习框架',
        '神经网络',
        '计算机视觉',
        '自然语言处理',
        'AI项目实战',
        '未来发展趋势'
      ],
      teacherId: 4,
      teacherName: '陈老师',
      maxStudents: 15,
      currentStudents: 8,
      difficulty: '高级',
      tags: ['人工智能', '机器学习', '深度学习'],
      createTime: '2024-01-10',
      updateTime: '2024-01-25'
    },
    {
      id: 4,
      name: '网页设计基础',
      type: '前端开发', // 新增
      category: '前端开发',
      price: 2800,
      duration: 12,
      ageRange: '12-16岁',
      cover: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=300&h=200&fit=crop',
      status: 0,
      description: '网页设计和前端开发基础课程',
      syllabus: [
        'HTML基础',
        'CSS样式',
        'JavaScript基础',
        '响应式设计',
        '网页布局',
        '交互效果',
        '网站发布',
        '项目制作'
      ],
      teacherId: 3,
      teacherName: '王老师',
      maxStudents: 25,
      currentStudents: 0,
      difficulty: '初级',
      tags: ['HTML', 'CSS', 'JavaScript', '前端'],
      createTime: '2024-01-15',
      updateTime: '2024-02-01'
    },
    {
      id: 5,
      name: 'Scratch少儿编程',
      type: '少儿编程', // 新增
      category: '少儿编程',
      price: 2000,
      duration: 10,
      ageRange: '8-12岁',
      cover: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&h=200&fit=crop',
      status: 1,
      description: '适合儿童的图形化编程课程',
      syllabus: [
        'Scratch界面介绍',
        '角色和背景',
        '动作和外观',
        '声音和音乐',
        '事件和控制',
        '变量和列表',
        '自定义积木',
        '创意项目'
      ],
      teacherId: 5,
      teacherName: '刘老师',
      maxStudents: 30,
      currentStudents: 22,
      difficulty: '初级',
      tags: ['Scratch', '少儿编程', '图形化编程'],
      createTime: '2024-01-20',
      updateTime: '2024-02-05'
    }
  ]

  // Getters
  const getCourses = computed(() => courses.value)
  const getLoading = computed(() => loading.value)
  const getPagination = computed(() => pagination.value)
  const getDataSourceType = computed(() => dataSourceStore.getDataSourceType)

  // 计算课程统计
  const getCourseStats = computed(() => {
    const total = courses.value.length
    const active = courses.value.filter(c => c.status === 1).length
    const inactive = courses.value.filter(c => c.status === 0).length
    
    const categoryStats = {}
    courses.value.forEach(course => {
      if (!categoryStats[course.category]) {
        categoryStats[course.category] = 0
      }
      categoryStats[course.category]++
    })

    const difficultyStats = {
      '初级': courses.value.filter(c => c.difficulty === '初级').length,
      '中级': courses.value.filter(c => c.difficulty === '中级').length,
      '高级': courses.value.filter(c => c.difficulty === '高级').length
    }

    const totalStudents = courses.value.reduce((sum, c) => sum + c.currentStudents, 0)
    const totalRevenue = courses.value.reduce((sum, c) => sum + (c.price * c.currentStudents), 0)

    return {
      total,
      active,
      inactive,
      categoryStats,
      difficultyStats,
      totalStudents,
      totalRevenue
    }
  })

  // Actions
  // 获取课程列表
  const fetchCourses = async (params = {}) => {
    loading.value = true
    try {
      const useMock = dataSourceStore.type === 'mock'
      if (useMock) {
        courses.value = mockCourses
        pagination.value = {
          current: params.page || 1,
          size: params.size || 12,
          total: mockCourses.length
        }
        console.log('课程mock数据:', courses.value)
        console.log('分页信息:', pagination.value)
        loading.value = false
        return
      }

      const queryParams = new URLSearchParams({
        page: params.page || 1,
        size: params.size || 10,
        ...params
      }).toString()

      const response = await fetchData(
        `/courses?${queryParams}`,
        {
          list: mockCourses,
          pagination: {
            current: params.page || 1,
            size: params.size || 10,
            total: mockCourses.length
          }
        },
        { forceMock: useMock }
      )

      courses.value = response.list || response
      pagination.value = response.pagination || {
        current: params.page || 1,
        size: params.size || 10,
        total: courses.value.length
      }

      console.log(`📊 课程数据获取成功 (数据源: ${getDataSourceType.value})`)
      return response
    } catch (error) {
      console.error('获取课程列表失败:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  // 添加课程
  const addCourse = async (courseData) => {
    try {
      const mockResponse = {
        id: Date.now(),
        ...courseData,
        status: 1,
        currentStudents: 0,
        createTime: new Date().toISOString().split('T')[0],
        updateTime: new Date().toISOString().split('T')[0]
      }

      const response = await submitData(
        '/courses',
        courseData,
        mockResponse,
        { method: 'post' }
      )

      // 模拟数据模式下，直接添加到本地列表以直观显示变化
      if (getDataSourceType.value === 'mock') {
        courses.value.unshift(response)
        pagination.value.total++
      }
      console.log(`✅ 课程添加成功 (数据源: ${getDataSourceType.value})`)
      return response
    } catch (error) {
      console.error('添加课程失败:', error)
      throw error
    }
  }

  // 更新课程
  const updateCourse = async (id, courseData) => {
    try {
      const mockResponse = { 
        id, 
        ...courseData,
        updateTime: new Date().toISOString().split('T')[0]
      }

      const response = await submitData(
        `/courses/${id}`,
        courseData,
        mockResponse,
        { method: 'put' }
      )

      // 模拟数据模式下，更新本地列表以直观显示变化
      if (getDataSourceType.value === 'mock') {
        const index = courses.value.findIndex(c => c.id === id)
        if (index !== -1) {
          courses.value[index] = response
        }
      }
      console.log(`✅ 课程更新成功 (数据源: ${getDataSourceType.value})`)
      return response
    } catch (error) {
      console.error('更新课程失败:', error)
      throw error
    }
  }

  // 删除课程
  const deleteCourse = async (id) => {
    try {
      const mockResponse = { success: true }

      const response = await submitData(
        `/courses/${id}`,
        {},
        mockResponse,
        { method: 'delete' }
      )

      // 模拟数据模式下，从本地列表移除以直观显示变化
      if (getDataSourceType.value === 'mock') {
        const index = courses.value.findIndex(c => c.id === id)
        if (index !== -1) {
          courses.value.splice(index, 1)
          pagination.value.total--
        }
      }
      console.log(`✅ 课程删除成功 (数据源: ${getDataSourceType.value})`)
      return response
    } catch (error) {
      console.error('删除课程失败:', error)
      throw error
    }
  }

  // 获取课程详情
  const getCourseById = async (id) => {
    try {
      const mockCourse = mockCourses.find(c => c.id === id) || mockCourses[0]

      const response = await fetchData(
        `/courses/${id}`,
        mockCourse,
        { forceMock: false }
      )

      console.log(`✅ 课程详情获取成功 (数据源: ${getDataSourceType.value})`)
      return response
    } catch (error) {
      console.error('获取课程详情失败:', error)
      throw error
    }
  }

  // 获取课程统计
  const getCourseStatistics = async () => {
    try {
      const mockStats = getCourseStats.value

      const response = await fetchData(
        '/courses/stats',
        mockStats,
        { forceMock: false }
      )

      console.log(`✅ 课程统计获取成功 (数据源: ${getDataSourceType.value})`)
      return response
    } catch (error) {
      console.error('获取课程统计失败:', error)
      throw error
    }
  }

  // 更新课程状态
  const updateCourseStatus = async (id, status) => {
    try {
      const mockResponse = { success: true }

      const response = await submitData(
        `/courses/${id}/status`,
        { status },
        mockResponse,
        { method: 'put' }
      )

      // 如果是模拟数据，更新本地课程状态
      if (getDataSourceType.value === 'mock') {
        const index = courses.value.findIndex(c => c.id === id)
        if (index !== -1) {
          courses.value[index].status = status
        }
      }

      console.log(`✅ 课程状态更新成功 (数据源: ${getDataSourceType.value})`)
      return response
    } catch (error) {
      console.error('更新课程状态失败:', error)
      throw error
    }
  }

  // 监听数据源切换，自动刷新数据
  watch(() => dataSourceStore.type, () => {
    fetchCourses()
  })

  return {
    // 状态
    courses,
    loading,
    pagination,

    // Getters
    getCourses,
    getLoading,
    getPagination,
    getDataSourceType,
    getCourseStats,

    // Actions
    fetchCourses,
    addCourse,
    updateCourse,
    deleteCourse,
    getCourseById,
    getCourseStatistics,
    updateCourseStatus
  }
}) 