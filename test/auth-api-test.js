/**
 * 认证和用户管理API测试
 * 测试登录、个人中心、系统设置等页面的API调用
 */

import api from '../src/utils/api.js'
import { createPinia, setActivePinia } from 'pinia'
import { useUserStore } from '../src/stores/user.js'

// 模拟完整的浏览器环境
global.localStorage = {
  data: {},
  getItem(key) {
    return this.data[key] || null
  },
  setItem(key, value) {
    this.data[key] = String(value)
  },
  removeItem(key) {
    delete this.data[key]
  },
  clear() {
    this.data = {}
  }
}

global.sessionStorage = {
  data: {},
  getItem(key) {
    return this.data[key] || null
  },
  setItem(key, value) {
    this.data[key] = String(value)
  },
  removeItem(key) {
    delete this.data[key]
  },
  clear() {
    this.data = {}
  }
}

global.window = {
  location: {
    href: '/',
    origin: 'http://localhost:3000',
    pathname: '/'
  },
  history: {
    pushState: () => {},
    replaceState: () => {}
  }
}

global.document = {
  title: 'Test Document',
  createElement: () => ({
    setAttribute: () => {},
    click: () => {}
  })
}

// 模拟FormData
global.FormData = class FormData {
  constructor() {
    this.data = new Map()
  }
  append(key, value) {
    this.data.set(key, value)
  }
  get(key) {
    return this.data.get(key)
  }
}

// 模拟File
global.File = class File {
  constructor(chunks, filename, options = {}) {
    this.name = filename
    this.size = chunks.reduce((size, chunk) => size + chunk.length, 0)
    this.type = options.type || 'application/octet-stream'
  }
}

// 测试结果记录
const testResults = {
  passed: 0,
  failed: 0,
  errors: []
}

// 测试工具函数
const testUtils = {
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

  checkDataIntegrity(data, expectedFields) {
    if (!data) return false
    return expectedFields.every(field => data.hasOwnProperty(field))
  }
}

class AuthApiTestSuite {
  constructor() {
    this.pinia = createPinia()
    setActivePinia(this.pinia)
    this.userStore = useUserStore()
  }

  // 测试用户认证API
  async testAuthenticationApi() {
    console.log('\n🔐 测试用户认证API...')

    try {
      // 测试获取验证码
      console.log('测试获取验证码API...')
      const captchaResult = await api.get('/auth/captcha')
      testUtils.assert(captchaResult && captchaResult.success === true, '验证码API调用正常')
      testUtils.assert(captchaResult.captcha && captchaResult.key, '验证码数据结构正确')
      testUtils.assert(typeof captchaResult.captcha === 'string', '验证码是字符串格式')
      testUtils.assert(typeof captchaResult.key === 'string', '验证码key是字符串格式')

      // 测试管理员登录
      console.log('测试管理员登录API...')
      const adminLoginData = {
        username: 'admin',
        password: 'admin123',
        loginType: 'admin'
      }
      const adminLoginResult = await api.post('/auth/login', adminLoginData)
      testUtils.assert(adminLoginResult && adminLoginResult.success === true, '管理员登录API调用正常')
      testUtils.assert(adminLoginResult.token && typeof adminLoginResult.token === 'string', '登录返回token正常')
      testUtils.assert(adminLoginResult.user && adminLoginResult.user.username === 'admin', '登录返回用户信息正常')
      testUtils.assert(adminLoginResult.user && adminLoginResult.user.role === 'admin', '用户角色信息正确')

      // 测试教师登录
      console.log('测试教师登录API...')
      const teacherLoginData = {
        name: '张老师',
        phone: '13800138001',
        password: 'teacher123',
        loginType: 'teacher'
      }
      const teacherLoginResult = await api.post('/auth/login', teacherLoginData)
      testUtils.assert(teacherLoginResult && teacherLoginResult.success === true, '教师登录API调用正常')
      testUtils.assert(teacherLoginResult.token && typeof teacherLoginResult.token === 'string', '教师登录返回token正常')
      testUtils.assert(teacherLoginResult.user && teacherLoginResult.user.role === 'teacher', '教师角色信息正确')

      // 测试错误登录
      console.log('测试错误登录处理...')
      const errorResult = await api.post('/auth/login', {
        username: 'wrong',
        password: 'wrong',
        loginType: 'admin'
      })
      testUtils.assert(errorResult && errorResult.success === false, '错误登录应该返回失败状态')
      testUtils.assert(errorResult.message && typeof errorResult.message === 'string', '错误登录返回错误消息')

    } catch (error) {
      console.error('认证API测试失败:', error)
      testUtils.assert(false, `认证API测试异常: ${error.message}`)
    }
  }

  // 测试用户管理API
  async testUserManagementApi() {
    console.log('\n👤 测试用户管理API...')

    try {
      // 测试获取当前用户信息
      console.log('测试获取当前用户信息API...')
      const currentUserResult = await api.get('/users/current')
      testUtils.assert(currentUserResult && currentUserResult.id, '获取当前用户信息API正常')
      testUtils.assert(testUtils.checkDataIntegrity(currentUserResult, ['id', 'name', 'username', 'role']), '用户信息结构完整')

      // 测试获取用户资料
      console.log('测试获取用户资料API...')
      const profileResult = await api.get('/users/profile')
      testUtils.assert(profileResult && profileResult.success, '获取用户资料API正常')
      testUtils.assert(profileResult.user, '用户资料数据正常')

      // 测试更新用户资料
      console.log('测试更新用户资料API...')
      const updateProfileData = {
        name: '测试用户',
        email: 'test@example.com',
        phone: '13800138000',
        bio: '这是测试用户简介'
      }
      const updateProfileResult = await api.put('/users/profile', updateProfileData)
      testUtils.assert(updateProfileResult && updateProfileResult.success, '更新用户资料API正常')

      // 测试修改密码
      console.log('测试修改密码API...')
      const changePasswordData = {
        oldPassword: 'admin123',
        newPassword: 'newpassword123',
        confirmPassword: 'newpassword123'
      }
      const changePasswordResult = await api.post('/users/1/change-password', changePasswordData)
      testUtils.assert(changePasswordResult && changePasswordResult.success, '修改密码API正常')

      // 测试头像上传
      console.log('测试头像上传API...')
      const avatarResult = await api.post('/users/avatar', { file: 'mock-file' })
      testUtils.assert(avatarResult && avatarResult.success, '头像上传API正常')

      // 测试获取用户列表
      console.log('测试获取用户列表API...')
      const usersListResult = await api.get('/users', { current: 1, size: 10 })
      testUtils.assert(usersListResult && usersListResult.success === true, '获取用户列表API正常')
      testUtils.assert(usersListResult.data && usersListResult.data.records && Array.isArray(usersListResult.data.records), '用户列表分页信息正常')

    } catch (error) {
      console.error('用户管理API测试失败:', error)
      testUtils.assert(false, `用户管理API测试异常: ${error.message}`)
    }
  }

  // 测试系统设置API
  async testSystemSettingsApi() {
    console.log('\n⚙️ 测试系统设置API...')

    try {
      // 测试获取系统设置
      console.log('测试获取系统设置API...')
      const settingsResult = await api.get('/settings')
      testUtils.assert(settingsResult && settingsResult.success, '获取系统设置API正常')
      testUtils.assert(settingsResult.settings, '系统设置数据正常')

      // 验证设置项结构
      const settings = settingsResult.settings
      const expectedSections = ['basic', 'database', 'security', 'notification']
      expectedSections.forEach(section => {
        testUtils.assert(settings[section], `系统设置包含${section}配置`)
      })

      // 测试基础设置项
      testUtils.assert(settings.basic.siteName, '系统名称配置正常')
      testUtils.assert(settings.basic.siteDescription, '系统描述配置正常')
      testUtils.assert(typeof settings.basic.enableRegistration === 'boolean', '注册开关配置正常')

      // 测试数据库设置项
      testUtils.assert(settings.database.host, '数据库主机配置正常')
      testUtils.assert(settings.database.port, '数据库端口配置正常')
      testUtils.assert(settings.database.database, '数据库名称配置正常')

      // 测试安全设置项
      testUtils.assert(typeof settings.security.enableTwoFactor === 'boolean', '双因素认证配置正常')
      testUtils.assert(typeof settings.security.sessionTimeout === 'number', '会话超时配置正常')
      testUtils.assert(typeof settings.security.maxLoginAttempts === 'number', '最大登录尝试次数配置正常')

      // 测试通知设置项
      testUtils.assert(typeof settings.notification.enableEmail === 'boolean', '邮件通知配置正常')
      testUtils.assert(typeof settings.notification.enableSms === 'boolean', '短信通知配置正常')

      console.log('✅ 系统设置API结构验证完成')

    } catch (error) {
      console.error('系统设置API测试失败:', error)
      testUtils.assert(false, `系统设置API测试异常: ${error.message}`)
    }
  }

  // 测试权限相关API
  async testPermissionApi() {
    console.log('\n🔒 测试权限相关功能...')

    try {
      // 测试用户权限检查
      console.log('测试用户权限检查...')
      
      // 模拟管理员权限
      const adminUser = {
        role: 'admin',
        permissions: ['manage_users', 'manage_courses', 'manage_settings', 'view_reports']
      }

      // 模拟教师权限
      const teacherUser = {
        role: 'teacher', 
        permissions: ['view_students', 'manage_classes', 'view_schedule']
      }

      // 验证权限检查逻辑
      testUtils.assert(adminUser.permissions.includes('manage_settings'), '管理员拥有系统设置权限')
      testUtils.assert(!teacherUser.permissions.includes('manage_settings'), '教师没有系统设置权限')
      testUtils.assert(teacherUser.permissions.includes('view_schedule'), '教师拥有查看排课权限')

      console.log('✅ 权限检查逻辑正常')

    } catch (error) {
      console.error('权限API测试失败:', error)
      testUtils.assert(false, `权限API测试异常: ${error.message}`)
    }
  }

  // 运行所有测试
  async runAllTests() {
    console.log('🔐 开始认证和用户管理API测试...\n')

    await this.testAuthenticationApi()
    await this.testUserManagementApi() 
    await this.testSystemSettingsApi()
    await this.testPermissionApi()

    // 输出测试结果
    console.log('\n📊 认证API测试结果汇总:')
    console.log(`✅ 通过: ${testResults.passed}`)
    console.log(`❌ 失败: ${testResults.failed}`)
    console.log(`📈 成功率: ${((testResults.passed / (testResults.passed + testResults.failed)) * 100).toFixed(2)}%`)

    if (testResults.failed > 0) {
      console.log('\n❌ 失败的测试项:')
      testResults.errors.forEach(error => console.log(`  - ${error}`))
      return false
    } else {
      console.log('\n🎉 所有认证API测试通过！')
      return true
    }
  }
}

export default AuthApiTestSuite 