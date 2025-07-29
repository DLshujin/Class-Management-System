import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { fetchData, submitData } from '../utils/dataManager.js'
import { useDataSourceStore } from './dataSource.js'

export const useScheduleStore = defineStore('schedule', () => {
  // 状态
  const schedules = ref([])
  const loading = ref(false)
  const pagination = ref({
    current: 1,
    size: 10,
    total: 0
  })

  // 数据源 store
  const dataSourceStore = useDataSourceStore()

  // Getters
  const getSchedules = computed(() => schedules.value)
  const getLoading = computed(() => loading.value)
  const getPagination = computed(() => pagination.value)
  const getDataSourceType = computed(() => dataSourceStore.getDataSourceType)

  // 计算排课统计
  const getScheduleStats = computed(() => {
    const total = schedules.value.length
    const active = schedules.value.filter(s => s.status === 1).length
    const inactive = schedules.value.filter(s => s.status === 0).length
    
    const dayStats = {
      '周一': schedules.value.filter(s => s.dayOfWeek === 1).length,
      '周二': schedules.value.filter(s => s.dayOfWeek === 2).length,
      '周三': schedules.value.filter(s => s.dayOfWeek === 3).length,
      '周四': schedules.value.filter(s => s.dayOfWeek === 4).length,
      '周五': schedules.value.filter(s => s.dayOfWeek === 5).length,
      '周六': schedules.value.filter(s => s.dayOfWeek === 6).length,
      '周日': schedules.value.filter(s => s.dayOfWeek === 0).length
    }

    const totalStudents = schedules.value.reduce((sum, s) => sum + s.currentStudents, 0)
    const totalCapacity = schedules.value.reduce((sum, s) => sum + s.maxStudents, 0)
    const occupancyRate = totalCapacity > 0 ? (totalStudents / totalCapacity * 100).toFixed(1) : 0

    return {
      total,
      active,
      inactive,
      dayStats,
      totalStudents,
      totalCapacity,
      occupancyRate
    }
  })

  // Actions
  // 获取排课列表
  const fetchSchedules = async (params = {}) => {
    loading.value = true
    try {
      const queryParams = new URLSearchParams({
        page: params.page || 1,
        size: params.size || 10,
        ...params
      }).toString()

      const useMock = dataSourceStore.type === 'mock'
      
      // 使用api.js中的mock数据，确保数据一致性
      const mockSchedules = [
        {
          id: 1,
          classId: 1,
          className: 'Python-A班',
          courseId: 1,
          courseName: 'Python基础入门',
          teacherId: 1,
          teacherName: '张老师',
          scheduleDate: new Date().toISOString().slice(0, 10), // 今天
          startTime: '09:00:00',
          endTime: '11:00:00',
          classroom: 'A教室',
          status: 0,
          topic: 'Python环境安装与基础语法',
          periods: 2,
          currentStudents: 15,
          maxStudents: 20
        },
        {
          id: 2,
          classId: 2,
          className: 'Java-A班',
          courseId: 2,
          courseName: 'Java程序设计',
          teacherId: 2,
          teacherName: '李老师',
          scheduleDate: new Date().toISOString().slice(0, 10), // 今天
          startTime: '14:00:00',
          endTime: '16:00:00',
          classroom: 'B教室',
          status: 0,
          topic: 'Java环境搭建与基础语法',
          periods: 2,
          currentStudents: 12,
          maxStudents: 18
        },
        {
          id: 3,
          classId: 3,
          className: 'AI-A班',
          courseId: 3,
          courseName: '人工智能入门',
          teacherId: 3,
          teacherName: '王老师',
          scheduleDate: new Date().toISOString().slice(0, 10), // 今天
          startTime: '19:00:00',
          endTime: '21:00:00',
          classroom: 'C教室',
          status: 0,
          topic: '机器学习基础概念',
          periods: 2,
          currentStudents: 8,
          maxStudents: 15
        },
        {
          id: 4,
          classId: 4,
          className: 'Web-A班',
          courseId: 4,
          courseName: 'Web前端开发',
          teacherId: 4,
          teacherName: '赵老师',
          scheduleDate: new Date().toISOString().slice(0, 10), // 今天
          startTime: '10:30:00',
          endTime: '12:30:00',
          classroom: 'D教室',
          status: 0,
          topic: 'HTML与CSS基础',
          periods: 2,
          currentStudents: 10,
          maxStudents: 16
        }
      ]
      
      const response = await fetchData(
        `/schedules?${queryParams}`,
        {
          list: mockSchedules,
          pagination: {
            current: params.page || 1,
            size: params.size || 10,
            total: mockSchedules.length
          }
        },
        { forceMock: useMock }
      )

      schedules.value = response.list || response
      pagination.value = response.pagination || {
        current: params.page || 1,
        size: params.size || 10,
        total: schedules.value.length
      }

      console.log(`📊 排课数据获取成功 (数据源: ${getDataSourceType.value})，获取到 ${schedules.value.length} 条记录`)
      return response
    } catch (error) {
      console.error('获取排课列表失败:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  // 添加排课
  const addSchedule = async (scheduleData) => {
    try {
      const mockResponse = {
        id: Date.now(),
        ...scheduleData,
        status: 1,
        currentStudents: 0,
        students: [],
        createTime: new Date().toISOString().split('T')[0],
        updateTime: new Date().toISOString().split('T')[0]
      }

      const response = await submitData(
        '/schedules',
        scheduleData,
        mockResponse,
        { method: 'post' }
      )

      // 模拟数据模式下，直接添加到本地列表以直观显示变化
      if (getDataSourceType.value === 'mock') {
        schedules.value.unshift(response)
        pagination.value.total++
      }
      console.log(`✅ 排课添加成功 (数据源: ${getDataSourceType.value})`)
      return response
    } catch (error) {
      console.error('添加排课失败:', error)
      throw error
    }
  }

  // 更新排课
  const updateSchedule = async (id, scheduleData) => {
    try {
      const mockResponse = { 
        id, 
        ...scheduleData,
        updateTime: new Date().toISOString().split('T')[0]
      }

      const response = await submitData(
        `/schedules/${id}`,
        scheduleData,
        mockResponse,
        { method: 'put' }
      )

      // 模拟数据模式下，更新本地列表以直观显示变化
      if (getDataSourceType.value === 'mock') {
        const index = schedules.value.findIndex(s => s.id === id)
        if (index !== -1) {
          schedules.value[index] = response
        }
      }
      console.log(`✅ 排课更新成功 (数据源: ${getDataSourceType.value})`)
      return response
    } catch (error) {
      console.error('更新排课失败:', error)
      throw error
    }
  }

  // 删除排课
  const deleteSchedule = async (id) => {
    try {
      const mockResponse = { success: true }

      const response = await submitData(
        `/schedules/${id}`,
        {},
        mockResponse,
        { method: 'delete' }
      )

      // 模拟数据模式下，从本地列表移除以直观显示变化
      if (getDataSourceType.value === 'mock') {
        const index = schedules.value.findIndex(s => s.id === id)
        if (index !== -1) {
          schedules.value.splice(index, 1)
          pagination.value.total--
        }
      }
      console.log(`✅ 排课删除成功 (数据源: ${getDataSourceType.value})`)
      return response
    } catch (error) {
      console.error('删除排课失败:', error)
      throw error
    }
  }

  // 获取排课详情
  const getScheduleById = async (id) => {
    try {
      const response = await fetchData(
        `/schedules/${id}`,
        {}, // 模拟数据为空，实际从 API 获取
        { forceMock: false }
      )

      console.log(`✅ 排课详情获取成功 (数据源: ${getDataSourceType.value})`)
      return response
    } catch (error) {
      console.error('获取排课详情失败:', error)
      throw error
    }
  }

  // 获取排课统计
  const getScheduleStatistics = async () => {
    try {
      const mockStats = getScheduleStats.value

      const response = await fetchData(
        '/schedules/stats',
        mockStats,
        { forceMock: false }
      )

      console.log(`✅ 排课统计获取成功 (数据源: ${getDataSourceType.value})`)
      return response
    } catch (error) {
      console.error('获取排课统计失败:', error)
      throw error
    }
  }

  // 更新排课状态
  const updateScheduleStatus = async (id, status) => {
    try {
      const mockResponse = { success: true }

      const response = await submitData(
        `/schedules/${id}/status`,
        { status },
        mockResponse,
        { method: 'put' }
      )

      // 如果是模拟数据，更新本地排课状态
      if (getDataSourceType.value === 'mock') {
        const index = schedules.value.findIndex(s => s.id === id)
        if (index !== -1) {
          schedules.value[index].status = status
        }
      }

      console.log(`✅ 排课状态更新成功 (数据源: ${getDataSourceType.value})`)
      return response
    } catch (error) {
      console.error('更新排课状态失败:', error)
      throw error
    }
  }

  // 学生选课
  const enrollStudent = async (scheduleId, studentId) => {
    try {
      const mockResponse = { success: true }

      const response = await submitData(
        `/schedules/${scheduleId}/enroll`,
        { studentId },
        mockResponse,
        { method: 'post' }
      )

      // 如果是模拟数据，更新本地学生列表
      if (getDataSourceType.value === 'mock') {
        const index = schedules.value.findIndex(s => s.id === scheduleId)
        if (index !== -1) {
          const schedule = schedules.value[index]
          if (schedule.currentStudents < schedule.maxStudents) {
            schedule.currentStudents++
            schedule.students.push({ id: studentId, name: `学生${studentId}`, status: 'enrolled' })
          }
        }
      }

      console.log(`✅ 学生选课成功 (数据源: ${getDataSourceType.value})`)
      return response
    } catch (error) {
      console.error('学生选课失败:', error)
      throw error
    }
  }

  // 学生退课
  const unenrollStudent = async (scheduleId, studentId) => {
    try {
      const mockResponse = { success: true }

      const response = await submitData(
        `/schedules/${scheduleId}/unenroll`,
        { studentId },
        mockResponse,
        { method: 'post' }
      )

      // 如果是模拟数据，更新本地学生列表
      if (getDataSourceType.value === 'mock') {
        const index = schedules.value.findIndex(s => s.id === scheduleId)
        if (index !== -1) {
          const schedule = schedules.value[index]
          schedule.currentStudents--
          schedule.students = schedule.students.filter(s => s.id !== studentId)
        }
      }

      console.log(`✅ 学生退课成功 (数据源: ${getDataSourceType.value})`)
      return response
    } catch (error) {
      console.error('学生退课失败:', error)
      throw error
    }
  }

  // 监听数据源切换，自动刷新数据
  watch(() => dataSourceStore.type, () => {
    fetchSchedules()
  })

  return {
    // 状态
    schedules,
    loading,
    pagination,

    // Getters
    getSchedules,
    getLoading,
    getPagination,
    getDataSourceType,
    getScheduleStats,

    // Actions
    fetchSchedules,
    addSchedule,
    updateSchedule,
    deleteSchedule,
    getScheduleById,
    getScheduleStatistics,
    updateScheduleStatus,
    enrollStudent,
    unenrollStudent
  }
}) 