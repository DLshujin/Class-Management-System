import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { fetchData, submitData } from '../utils/dataManager.js'
import { useDataSourceStore } from './dataSource.js'

export const useClassStore = defineStore('class', () => {
  // 状态
  const classes = ref([])
  const loading = ref(false)
  const pagination = ref({
    current: 1,
    size: 10,
    total: 0
  })

  // 数据源 store
  const dataSourceStore = useDataSourceStore()

  // Getters
  const getClasses = computed(() => classes.value)
  const getLoading = computed(() => loading.value)
  const getPagination = computed(() => pagination.value)
  const getDataSourceType = computed(() => dataSourceStore.getDataSourceType)

  // 统计
  const getClassStats = computed(() => {
    const total = classes.value.length
    const active = classes.value.filter(c => c.status === '在读').length
    const graduated = classes.value.filter(c => c.status === '结业').length
    const stopped = classes.value.filter(c => c.status === '停用').length
    return { total, active, graduated, stopped }
  })

  // Actions
  // 获取班级列表
  const fetchClasses = async (params = {}) => {
    loading.value = true
    try {
      const queryParams = new URLSearchParams({
        page: params.page || 1,
        size: params.size || 10,
        ...params
      }).toString()

      const useMock = dataSourceStore.type === 'mock'
      
      // 在模拟数据模式下，如果本地已有数据，直接返回（临时禁用以确保数据更新）
      // if (useMock && classes.value.length > 0) {
      //   console.log(`📊 班级数据获取成功 (数据源: ${getDataSourceType.value})，使用本地数据`)
      //   return {
      //     list: classes.value,
      //     pagination: {
      //       current: params.page || 1,
      //       size: params.size || 10,
      //       total: classes.value.length
      //     }
      //   }
      // }
      
      // 提供正确的mock数据
      const mockClasses = [
        {
          id: 1,
          name: 'Python基础A班',
          courseId: 1,
          courseName: 'Python基础入门',
          teacherId: 1,
          teacherName: '张伟',
          teacher: '张伟',
          type: '重点班',
          grade: '三年级',
          schedule: '周六 09:00-11:00',
          startDate: '2024-01-15',
          endDate: '2024-07-30',
          classroom: 'A教室',
          currentStudents: 15,
          maxStudents: 20,
          status: 'active',
          description: 'Python基础编程班，适合初学者系统学习编程思维',
          syllabus: 'Python环境搭建、变量与数据类型、控制流语句、函数定义与使用、列表与字典、文件操作、简单项目实践、综合项目与总结',
          createTime: '2024-01-15',
          updateTime: '2024-01-15'
        },
        {
          id: 2,
          name: 'Java程序设计B班',
          courseId: 2,
          courseName: 'Java程序设计',
          teacherId: 2,
          teacherName: '李娜',
          teacher: '李娜',
          type: '普通班',
          grade: '四年级',
          schedule: '周三 14:00-16:00',
          startDate: '2024-02-01',
          endDate: '2024-08-30',
          classroom: 'B教室',
          currentStudents: 12,
          maxStudents: 18,
          status: 'active',
          description: 'Java程序设计班，培养面向对象编程思维和企业级开发能力',
          syllabus: 'Java开发环境、基础语法、面向对象编程、集合框架、异常处理、多线程编程、网络编程、项目开发',
          createTime: '2024-02-01',
          updateTime: '2024-02-01'
        },
        {
          id: 3,
          name: 'AI智能C班',
          courseId: 3,
          courseName: '人工智能入门',
          teacherId: 4,
          teacherName: '陈思',
          teacher: '陈思',
          type: '实验班',
          grade: '五年级',
          schedule: '周五 19:00-21:00',
          startDate: '2024-03-01',
          endDate: '2024-09-30',
          classroom: 'C教室',
          currentStudents: 8,
          maxStudents: 15,
          status: 'active',
          description: '人工智能入门班，探索AI技术前沿，培养算法思维',
          syllabus: 'AI基础知识、机器学习算法、深度学习框架、神经网络、计算机视觉、自然语言处理、AI项目实战、未来发展趋势',
          createTime: '2024-03-01',
          updateTime: '2024-03-01'
        },
        {
          id: 4,
          name: '网页设计D班',
          courseId: 4,
          courseName: '网页设计基础',
          teacherId: 3,
          teacherName: '王强',
          teacher: '王强',
          type: '重点班',
          grade: '四年级',
          schedule: '周日 10:00-12:00',
          startDate: '2024-03-15',
          endDate: '2024-10-30',
          classroom: 'D教室',
          currentStudents: 18,
          maxStudents: 25,
          status: 'active',
          description: '网页设计基础班，学习HTML、CSS和JavaScript前端技术',
          syllabus: 'HTML基础、CSS样式、JavaScript基础、响应式设计、网页布局、交互效果、网站发布、项目制作',
          createTime: '2024-03-15',
          updateTime: '2024-03-15'
        },
        {
          id: 5,
          name: 'Scratch启蒙E班',
          courseId: 5,
          courseName: 'Scratch少儿编程',
          teacherId: 5,
          teacherName: '刘洋',
          teacher: '刘洋',
          type: '启蒙班',
          grade: '二年级',
          schedule: '周二 16:00-17:30',
          startDate: '2024-01-20',
          endDate: '2024-06-30',
          classroom: 'E教室',
          currentStudents: 20,
          maxStudents: 30,
          status: 'active',
          description: 'Scratch图形化编程启蒙班，适合儿童学习编程逻辑',
          syllabus: 'Scratch界面介绍、角色和背景、动作和外观、声音和音乐、事件和控制、变量和列表、自定义积木、创意项目',
          createTime: '2024-01-20',
          updateTime: '2024-01-20'
        }
      ]
      
      const response = await fetchData(
        `/classes?${queryParams}`,
        {
          list: mockClasses,
          pagination: {
            current: params.page || 1,
            size: params.size || 10,
            total: mockClasses.length
          }
        },
        { forceMock: true }  // 强制使用模拟数据
      )

      // 处理标准化响应
      if (response && response.success && response.data) {
        // 新的标准化响应格式
        const responseData = response.data.list || response.data || []
        classes.value = Array.isArray(responseData) ? responseData : []
        pagination.value = response.data.pagination || {
          current: params.page || 1,
          size: params.size || 10,
          total: response.data.total || responseData.length
        }
      } else {
        // 兼容旧格式
        const responseData = response.data || response.list || response || []
        classes.value = Array.isArray(responseData) ? responseData : []
        pagination.value = response.pagination || {
          current: params.page || 1,
          size: params.size || 10,
          total: classes.value.length
        }
      }
      
      // 如果仍然没有数据，强制使用模拟数据
      if (classes.value.length === 0) {
        console.log('⚠️ 班级数据为空，强制使用模拟数据')
        classes.value = [...mockClasses]
        pagination.value.total = mockClasses.length
      }

      console.log(`📊 班级数据获取成功 (数据源: ${getDataSourceType.value})，获取到 ${classes.value.length} 条记录`)
      return response
    } catch (error) {
      console.error('获取班级列表失败:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  // 添加班级
  const addClass = async (classData) => {
    try {
      const mockResponse = {
        success: true,
        data: {
          id: Date.now(),
          ...classData,
          status: 'active',
          createTime: new Date().toISOString().split('T')[0],
          updateTime: new Date().toISOString().split('T')[0]
        }
      }

      const response = await submitData(
        '/classes',
        classData,
        mockResponse,
        { method: 'post', forceMock: true }  // 强制使用模拟数据
      )

      // 模拟数据模式下，直接添加到本地列表以直观显示变化
      if (getDataSourceType.value === 'mock') {
        const newClass = response.data || response
        if (newClass && Array.isArray(classes.value)) {
          classes.value.unshift(newClass)
          pagination.value.total++
        }
      }
      console.log(`✅ 班级添加成功 (数据源: ${getDataSourceType.value})`)
      return response
    } catch (error) {
      console.error('添加班级失败:', error)
      return { success: false, message: error.message || '添加失败' }
    }
  }

  // 更新班级
  const updateClass = async (id, classData) => {
    try {
      // 确保ID类型一致性
      const numericId = parseInt(id)
      console.log(`🔄 更新班级ID: ${numericId}, 数据:`, classData)
      
      const mockResponse = { 
        success: true,
        data: { id: numericId, ...classData, updateTime: new Date().toISOString().split('T')[0] }
      }

      const response = await submitData(
        `/classes/${numericId}`,
        classData,
        mockResponse,
        { method: 'put', forceMock: true }  // 强制使用模拟数据
      )

      // 模拟数据模式下，更新本地列表以直观显示变化
      console.log(`📊 当前班级列表:`, classes.value.map(c => ({ id: c.id, name: c.name })))
      const index = classes.value.findIndex(c => c.id == numericId)  // 使用==而不是===以兼容类型
      console.log(`🔍 查找班级索引: ${index}`)
      
      if (index !== -1) {
        classes.value[index] = { ...classes.value[index], ...classData, updateTime: new Date().toISOString().split('T')[0] }
        console.log(`✅ 本地数据已更新`)
      } else {
        console.warn(`⚠️ 未找到ID为 ${numericId} 的班级`)
      }
      
      console.log(`✅ 班级更新成功 (数据源: ${getDataSourceType.value})`)
      return response
    } catch (error) {
      console.error('更新班级失败:', error)
      return { success: false, message: error.message || '更新失败' }
    }
  }

  // 删除班级
  const deleteClass = async (id) => {
    try {
      const mockResponse = { success: true }

      const response = await submitData(
        `/classes/${id}`,
        {},
        mockResponse,
        { method: 'delete', forceMock: true }  // 强制使用模拟数据
      )

      // 模拟数据模式下，从本地列表移除以直观显示变化
      if (getDataSourceType.value === 'mock') {
        const index = classes.value.findIndex(c => c.id === id)
        if (index !== -1) {
          classes.value.splice(index, 1)
          pagination.value.total--
        }
        // 强制刷新本地数据，确保UI同步
        await fetchClasses()
        return { success: true }
      }
      // 真实接口返回结构兼容
      if (response && (response.success === true || response.code === 0)) {
        return { success: true }
      } else {
        return { success: false, message: response && response.message ? response.message : '删除失败' }
      }
    } catch (error) {
      console.error('删除班级失败:', error)
      return { success: false, message: error && error.message ? error.message : '删除失败' }
    }
  }

  // 获取班级详情
  const getClassById = async (id) => {
    try {
      const response = await fetchData(
        `/classes/${id}`,
        {}, // 模拟数据为空，实际从 API 获取
        { forceMock: false }
      )

      console.log(`✅ 班级详情获取成功 (数据源: ${getDataSourceType.value})`)
      return response
    } catch (error) {
      console.error('获取班级详情失败:', error)
      throw error
    }
  }

  // 监听数据源切换，自动刷新数据
  watch(() => dataSourceStore.type, () => {
    fetchClasses()
  })

  return {
    // 状态
    classes,
    loading,
    pagination,

    // Getters
    getClasses,
    getLoading,
    getPagination,
    getDataSourceType,
    getClassStats,

    // Actions
    fetchClasses,
    addClass,
    updateClass,
    deleteClass,
    getClassById
  }
}) 