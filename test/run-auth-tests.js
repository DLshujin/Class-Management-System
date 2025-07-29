#!/usr/bin/env node

/**
 * 认证API测试运行器
 */

import AuthApiTestSuite from './auth-api-test.js'

async function runAuthTests() {
  const startTime = Date.now()
  
  try {
    const testSuite = new AuthApiTestSuite()
    const success = await testSuite.runAllTests()
    
    const duration = ((Date.now() - startTime) / 1000).toFixed(2)
    console.log(`\n⏱️ 认证API测试总耗时: ${duration}秒`)
    
    if (success) {
      console.log('🎊 所有认证API功能正常，系统安全性验证通过！')
      process.exit(0)
    } else {
      console.log('⚠️ 发现认证API问题，请检查相关功能！')
      process.exit(1)
    }
  } catch (error) {
    console.error('❌ 认证API测试运行失败:', error)
    process.exit(1)
  }
}

// 运行测试
runAuthTests() 