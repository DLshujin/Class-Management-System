import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { fetchData, submitData } from '../utils/dataManager.js'
import { useDataSourceStore } from './dataSource.js'

export const useStudentStore = defineStore('student', () => {
  // 状态
  const students = ref([])
  const loading = ref(false)
  const pagination = ref({
    current: 1,
      size: 10,
      total: 0
  })

  // 数据源 store
  const dataSourceStore = useDataSourceStore()

  // 模拟学生数据
  let mockStudents = [
    {
      id: 1,
      name: '张三',
      gender: 1,
      age: 15,
      phone: '13800138001',
      email: 'zhangsan@example.com',
      parentName: '张父',
      parentPhone: '13900139001',
      address: '北京市朝阳区',
      school: '北京市第一中学',
      grade: '高中一年级',
      join_date: '2024-01-15',
      status: 'active',
      level: '初级',
      courseCount: 3,
      totalHours: 48,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
      emergencyContact: '张母',
      emergencyPhone: '13900139002',
      medicalInfo: '无特殊病史',
      learningGoals: '掌握Python基础编程',
      notes: '学习积极性高，理解能力强',
      // 添加班级和课程关联
      classId: 1,
      className: 'Python基础A班',
      courseId: 1,
      courseName: 'Python基础入门',
      teacherId: 1,
      teacherName: '张伟'
    },
    {
      id: 2,
      name: '李四',
      gender: 0,
      age: 14,
      phone: '13800138002',
      email: 'lisi@example.com',
      parentName: '李父',
      parentPhone: '13900139003',
      address: '北京市海淀区',
      school: '北京市第二中学',
      grade: '初中三年级',
      joinDate: '2024-02-01',
      status: 'active',
      level: '中级',
      courseCount: 2,
      totalHours: 32,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      emergencyContact: '李母',
      emergencyPhone: '13900139004',
      medicalInfo: '无特殊病史',
      learningGoals: '学习Java编程基础',
      notes: '逻辑思维能力强，适合编程学习',
      // 添加班级和课程关联
      classId: 2,
      className: 'Java程序设计B班',
      courseId: 2,
      courseName: 'Java程序设计',
      teacherId: 2,
      teacherName: '李娜'
    },
    {
      id: 3,
      name: '王五',
      gender: 1,
      age: 16,
      phone: '13800138003',
      email: 'wangwu@example.com',
      parentName: '王父',
      parentPhone: '13900139005',
      address: '北京市西城区',
      school: '北京市第三中学',
      grade: '高中二年级',
      joinDate: '2024-01-20',
      status: 'active',
      level: '高级',
      courseCount: 4,
      totalHours: 64,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      emergencyContact: '王母',
      emergencyPhone: '13900139006',
      medicalInfo: '无特殊病史',
      learningGoals: '深入学习人工智能',
      notes: '对AI技术有浓厚兴趣，学习能力强',
      // 添加班级和课程关联
      classId: 3,
      className: 'AI智能C班',
      courseId: 3,
      courseName: '人工智能入门',
      teacherId: 4,
      teacherName: '陈思'
    },
    {
      id: 4,
      name: '赵六',
      gender: 0,
      age: 13,
      phone: '13800138004',
      email: 'zhaoliu@example.com',
      parentName: '赵父',
      parentPhone: '13900139007',
      address: '北京市东城区',
      school: '北京市第四中学',
      grade: '初中二年级',
      joinDate: '2024-03-01',
      status: 'active',
      level: '初级',
      courseCount: 1,
      totalHours: 16,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b976?w=150&h=150&fit=crop&crop=face',
      emergencyContact: '赵母',
      emergencyPhone: '13900139008',
      medicalInfo: '无特殊病史',
      learningGoals: '学习Scratch少儿编程',
      notes: '对编程有浓厚兴趣，动手能力强',
      // 添加班级和课程关联
      classId: 5,
      className: 'Scratch启蒙E班',
      courseId: 5,
      courseName: 'Scratch少儿编程',
      teacherId: 5,
      teacherName: '刘洋'
    },
    {
      id: 5,
      name: '孙七',
      gender: 1,
      age: 17,
      phone: '13800138005',
      email: 'sunqi@example.com',
      parentName: '孙父',
      parentPhone: '13900139009',
      address: '北京市丰台区',
      school: '北京市第五中学',
      grade: '高中三年级',
      joinDate: '2024-01-10',
      status: 'active',
      level: '高级',
      courseCount: 5,
      totalHours: 80,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      emergencyContact: '孙母',
      emergencyPhone: '13900139010',
      medicalInfo: '无特殊病史',
      learningGoals: '深入学习Web开发技术',
      notes: '技术基础扎实，学习能力强',
      // 添加班级和课程关联
      classId: 4,
      className: '网页设计D班',
      courseId: 4,
      courseName: '网页设计基础',
      teacherId: 3,
      teacherName: '王强'
    },
    // 添加更多学生到各班级
    {
      id: 6,
      name: '周八',
      gender: 0,
      age: 15,
      phone: '13800138006',
      email: 'zhouba@example.com',
      parentName: '周父',
      parentPhone: '13900139011',
      address: '北京市石景山区',
      school: '北京市第六中学',
      grade: '高中一年级',
      joinDate: '2024-02-15',
      status: 'active',
      level: '初级',
      courseCount: 2,
      totalHours: 24,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      emergencyContact: '周母',
      emergencyPhone: '13900139012',
      medicalInfo: '无特殊病史',
      learningGoals: '学习Python编程入门',
      notes: '对数学和逻辑很感兴趣',
      classId: 1,
      className: 'Python基础A班',
      courseId: 1,
      courseName: 'Python基础入门',
      teacherId: 1,
      teacherName: '张伟'
    },
    {
      id: 7,
      name: '吴九',
      gender: 1,
      age: 14,
      phone: '13800138007',
      email: 'wujiu@example.com',
      parentName: '吴父',
      parentPhone: '13900139013',
      address: '北京市门头沟区',
      school: '北京市第七中学',
      grade: '初中三年级',
      joinDate: '2024-03-01',
      status: 'active',
      level: '中级',
      courseCount: 3,
      totalHours: 40,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      emergencyContact: '吴母',
      emergencyPhone: '13900139014',
      medicalInfo: '无特殊病史',
      learningGoals: '深入学习Java编程',
      notes: '编程基础扎实，学习积极主动',
      classId: 2,
      className: 'Java程序设计B班',
      courseId: 2,
      courseName: 'Java程序设计',
      teacherId: 2,
      teacherName: '李娜'
    },
    {
      id: 8,
      name: '郑十',
      gender: 0,
      age: 16,
      phone: '13800138008',
      email: 'zhengshi@example.com',
      parentName: '郑父',
      parentPhone: '13900139015',
      address: '北京市房山区',
      school: '北京市第八中学',
      grade: '高中二年级',
      joinDate: '2024-03-10',
      status: 'active',
      level: '高级',
      courseCount: 4,
      totalHours: 56,
      avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=150&h=150&fit=crop&crop=face',
      emergencyContact: '郑母',
      emergencyPhone: '13900139016',
      medicalInfo: '无特殊病史',
      learningGoals: '掌握AI算法开发',
      notes: '数学成绩优秀，对算法有天赋',
      classId: 3,
      className: 'AI智能C班',
      courseId: 3,
      courseName: '人工智能入门',
      teacherId: 4,
      teacherName: '陈思'
    }
  ]

  // Getters
  const getStudents = computed(() => students.value)
  const getLoading = computed(() => loading.value)
  const getPagination = computed(() => pagination.value)
  const getDataSourceType = computed(() => dataSourceStore.getDataSourceType)

  // 计算学生统计
  const getStudentStats = computed(() => {
    const total = students.value.length
    const active = students.value.filter(s => s.status === 1).length
    const inactive = students.value.filter(s => s.status === 0).length
    const male = students.value.filter(s => s.gender === 1).length
    const female = students.value.filter(s => s.gender === 0).length
    
    const levelStats = {
      '初级': students.value.filter(s => s.level === '初级').length,
      '中级': students.value.filter(s => s.level === '中级').length,
      '高级': students.value.filter(s => s.level === '高级').length
    }

    const gradeStats = {
      '小学': students.value.filter(s => ['小一', '小二', '小三', '小四', '小五', '小六'].includes(s.grade)).length,
      '初中': students.value.filter(s => ['初一', '初二', '初三'].includes(s.grade)).length,
      '高中': students.value.filter(s => ['高一', '高二', '高三'].includes(s.grade)).length
    }

    return {
      total,
      active,
      inactive,
      male,
      female,
      levelStats,
      gradeStats
    }
  })

  // Actions
  // 获取学生列表
  const fetchStudents = async (params = {}) => {
    loading.value = true
    try {
      const useMock = dataSourceStore.type === 'mock'
      
      if (useMock) {
        // 模拟数据模式下的搜索过滤
        let filteredStudents = [...mockStudents]
        
        // 按姓名搜索
        if (params.name) {
          filteredStudents = filteredStudents.filter(student => 
            student.name.toLowerCase().includes(params.name.toLowerCase())
          )
        }
        
        // 按家长电话搜索
        if (params.phone) {
          filteredStudents = filteredStudents.filter(student => 
            student.parentPhone && student.parentPhone.includes(params.phone)
          )
        }
        
        // 按年级搜索
        if (params.grade) {
          filteredStudents = filteredStudents.filter(student => 
            student.grade === params.grade
          )
        }
        
        // 按状态搜索
        if (params.status !== undefined && params.status !== '') {
          filteredStudents = filteredStudents.filter(student => 
            student.status === parseInt(params.status)
          )
        }
        
        // 分页处理
        const page = params.page || 1
        const size = params.size || 10
        const start = (page - 1) * size
        const end = start + size
        const paginatedStudents = filteredStudents.slice(start, end)
        
        students.value = paginatedStudents
        pagination.value = {
          current: page,
          size: size,
          total: filteredStudents.length
          }
        
        console.log(`📊 学生数据获取成功 (数据源: ${getDataSourceType.value})，过滤后: ${filteredStudents.length}条`)
        return {
          records: paginatedStudents,
          total: filteredStudents.length,
          pagination: pagination.value
        }
      } else {
        // API模式
        const queryParams = new URLSearchParams({
          page: params.page || 1,
        size: params.size || 10,
          ...params
        }).toString()
        const url = `/students?${queryParams}`
        
        const response = await fetchData(url)
        students.value = response.records || []
        pagination.value = {
          current: response.pagination?.current || 1,
          size: response.pagination?.size || 10,
          total: response.total || 0
      }

      console.log(`📊 学生数据获取成功 (数据源: ${getDataSourceType.value})`)
      return response
      }
    } catch (error) {
      console.error('获取学生列表失败:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  // 添加学生
  const addStudent = async (studentData) => {
    // 参数校验
    if (!studentData || !studentData.name || studentData.gender === undefined || !studentData.age || !studentData.phone) {
      throw new Error('无效的学员数据，缺少必填字段')
    }
      try {
      const mockResponse = {
        id: Date.now(),
        ...studentData,
        studentNo: `S2023${String(students.value.length + 1).padStart(3, '0')}`,
        status: 'active',
        courseCount: 0,
        totalHours: 0,
        enrollDate: new Date().toISOString().slice(0, 10),
        createTime: new Date().toISOString(),
        level: '初级',
        avatar: '',
        emergencyContact: '',
        emergencyPhone: '',
        medicalInfo: '无特殊病史',
        learningGoals: '',
        notes: '',
        parentWechat: '',
        remark: ''
      }

      const response = await submitData(
        '/students',
        studentData,
        mockResponse,
        { method: 'post', forceMock: true }  // 强制使用模拟数据
      )

      // 模拟数据模式下，直接添加到本地列表以直观显示变化
      if (getDataSourceType.value === 'mock') {
        mockStudents.unshift(response)
        students.value.unshift(response)
        pagination.value.total++
      }
      console.log(`✅ 学生添加成功 (数据源: ${getDataSourceType.value})`)
      return response
      } catch (error) {
      console.error('添加学生失败:', error)
      throw error
    }
      }
    
    // 更新学生
  const updateStudent = async (id, studentData) => {
      try {
      const mockResponse = { id, ...studentData }

      const response = await submitData(
        `/students/${id}`,
        studentData,
        mockResponse,
        { method: 'put', forceMock: true }  // 强制使用模拟数据
      )

      // 模拟数据模式下，更新本地列表以直观显示变化
      if (getDataSourceType.value === 'mock') {
        const numId = parseInt(id, 10) // 确保ID为数字类型
        const index = mockStudents.findIndex(s => s.id === numId)
        if (index !== -1) {
          mockStudents[index] = { ...mockStudents[index], ...studentData, id: numId }
        }
        // 同时更新当前显示的数据
        const displayIndex = students.value.findIndex(s => s.id === numId)
        if (displayIndex !== -1) {
          students.value[displayIndex] = { ...students.value[displayIndex], ...studentData, id: numId }
        }
      }
      console.log(`✅ 学生更新成功 (数据源: ${getDataSourceType.value})`)
      return response
      } catch (error) {
      console.error('更新学生失败:', error)
      throw error
    }
      }

  // 删除学生
  const deleteStudent = async (id) => {
    try {
      const mockResponse = { success: true }

      const response = await submitData(
        `/students/${id}`,
        {},
        mockResponse,
        { method: 'delete', forceMock: true }  // 强制使用模拟数据
      )

      // 模拟数据模式下，从本地列表移除以直观显示变化
      if (getDataSourceType.value === 'mock') {
        const numId = parseInt(id, 10) // 确保ID为数字类型
        const index = mockStudents.findIndex(s => s.id === numId)
        if (index !== -1) {
          mockStudents.splice(index, 1)
        }
        // 同时更新当前显示的数据
        const displayIndex = students.value.findIndex(s => s.id === numId)
        if (displayIndex !== -1) {
          students.value.splice(displayIndex, 1)
          pagination.value.total--
        }
      }
      console.log(`✅ 学生删除成功 (数据源: ${getDataSourceType.value})`)
      return response
    } catch (error) {
      console.error('删除学生失败:', error)
      throw error
    }
  }

  // 获取学生详情
  const getStudentById = async (id) => {
    try {
      const mockStudent = mockStudents.find(s => s.id === id) || mockStudents[0]

      const response = await fetchData(
        `/students/${id}`,
        mockStudent,
        { forceMock: false }
      )

      console.log(`✅ 学生详情获取成功 (数据源: ${getDataSourceType.value})`)
      return response
    } catch (error) {
      console.error('获取学生详情失败:', error)
      throw error
    }
  }

  // 获取学生统计
  const getStudentStatistics = async () => {
    try {
      const mockStats = getStudentStats.value

      const response = await fetchData(
        '/students/stats',
        mockStats,
        { forceMock: false }
      )

      console.log(`✅ 学生统计获取成功 (数据源: ${getDataSourceType.value})`)
      return response
    } catch (error) {
      console.error('获取学生统计失败:', error)
      throw error
    }
  }

  // 监听数据源切换，自动刷新数据
  watch(() => dataSourceStore.type, () => {
    fetchStudents()
  })

  return {
    // 状态
    students,
    loading,
    pagination,

    // Getters
    getStudents,
    getLoading,
    getPagination,
    getDataSourceType,
    getStudentStats,

    // Actions
    fetchStudents,
    addStudent,
    updateStudent,
    deleteStudent,
    getStudentById,
    getStudentStatistics
  }
})