#!/usr/bin/env node

/**
 * 测试运行器 - 运行所有自动化测试
 */

import AutomatedTestSuite from './automated-test.js'
import AuthApiTestSuite from './auth-api-test.js'

// 测试配置
const testConfig = {
  // 是否在浏览器环境运行
  browserMode: typeof window !== 'undefined',
  
  // 测试超时时间（毫秒）
  timeout: 30000,
  
  // 是否显示详细日志
  verbose: true,
  
  // 测试模块过滤
  modules: [
    'apis',
    'dataFetching', 
    'dataOperations',
    'dataLinkage',
    'dataSourceSwitching',
    'errorHandling'
  ]
}

// 测试运行器
class TestRunner {
  constructor(config = {}) {
    this.config = { ...testConfig, ...config }
    this.testSuite = null
    this.startTime = null
    this.endTime = null
  }

  // 初始化测试环境
  async init() {
    console.log('🚀 初始化测试运行器...')
    
    try {
      this.testSuite = new AutomatedTestSuite()
      await this.testSuite.init()
      console.log('✅ 测试运行器初始化完成')
      return true
    } catch (error) {
      console.error('❌ 测试运行器初始化失败:', error)
      return false
    }
  }

  // 运行单个测试模块
  async runModule(moduleName) {
    if (!this.config.modules.includes(moduleName)) {
      console.log(`⏭️ 跳过模块: ${moduleName}`)
      return
    }

    console.log(`\n🧪 运行测试模块: ${moduleName}`)
    
    try {
      const methodName = `test${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}`
      
      if (typeof this.testSuite[methodName] === 'function') {
        await this.testSuite[methodName]()
        console.log(`✅ 模块 ${moduleName} 测试完成`)
      } else {
        console.error(`❌ 未找到测试方法: ${methodName}`)
      }
    } catch (error) {
      console.error(`❌ 模块 ${moduleName} 测试失败:`, error)
    }
  }

  // 运行所有测试
  async runAllTests() {
    console.log('🎯 开始运行所有测试...')
    this.startTime = Date.now()
    
    try {
      // 初始化
      const initSuccess = await this.init()
      if (!initSuccess) {
        throw new Error('测试环境初始化失败')
      }
      
      // 运行各个测试模块
      for (const module of this.config.modules) {
        await this.runModule(module)
      }
      
      // 打印最终结果
      this.testSuite.printResults()
      
      this.endTime = Date.now()
      const duration = (this.endTime - this.startTime) / 1000
      console.log(`\n⏱️ 测试总耗时: ${duration.toFixed(2)}秒`)
      
    } catch (error) {
      console.error('❌ 测试运行失败:', error)
      this.endTime = Date.now()
    }
  }

  // 运行特定测试模块
  async runSpecificTest(moduleName) {
    console.log(`🎯 运行特定测试: ${moduleName}`)
    
    try {
      const initSuccess = await this.init()
      if (!initSuccess) {
        throw new Error('测试环境初始化失败')
      }
      
      await this.runModule(moduleName)
      this.testSuite.printResults()
      
    } catch (error) {
      console.error(`❌ 特定测试失败: ${error.message}`)
    }
  }

  // 生成测试报告
  generateReport() {
    if (!this.testSuite) {
      console.error('❌ 测试套件未初始化')
      return null
    }
    
    const report = {
      timestamp: new Date().toISOString(),
      duration: this.endTime ? (this.endTime - this.startTime) / 1000 : 0,
      config: this.config,
      results: {
        passed: 0,
        failed: 0,
        errors: []
      }
    }
    
    // 这里可以从testSuite获取详细结果
    return report
  }
}

// 浏览器环境下的测试运行器
if (typeof window !== 'undefined') {
  window.TestRunner = TestRunner
  window.runTests = async () => {
    const runner = new TestRunner()
    await runner.runAllTests()
  }
  
  console.log('🌐 浏览器测试运行器已加载')
  console.log('💡 在控制台运行 runTests() 开始测试')
}

// Node.js环境下的测试运行器
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TestRunner
}

// 直接运行测试（如果在Node.js环境中）
if (typeof process !== 'undefined' && process.argv.includes('--run-tests')) {
  const runner = new TestRunner()
  runner.runAllTests().catch(console.error)
}

export default TestRunner 