import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { fetchData, submitData } from '../utils/dataManager.js'
import { useDataSourceStore } from './dataSource.js'
import api from '../utils/api.js'
import { logger } from '../utils/logger.js'

export const useFinanceDataStore = defineStore('financeData', () => {
  // 获取数据源store
  const dataSourceStore = useDataSourceStore()
  
  // 响应式数据
  const financeRecords = ref([])
  const loading = ref(false)
  const loaded = ref(false)
  const pagination = ref({
    current: 1,
    size: 10,
    total: 0
  })

  // 预算设置
  const budget = ref({
    monthly: 50000,
    categories: {
      '课程费用': 30000,
      '设备采购': 10000,
      '场地租金': 8000,
      '其他': 2000
    }
  })

  // 计算属性
  const getFinanceRecords = computed(() => financeRecords.value)
  const getLoading = computed(() => loading.value)
  const getPagination = computed(() => pagination.value)
  const getDataSourceType = computed(() => dataSourceStore.getDataSourceType)
  const getBudget = computed(() => budget.value)

  // 计算总收入
  const getTotalIncome = computed(() => {
    if (!financeRecords.value || !Array.isArray(financeRecords.value)) {
      return 0;
    }
    return financeRecords.value
      .filter(record => record.type === 'income' && record.status === 'approved')
      .reduce((sum, record) => sum + (record.amount || 0), 0)
  })

  // 计算总支出
  const getTotalExpense = computed(() => {
    if (!financeRecords.value || !Array.isArray(financeRecords.value)) {
      return 0;
    }
    return financeRecords.value
      .filter(record => record.type === 'expense' && record.status === 'approved')
      .reduce((sum, record) => sum + (record.amount || 0), 0)
  })

  // 计算净利润
  const getNetProfit = computed(() => {
    return getTotalIncome.value - getTotalExpense.value
  })

  // 计算待审批金额
  const getPendingAmount = computed(() => {
    if (!financeRecords.value || !Array.isArray(financeRecords.value)) {
      return 0;
    }
    return financeRecords.value
      .filter(record => record.status === 'pending')
      .reduce((sum, record) => sum + (record.amount || 0), 0)
  })

  // Actions
  // 获取财务记录列表
  const fetchFinanceRecords = async (params = {}) => {
    loading.value = true
    try {
      const queryParams = new URLSearchParams({
        page: params.page || 1,
        size: params.size || 10,
        ...params
      }).toString()

      // 在模拟数据模式下，如果本地已有数据，直接返回
      const useMock = dataSourceStore.type === 'mock'
      if (useMock && financeRecords.value.length > 0) {
        logger.data.load('FINANCE', financeRecords.value.length, 'local')
        return {
          records: financeRecords.value,
          pagination: {
            current: params.page || 1,
            size: params.size || 10,
            total: financeRecords.value.length
          }
        }
      }

      // 直接调用API，不通过dataManager
      const response = await api.get(`/finance?${queryParams}`)
      
      financeRecords.value = response.records || response.list || []
      pagination.value = response.pagination || {
        current: params.page || 1,
        size: params.size || 10,
        total: response.total || financeRecords.value.length
      }
      loaded.value = true
      logger.data.load('FINANCE', financeRecords.value.length, 'api')
    } catch (error) {
      logger.error('获取财务记录失败:', error)
      // 如果API调用失败，使用默认的模拟数据
      financeRecords.value = [
        {
          id: 1,
          date: '2025-07-01',
          type: 'income',
          category: 'tuition',
          categoryName: '学费',
          amount: 2400,
          relatedId: 'class_1',
          relatedName: 'Python-A班',
          description: '张三学费缴纳',
          createdBy: '管理员',
          status: 'approved'
        },
        {
          id: 2,
          date: '2025-07-02',
          type: 'income',
          category: 'tuition',
          categoryName: '学费',
          amount: 3200,
          relatedId: 'class_2',
          relatedName: 'Java-A班',
          description: '李四学费缴纳',
          createdBy: '管理员',
          status: 'approved'
        },
        {
          id: 3,
          date: '2025-07-03',
          type: 'expense',
          category: 'salary',
          categoryName: '工资',
          amount: 5000,
          relatedId: 'teacher_1',
          relatedName: '张老师',
          description: '教师工资发放',
          createdBy: '管理员',
          status: 'approved'
        },
        {
          id: 4,
          date: '2025-07-04',
          type: 'income',
          category: 'material',
          categoryName: '教材费',
          amount: 1500,
          relatedId: 'class_1',
          relatedName: 'Python-A班',
          description: '教材费用',
          createdBy: '管理员',
          status: 'approved'
        },
        {
          id: 5,
          date: '2025-07-05',
          type: 'expense',
          category: 'rent',
          categoryName: '租金',
          amount: 3000,
          relatedId: 'venue_1',
          relatedName: '教室租金',
          description: '场地租金',
          createdBy: '管理员',
          status: 'approved'
        },
        {
          id: 6,
          date: '2025-07-06',
          type: 'income',
          category: 'tuition',
          categoryName: '学费',
          amount: 2800,
          relatedId: 'class_3',
          relatedName: 'AI-A班',
          description: '王五学费缴纳',
          createdBy: '管理员',
          status: 'approved'
        },
        {
          id: 7,
          date: '2025-07-07',
          type: 'expense',
          category: 'equipment',
          categoryName: '设备采购',
          amount: 4500,
          relatedId: 'equipment_1',
          relatedName: '电脑设备',
          description: '采购教学设备',
          createdBy: '管理员',
          status: 'approved'
        },
        {
          id: 8,
          date: '2025-07-08',
          type: 'income',
          category: 'activity',
          categoryName: '活动费',
          amount: 800,
          relatedId: 'activity_1',
          relatedName: '编程比赛',
          description: '编程比赛报名费',
          createdBy: '管理员',
          status: 'approved'
        }
      ]
      pagination.value = {
        current: params.page || 1,
        size: params.size || 10,
        total: financeRecords.value.length
      }
      loaded.value = true
              logger.data.load('FINANCE', financeRecords.value.length, 'mock')
    } finally {
      loading.value = false
    }
  }

  // 添加财务记录
  const addFinanceRecord = async (recordData) => {
    try {
      const mockResponse = {
        id: Date.now(),
        ...recordData,
        date: recordData.date || new Date().toISOString().slice(0, 10),
        type: recordData.type || 'income',
        category: recordData.category || 'other',
        categoryName: recordData.categoryName || '其他',
        amount: recordData.amount || 0,
        relatedId: recordData.relatedId || '',
        relatedName: recordData.relatedName || '',
        description: recordData.description || '',
        createdBy: recordData.createdBy || '管理员',
        status: recordData.status || 'pending',
        remark: recordData.remark || ''
      }

      const response = await submitData(
        '/finance/records',
        recordData,
        mockResponse,
        { method: 'post' }
      )

      // 模拟数据模式下，直接添加到本地列表以直观显示变化
      if (getDataSourceType.value === 'mock') {
        financeRecords.value.unshift(response)
        pagination.value.total++
      }
      logger.info(`✅ 财务记录添加成功 (数据源: ${getDataSourceType.value})`)
      return response
    } catch (error) {
      logger.error('添加财务记录失败:', error)
      throw error
    }
  }

  // 更新财务记录
  const updateFinanceRecord = async (id, recordData) => {
    try {
      const mockResponse = { id, ...recordData }

      const response = await submitData(
        `/finance/records/${id}`,
        recordData,
        mockResponse,
        { method: 'put' }
      )

      // 模拟数据模式下，更新本地列表以直观显示变化
      if (getDataSourceType.value === 'mock') {
        const index = financeRecords.value.findIndex(r => r.id === id)
        if (index !== -1) {
          // 确保状态字段被正确更新
          financeRecords.value[index] = { ...financeRecords.value[index], ...recordData }
          logger.info(`财务记录 ${id} 状态已更新为: ${recordData.status}`)
        }
      }
      logger.info(`✅ 财务记录更新成功 (数据源: ${getDataSourceType.value})`)
      return response
    } catch (error) {
      logger.error('更新财务记录失败:', error)
      throw error
    }
  }

  // 删除财务记录
  const deleteFinanceRecord = async (id) => {
    try {
      const mockResponse = { success: true }

      const response = await submitData(
        `/finance/records/${id}`,
        {},
        mockResponse,
        { method: 'delete' }
      )

      // 模拟数据模式下，从本地列表移除以直观显示变化
      if (getDataSourceType.value === 'mock') {
        const index = financeRecords.value.findIndex(r => r.id === id)
        if (index !== -1) {
          financeRecords.value.splice(index, 1)
          pagination.value.total--
        }
      }
      logger.info(`✅ 财务记录删除成功 (数据源: ${getDataSourceType.value})`)
      return response
    } catch (error) {
      logger.error('删除财务记录失败:', error)
      throw error
    }
  }

  // 审批财务记录
  const approveFinanceRecord = async (id, action, reason = '') => {
    try {
      const mockResponse = { success: true }

      const response = await submitData(
        `/finance/records/${id}/approve`,
        { action, reason },
        mockResponse,
        { method: 'post' }
      )

      // 如果是模拟数据，更新本地记录状态
      if (getDataSourceType.value === 'mock') {
        const index = financeRecords.value.findIndex(r => r.id === id)
      if (index !== -1) {
          financeRecords.value[index].status = action === 'approve' ? 'approved' : 'rejected'
          if (reason) {
            financeRecords.value[index].remark = reason
          }
        }
      }

      logger.info(`✅ 财务记录审批成功 (数据源: ${getDataSourceType.value})`)
      return response
    } catch (error) {
      logger.error('审批财务记录失败:', error)
      throw error
    }
  }

  // 获取财务统计
  const getFinanceStats = async () => {
    try {
      const mockStats = {
        totalIncome: getTotalIncome.value,
        totalExpense: getTotalExpense.value,
        netProfit: getNetProfit.value,
        pendingAmount: getPendingAmount.value,
        monthlyBudget: budget.value.monthly,
        budgetUsed: getTotalExpense.value,
        budgetRemaining: budget.value.monthly - getTotalExpense.value,
        categoryStats: {
          '课程费用': financeRecords.value.filter(r => r.category === '课程费用' && r.status === 'approved').reduce((sum, r) => sum + r.amount, 0),
          '设备采购': financeRecords.value.filter(r => r.category === '设备采购' && r.status === 'approved').reduce((sum, r) => sum + r.amount, 0),
          '场地租金': financeRecords.value.filter(r => r.category === '场地租金' && r.status === 'approved').reduce((sum, r) => sum + r.amount, 0),
          '其他': financeRecords.value.filter(r => !['课程费用', '设备采购', '场地租金'].includes(r.category) && r.status === 'approved').reduce((sum, r) => sum + r.amount, 0)
        }
      }

      const response = await fetchData(
        '/finance/stats',
        mockStats,
        { forceMock: false }
      )

      logger.info(`✅ 财务统计获取成功 (数据源: ${getDataSourceType.value})`)
      return response
    } catch (error) {
      logger.error('获取财务统计失败:', error)
      throw error
    }
  }

  // 更新预算设置
  const updateBudget = async (budgetData) => {
    try {
      const mockResponse = { success: true }

      const response = await submitData(
        '/finance/budget',
        budgetData,
        mockResponse,
        { method: 'put' }
      )

      // 如果是模拟数据，更新本地预算
      if (getDataSourceType.value === 'mock') {
        budget.value = { ...budget.value, ...budgetData }
      }

      logger.info(`✅ 预算设置更新成功 (数据源: ${getDataSourceType.value})`)
      return response
    } catch (error) {
      logger.error('更新预算设置失败:', error)
      throw error
    }
  }

  return {
    // 状态
    financeRecords,
    loading,
    loaded,
    pagination,
    budget,

    // Getters
    getFinanceRecords,
    getLoading,
    getPagination,
    getDataSourceType,
    getBudget,
    getTotalIncome,
    getTotalExpense,
    getNetProfit,
    getPendingAmount,

    // Actions
    fetchFinanceRecords,
    fetchFinanceList: fetchFinanceRecords, // 添加别名以兼容测试代码
    getFinanceList: getFinanceRecords, // 添加别名以兼容测试代码
    addFinanceRecord,
    updateFinanceRecord,
    deleteFinanceRecord,
    approveFinanceRecord,
    getFinanceStats,
    updateBudget
  }
}) 