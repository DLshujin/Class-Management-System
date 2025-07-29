import { defineStore } from 'pinia'
import api from '../utils/api.js'

export const useDataSourceStore = defineStore('dataSource', {
  state: () => ({
    type: 'mock', // 默认使用模拟数据
    backendAvailable: false
  }),
  actions: {
    async checkBackendStatus() {
      try {
        await api.get('/health')
        this.backendAvailable = true
        this.type = 'api'
        console.log('✅ 后端服务可用，切换到API数据源')
      } catch (e) {
        this.backendAvailable = false
        this.type = 'mock'
        console.log('⚠️ 后端服务不可用，使用模拟数据')
      }
    },
    setDataSourceType(type) {
      this.type = type
      console.log(`🔄 数据源已切换为: ${type}`)
    },
    // 强制使用模拟数据
    forceMockMode() {
      this.type = 'mock'
      this.backendAvailable = false
      console.log('🔧 强制使用模拟数据模式')
    },
    // 添加别名以兼容测试代码
    setDataSource(type) {
      this.setDataSourceType(type)
    }
  },
  getters: {
    getDataSourceType: (state) => state.type,
    isMockMode: (state) => state.type === 'mock'
  }
}) 