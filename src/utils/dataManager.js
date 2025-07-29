import api from './api.js'

// 数据源类型
export const DataSourceType = {
  MOCK: 'mock',
  API: 'api'
}

// 数据管理器类
class DataManager {
  constructor() {
    this.dataSource = DataSourceType.MOCK
    this.backendAvailable = false
    this.checkBackendStatus()
  }

  // 检查后端状态
  async checkBackendStatus() {
    try {
      await api.get('/health')
      this.backendAvailable = true
      this.dataSource = DataSourceType.API
      console.log('✅ 后端服务可用，切换到API数据源')
    } catch (error) {
      this.backendAvailable = false
      this.dataSource = DataSourceType.MOCK
      console.log('⚠️ 后端服务不可用，使用模拟数据')
    }
  }

  // 获取当前数据源类型
  async getDataSource() {
    // 从Pinia store获取数据源类型
    try {
      const { useDataSourceStore } = await import('../stores/dataSource')
      const dataSourceStore = useDataSourceStore()
      return dataSourceStore.getDataSourceType
    } catch (error) {
      // 如果无法获取store，返回默认值
    return this.dataSource
    }
  }

  // 检查后端是否可用
  isBackendAvailable() {
    return this.backendAvailable
  }

  // 智能数据获取方法
  async fetchData(endpoint, mockData, options = {}) {
    const { forceMock = false, retryCount = 0 } = options

    // 如果强制使用模拟数据或后端不可用，使用模拟数据
    if (forceMock || !this.backendAvailable) {
      console.log(`📊 使用模拟数据: ${endpoint}`)
      // 确保返回正确的数据结构
      if (Array.isArray(mockData)) {
        return { records: mockData, total: mockData.length }
      }
      return mockData
    }

    try {
      // 尝试从API获取数据
      const response = await api.get(endpoint)
      console.log(`✅ API数据获取成功: ${endpoint}`)
      return response
    } catch (error) {
      console.error(`❌ API数据获取失败: ${endpoint}`, error)
      
      // 如果是网络错误且重试次数小于3，重试
      if (retryCount < 3 && (error.code === 'NETWORK_ERROR' || error.code === 'TIMEOUT')) {
        console.log(`🔄 重试API请求: ${endpoint} (${retryCount + 1}/3)`)
        await this.delay(1000 * (retryCount + 1)) // 递增延迟
        return this.fetchData(endpoint, mockData, { ...options, retryCount: retryCount + 1 })
      }

      // 使用模拟数据作为后备
      console.log(`📊 使用模拟数据作为后备: ${endpoint}`)
      // 确保返回正确的数据结构
      if (Array.isArray(mockData)) {
        return { records: mockData, total: mockData.length }
      }
      return mockData
    }
  }

  // 智能数据提交方法
  async submitData(endpoint, data, mockResponse, options = {}) {
    const { forceMock = false, method = 'post' } = options

    // 如果强制使用模拟数据或后端不可用，返回模拟响应
    if (forceMock || !this.backendAvailable) {
      console.log(`📊 使用模拟提交: ${endpoint}`)
      return mockResponse
    }

    try {
      // 尝试提交到API
      let response
      switch (method.toLowerCase()) {
        case 'post':
          response = await api.post(endpoint, data)
          break
        case 'put':
          response = await api.put(endpoint, data)
          break
        case 'delete':
          response = await api.del(endpoint)
          break
        default:
          response = await api.post(endpoint, data)
      }
      
      console.log(`✅ API提交成功: ${endpoint}`)
      return response
    } catch (error) {
      console.error(`❌ API提交失败: ${endpoint}`, error)
      
      // 返回模拟响应作为后备
      console.log(`📊 使用模拟提交作为后备: ${endpoint}`)
      return mockResponse
    }
  }

  // 延迟函数
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  // 更新后端状态
  async updateBackendStatus() {
    await this.checkBackendStatus()
  }
}

// 创建全局数据管理器实例
export const dataManager = new DataManager()

// 导出便捷方法
export const fetchData = (endpoint, mockData, options) => dataManager.fetchData(endpoint, mockData, options)
export const submitData = (endpoint, data, mockResponse, options) => dataManager.submitData(endpoint, data, mockResponse, options)
export const getDataSource = async () => await dataManager.getDataSource()
export const isBackendAvailable = () => dataManager.isBackendAvailable()
export const updateBackendStatus = () => dataManager.updateBackendStatus() 