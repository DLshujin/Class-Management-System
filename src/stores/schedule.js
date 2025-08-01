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

  // Getters - 确保返回数组
  const getSchedules = computed(() => {
    const result = Array.isArray(schedules.value) ? schedules.value : [];
    console.log('📋 getSchedules computed 被调用:', {
      原始数据: schedules.value,
      结果长度: result.length,
      结果类型: typeof result,
      前3条: result.slice(0, 3)
    });
    return result;
  })
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

    const totalStudents = schedules.value.reduce((sum, s) => sum + (s.currentStudents || 0), 0)
    const totalCapacity = schedules.value.reduce((sum, s) => sum + (s.maxStudents || 0), 0)
    const occupancyRate = totalCapacity > 0 ? (totalStudents / totalCapacity * 100).toFixed(1) : 0
    
    // 计算教师工作量
    const teacherWorkload = {}
    schedules.value.forEach(s => {
      const teacherKey = s.teacherName || s.teacherId
      if (!teacherWorkload[teacherKey]) {
        teacherWorkload[teacherKey] = {
          teacherId: s.teacherId,
          teacherName: s.teacherName,
          scheduleCount: 0,
          studentCount: 0,
          classroomUsage: new Set()
        }
      }
      teacherWorkload[teacherKey].scheduleCount++
      teacherWorkload[teacherKey].studentCount += (s.currentStudents || 0)
      teacherWorkload[teacherKey].classroomUsage.add(s.classroom)
    })
    
    // 转换为数组并计算平均值
    const teacherStats = Object.values(teacherWorkload).map(teacher => ({
      ...teacher,
      classroomUsage: Array.from(teacher.classroomUsage),
      avgStudentsPerClass: teacher.scheduleCount > 0 ? (teacher.studentCount / teacher.scheduleCount).toFixed(1) : 0
    }))
    
    // 计算教室使用率
    const classroomUsage = {}
    schedules.value.forEach(s => {
      if (!classroomUsage[s.classroom]) {
        classroomUsage[s.classroom] = {
          name: s.classroom,
          scheduleCount: 0,
          totalStudents: 0,
          courses: new Set()
        }
      }
      classroomUsage[s.classroom].scheduleCount++
      classroomUsage[s.classroom].totalStudents += (s.currentStudents || 0)
      classroomUsage[s.classroom].courses.add(s.courseName)
    })
    
    const classroomStats = Object.values(classroomUsage).map(room => ({
      ...room,
      courses: Array.from(room.courses),
      avgStudentsPerSession: room.scheduleCount > 0 ? (room.totalStudents / room.scheduleCount).toFixed(1) : 0
    }))

    return {
      total,
      active,
      inactive,
      dayStats,
      totalStudents,
      totalCapacity,
      occupancyRate,
      teacherStats,
      classroomStats,
      averageClassSize: total > 0 ? (totalStudents / total).toFixed(1) : 0,
      peakDay: Object.keys(dayStats).reduce((a, b) => dayStats[a] > dayStats[b] ? a : b, '周一')
    }
  })

  // Actions
  // 获取排课列表
  const fetchSchedules = async (params = {}) => {
    console.log('📊 开始获取排课数据...', params);
    loading.value = true
    try {
      const queryParams = new URLSearchParams({
        page: params.page || 1,
        size: params.size || 10,
        ...params
      }).toString()

      const useMock = dataSourceStore.type === 'mock'
      console.log('📊 数据源配置:', {
        type: dataSourceStore.type,
        useMock,
        getDataSourceType: getDataSourceType.value
      });
      
      // 生成丰富的排课数据，与学生、课程、班级数据完全关联
      const generateMockSchedules = () => {
        const schedules = []
        const today = new Date()
        const year = today.getFullYear()
        const month = today.getMonth()
        
        // 课程基础信息 - 与实际数据对应
        const courses = [
          { 
            id: 1, 
            name: 'Python基础入门', 
            teacher: '张伟', 
            teacherId: 1, 
            className: 'Python基础A班', 
            classId: 1,
            studentIds: [1], // 张三
            studentNames: ['张三'],
            currentStudents: 1,
            maxStudents: 20,
            dayOfWeek: 6, // 周六
            startTime: '09:00:00',
            endTime: '11:00:00',
            classroom: 'A教室'
          },
          { 
            id: 2, 
            name: 'Java程序设计', 
            teacher: '李娜', 
            teacherId: 2, 
            className: 'Java程序设计B班', 
            classId: 2,
            studentIds: [2], // 李四
            studentNames: ['李四'],
            currentStudents: 1,
            maxStudents: 18,
            dayOfWeek: 3, // 周三
            startTime: '14:00:00',
            endTime: '16:00:00',
            classroom: 'B教室'
          },
          { 
            id: 3, 
            name: '人工智能入门', 
            teacher: '陈思', 
            teacherId: 4, 
            className: 'AI智能C班', 
            classId: 3,
            studentIds: [3], // 王五
            studentNames: ['王五'],
            currentStudents: 1,
            maxStudents: 15,
            dayOfWeek: 5, // 周五
            startTime: '19:00:00',
            endTime: '21:00:00',
            classroom: 'C教室'
          },
          { 
            id: 4, 
            name: '网页设计基础', 
            teacher: '王强', 
            teacherId: 3, 
            className: '网页设计D班', 
            classId: 4,
            studentIds: [6], // 孙七
            studentNames: ['孙七'],
            currentStudents: 1,
            maxStudents: 25,
            dayOfWeek: 0, // 周日
            startTime: '10:00:00',
            endTime: '12:00:00',
            classroom: 'D教室'
          },
          { 
            id: 5, 
            name: 'Scratch少儿编程', 
            teacher: '刘洋', 
            teacherId: 5, 
            className: 'Scratch启蒙E班', 
            classId: 5,
            studentIds: [4], // 赵六
            studentNames: ['赵六'],
            currentStudents: 1,
            maxStudents: 15,
            dayOfWeek: 6, // 周六
            startTime: '14:00:00',
            endTime: '16:00:00',
            classroom: 'E教室'
          }
        ]
        
        let scheduleId = 1
        
        // 为本月生成排课数据 - 基于实际课程安排
        for (let week = 0; week < 4; week++) { // 生成4周的课程安排
          courses.forEach(course => {
            // 计算本周该课程的日期
            const startOfWeek = new Date(year, month, 1 + (week * 7))
            const targetDate = new Date(startOfWeek)
            
            // 调整到目标星期几
            const daysToAdd = (course.dayOfWeek - startOfWeek.getDay() + 7) % 7
            targetDate.setDate(startOfWeek.getDate() + daysToAdd)
            
            // 确保日期在本月内
            if (targetDate.getMonth() === month && targetDate.getDate() <= 31) {
              // 为每个课程生成更多学员
              const additionalStudents = []
              const baseStudentCount = course.currentStudents
              const totalStudents = Math.min(baseStudentCount + Math.floor(Math.random() * 5), course.maxStudents)
              
              // 基础学员
              const studentList = course.studentIds.map((id, index) => ({
                id: id,
                name: course.studentNames[index],
                status: 1,
                attendanceRate: 85 + Math.floor(Math.random() * 15), // 85-100%出勤率
                performance: ['优秀', '良好', '中等'][Math.floor(Math.random() * 3)]
              }))
              
              // 添加额外学员
              for (let i = baseStudentCount; i < totalStudents; i++) {
                const studentId = 100 + i + (course.id * 10) // 确保ID唯一
                studentList.push({
                  id: studentId,
                  name: `学员${studentId}`,
                  status: Math.random() > 0.1 ? 1 : 0,
                  attendanceRate: 70 + Math.floor(Math.random() * 30),
                  performance: ['优秀', '良好', '中等'][Math.floor(Math.random() * 3)]
                })
              }
              
              const schedule = {
              id: scheduleId++,
                courseId: course.id,
                courseName: course.name,
              classId: course.classId,
              className: course.className,
              teacherId: course.teacherId,
              teacherName: course.teacher,
                scheduleDate: targetDate.toISOString().slice(0, 10),
                dayOfWeek: course.dayOfWeek,
                startTime: course.startTime,
                endTime: course.endTime,
                classroom: course.classroom,
                maxStudents: course.maxStudents,
                currentStudents: studentList.length,
                status: 1, // 正常状态
                type: 'regular',
                week: week + 1,
                session: `第${week + 1}周课程`,
                description: `${course.name} - ${course.classroom} - 第${week + 1}周`,
                students: studentList,
                attendanceCount: studentList.filter(s => s.status === 1).length,
                homework: `第${week + 1}周作业：${course.name}相关练习`,
                notes: `第${week + 1}周教学重点和学员表现记录`,
                materials: [`教材第${week + 1}章`, '课堂练习', '课后作业'],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
              }
              
              schedules.push(schedule)
              
              // 为每个课程额外生成一些补课或特殊安排
              if (Math.random() > 0.7) { // 30%概率生成补课
                const makeupDate = new Date(targetDate)
                makeupDate.setDate(makeupDate.getDate() + 2) // 两天后补课
                
                if (makeupDate.getMonth() === month) {
                  const makeupSchedule = {
                    ...schedule,
                    id: scheduleId++,
                    scheduleDate: makeupDate.toISOString().slice(0, 10),
                    dayOfWeek: makeupDate.getDay(),
                    type: 'makeup',
                    session: `第${week + 1}周补课`,
                    description: `${course.name} - ${course.classroom} - 第${week + 1}周补课`,
                    currentStudents: Math.max(1, studentList.length - Math.floor(Math.random() * 3)),
                    notes: `第${week + 1}周补课安排，针对缺课学员`
                  }
                  schedules.push(makeupSchedule)
                }
              }
            }
          })
        }
        
        // 添加一些特殊课程安排
        const specialSchedules = [
          {
            id: scheduleId++,
            courseId: 6,
            courseName: '编程综合实践',
            classId: 0,
            className: '综合实践班',
            teacherId: 1,
            teacherName: '张伟',
            scheduleDate: new Date(year, month, 15).toISOString().slice(0, 10),
            dayOfWeek: 6,
            startTime: '09:00:00',
            endTime: '17:00:00',
            classroom: '多媒体教室',
            maxStudents: 30,
            currentStudents: 8,
            status: 1,
            type: 'workshop',
            session: '编程马拉松',
            description: '编程综合实践 - 多媒体教室 - 全天工作坊',
            students: [
              { id: 1, name: '张三', status: 1, attendanceRate: 100, performance: '优秀' },
              { id: 2, name: '李四', status: 1, attendanceRate: 100, performance: '优秀' },
              { id: 3, name: '王五', status: 1, attendanceRate: 100, performance: '良好' },
              { id: 4, name: '赵六', status: 1, attendanceRate: 95, performance: '良好' },
              { id: 5, name: '孙七', status: 1, attendanceRate: 90, performance: '中等' },
              { id: 6, name: '周八', status: 1, attendanceRate: 100, performance: '优秀' },
              { id: 7, name: '吴九', status: 1, attendanceRate: 85, performance: '良好' },
              { id: 8, name: '郑十', status: 1, attendanceRate: 90, performance: '中等' }
            ],
            attendanceCount: 8,
            homework: '综合项目开发',
            notes: '跨班级综合实践活动，培养团队协作能力',
            materials: ['项目需求文档', '开发工具', '参考资料'],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ]
        
        schedules.push(...specialSchedules)
        
        // 添加基于真实数据的固定排课记录
        const fixedSchedules = [
          // 今天的排课记录 (2025年8月1日)
          {
            id: 1000,
            courseId: 1,
            courseName: 'Python基础入门',
            classId: 1,
            className: 'Python基础A班',
            teacherId: 1,
            teacherName: '张伟',
            scheduleDate: '2025-08-01', // 今天
            dayOfWeek: 5,
            startTime: '10:00:00',
            endTime: '12:00:00',
            classroom: 'A教室',
            maxStudents: 20,
            currentStudents: 18,
            status: 1,
            type: 'regular',
            session: 'Python项目实战',
            description: 'Python基础入门 - A教室 - 今日特训',
            students: [
              { id: 1, name: '张三', status: 1, attendanceRate: 95, performance: '优秀' }
            ],
            attendanceCount: 18,
            homework: '完成今日Python练习',
            notes: '今日重点复习Python基础知识',
            materials: ['Python教材', '实战项目', '在线平台'],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: 999,
            courseId: 5,
            courseName: 'Scratch少儿编程',
            classId: 5,
            className: 'Scratch启蒙E班',
            teacherId: 5,
            teacherName: '刘洋',
            scheduleDate: '2025-08-01', // 今天
            dayOfWeek: 5,
            startTime: '14:00:00',
            endTime: '16:00:00',
            classroom: 'E教室',
            maxStudents: 15,
            currentStudents: 12,
            status: 1,
            type: 'regular',
            session: 'Scratch创意编程',
            description: 'Scratch少儿编程 - E教室 - 今日创意课',
            students: [
              { id: 4, name: '赵六', status: 1, attendanceRate: 92, performance: '优秀' }
            ],
            attendanceCount: 12,
            homework: '设计一个有趣的小游戏',
            notes: '今日学习Scratch高级功能',
            materials: ['Scratch平台', '创意素材', '游戏模板'],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          // 张伟 - Python基础入门课程
          {
            id: 1001,
            courseId: 1,
            courseName: 'Python基础入门',
            classId: 1,
            className: 'Python基础A班',
            teacherId: 1,
            teacherName: '张伟',
            scheduleDate: '2025-08-04', // 周一
            dayOfWeek: 1,
            startTime: '09:00:00',
            endTime: '11:00:00',
            classroom: 'A教室',
            maxStudents: 20,
            currentStudents: 15,
            status: 1,
            type: 'regular',
            session: 'Python编程基础',
            description: 'Python基础入门 - A教室 - 面向对象编程',
            students: [
              { id: 1, name: '张三', status: 1, attendanceRate: 95, performance: '优秀' }
            ],
            attendanceCount: 15,
            homework: '完成变量与数据类型练习',
            notes: '本节课重点讲解Python变量定义和基本数据类型',
            materials: ['Python入门教材', '编程练习册', '在线代码平台'],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          // 李娜 - Java程序设计课程
          {
            id: 1002,
            courseId: 2,
            courseName: 'Java程序设计',
            classId: 2,
            className: 'Java程序设计B班',
            teacherId: 2,
            teacherName: '李娜',
            scheduleDate: '2025-08-05', // 周二
            dayOfWeek: 2,
            startTime: '14:00:00',
            endTime: '16:00:00',
            classroom: 'B教室',
            maxStudents: 18,
            currentStudents: 12,
            status: 1,
            type: 'regular',
            session: 'Java面向对象编程',
            description: 'Java程序设计 - B教室 - 面向对象基础',
            students: [
              { id: 2, name: '李四', status: 1, attendanceRate: 90, performance: '良好' }
            ],
            attendanceCount: 12,
            homework: '完成类与对象的设计练习',
            notes: '重点讲解Java面向对象编程思想和类的设计',
            materials: ['Java编程思想', '实战项目代码', 'IDE开发环境'],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          // 王强 - 网页设计基础课程
          {
            id: 1003,
            courseId: 4,
            courseName: '网页设计基础',
            classId: 4,
            className: '网页设计D班',
            teacherId: 3,
            teacherName: '王强',
            scheduleDate: '2025-08-06', // 周三
            dayOfWeek: 3,
            startTime: '19:00:00',
            endTime: '21:00:00',
            classroom: 'D教室',
            maxStudents: 25,
            currentStudents: 20,
            status: 1,
            type: 'regular',
            session: 'HTML与CSS基础',
            description: '网页设计基础 - D教室 - 前端技术入门',
            students: [
              { id: 5, name: '孙七', status: 1, attendanceRate: 88, performance: '良好' }
            ],
            attendanceCount: 20,
            homework: '设计一个个人网页作品',
            notes: '学习HTML标签结构和CSS样式设计',
            materials: ['HTML5与CSS3教程', '设计素材库', '代码编辑器'],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          // 陈思 - 人工智能入门课程
          {
            id: 1004,
            courseId: 3,
            courseName: '人工智能入门',
            classId: 3,
            className: 'AI智能C班',
            teacherId: 4,
            teacherName: '陈思',
            scheduleDate: '2025-08-07', // 周四
            dayOfWeek: 4,
            startTime: '15:30:00',
            endTime: '17:30:00',
            classroom: 'C教室',
            maxStudents: 15,
            currentStudents: 8,
            status: 1,
            type: 'regular',
            session: '机器学习算法基础',
            description: '人工智能入门 - C教室 - AI算法讲解',
            students: [
              { id: 3, name: '王五', status: 1, attendanceRate: 100, performance: '优秀' }
            ],
            attendanceCount: 8,
            homework: '完成线性回归算法实现',
            notes: '深入讲解机器学习核心算法和应用场景',
            materials: ['AI算法教材', 'Python机器学习库', '数据集样本'],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          // 刘洋 - Scratch少儿编程课程
          {
            id: 1005,
            courseId: 5,
            courseName: 'Scratch少儿编程',
            classId: 5,
            className: 'Scratch启蒙E班',
            teacherId: 5,
            teacherName: '刘洋',
            scheduleDate: '2025-08-08', // 周五
            dayOfWeek: 5,
            startTime: '16:00:00',
            endTime: '18:00:00',
            classroom: 'E教室',
            maxStudents: 15,
            currentStudents: 12,
            status: 1,
            type: 'regular',
            session: 'Scratch动画制作',
            description: 'Scratch少儿编程 - E教室 - 创意编程',
            students: [
              { id: 4, name: '赵六', status: 1, attendanceRate: 92, performance: '优秀' }
            ],
            attendanceCount: 12,
            homework: '制作一个小动画故事',
            notes: '通过Scratch培养孩子的逻辑思维和创造力',
            materials: ['Scratch编程平台', '创意素材包', '作品展示区'],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          // 周末课程安排
          {
            id: 1006,
            courseId: 1,
            courseName: 'Python基础入门',
            classId: 1,
            className: 'Python基础A班',
            teacherId: 1,
            teacherName: '张伟',
            scheduleDate: '2025-08-09', // 周六
            dayOfWeek: 6,
            startTime: '09:00:00',
            endTime: '11:00:00',
            classroom: 'A教室',
            maxStudents: 20,
            currentStudents: 18,
            status: 1,
            type: 'regular',
            session: 'Python项目实战',
            description: 'Python基础入门 - A教室 - 项目开发实践',
            students: [
              { id: 1, name: '张三', status: 1, attendanceRate: 95, performance: '优秀' }
            ],
            attendanceCount: 18,
            homework: '完成个人项目代码编写',
            notes: '结合实际项目加深对Python编程的理解',
            materials: ['项目需求文档', 'Python开发环境', '代码管理工具'],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: 1007,
            courseId: 5,
            courseName: 'Scratch少儿编程',
            classId: 5,
            className: 'Scratch启蒙E班',
            teacherId: 5,
            teacherName: '刘洋',
            scheduleDate: '2025-08-09', // 周六
            dayOfWeek: 6,
            startTime: '14:00:00',
            endTime: '16:00:00',
            classroom: 'E教室',
            maxStudents: 15,
            currentStudents: 14,
            status: 1,
            type: 'regular',
            session: 'Scratch游戏设计',
            description: 'Scratch少儿编程 - E教室 - 游戏开发',
            students: [
              { id: 4, name: '赵六', status: 1, attendanceRate: 92, performance: '优秀' }
            ],
            attendanceCount: 14,
            homework: '设计一个互动小游戏',
            notes: '学习游戏逻辑设计和用户交互',
            materials: ['游戏设计模板', 'Scratch高级功能', '作品分享平台'],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ]
        
        schedules.push(...fixedSchedules)
        
        return schedules.slice(0, 80) // 返回包含固定排课的完整数据
      }
      
      const mockSchedules = generateMockSchedules()
      console.log('📋 生成的模拟排课数据:', mockSchedules.length, '条');
      console.log('📋 前3条数据:', mockSchedules.slice(0, 3));
      
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
        { forceMock: true }  // 强制使用模拟数据
      )

      console.log('📊 fetchData 返回的 response:', response);
      console.log('📊 response 类型:', typeof response);
      console.log('📊 response.list:', response.list);
      console.log('📊 response.data:', response.data);
      
      // 更健壮的数据提取逻辑
      let scheduleData = [];
      if (response.list && Array.isArray(response.list)) {
        scheduleData = response.list;
      } else if (response.data && Array.isArray(response.data.list)) {
        scheduleData = response.data.list;
      } else if (response.data && Array.isArray(response.data)) {
        scheduleData = response.data;
      } else if (Array.isArray(response)) {
        scheduleData = response;
      }
      
      schedules.value = scheduleData;
      pagination.value = response.pagination || {
        current: params.page || 1,
        size: params.size || 10,
        total: schedules.value.length
      }

      console.log(`📊 排课数据获取成功 (数据源: ${getDataSourceType.value})，获取到 ${schedules.value.length} 条记录`)
      console.log('📊 schedules.value 最终赋值:', schedules.value);
      console.log('📊 getSchedules computed:', getSchedules.value);
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
        { method: 'post', forceMock: true }  // 强制使用模拟数据
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
        { method: 'put', forceMock: true }  // 强制使用模拟数据
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
        { method: 'delete', forceMock: true }  // 强制使用模拟数据
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
        { method: 'put', forceMock: true }  // 强制使用模拟数据
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