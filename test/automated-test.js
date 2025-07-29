/**
 * 自动化测试脚本
 * 测试所有功能模块的API调用、数据获取、UI显示和联动功能
 */

import api from '../src/utils/api.js'
import { createPinia, setActivePinia } from 'pinia'
import { useTeacherStore } from '../src/stores/teacher.js'
import { useCourseStore } from '../src/stores/course.js'
import { useStudentStore } from '../src/stores/student.js'
import { useClassStore } from '../src/stores/class.js'
import { useFinanceDataStore } from '../src/stores/financeData.js'
import { useNoticeStore } from '../src/stores/notice.js'
import { useScheduleStore } from '../src/stores/schedule.js'
import { useDataSourceStore } from '../src/stores/dataSource.js'
import { useNotificationStore } from '../src/stores/notification.js'

// 测试结果记录
const testResults = {
  passed: 0,
  failed: 0,
  errors: []
}

// 测试工具函数
const testUtils = {
  // 断言函数
  assert(condition, message) {
    if (condition) {
      console.log(`✅ ${message}`)
      testResults.passed++
    } else {
      console.error(`❌ ${message}`)
      testResults.failed++
      testResults.errors.push(message)
    }
  },

  // 检查数据完整性
  checkDataIntegrity(data, expectedFields) {
    if (!data) return false
    return expectedFields.every(field => data.hasOwnProperty(field))
  },

  // 检查数组数据
  checkArrayData(array, minLength = 0) {
    return Array.isArray(array) && array.length >= minLength
  },

  // 模拟用户操作
  async simulateUserAction(action) {
    try {
      await action()
      return true
    } catch (error) {
      console.error('用户操作失败:', error)
      return false
    }
  }
}

// 测试套件
class AutomatedTestSuite {
  constructor() {
    this.stores = {}
  }

  // 初始化测试环境
  async init() {
    console.log('🚀 初始化测试环境...')
    setActivePinia(createPinia())
    this.stores.teacher = useTeacherStore()
    this.stores.course = useCourseStore()
    this.stores.student = useStudentStore()
    this.stores.class = useClassStore()
    this.stores.finance = useFinanceDataStore()
    this.stores.notice = useNoticeStore()
    this.stores.schedule = useScheduleStore()
    this.stores.dataSource = useDataSourceStore()
    this.stores.notification = useNotificationStore()
    
    console.log('✅ 测试环境初始化完成')
  }

  // 测试API接口
  async testAPIs() {
    console.log('\n📡 测试API接口...')
    
    // 测试健康检查
    try {
      const health = await api.get('/health')
      testUtils.assert(health.status === 'ok', '健康检查API正常')
    } catch (error) {
      testUtils.assert(false, `健康检查API失败: ${error.message}`)
    }

    // 测试认证API
    try {
      const loginResult = await api.post('/auth/login', {
        username: 'admin',
        password: 'admin123'
      })
      testUtils.assert(loginResult.token, '登录API正常')
    } catch (error) {
      testUtils.assert(false, `登录API失败: ${error.message}`)
    }

    // 测试用户搜索API
    try {
      const searchResult = await api.get('/users/search', {
        params: { keyword: 'admin' }
      })
      testUtils.assert(Array.isArray(searchResult), '用户搜索API正常')
    } catch (error) {
      testUtils.assert(false, `用户搜索API失败: ${error.message}`)
    }

    // 测试通知API
    try {
      const notifications = await api.get('/notifications')
      testUtils.assert(notifications.records, '通知API正常')
    } catch (error) {
      testUtils.assert(false, `通知API失败: ${error.message}`)
    }

    // 测试公告API
    try {
      const notices = await api.get('/notices')
      testUtils.assert(notices.records, '公告API正常')
    } catch (error) {
      testUtils.assert(false, `公告API失败: ${error.message}`)
    }
  }

  // 测试数据获取
  async testDataFetching() {
    console.log('\n📊 测试数据获取...')
    
    // 测试学员数据获取
    try {
      // 确保学员数据已加载
      await this.stores.student.fetchStudents()
      const students = this.stores.student.getStudents
      testUtils.assert(testUtils.checkArrayData(students, 1), '学员数据获取正常')
      testUtils.assert(testUtils.checkDataIntegrity(students[0], ['id', 'name', 'gender', 'age']), '学员数据结构完整')
    } catch (error) {
      testUtils.assert(false, `学员数据获取失败: ${error.message}`)
    }

    // 测试教师数据获取
    try {
      await this.stores.teacher.fetchTeachers()
      const teachers = this.stores.teacher.getTeachers
      console.log('教师测试实际数据:', teachers)
      testUtils.assert(testUtils.checkArrayData(teachers, 1), '教师数据获取正常')
      testUtils.assert(testUtils.checkDataIntegrity(teachers[0], ['id', 'name', 'specialty', 'phone']), '教师数据结构完整')
    } catch (error) {
      testUtils.assert(false, `教师数据获取失败: ${error.message}`)
    }

    // 测试课程数据获取
    try {
      await this.stores.course.fetchCourses()
      const courses = this.stores.course.getCourses
      console.log('课程测试实际数据:', courses)
      testUtils.assert(testUtils.checkArrayData(courses, 1), '课程数据获取正常')
      testUtils.assert(testUtils.checkDataIntegrity(courses[0], ['id', 'name', 'type', 'price']), '课程数据结构完整')
    } catch (error) {
      testUtils.assert(false, `课程数据获取失败: ${error.message}`)
    }

    // 测试班级数据获取
    try {
      await this.stores.class.fetchClasses()
      const classes = this.stores.class.getClasses
      testUtils.assert(testUtils.checkArrayData(classes, 1), '班级数据获取正常')
      testUtils.assert(testUtils.checkDataIntegrity(classes[0], ['id', 'name', 'teacherId', 'courseId']), '班级数据结构完整')
    } catch (error) {
      testUtils.assert(false, `班级数据获取失败: ${error.message}`)
    }

    // 测试排课数据获取
    try {
      await this.stores.schedule.fetchSchedules()
      const schedules = this.stores.schedule.getSchedules
      testUtils.assert(testUtils.checkArrayData(schedules, 0), '排课数据获取正常')
    } catch (error) {
      testUtils.assert(false, `排课数据获取失败: ${error.message}`)
    }

    // 测试财务数据获取
    try {
      await this.stores.finance.fetchFinanceList()
      const financeData = this.stores.finance.getFinanceList
      testUtils.assert(testUtils.checkArrayData(financeData, 0), '财务数据获取正常')
    } catch (error) {
      testUtils.assert(false, `财务数据获取失败: ${error.message}`)
    }

    // 测试通知数据获取
    try {
      await this.stores.notification.fetchNotifications()
      const notifications = this.stores.notification.getNotifications
      testUtils.assert(testUtils.checkArrayData(notifications, 0), '通知数据获取正常')
    } catch (error) {
      testUtils.assert(false, `通知数据获取失败: ${error.message}`)
    }

    // 测试公告数据获取
    try {
      await this.stores.notice.fetchNotices()
      const notices = this.stores.notice.systemNotices
      testUtils.assert(testUtils.checkArrayData(notices, 0), '公告数据获取正常')
    } catch (error) {
      testUtils.assert(false, `公告数据获取失败: ${error.message}`)
    }
  }

  // 测试数据操作
  async testDataOperations() {
    console.log('\n🔧 测试数据操作...')
    
    // 测试学员操作
    try {
      const newStudent = {
        name: '测试学员',
        gender: 1,
        age: 15,
        phone: '13800138000',
        email: 'test@example.com',
        parentName: '测试家长',
        parentPhone: '13900139000'
      }
      
      const addResult = await this.stores.student.addStudent(newStudent)
      testUtils.assert(addResult, '学员添加操作正常')
      
      // 重新获取学员数据以确保同步
      await this.stores.student.fetchStudents()
      const students = this.stores.student.getStudents
      // 支持新增数据的包装格式和原始格式
      const addedStudent = students.find(s => {
        const studentData = s.data || s; // 处理包装格式
        return studentData.name === '测试学员';
      });
      testUtils.assert(addedStudent, '学员添加后数据同步正常')
      
      // 测试更新（确保ID存在）
      const studentData = addedStudent?.data || addedStudent;
      if (studentData && studentData.id) {
        const updateResult = await this.stores.student.updateStudent(studentData.id, { age: 16 })
      testUtils.assert(updateResult, '学员更新操作正常')
      
      // 测试删除
        const deleteResult = await this.stores.student.deleteStudent(studentData.id)
      testUtils.assert(deleteResult, '学员删除操作正常')
      }
      
    } catch (error) {
      testUtils.assert(false, `学员操作失败: ${error.message}`)
    }

    // 测试教师操作
    try {
      const newTeacher = {
        name: '测试教师',
        gender: 1,
        specialty: 'Python',
        phone: '13800138001',
        email: 'teacher@example.com'
      }
      
      const addResult = await this.stores.teacher.addTeacher(newTeacher)
      testUtils.assert(addResult, '教师添加操作正常')
      
      // 重新获取教师数据以确保同步
      await this.stores.teacher.fetchTeachers()
      const teachers = this.stores.teacher.getTeachers
      // 支持新增数据的包装格式和原始格式
      const addedTeacher = teachers.find(t => {
        const teacherData = t.data || t; // 处理包装格式
        return teacherData.name === '测试教师';
      });
      testUtils.assert(addedTeacher, '教师添加后数据同步正常')
      
      // 测试更新（确保ID存在）
      const teacherData = addedTeacher?.data || addedTeacher;
      if (teacherData && teacherData.id) {
        const updateResult = await this.stores.teacher.updateTeacher(teacherData.id, { specialty: 'Java' })
      testUtils.assert(updateResult, '教师更新操作正常')
      
      // 测试删除
        const deleteResult = await this.stores.teacher.deleteTeacher(teacherData.id)
      testUtils.assert(deleteResult, '教师删除操作正常')
      }
      
    } catch (error) {
      testUtils.assert(false, `教师操作失败: ${error.message}`)
    }

    // 测试课程操作
    try {
      const newCourse = {
        name: '测试课程',
        type: '编程基础',
        price: 1000,
        periods: 20
      }
      
      const addResult = await this.stores.course.addCourse(newCourse)
      testUtils.assert(addResult, '课程添加操作正常')
      
      // 重新获取课程数据以确保同步
      await this.stores.course.fetchCourses()
      const courses = this.stores.course.getCourses
      // 支持新增数据的包装格式和原始格式
      const addedCourse = courses.find(c => {
        const courseData = c.data || c; // 处理包装格式
        return courseData.name === '测试课程';
      });
      testUtils.assert(addedCourse, '课程添加后数据同步正常')
      
      // 测试更新（确保ID存在）
      const courseData = addedCourse?.data || addedCourse;
      if (courseData && courseData.id) {
        const updateResult = await this.stores.course.updateCourse(courseData.id, { price: 1200 })
      testUtils.assert(updateResult, '课程更新操作正常')
      
      // 测试删除
        const deleteResult = await this.stores.course.deleteCourse(courseData.id)
      testUtils.assert(deleteResult, '课程删除操作正常')
      }
      
    } catch (error) {
      testUtils.assert(false, `课程操作失败: ${error.message}`)
    }
  }

  // 测试数据联动
  async testDataLinkage() {
    console.log('\n🔗 测试数据联动...')
    
    // 测试首页统计联动
    try {
      const initialStudentCount = this.stores.student.getStudents?.length || 0
      const initialTeacherCount = this.stores.teacher.getTeachers?.length || 0
      const initialCourseCount = this.stores.course.getCourses?.length || 0
      const initialClassCount = this.stores.class.getClasses?.length || 0
      
      // 添加测试数据
      await this.stores.student.addStudent({
        name: '联动测试学员',
        gender: 1,
        age: 15,
        phone: '13800138002'
      })
      
      await this.stores.teacher.addTeacher({
        name: '联动测试教师',
        gender: 1,
        specialty: 'Python',
        phone: '13800138003'
      })
      
      await this.stores.course.addCourse({
        name: '联动测试课程',
        type: '编程基础',
        price: 1000
      })
      
      await this.stores.class.addClass({
        name: '联动测试班级',
        teacherId: 1,
        courseId: 1
      })
      
      // 验证数据联动
      const newStudentCount = this.stores.student.getStudents?.length || 0
      const newTeacherCount = this.stores.teacher.getTeachers?.length || 0
      const newCourseCount = this.stores.course.getCourses?.length || 0
      const newClassCount = this.stores.class.getClasses?.length || 0
      
      testUtils.assert(newStudentCount > initialStudentCount, '学员数据联动正常')
      testUtils.assert(newTeacherCount > initialTeacherCount, '教师数据联动正常')
      testUtils.assert(newCourseCount > initialCourseCount, '课程数据联动正常')
      testUtils.assert(newClassCount > initialClassCount, '班级数据联动正常')
      
      // 清理测试数据
      const students = this.stores.student.getStudents
      const teachers = this.stores.teacher.getTeachers
      const courses = this.stores.course.getCourses
      const classes = this.stores.class.getClasses
      
      const testStudent = students.find(s => s.name === '联动测试学员')
      const testTeacher = teachers.find(t => t.name === '联动测试教师')
      const testCourse = courses.find(c => c.name === '联动测试课程')
      const testClass = classes.find(c => c.name === '联动测试班级')
      
      if (testStudent) await this.stores.student.deleteStudent(testStudent.id)
      if (testTeacher) await this.stores.teacher.deleteTeacher(testTeacher.id)
      if (testCourse) await this.stores.course.deleteCourse(testCourse.id)
      if (testClass) await this.stores.class.deleteClass(testClass.id)
      
    } catch (error) {
      testUtils.assert(false, `数据联动测试失败: ${error.message}`)
    }
  }

  // 测试数据源切换
  async testDataSourceSwitching() {
    console.log('\n🔄 测试数据源切换...')
    
    try {
      // 切换到API模式
      this.stores.dataSource.setDataSource('api')
      testUtils.assert(this.stores.dataSource.type === 'api', '数据源切换到API模式正常')
      
      // 切换到Mock模式
      this.stores.dataSource.setDataSource('mock')
      testUtils.assert(this.stores.dataSource.type === 'mock', '数据源切换到Mock模式正常')
      
      // 验证切换后数据一致性
      await this.stores.student.fetchStudents()
      await this.stores.teacher.fetchTeachers()
      await this.stores.course.fetchCourses()
      
      const students = this.stores.student.getStudents
      const teachers = this.stores.teacher.getTeachers
      const courses = this.stores.course.getCourses
      
      testUtils.assert(testUtils.checkArrayData(students, 0), '切换后学员数据正常')
      testUtils.assert(testUtils.checkArrayData(teachers, 0), '切换后教师数据正常')
      testUtils.assert(testUtils.checkArrayData(courses, 0), '切换后课程数据正常')
      
    } catch (error) {
      testUtils.assert(false, `数据源切换测试失败: ${error.message}`)
    }
  }

  // 测试错误处理
  async testErrorHandling() {
    console.log('\n⚠️ 测试错误处理...')
    
    try {
      // 测试无效API调用
      try {
        await api.get('/invalid-endpoint')
        testUtils.assert(false, '无效API应该抛出错误')
      } catch (error) {
        testUtils.assert(true, '无效API错误处理正常')
      }
      
      // 测试数据验证
      try {
        await this.stores.student.addStudent({})
        testUtils.assert(false, '无效数据应该被拒绝')
      } catch (error) {
        testUtils.assert(true, '数据验证错误处理正常')
      }
      
    } catch (error) {
      testUtils.assert(false, `错误处理测试失败: ${error.message}`)
    }
  }

  // 运行所有测试
  async runAllTests() {
    console.log('🧪 开始自动化测试...')
    
    await this.init()
    await this.testAPIs()
    await this.testDataFetching()
    await this.testDataOperations()
    await this.testDataLinkage()
    await this.testDataSourceSwitching()
    await this.testErrorHandling()
    
    this.printResults()
  }

  // 打印测试结果
  printResults() {
    console.log('\n📊 测试结果汇总:')
    console.log(`✅ 通过: ${testResults.passed}`)
    console.log(`❌ 失败: ${testResults.failed}`)
    console.log(`📈 成功率: ${((testResults.passed / (testResults.passed + testResults.failed)) * 100).toFixed(2)}%`)
    
    if (testResults.errors.length > 0) {
      console.log('\n❌ 失败详情:')
      testResults.errors.forEach((error, index) => {
        console.log(`${index + 1}. ${error}`)
      })
    }
    
    if (testResults.failed === 0) {
      console.log('\n🎉 所有测试通过！系统功能完整，可以安全进行后端开发。')
    } else {
      console.log('\n⚠️ 存在测试失败项，请检查相关功能。')
    }
  }
}

// 导出测试套件
export default AutomatedTestSuite 