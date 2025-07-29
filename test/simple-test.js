/**
 * 简化测试脚本
 * 验证核心功能是否正常工作
 */

import api from '../src/utils/api.js'

// 测试结果
const results = {
  passed: 0,
  failed: 0,
  errors: []
}

// 测试工具
const test = {
  assert(condition, message) {
    if (condition) {
      console.log(`✅ ${message}`)
      results.passed++
    } else {
      console.error(`❌ ${message}`)
      results.failed++
      results.errors.push(message)
    }
  },

  async testAPI(endpoint, expectedFields = []) {
    try {
      const response = await api.get(endpoint)
      console.log(`${endpoint} 响应:`, response)
      
      // 检查响应结构
      this.assert(response, `${endpoint} API响应正常`)
      
      if (response.records) {
        this.assert(Array.isArray(response.records), `${endpoint} records是数组`)
        if (response.records.length > 0) {
          const firstRecord = response.records[0]
          expectedFields.forEach(field => {
            this.assert(firstRecord.hasOwnProperty(field), `${endpoint} 包含字段: ${field}`)
          })
        }
      }
      
      return response
    } catch (error) {
      this.assert(false, `${endpoint} API失败: ${error.message}`)
      return null
    }
  },

  async testAdd(endpoint, data, expectedFields = []) {
    try {
      const response = await api.post(endpoint, data)
      console.log(`${endpoint} 添加响应:`, response)
      
      this.assert(response.success, `${endpoint} 添加成功`)
      
      if (response.data) {
        expectedFields.forEach(field => {
          this.assert(response.data.hasOwnProperty(field), `${endpoint} 返回数据包含字段: ${field}`)
        })
      }
      
      return response
    } catch (error) {
      this.assert(false, `${endpoint} 添加失败: ${error.message}`)
      return null
    }
  }
}

// 运行测试
async function runTests() {
  console.log('🧪 开始简化测试...\n')
  
  // 测试数据获取
  console.log('📊 测试数据获取...')
  await test.testAPI('/students', ['id', 'name', 'gender', 'age'])
  await test.testAPI('/teachers', ['id', 'name', 'specialty', 'phone'])
  await test.testAPI('/courses', ['id', 'name', 'category', 'price'])
  await test.testAPI('/classes', ['id', 'name', 'teacherId', 'courseId'])
  await test.testAPI('/finance', ['id', 'date', 'type', 'amount'])
  await test.testAPI('/notices', ['id', 'title', 'content', 'createTime'])
  
  // 测试数据添加
  console.log('\n🔧 测试数据添加...')
  await test.testAdd('/students', {
    name: '测试学员',
    gender: 1,
    age: 15,
    phone: '13800138000'
  }, ['id', 'name', 'studentNo'])
  
  await test.testAdd('/teachers', {
    name: '测试教师',
    gender: 1,
    specialty: 'Python',
    phone: '13800138001'
  }, ['id', 'name', 'username'])
  
  await test.testAdd('/courses', {
    name: '测试课程',
    type: '编程基础',
    price: 2000
  }, ['id', 'name', 'code'])
  
  // 打印结果
  console.log('\n📊 测试结果汇总:')
  console.log(`✅ 通过: ${results.passed}`)
  console.log(`❌ 失败: ${results.failed}`)
  console.log(`📈 成功率: ${((results.passed / (results.passed + results.failed)) * 100).toFixed(2)}%`)
  
  if (results.errors.length > 0) {
    console.log('\n❌ 失败详情:')
    results.errors.forEach((error, index) => {
      console.log(`${index + 1}. ${error}`)
    })
  }
  
  console.log('\n🎯 测试完成!')
}

// 运行测试
runTests().catch(console.error) 