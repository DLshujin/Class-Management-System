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
    this.apiBaseUrl = '/api/v1'  // 统一API基础路径
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

  // 标准化响应格式
  standardizeResponse(data, options = {}) {
    const {
      success = true,
      code = 200,
      message = success ? '操作成功' : '操作失败',
      pagination = null
    } = options

    return {
      success,
      code,
      message,
      data,
      pagination,
      timestamp: new Date().toISOString()
    }
  }

  // 标准化API端点路径
  normalizeEndpoint(endpoint) {
    // 如果已经是完整路径，直接返回
    if (endpoint.startsWith('/api/v1/')) {
      return endpoint
    }
    
    // 移除开头的斜杠（如果有）
    const cleanEndpoint = endpoint.replace(/^\/+/, '')
    
    // 添加统一的API前缀
    return `${this.apiBaseUrl}/${cleanEndpoint}`
  }

  // 智能数据获取方法
  async fetchData(endpoint, mockData, options = {}) {
    const { forceMock = false, retryCount = 0 } = options
    const normalizedEndpoint = this.normalizeEndpoint(endpoint)

    // 如果强制使用模拟数据或后端不可用，使用模拟数据
    if (forceMock || !this.backendAvailable) {
      console.log(`📊 使用模拟数据: ${normalizedEndpoint}`)
      // 标准化模拟数据响应
      return this.standardizeResponse(mockData, {
        success: true,
        code: 200,
        message: '数据获取成功（模拟数据）'
      })
    }

    try {
      // 尝试从API获取数据
      const response = await api.get(normalizedEndpoint)
      console.log(`✅ API数据获取成功: ${normalizedEndpoint}`)
      
      // 检查响应格式，如果不是标准格式则标准化
      if (response && typeof response === 'object' && response.hasOwnProperty('success')) {
        return response
      } else {
        return this.standardizeResponse(response, {
          success: true,
          code: 200,
          message: '数据获取成功'
        })
      }
    } catch (error) {
      console.error(`❌ API数据获取失败: ${normalizedEndpoint}`, error)
      
      // 如果是网络错误且重试次数小于3，重试
      if (retryCount < 3 && (error.code === 'NETWORK_ERROR' || error.code === 'TIMEOUT')) {
        console.log(`🔄 重试API请求: ${normalizedEndpoint} (${retryCount + 1}/3)`)
        await this.delay(1000 * (retryCount + 1)) // 递增延迟
        return this.fetchData(endpoint, mockData, { ...options, retryCount: retryCount + 1 })
      }

      // 使用模拟数据作为后备
      console.log(`📊 使用模拟数据作为后备: ${normalizedEndpoint}`)
      return this.standardizeResponse(mockData, {
        success: true,
        code: 200,
        message: '数据获取成功（降级模拟数据）'
      })
    }
  }

  // 智能数据提交方法
  async submitData(endpoint, data, mockResponse, options = {}) {
    const { forceMock = false, method = 'post' } = options
    const normalizedEndpoint = this.normalizeEndpoint(endpoint)

    // 如果强制使用模拟数据或后端不可用，返回模拟响应
    if (forceMock || !this.backendAvailable) {
      console.log(`📊 使用模拟提交: ${normalizedEndpoint}`)
      return this.standardizeResponse(mockResponse, {
        success: true,
        code: 200,
        message: `${this.getMethodName(method)}成功（模拟数据）`
      })
    }

    try {
      // 尝试提交到API
      let response
      switch (method.toLowerCase()) {
        case 'post':
          response = await api.post(normalizedEndpoint, data)
          break
        case 'put':
          response = await api.put(normalizedEndpoint, data)
          break
        case 'patch':
          response = await api.patch(normalizedEndpoint, data)
          break
        case 'delete':
          response = await api.del(normalizedEndpoint)
          break
        default:
          response = await api.post(normalizedEndpoint, data)
      }
      
      console.log(`✅ API提交成功: ${normalizedEndpoint}`)
      
      // 检查响应格式，如果不是标准格式则标准化
      if (response && typeof response === 'object' && response.hasOwnProperty('success')) {
        return response
      } else {
        return this.standardizeResponse(response, {
          success: true,
          code: 200,
          message: `${this.getMethodName(method)}成功`
        })
      }
    } catch (error) {
      console.error(`❌ API提交失败: ${normalizedEndpoint}`, error)
      
      // 返回模拟响应作为后备
      console.log(`📊 使用模拟提交作为后备: ${normalizedEndpoint}`)
      return this.standardizeResponse(mockResponse, {
        success: false,
        code: error.response?.status || 500,
        message: error.response?.data?.message || `${this.getMethodName(method)}失败`
      })
    }
  }

  // 获取操作名称
  getMethodName(method) {
    const methodNames = {
      'post': '创建',
      'put': '更新', 
      'patch': '修改',
      'delete': '删除',
      'get': '查询'
    }
    return methodNames[method.toLowerCase()] || '操作'
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
export const fetchData = async (endpoint, mockData, options) => {
  console.log('📋 fetchData 函数被调用:', { endpoint, mockData: !!mockData, options });
  const result = await dataManager.fetchData(endpoint, mockData, options);
  console.log('📋 fetchData 返回结果:', result);
  return result;
}
export const submitData = (endpoint, data, mockResponse, options) => dataManager.submitData(endpoint, data, mockResponse, options)
export const getDataSource = async () => await dataManager.getDataSource()
export const isBackendAvailable = () => dataManager.isBackendAvailable()
export const updateBackendStatus = () => dataManager.updateBackendStatus()