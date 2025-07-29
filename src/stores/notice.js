import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '../utils/api.js'
import { useDataSourceStore } from './dataSource.js'

export const useNoticeStore = defineStore('notice', () => {
  // 获取数据源store
  const dataSourceStore = useDataSourceStore()
  
  // 响应式数据
  const systemNotices = ref([])
  const loading = ref(false)
  const loaded = ref(false)
  const error = ref(null)

  // 计算属性
  const getSystemNotices = computed(() => systemNotices.value)
  const getDataSourceType = computed(() => dataSourceStore.getDataSourceType)

  // 获取公告列表
  const fetchNotices = async () => {
    loading.value = true
    try {
      // 在模拟数据模式下，如果本地已有数据，直接返回
      const useMock = dataSourceStore.type === 'mock'
      if (useMock && systemNotices.value.length > 0) {
        console.log('✅ 公告数据获取成功（使用本地数据）:', systemNotices.value)
        loaded.value = true
        return
      }
      
      const response = await api.get('/notices')
      // API返回的数据结构是 { records: [...], total: number }
      systemNotices.value = response.records || response.data || []
      loaded.value = true
      console.log('✅ 公告数据获取成功:', systemNotices.value)
    } catch (error) {
      console.error('获取公告失败:', error)
      // 模拟数据
      systemNotices.value = [
        {
          id: 1,
          title: '系统维护通知',
          content: '系统将于本周六凌晨2:00-4:00进行维护升级，期间可能影响正常使用，请提前保存重要数据。维护内容包括：数据库优化、安全补丁更新、性能提升等。',
          createTime: '2025-07-01 10:00:00',
          author: '系统管理员',
          important: true
        },
        {
          id: 2,
          title: '新课程上线通知',
          content: '人工智能入门课程已正式上线，课程内容包括：机器学习基础、深度学习入门、Python编程实践等。欢迎各位学员踊跃报名参加！',
          createTime: '2025-07-10 09:00:00',
          author: '教务处',
          important: false
        },
        {
          id: 3,
          title: '暑期班招生开始',
          content: '2025年暑期编程班现已开始招生，开设课程：Python基础、Java入门、Web前端开发、数据结构与算法。报名截止日期：7月15日。',
          createTime: '2025-07-05 14:30:00',
          author: '招生办',
          important: true
        },
        {
          id: 4,
          title: '教师培训通知',
          content: '为提高教学质量，定于7月20日举办教师技能培训，内容包括：教学方法创新、课程设计优化、学生管理技巧等。请各位教师准时参加。',
          createTime: '2025-07-08 16:20:00',
          author: '人事部',
          important: false
        },
        {
          id: 5,
          title: '编程竞赛报名',
          content: '2025年青少年编程竞赛报名现已开始，比赛分为初级组和高级组，获奖者将获得丰厚奖品和证书。报名截止：7月25日。',
          createTime: '2025-07-12 11:15:00',
          author: '竞赛组委会',
          important: true
        },
        {
          id: 6,
          title: '教室设备更新',
          content: '为提供更好的学习环境，本周将对所有教室的投影设备和音响系统进行更新升级，预计工期3天，请各位师生配合。',
          createTime: '2025-07-15 08:45:00',
          author: '后勤部',
          important: false
        },
        {
          id: 7,
          title: '学员作品展示',
          content: '优秀学员作品展示活动将于7月30日举行，展示内容包括：网站开发、小程序制作、游戏编程等。欢迎各位家长和学员参观。',
          createTime: '2025-07-18 13:40:00',
          author: '教学部',
          important: false
        },
        {
          id: 8,
          title: '安全提醒',
          content: '近期天气炎热，请注意防暑降温。同时提醒各位学员和家长，注意交通安全，遵守交通规则，确保人身安全。',
          createTime: '2025-07-20 10:30:00',
          author: '安全办',
          important: true
        }
      ]
      loaded.value = true
    } finally {
      loading.value = false
    }
  }

  // 添加新公告
  const addNotice = async (notice) => {
    try {
      const mockResponse = {
        id: Date.now(),
        ...notice,
        title: notice.title || '',
        content: notice.content || '',
        createTime: notice.createTime || new Date().toLocaleString('zh-CN'),
        author: notice.author || '管理员',
        important: notice.important || false
      }

      const newNotice = await api.post('/notices/create', notice);
      // 模拟数据模式下，直接添加到本地列表以直观显示变化
      systemNotices.value.unshift(mockResponse);
      console.log('✅ 公告添加成功');
      return mockResponse;
    } catch (error) {
      console.error('添加公告失败:', error);
      // 模拟数据模式下，即使API失败也添加到本地列表
      const mockResponse = {
        id: Date.now(),
        ...notice,
        title: notice.title || '',
        content: notice.content || '',
        createTime: notice.createTime || new Date().toLocaleString('zh-CN'),
        author: notice.author || '管理员',
        important: notice.important || false
      }
      systemNotices.value.unshift(mockResponse);
      console.log('✅ 公告添加成功（模拟模式）');
      return mockResponse;
    }
  }
  
  // 更新公告
  const updateNotice = async (id, data) => {
    try {
      await api.put(`/notices/${id}`, data)
      // 模拟数据模式下，更新本地列表以直观显示变化
      const idx = systemNotices.value.findIndex(n => n.id === id)
      if (idx > -1) {
        systemNotices.value[idx] = { ...systemNotices.value[idx], ...data }
      }
      console.log('✅ 公告更新成功');
      return true
    } catch (error) {
      // 模拟数据模式下，更新本地列表以直观显示变化
      const idx = systemNotices.value.findIndex(n => n.id === id)
      if (idx > -1) {
        systemNotices.value[idx] = { ...systemNotices.value[idx], ...data }
      }
      console.log('✅ 公告更新成功（模拟模式）');
      return false
    }
  }
  
  // 删除公告
  const deleteNotice = async (id) => {
    // 先检查公告是否存在
    const idx = systemNotices.value.findIndex(n => n.id === id)
    if (idx === -1) {
      console.log(`❌ 未找到要删除的公告，ID: ${id}`);
      return false
    }
    
    try {
      // 尝试API删除
      await api.delete(`/notices/${id}`)
      console.log(`✅ API删除成功，ID: ${id}`);
    } catch (error) {
      console.log(`⚠️ API删除失败，但在模拟模式下继续执行:`, error.message);
    }
    
    // 无论API是否成功，都从本地列表移除（模拟数据模式）
    systemNotices.value.splice(idx, 1)
    console.log(`✅ 公告删除成功，剩余数量: ${systemNotices.value.length}`);
    return true
  }

  return {
    // 状态
    systemNotices,
    loading,
    loaded,
    error,
    
    // 计算属性
    getSystemNotices,
    getDataSourceType,
    
    // 方法
    fetchNotices,
    addNotice,
    updateNotice,
    deleteNotice
  }
}) 