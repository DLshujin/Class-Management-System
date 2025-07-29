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
      
      // 在模拟数据模式下，如果本地已有数据，直接返回
      if (useMock && classes.value.length > 0) {
        console.log(`📊 班级数据获取成功 (数据源: ${getDataSourceType.value})，使用本地数据`)
        return {
          list: classes.value,
          pagination: {
            current: params.page || 1,
            size: params.size || 10,
            total: classes.value.length
          }
        }
      }
      
      // 提供正确的mock数据
      const mockClasses = [
        {
          id: 1,
          name: 'Python-A班',
          courseId: 1,
          courseName: 'Python基础入门',
          teacherId: 1,
          teacherName: '张老师',
          schedule: '周六 09:00-11:00',
          startDate: '2024-01-15',
          endDate: '2024-07-30',
          classroom: 'A教室',
          currentStudents: 15,
          maxStudents: 20,
          status: '在读',
          syllabus: '第一周：Python环境安装与基础语法\n第二周：变量与数据类型\n第三周：控制流语句\n第四周：函数定义与使用\n第五周：列表与字典\n第六周：文件操作\n第七周：简单项目实践\n第八周：综合项目与总结',
          createTime: '2024-01-15',
          updateTime: '2024-01-15'
        },
        {
          id: 2,
          name: 'Java-A班',
          courseId: 2,
          courseName: 'Java程序设计',
          teacherId: 2,
          teacherName: '李老师',
          schedule: '周三 14:00-16:00',
          startDate: '2024-02-01',
          endDate: '2024-08-30',
          classroom: 'B教室',
          currentStudents: 12,
          maxStudents: 18,
          status: '在读',
          syllabus: '第一周：Java开发环境搭建\n第二周：Java基础语法\n第三周：面向对象编程\n第四周：集合框架\n第五周：异常处理\n第六周：多线程编程\n第七周：网络编程\n第八周：项目开发',
          createTime: '2024-02-01',
          updateTime: '2024-02-01'
        },
        {
          id: 3,
          name: 'AI-A班',
          courseId: 3,
          courseName: '人工智能入门',
          teacherId: 4,
          teacherName: '陈老师',
          schedule: '周五 19:00-21:00',
          startDate: '2024-03-01',
          endDate: '2024-09-30',
          classroom: 'C教室',
          currentStudents: 8,
          maxStudents: 15,
          status: '在读',
          syllabus: '第一周：AI基础知识\n第二周：机器学习算法\n第三周：深度学习框架\n第四周：神经网络\n第五周：计算机视觉\n第六周：自然语言处理\n第七周：AI项目实战\n第八周：未来发展趋势',
          createTime: '2024-03-01',
          updateTime: '2024-03-01'
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
        { forceMock: useMock }
      )

      classes.value = response.list || response
      pagination.value = response.pagination || {
        current: params.page || 1,
        size: params.size || 10,
        total: classes.value.length
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
        id: Date.now(),
        ...classData,
        status: '在读',
        createTime: new Date().toISOString().split('T')[0],
        updateTime: new Date().toISOString().split('T')[0]
      }

      const response = await submitData(
        '/classes',
        classData,
        mockResponse,
        { method: 'post' }
      )

      // 模拟数据模式下，直接添加到本地列表以直观显示变化
      if (getDataSourceType.value === 'mock') {
        classes.value.unshift(response)
        pagination.value.total++
      }
      console.log(`✅ 班级添加成功 (数据源: ${getDataSourceType.value})`)
      return response
    } catch (error) {
      console.error('添加班级失败:', error)
      throw error
    }
  }

  // 更新班级
  const updateClass = async (id, classData) => {
    try {
      const mockResponse = { id, ...classData, updateTime: new Date().toISOString().split('T')[0] }

      const response = await submitData(
        `/classes/${id}`,
        classData,
        mockResponse,
        { method: 'put' }
      )

      // 模拟数据模式下，更新本地列表以直观显示变化
      if (getDataSourceType.value === 'mock') {
        const index = classes.value.findIndex(c => c.id === id)
        if (index !== -1) {
          classes.value[index] = response
        }
      }
      console.log(`✅ 班级更新成功 (数据源: ${getDataSourceType.value})`)
      return response
    } catch (error) {
      console.error('更新班级失败:', error)
      throw error
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
        { method: 'delete' }
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