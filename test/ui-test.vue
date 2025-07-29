<template>
  <div class="ui-test-container">
    <div class="test-header">
      <h2>🧪 自动化测试控制台</h2>
      <div class="test-controls">
        <el-button type="primary" @click="runAllTests" :loading="running">
          {{ running ? '测试中...' : '运行所有测试' }}
        </el-button>
        <el-button type="success" @click="runSpecificTest" :disabled="running">
          运行特定测试
        </el-button>
        <el-button type="warning" @click="clearResults" :disabled="running">
          清空结果
        </el-button>
      </div>
    </div>

    <el-row :gutter="20" class="test-content">
      <!-- 测试配置 -->
      <el-col :span="8">
        <el-card class="test-config">
          <template #header>
            <h3>⚙️ 测试配置</h3>
          </template>
          
          <el-form :model="testConfig" label-width="120px">
            <el-form-item label="测试模块">
              <el-checkbox-group v-model="testConfig.modules">
                <el-checkbox label="apis">API接口测试</el-checkbox>
                <el-checkbox label="dataFetching">数据获取测试</el-checkbox>
                <el-checkbox label="dataOperations">数据操作测试</el-checkbox>
                <el-checkbox label="dataLinkage">数据联动测试</el-checkbox>
                <el-checkbox label="dataSourceSwitching">数据源切换测试</el-checkbox>
                <el-checkbox label="errorHandling">错误处理测试</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            
            <el-form-item label="超时时间">
              <el-input-number 
                v-model="testConfig.timeout" 
                :min="5000" 
                :max="60000" 
                :step="1000"
              />
              <span style="margin-left: 10px;">毫秒</span>
            </el-form-item>
            
            <el-form-item label="详细日志">
              <el-switch v-model="testConfig.verbose" />
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>

      <!-- 测试结果 -->
      <el-col :span="16">
        <el-card class="test-results">
          <template #header>
            <h3>📊 测试结果</h3>
          </template>
          
          <div class="results-summary">
            <el-row :gutter="20">
              <el-col :span="6">
                <div class="result-card passed">
                  <div class="result-number">{{ results.passed }}</div>
                  <div class="result-label">通过</div>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="result-card failed">
                  <div class="result-number">{{ results.failed }}</div>
                  <div class="result-label">失败</div>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="result-card total">
                  <div class="result-number">{{ results.passed + results.failed }}</div>
                  <div class="result-label">总计</div>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="result-card success-rate">
                  <div class="result-number">
                    {{ totalTests > 0 ? ((results.passed / totalTests) * 100).toFixed(1) : 0 }}%
                  </div>
                  <div class="result-label">成功率</div>
                </div>
              </el-col>
            </el-row>
          </div>
          
          <div class="test-duration" v-if="duration > 0">
            <el-tag type="info">⏱️ 测试耗时: {{ duration.toFixed(2) }}秒</el-tag>
          </div>
          
          <div class="test-log">
            <h4>📝 测试日志</h4>
            <div class="log-container" ref="logContainer">
              <div 
                v-for="(log, index) in testLogs" 
                :key="index" 
                :class="['log-entry', log.type]"
              >
                <span class="log-time">{{ log.time }}</span>
                <span class="log-message">{{ log.message }}</span>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 错误详情 -->
    <el-card v-if="results.errors.length > 0" class="error-details">
      <template #header>
        <h3>❌ 错误详情</h3>
      </template>
      
      <el-collapse>
        <el-collapse-item 
          v-for="(error, index) in results.errors" 
          :key="index"
          :title="`错误 ${index + 1}: ${error}`"
        >
          <div class="error-content">
            <p><strong>错误信息:</strong> {{ error }}</p>
            <p><strong>建议:</strong> 检查相关功能模块的数据获取和API调用</p>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import TestRunner from './run-tests.js'

// 响应式数据
const running = ref(false)
const duration = ref(0)
const testLogs = ref([])
const logContainer = ref(null)

// 测试配置
const testConfig = ref({
  modules: ['apis', 'dataFetching', 'dataOperations', 'dataLinkage', 'dataSourceSwitching', 'errorHandling'],
  timeout: 30000,
  verbose: true
})

// 测试结果
const results = ref({
  passed: 0,
  failed: 0,
  errors: []
})

// 计算属性
const totalTests = computed(() => results.value.passed + results.value.failed)

// 添加日志
const addLog = (message, type = 'info') => {
  const log = {
    time: new Date().toLocaleTimeString(),
    message,
    type
  }
  testLogs.value.push(log)
  
  // 自动滚动到底部
  nextTick(() => {
    if (logContainer.value) {
      logContainer.value.scrollTop = logContainer.value.scrollHeight
    }
  })
}

// 运行所有测试
const runAllTests = async () => {
  if (running.value) return
  
  running.value = true
  results.value = { passed: 0, failed: 0, errors: [] }
  testLogs.value = []
  duration.value = 0
  
  addLog('🚀 开始运行所有测试...', 'info')
  
  try {
    const runner = new TestRunner(testConfig.value)
    
    // 重写console.log来捕获测试日志
    const originalLog = console.log
    const originalError = console.error
    
    console.log = (...args) => {
      addLog(args.join(' '), 'info')
      originalLog.apply(console, args)
    }
    
    console.error = (...args) => {
      addLog(args.join(' '), 'error')
      originalError.apply(console, args)
    }
    
    const startTime = Date.now()
    await runner.runAllTests()
    const endTime = Date.now()
    
    duration.value = (endTime - startTime) / 1000
    
    // 恢复原始console
    console.log = originalLog
    console.error = originalError
    
    addLog('✅ 所有测试完成', 'success')
    
    // 获取测试结果（这里需要从TestRunner获取实际结果）
    // 实际项目中可以通过事件或回调获取详细结果
    
  } catch (error) {
    addLog(`❌ 测试运行失败: ${error.message}`, 'error')
  } finally {
    running.value = false
  }
}

// 运行特定测试
const runSpecificTest = async () => {
  if (running.value) return
  
  // 这里可以实现运行特定测试模块的逻辑
  addLog('🔧 运行特定测试功能待实现', 'warning')
}

// 清空结果
const clearResults = () => {
  results.value = { passed: 0, failed: 0, errors: [] }
  testLogs.value = []
  duration.value = 0
  addLog('🧹 测试结果已清空', 'info')
}

// 组件挂载
onMounted(() => {
  addLog('🧪 UI测试组件已加载', 'info')
  addLog('💡 点击"运行所有测试"开始自动化测试', 'info')
})
</script>

<style scoped>
.ui-test-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.test-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.test-header h2 {
  margin: 0;
  color: #409EFF;
}

.test-controls {
  display: flex;
  gap: 10px;
}

.test-content {
  margin-bottom: 20px;
}

.test-config,
.test-results {
  height: 600px;
  overflow-y: auto;
}

.results-summary {
  margin-bottom: 20px;
}

.result-card {
  text-align: center;
  padding: 20px;
  border-radius: 8px;
  color: white;
}

.result-card.passed {
  background: linear-gradient(135deg, #67C23A, #85CE61);
}

.result-card.failed {
  background: linear-gradient(135deg, #F56C6C, #F78989);
}

.result-card.total {
  background: linear-gradient(135deg, #909399, #C0C4CC);
}

.result-card.success-rate {
  background: linear-gradient(135deg, #409EFF, #66B1FF);
}

.result-number {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 5px;
}

.result-label {
  font-size: 14px;
}

.test-duration {
  margin-bottom: 20px;
}

.test-log {
  margin-top: 20px;
}

.log-container {
  height: 300px;
  overflow-y: auto;
  border: 1px solid #DCDFE6;
  border-radius: 4px;
  padding: 10px;
  background: #F5F7FA;
}

.log-entry {
  margin-bottom: 5px;
  padding: 5px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 12px;
}

.log-entry.info {
  background: #E1F3D8;
  color: #67C23A;
}

.log-entry.error {
  background: #FEF0F0;
  color: #F56C6C;
}

.log-entry.warning {
  background: #FDF6EC;
  color: #E6A23C;
}

.log-entry.success {
  background: #F0F9FF;
  color: #409EFF;
}

.log-time {
  font-weight: bold;
  margin-right: 10px;
}

.error-details {
  margin-top: 20px;
}

.error-content {
  padding: 10px;
  background: #FEF0F0;
  border-radius: 4px;
}

.error-content p {
  margin: 5px 0;
}
</style> 