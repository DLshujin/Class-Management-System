<template>
  <div class="notifications-container">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-main">
        <div class="title-section">
          <div class="page-icon">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
              <path d="M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7A7,7 0 0,1 20,14V16L22,18V19H2V18L4,16V14A7,7 0 0,1 11,7V5.73C10.4,5.39 10,4.74 10,4A2,2 0 0,1 12,2M12,20A2,2 0 0,1 10,22A2,2 0 0,1 8,20H12Z"/>
            </svg>
          </div>
          <div class="title-content">
            <h1 class="page-title">消息中心</h1>
            <p class="page-subtitle">统一管理系统通知与个人消息</p>
          </div>
        </div>
        <div class="header-actions">
          <el-button type="success" class="action-btn" @click="markAllAsRead">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/>
            </svg>
            全部已读
          </el-button>
          <el-button type="primary" class="action-btn" @click="refreshNotifications">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z"/>
            </svg>
            刷新
          </el-button>
        </div>
      </div>
    </div>

    <!-- 统计概览 -->
    <div class="stats-section">
      <div class="stats-grid">
        <div class="stat-item total-messages">
          <div class="stat-icon">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"/>
            </svg>
          </div>
          <div class="stat-content">
            <div class="stat-number">{{ allNotifications.length }}</div>
            <div class="stat-label">总消息</div>
          </div>
        </div>

        <div class="stat-item unread-messages">
          <div class="stat-icon">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M12,2C13.1,2 14,2.9 14,4C14,5.1 13.1,6 12,6C10.9,6 10,5.1 10,4C10,2.9 10.9,2 12,2ZM21,9V7L15,4L13.5,7H10.5L9,4L3,7V9H21ZM21,10H3V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V10Z"/>
            </svg>
            <div class="notification-dot" v-if="unreadNotifications.length > 0"></div>
          </div>
          <div class="stat-content">
            <div class="stat-number">{{ unreadNotifications.length }}</div>
            <div class="stat-label">未读消息</div>
          </div>
        </div>

        <div class="stat-item system-notices">
          <div class="stat-icon">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7A7,7 0 0,1 20,14V16L22,18V19H2V18L4,16V14A7,7 0 0,1 11,7V5.73C10.4,5.39 10,4.74 10,4A2,2 0 0,1 12,2M12,20A2,2 0 0,1 10,22A2,2 0 0,1 8,20H12Z"/>
            </svg>
          </div>
          <div class="stat-content">
            <div class="stat-number">{{ notices.length }}</div>
            <div class="stat-label">系统公告</div>
          </div>
        </div>

        <div class="stat-item important-notices">
          <div class="stat-icon">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.46,13.97L5.82,21L12,17.27Z"/>
            </svg>
          </div>
          <div class="stat-content">
            <div class="stat-number">{{ importantNoticesCount }}</div>
            <div class="stat-label">重要公告</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 主要内容区域 -->
    <div class="main-content">
      <div class="content-wrapper">
        <!-- 左侧消息列表 -->
        <div class="messages-panel">
          <div class="panel-header">
            <div class="header-tabs">
              <div 
                class="tab-item" 
                :class="{ active: activeTab === 'personal' }"
                @click="activeTab = 'personal'"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,6A2,2 0 0,0 10,8A2,2 0 0,0 12,10A2,2 0 0,0 14,8A2,2 0 0,0 12,6M12,13C16.42,13 20,15.79 20,19V21H4V19C4,15.79 7.58,13 12,13Z"/>
                </svg>
                <span>个人消息</span>
                <el-badge :value="unreadNotifications.length" :max="99" v-if="unreadNotifications.length > 0" />
              </div>
              <div 
                class="tab-item" 
                :class="{ active: activeTab === 'system' }"
                @click="activeTab = 'system'"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7A7,7 0 0,1 20,14V16L22,18V19H2V18L4,16V14A7,7 0 0,1 11,7V5.73C10.4,5.39 10,4.74 10,4A2,2 0 0,1 12,2M12,20A2,2 0 0,1 10,22A2,2 0 0,1 8,20H12Z"/>
                </svg>
                <span>系统公告</span>
                <el-badge :value="importantNoticesCount" :max="99" v-if="importantNoticesCount > 0" type="danger" />
              </div>
            </div>
          </div>

          <!-- 消息列表内容 -->
          <div class="messages-content">
            <!-- 个人消息 -->
            <div v-if="activeTab === 'personal'" class="message-list">
              <div class="list-filters">
                <el-button-group>
                  <el-button 
                    :type="personalSubTab === 'all' ? 'primary' : ''" 
                    size="small"
                    @click="personalSubTab = 'all'"
                  >
                    全部 ({{ allNotifications.length }})
                  </el-button>
                  <el-button 
                    :type="personalSubTab === 'unread' ? 'primary' : ''" 
                    size="small"
                    @click="personalSubTab = 'unread'"
                  >
                    未读 ({{ unreadNotifications.length }})
                  </el-button>
                </el-button-group>
              </div>

              <div class="message-items">
                <div 
                  v-for="notification in displayNotifications" 
                  :key="notification.id"
                  class="message-item"
                  :class="{ unread: !notification.read, selected: selectedMessage?.id === notification.id }"
                  @click="selectMessage(notification)"
                >
                  <div class="message-avatar">
                    <div class="avatar-icon" :class="notification.type">
                      <svg v-if="notification.type === 'info'" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                        <path d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
                      </svg>
                      <svg v-else-if="notification.type === 'warning'" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                        <path d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
                      </svg>
                      <svg v-else viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                        <path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"/>
                      </svg>
                    </div>
                  </div>
                  <div class="message-content">
                    <div class="message-header">
                      <div class="message-title">{{ notification.title }}</div>
                      <div class="message-time">{{ notification.createTime || notification.time }}</div>
                    </div>
                    <div class="message-preview">{{ notification.content }}</div>
                  </div>
                  <div class="message-indicator" v-if="!notification.read"></div>
                </div>

                <div v-if="displayNotifications.length === 0" class="empty-state">
                  <div class="empty-icon">
                    <svg viewBox="0 0 24 24" width="48" height="48" fill="currentColor">
                      <path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"/>
                    </svg>
                  </div>
                  <div class="empty-text">暂无消息</div>
                </div>
              </div>
            </div>

            <!-- 系统公告 -->
            <div v-if="activeTab === 'system'" class="notice-list">
              <div class="notice-items">
                <div 
                  v-for="notice in notices" 
                  :key="notice.id"
                  class="notice-item"
                  :class="{ selected: selectedMessage?.id === notice.id }"
                  @click="selectMessage(notice)"
                >
                  <div class="notice-icon">
                    <div class="icon-wrapper" :class="notice.priority">
                      <svg v-if="notice.priority === 'high'" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                        <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.46,13.97L5.82,21L12,17.27Z"/>
                      </svg>
                      <svg v-else viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                        <path d="M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7A7,7 0 0,1 20,14V16L22,18V19H2V18L4,16V14A7,7 0 0,1 11,7V5.73C10.4,5.39 10,4.74 10,4A2,2 0 0,1 12,2M12,20A2,2 0 0,1 10,22A2,2 0 0,1 8,20H12Z"/>
                      </svg>
                    </div>
                  </div>
                  <div class="notice-content">
                    <div class="notice-header">
                      <div class="notice-title">{{ notice.title }}</div>
                      <div class="notice-meta">
                        <el-tag v-if="notice.priority === 'high'" type="danger" size="small">重要</el-tag>
                        <span class="notice-time">{{ notice.createTime || notice.time }}</span>
                      </div>
                    </div>
                    <div class="notice-preview">{{ notice.content }}</div>
                  </div>
                </div>

                <div v-if="notices.length === 0" class="empty-state">
                  <div class="empty-icon">
                    <svg viewBox="0 0 24 24" width="48" height="48" fill="currentColor">
                      <path d="M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7A7,7 0 0,1 20,14V16L22,18V19H2V18L4,16V14A7,7 0 0,1 11,7V5.73C10.4,5.39 10,4.74 10,4A2,2 0 0,1 12,2M12,20A2,2 0 0,1 10,22A2,2 0 0,1 8,20H12Z"/>
                    </svg>
                  </div>
                  <div class="empty-text">暂无公告</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧消息详情 -->
        <div class="message-detail">
          <div v-if="selectedMessage" class="detail-content">
            <div class="detail-header">
              <div class="detail-title">{{ selectedMessage.title }}</div>
              <div class="detail-actions">
                <el-button 
                  v-if="!selectedMessage.read && activeTab === 'personal'" 
                  type="primary" 
                  size="small" 
                  @click="markAsRead(selectedMessage)"
                >
                  标为已读
                </el-button>
                <el-button 
                  type="warning" 
                  size="small" 
                  @click="editMessage(selectedMessage)"
                  plain
                >
                  编辑
                </el-button>
                <el-button 
                  type="danger" 
                  size="small" 
                  @click="deleteMessage(selectedMessage)"
                >
                  删除
                </el-button>
              </div>
            </div>
            
            <div class="detail-meta">
              <div class="meta-item">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,6A2,2 0 0,0 10,8A2,2 0 0,0 12,10A2,2 0 0,0 14,8A2,2 0 0,0 12,6M12,13C16.42,13 20,15.79 20,19V21H4V19C4,15.79 7.58,13 12,13Z"/>
                </svg>
                <span>{{ selectedMessage.sender || '系统' }}</span>
              </div>
              <div class="meta-item">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z"/>
                </svg>
                <span>{{ selectedMessage.createTime || selectedMessage.time }}</span>
              </div>
              <div class="meta-item" v-if="selectedMessage.priority">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.46,13.97L5.82,21L12,17.27Z"/>
                </svg>
                <el-tag :type="selectedMessage.priority === 'high' ? 'danger' : 'info'" size="small">
                  {{ selectedMessage.priority === 'high' ? '重要' : '普通' }}
                </el-tag>
              </div>
            </div>

            <div class="detail-body">
              <div class="message-content-full" v-html="selectedMessage.content"></div>
            </div>
          </div>

          <div v-else class="detail-placeholder">
            <div class="placeholder-icon">
              <svg viewBox="0 0 24 24" width="64" height="64" fill="currentColor">
                <path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"/>
              </svg>
            </div>
            <div class="placeholder-text">
              <h3>选择一条消息</h3>
              <p>在左侧列表中选择消息查看详细内容</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 对话框 -->
    <el-dialog v-model="showSendDialog" title="发送消息" width="600px">
      <el-form :model="messageForm" label-width="80px">
        <el-form-item label="接收人">
          <el-select v-model="messageForm.receiver" placeholder="选择接收人" style="width: 100%">
            <el-option label="所有用户" value="all"></el-option>
            <el-option label="管理员" value="admin"></el-option>
            <el-option label="教师" value="teacher"></el-option>
            <el-option label="学生" value="student"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="消息标题">
          <el-input v-model="messageForm.title" placeholder="请输入消息标题"></el-input>
        </el-form-item>
        <el-form-item label="消息内容">
          <el-input 
            v-model="messageForm.content" 
            type="textarea" 
            :rows="6" 
            placeholder="请输入消息内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="优先级">
          <el-radio-group v-model="messageForm.priority">
            <el-radio label="normal">普通</el-radio>
            <el-radio label="high">重要</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showSendDialog = false">取消</el-button>
        <el-button type="primary" @click="sendMessage">发送</el-button>
      </template>
    </el-dialog>

    <!-- 编辑消息对话框 -->
    <el-dialog 
      v-model="editDialogVisible" 
      title="编辑消息" 
      width="600px"
      @close="handleEditDialogClose"
    >
      <el-form 
        ref="editFormRef"
        :model="editForm" 
        :rules="editRules"
        label-width="80px"
        class="edit-form"
      >
        <el-form-item label="消息类型" prop="type">
          <el-select v-model="editForm.type" placeholder="选择消息类型" style="width: 100%">
            <el-option label="系统通知" value="system"></el-option>
            <el-option label="个人消息" value="personal"></el-option>
            <el-option label="重要公告" value="notice"></el-option>
            <el-option label="课程提醒" value="course"></el-option>
          </el-select>
        </el-form-item>
        
        <el-form-item label="消息标题" prop="title">
          <el-input 
            v-model="editForm.title" 
            placeholder="请输入消息标题"
            maxlength="50"
            show-word-limit
          ></el-input>
        </el-form-item>
        
        <el-form-item label="消息内容" prop="content">
          <el-input 
            v-model="editForm.content" 
            type="textarea" 
            :rows="8" 
            placeholder="请输入消息内容"
            maxlength="500"
            show-word-limit
          ></el-input>
        </el-form-item>
        
        <el-form-item label="预览效果">
          <div class="preview-area">
            <div class="preview-title">{{ editForm.title || '消息标题预览' }}</div>
            <div class="preview-content">{{ editForm.content || '消息内容预览...' }}</div>
          </div>
        </el-form-item>
      </el-form>
      
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="editDialogVisible = false">取消</el-button>
          <el-button 
            type="primary" 
            :loading="editLoading"
            @click="confirmEdit"
          >
            保存修改
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useNotificationStore } from '@/stores/notification'
import { useUserStore } from '@/stores/user'
// import { formatDate } from '@/utils'

const notificationStore = useNotificationStore()
const userStore = useUserStore()

// 响应式数据
const activeTab = ref('personal')
const personalSubTab = ref('all')
const selectedMessage = ref(null)
const showSendDialog = ref(false)

// 消息表单
const messageForm = ref({
  receiver: 'all',
  title: '',
  content: '',
  priority: 'normal'
})

// 编辑消息相关
const editDialogVisible = ref(false)
const editLoading = ref(false)
const editFormRef = ref(null)
const editForm = ref({
  id: null,
  title: '',
  content: '',
  type: ''
})

// 编辑表单验证规则
const editRules = {
  title: [
    { required: true, message: '请输入消息标题', trigger: 'blur' },
    { min: 2, max: 50, message: '标题长度在 2 到 50 个字符', trigger: 'blur' }
  ],
  content: [
    { required: true, message: '请输入消息内容', trigger: 'blur' },
    { min: 5, max: 500, message: '内容长度在 5 到 500 个字符', trigger: 'blur' }
  ],
  type: [
    { required: true, message: '请选择消息类型', trigger: 'change' }
  ]
}

// 计算属性
const allNotifications = computed(() => notificationStore.notifications || [])
const unreadNotifications = computed(() => allNotifications.value.filter(n => !n.read))
const notices = computed(() => notificationStore.notices || [])
const importantNoticesCount = computed(() => notices.value.filter(n => n.priority === 'high').length)

const displayNotifications = computed(() => {
  if (personalSubTab.value === 'unread') {
    return unreadNotifications.value
  }
  return allNotifications.value
})

// 选择消息
const selectMessage = (message) => {
  selectedMessage.value = message
  if (!message.read && activeTab.value === 'personal') {
    markAsRead(message)
  }
}

// 标记为已读
const markAsRead = (notification) => {
  notificationStore.markAsRead(notification.id)
  ElMessage.success('已标记为已读')
}

// 全部标为已读
const markAllAsRead = () => {
  if (unreadNotifications.value.length === 0) {
    ElMessage.info('没有未读消息')
    return
  }
  
  notificationStore.markAllAsRead()
  ElMessage.success(`已标记 ${unreadNotifications.value.length} 条消息为已读`)
}

// 刷新消息
const refreshNotifications = () => {
  try {
    notificationStore.fetchNotifications()
    notificationStore.fetchNotices()
    ElMessage.success('消息已刷新')
  } catch (error) {
    console.error('刷新消息失败:', error)
    ElMessage.error('刷新消息失败')
  }
}

// 删除消息
const deleteMessage = (message) => {
  ElMessageBox.confirm('确定要删除这条消息吗？', '确认删除', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    if (activeTab.value === 'personal') {
      notificationStore.deleteNotification(message.id)
    } else {
      notificationStore.deleteNotice(message.id)
    }
    
    if (selectedMessage.value?.id === message.id) {
      selectedMessage.value = null
    }
    
    ElMessage.success('消息已删除')
  }).catch(() => {})
}

// 发送消息
const sendMessage = () => {
  if (!messageForm.value.title || !messageForm.value.content) {
    ElMessage.error('请填写完整的消息内容')
    return
  }
  
  // 这里应该调用API发送消息
  ElMessage.success('消息发送成功')
  showSendDialog.value = false
  
  // 重置表单
  messageForm.value = {
    receiver: 'all',
    title: '',
    content: '',
    priority: 'normal'
  }
}

// 编辑消息
const editMessage = (message) => {
  editForm.value = {
    id: message.id,
    title: message.title,
    content: message.content,
    type: message.type || 'system'
  }
  editDialogVisible.value = true
}

// 确认编辑
const confirmEdit = async () => {
  if (!editFormRef.value) return
  
  try {
    await editFormRef.value.validate()
    editLoading.value = true
    
    // 调用store的更新方法
    const success = await notificationStore.updateNotification(editForm.value.id, {
      title: editForm.value.title,
      content: editForm.value.content,
      type: editForm.value.type
    })
    
    if (success) {
      ElMessage.success('消息编辑成功')
      editDialogVisible.value = false
      
      // 如果当前选中的消息是被编辑的消息，更新选中状态
      if (selectedMessage.value?.id === editForm.value.id) {
        // 从notifications中查找更新后的消息
        const updatedMessage = allNotifications.value.find(n => n.id === editForm.value.id)
        if (updatedMessage) {
          selectedMessage.value = updatedMessage
        }
      }
    } else {
      ElMessage.error('消息编辑失败')
    }
  } catch (error) {
    ElMessage.error('请检查输入内容')
  } finally {
    editLoading.value = false
  }
}

// 处理编辑对话框关闭
const handleEditDialogClose = () => {
  if (editFormRef.value) {
    editFormRef.value.resetFields()
  }
  editForm.value = {
    id: null,
    title: '',
    content: '',
    type: ''
  }
}

// 显示发送消息对话框
const showSendMessageDialog = () => {
  showSendDialog.value = true
}

// 页面初始化
onMounted(() => {
  notificationStore.fetchNotifications()
  notificationStore.fetchNotices()
})
</script>

<style scoped>
:root {
  --primary-color: #3b82f6;
  --success-color: #10b981;
  --warning-color: #f59e0b;
  --danger-color: #ef4444;
  --info-color: #6366f1;
  --text-primary: #1f2937;
  --text-secondary: #6b7280;
  --text-tertiary: #9ca3af;
  --bg-primary: #ffffff;
  --bg-secondary: #f9fafb;
  --bg-tertiary: #f3f4f6;
  --border-color: #e5e7eb;
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
}

/* 页面容器 */
.notifications-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  padding: 24px;
}

/* 页面头部 */
.page-header {
  background: var(--bg-primary);
  border-radius: var(--radius-lg);
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-color);
}

.header-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title-section {
  display: flex;
  align-items: center;
  gap: 16px;
}

.page-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, var(--primary-color), var(--info-color));
  border-radius: var(--radius-lg);
  color: white;
}

.title-content h1 {
  margin: 0 0 4px 0;
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
}

.title-content p {
  margin: 0;
  font-size: 14px;
  color: var(--text-secondary);
}

.header-actions {
  display: flex;
  gap: 12px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: var(--radius-md);
  font-weight: 500;
  transition: all 0.2s ease;
}

/* 统计概览 */
.stats-section {
  margin-bottom: 24px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.stat-item {
  background: var(--bg-primary);
  border-radius: var(--radius-md);
  padding: 20px;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-color);
  transition: all 0.2s ease;
  cursor: pointer;
}

.stat-item:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 16px;
}

.stat-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  position: relative;
}

.total-messages .stat-icon {
  background: linear-gradient(135deg, var(--primary-color), #60a5fa);
  color: white;
}

.unread-messages .stat-icon {
  background: linear-gradient(135deg, var(--warning-color), #fbbf24);
  color: white;
}

.system-notices .stat-icon {
  background: linear-gradient(135deg, var(--info-color), #8b5cf6);
  color: white;
}

.important-notices .stat-icon {
  background: linear-gradient(135deg, var(--danger-color), #f87171);
  color: white;
}

.notification-dot {
  position: absolute;
  top: -2px;
  right: -2px;
  width: 12px;
  height: 12px;
  background: var(--danger-color);
  border-radius: 50%;
  border: 2px solid white;
  animation: pulse 2s infinite;
}

.stat-content {
  flex: 1;
}

.stat-number {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
  color: var(--text-secondary);
  font-weight: 500;
}

/* 主要内容区域 */
.main-content {
  background: var(--bg-primary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-color);
  overflow: hidden;
}

.content-wrapper {
  display: grid;
  grid-template-columns: 400px 1fr;
  height: 600px;
}

/* 左侧消息面板 */
.messages-panel {
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
}

.panel-header {
  padding: 20px;
  border-bottom: 1px solid var(--border-color);
  background: var(--bg-secondary);
}

.header-tabs {
  display: flex;
  gap: 8px;
}

.tab-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
  color: var(--text-secondary);
}

.tab-item:hover {
  background: var(--bg-tertiary);
  color: var(--text-primary);
}

.tab-item.active {
  background: var(--primary-color);
  color: white;
}

.messages-content {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.list-filters {
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-color);
  background: var(--bg-secondary);
}

.message-items, .notice-items {
  flex: 1;
  overflow-y: auto;
}

.message-item, .notice-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-color);
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.message-item:hover, .notice-item:hover {
  background: var(--bg-secondary);
}

.message-item.selected, .notice-item.selected {
  background: #eff6ff;
  border-right: 3px solid var(--primary-color);
}

.message-item.unread {
  background: #fefce8;
}

.message-avatar, .notice-icon {
  flex-shrink: 0;
  margin-top: 4px;
}

.avatar-icon, .icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.avatar-icon.info, .icon-wrapper.normal {
  background: #dbeafe;
  color: var(--primary-color);
}

.avatar-icon.warning, .icon-wrapper.high {
  background: #fef3c7;
  color: var(--warning-color);
}

.icon-wrapper.high {
  background: #fee2e2;
  color: var(--danger-color);
}

.message-content, .notice-content {
  flex: 1;
  min-width: 0;
}

.message-header, .notice-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 4px;
}

.message-title, .notice-title {
  font-weight: 600;
  color: var(--text-primary);
  font-size: 14px;
  line-height: 1.4;
}

.message-time, .notice-time {
  font-size: 12px;
  color: var(--text-tertiary);
  white-space: nowrap;
}

.notice-meta {
  display: flex;
  align-items: center;
  gap: 8px;
}

.message-preview, .notice-preview {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.message-indicator {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 8px;
  height: 8px;
  background: var(--primary-color);
  border-radius: 50%;
}

/* 右侧消息详情 */
.message-detail {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.detail-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 24px;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border-color);
}

.detail-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.4;
}

.detail-actions {
  display: flex;
  gap: 8px;
}

.detail-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 24px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: var(--text-secondary);
}

.detail-body {
  flex: 1;
  overflow-y: auto;
}

.message-content-full {
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-primary);
}

.detail-placeholder {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  text-align: center;
}

.placeholder-icon {
  opacity: 0.3;
  margin-bottom: 16px;
  color: var(--text-tertiary);
}

.placeholder-text h3 {
  margin: 0 0 8px 0;
  font-size: 18px;
  color: var(--text-primary);
}

.placeholder-text p {
  margin: 0;
  font-size: 14px;
  color: var(--text-secondary);
}

/* 空状态 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
}

.empty-icon {
  opacity: 0.3;
  margin-bottom: 16px;
  color: var(--text-tertiary);
}

.empty-text {
  font-size: 14px;
  color: var(--text-secondary);
}

/* 编辑对话框样式 */
.edit-form {
  margin: 0;
}

.edit-form .el-form-item {
  margin-bottom: 20px;
}

.edit-form .el-form-item__label {
  font-weight: 600;
  color: var(--text-primary);
}

.edit-form .el-input__wrapper,
.edit-form .el-textarea__inner,
.edit-form .el-select .el-input__wrapper {
  border-radius: var(--radius-md);
  transition: all 0.3s ease;
}

.edit-form .el-input__wrapper:hover,
.edit-form .el-textarea__inner:hover,
.edit-form .el-select .el-input__wrapper:hover {
  border-color: var(--primary-color);
}

.edit-form .el-input__wrapper.is-focus,
.edit-form .el-textarea__inner:focus,
.edit-form .el-select .el-input__wrapper.is-focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* 预览区域样式 */
.preview-area {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 16px;
  min-height: 120px;
}

.preview-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border-color);
}

.preview-content {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-word;
}

.preview-area:empty::before {
  content: "这里将显示消息的预览效果...";
  color: var(--text-tertiary);
  font-style: italic;
}

/* 对话框按钮样式 */
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.dialog-footer .el-button {
  min-width: 80px;
  border-radius: var(--radius-md);
  font-weight: 500;
}

.dialog-footer .el-button--primary {
  background: var(--primary-color);
  border-color: var(--primary-color);
}

.dialog-footer .el-button--primary:hover {
  background: #2563eb;
  border-color: #2563eb;
}

/* 编辑表单响应式 */
@media (max-width: 768px) {
  .edit-form {
    padding: 0 16px;
  }
  
  .preview-area {
    padding: 12px;
    min-height: 80px;
  }
  
  .preview-title {
    font-size: 14px;
  }
  
  .preview-content {
    font-size: 13px;
  }
}

/* 动画 */
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .content-wrapper {
    grid-template-columns: 300px 1fr;
  }
}

@media (max-width: 768px) {
  .notifications-container {
    padding: 16px;
  }
  
  .content-wrapper {
    grid-template-columns: 1fr;
    grid-template-rows: 300px 1fr;
  }
  
  .messages-panel {
    border-right: none;
    border-bottom: 1px solid var(--border-color);
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  
  .stat-item {
    padding: 16px;
  }
  
  .stat-number {
    font-size: 24px;
  }
  
  .header-main {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
  
  .header-actions {
    width: 100%;
    justify-content: flex-end;
  }
}

@media (max-width: 480px) {
  .notifications-container {
    padding: 12px;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .header-actions {
    flex-direction: column;
    width: 100%;
  }
  
  .action-btn {
    width: 100%;
    justify-content: center;
  }
}
</style> 