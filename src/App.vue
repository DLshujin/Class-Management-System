<!--
=============================================
文件：App.vue
说明：前端根组件，应用布局与全局逻辑
主要依赖：Vue 3, Element Plus
作者：
日期：2024-xx-xx
=============================================
-->
<script setup>
import { ref, computed, onMounted, onErrorCaptured, provide } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { HomeFilled, UserFilled, Avatar, Notebook, Collection, Calendar, BellFilled, Wallet, Setting, Fold, Expand, FullScreen, User, Lock, SwitchButton, ArrowDown, Moon, Sunny } from '@element-plus/icons-vue'
import { useUserStore } from './stores/user'
import { useThemeStore } from './stores/theme'
import { useNotificationStore } from './stores/notification'
import { useDataSourceStore } from './stores/dataSource'
import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus';

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const themeStore = useThemeStore()
const notificationStore = useNotificationStore()
const dataSourceStore = useDataSourceStore()
const { type: dataSourceType } = storeToRefs(dataSourceStore)

const activeMenu = ref(route.path)
const isCollapse = ref(false)
const isFullscreen = ref(false)

// 主题相关
const isDarkMode = computed(() => themeStore.isDarkMode)
const toggleTheme = () => {
  themeStore.toggleTheme()
  ElMessage.success(`已切换到${isDarkMode.value ? '暗色' : '亮色'}主题`)
}

// 全屏切换
const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(err => {
      showError({
        title: '全屏切换失败',
        message: '您的浏览器可能不支持全屏功能',
        details: err.message
      })
    })
    isFullscreen.value = true
    ElMessage.success('已进入全屏模式')
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
      isFullscreen.value = false
      ElMessage.success('已退出全屏模式')
    }
  }
}

// 监听全屏状态变化
const handleFullscreenChange = () => {
  isFullscreen.value = !!document.fullscreenElement
}

// 用户信息
const userInfo = computed(() => userStore.getUserInfo || {})
const userAvatar = ref('')

// 获取或生成用户头像
const generateAvatar = () => {
  // 这里可以根据用户信息生成头像或获取头像URL
  // 如果有头像URL，则返回URL；否则返回空字符串，将使用文字头像
  return ''
}

// 权限检查
const hasPermission = (permission) => {
  return userStore.hasPermission(permission)
}

// 消息通知
const notifications = computed(() => notificationStore.getNotifications)
const unreadCount = computed(() => notificationStore.getUnreadCount)

// 查看通知
const viewNotification = (notification) => {
  notificationStore.markAsRead(notification.id)
  ElMessage.success('已标记为已读')
  // 这里可以添加跳转到通知详情的逻辑
}

// 标记所有通知为已读
const markAllAsRead = () => {
  notificationStore.markAllAsRead()
  ElMessage.success('已全部标记为已读')
}

// 查看所有通知
const viewAllNotifications = () => {
  router.push('/notifications')
}

// 通知弹窗显示时的回调
const onNotificationPopoverShow = () => {
  // 加载最新的通知
  notificationStore.fetchNotifications()
}

// 全局错误处理
const errorDialogVisible = ref(false)
const errorInfo = ref({
  title: '',
  message: '',
  details: '',
  retry: null
})

// 显示错误对话框
const showError = (error) => {
  errorInfo.value = {
    title: error.title || '操作失败',
    message: error.message || '发生未知错误，请稍后重试',
    details: error.details || '',
    retry: error.retry || null
  }
  errorDialogVisible.value = true
}

// 重试操作
const retryOperation = () => {
  if (typeof errorInfo.value.retry === 'function') {
    errorInfo.value.retry()
  }
  errorDialogVisible.value = false
}

// 提供全局错误处理函数
provide('showError', showError)

// 捕获未处理的组件错误
onErrorCaptured((err, instance, info) => {
  console.error('捕获到错误:', err.message);
  
  // 处理特定的路由错误
  if (err.message && err.message.includes('onBeforeRouteEnter')) {
    ElMessage.error({
      message: '路由错误，请刷新页面',
      duration: 5000
    });
    return false;
  }
  
  // 处理API错误
  if (err.message && err.message.includes('接口不存在')) {
    ElMessage.error({
      message: '数据加载失败，请从菜单重新进入页面',
      duration: 5000
    });
    return false;
  }
  
  // 其他错误显示错误对话框
  showError({
    title: '系统错误',
    message: err.message,
    details: `${info}\n${err.stack}`
  });
  
  return false; // 阻止错误继续传播
})

onMounted(() => {
  userAvatar.value = generateAvatar()
  
  // 初始化主题
  themeStore.initTheme()
  
  // 加载通知
  notificationStore.fetchNotifications()
  
  // 监听全屏状态变化
  document.addEventListener('fullscreenchange', handleFullscreenChange)
  
  // 监听全局API错误
  window.addEventListener('unhandledrejection', (event) => {
    showError({
      title: 'API请求失败',
      message: event.reason?.message || '网络请求失败',
      details: JSON.stringify(event.reason, null, 2)
    })
    event.preventDefault()
  })
})

const toggleDataSource = () => {
  dataSourceStore.setDataSourceType(dataSourceType.value === 'mock' ? 'api' : 'mock')
}

const breadcrumbs = computed(() => {
  const map = {
    '/': ['首页'],
    '/student': ['学员管理'],
    '/teacher': ['教师管理'],
    '/course': ['课程管理'],
    '/class': ['班级管理'],
    '/schedule': ['排课管理'],
    '/notice': ['通知公告'],
    '/finance': ['费用管理'],
    '/settings': ['系统设置'],
    '/profile': ['个人中心'],
    '/notifications': ['消息通知']
  }
  return map[route.path] || ['']
})

const roles = [
  { label: '管理员', value: 'admin' },
  { label: '老师', value: 'teacher' }
]

const currentRole = computed(() => userStore.getRole || 'admin')

const handleUserAction = (command) => {
  if (command === 'logout') {
    userStore.logout()
    router.push('/login')
    return
  }
  
  if (command === 'profile') {
    router.push('/profile')
    return
  }
  
  if (command === 'password') {
    router.push('/profile')
    // 打开修改密码标签页
    localStorage.setItem('profileActiveTab', 'password')
    return
  }
  
  if (command.startsWith('role:')) {
    const role = command.split(':')[1]
    userStore.setRole(role)
    ElMessage.success(`已切换到${role === 'admin' ? '管理员' : '老师'}角色`)
  }
}

const getRoleLabel = (role) => {
  const found = roles.find(r => r.value === role)
  return found ? found.label : ''
}
</script>

<template>
  <div class="layout-root">
    <aside class="sidebar" :class="{'is-collapse': isCollapse}">
      <div class="logo-area">
        <span class="logo">🎓</span>
        <span class="sys-title" v-show="!isCollapse">青少年编程后台</span>
      </div>
      <el-menu :default-active="activeMenu" class="el-menu-vertical-demo" router background-color="#232d3c" text-color="#fff" active-text-color="#409EFF" :collapse="isCollapse">
        <el-menu-item index="/">
          <el-icon><HomeFilled /></el-icon>
          <span>首页</span>
        </el-menu-item>
        <el-menu-item index="/student" v-if="hasPermission('view_students') || hasPermission('manage_students')">
          <el-icon><UserFilled /></el-icon>
          <span>学员管理</span>
        </el-menu-item>
        <el-menu-item index="/teacher" v-if="hasPermission('manage_teachers')">
          <el-icon><Avatar /></el-icon>
          <span>教师管理</span>
        </el-menu-item>
        <el-menu-item index="/course" v-if="hasPermission('view_courses') || hasPermission('manage_courses')">
          <el-icon><Notebook /></el-icon>
          <span>课程管理</span>
        </el-menu-item>
        <el-menu-item index="/class" v-if="hasPermission('view_classes') || hasPermission('manage_classes')">
          <el-icon><Collection /></el-icon>
          <span>班级管理</span>
        </el-menu-item>
        <el-menu-item index="/schedule" v-if="hasPermission('view_schedules') || hasPermission('manage_schedules')">
          <el-icon><Calendar /></el-icon>
          <span>排课管理</span>
        </el-menu-item>
        <el-menu-item index="/notifications" v-if="hasPermission('view_notices')">
          <el-icon><BellFilled /></el-icon>
          <span>消息中心</span>
        </el-menu-item>
        <el-menu-item index="/finance" v-if="hasPermission('manage_finance')">
          <el-icon><Wallet /></el-icon>
          <span>费用管理</span>
        </el-menu-item>
        <el-menu-item index="/settings" v-if="hasPermission('manage_settings')">
          <el-icon><Setting /></el-icon>
          <span>系统设置</span>
        </el-menu-item>
      </el-menu>
    </aside>
    <div class="main-area" :class="{'is-collapse': isCollapse}">
      <header class="header-bar">
        <div class="header-left">
          <el-icon class="collapse-btn" @click="isCollapse = !isCollapse">
            <component :is="isCollapse ? Expand : Fold" />
          </el-icon>
          <el-breadcrumb separator="/" class="header-breadcrumb">
            <el-breadcrumb-item v-for="(item, idx) in breadcrumbs" :key="idx">{{ item }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="header-right">
          <!-- 数据源切换按钮和状态标签 -->
          <el-tooltip :content="dataSourceType === 'mock' ? '当前为模拟数据，点击切换为API数据' : '当前为API数据，点击切换为模拟数据'">
            <el-button size="small" :type="dataSourceType === 'mock' ? 'warning' : 'success'" @click="toggleDataSource" style="margin-right: 12px;">
              {{ dataSourceType === 'mock' ? '模拟数据' : 'API数据' }}
            </el-button>
          </el-tooltip>
          <el-tooltip content="切换主题">
            <el-icon class="header-action theme-toggle" @click="toggleTheme">
              <component :is="isDarkMode ? Sunny : Moon" />
            </el-icon>
          </el-tooltip>
          <el-tooltip :content="isFullscreen ? '退出全屏' : '全屏显示'">
            <el-icon class="header-action" @click="toggleFullscreen">
              <FullScreen />
            </el-icon>
          </el-tooltip>
          <el-badge :value="unreadCount" :hidden="unreadCount === 0" class="notification-badge">
            <el-popover
              placement="bottom-end"
              :width="350"
              trigger="click"
              popper-class="notification-popover"
              @show="onNotificationPopoverShow"
            >
              <template #reference>
                <el-icon class="header-action"><BellFilled /></el-icon>
              </template>
              <template #default>
                <div class="notification-header">
                  <h3>消息通知</h3>
                  <el-button link type="primary" @click="markAllAsRead">全部标为已读</el-button>
                </div>
                <div class="notification-list" v-if="notifications && notifications.length > 0">
                  <div
                    v-for="notification in notifications.slice(0, 5)"
                    :key="notification.id"
                    class="notification-item"
                    :class="{ 'notification-unread': !notification.read }"
                    @click="viewNotification(notification)"
                  >
                    <div class="notification-title">{{ notification.title }}</div>
                    <div class="notification-content">{{ notification.content }}</div>
                    <div class="notification-time">{{ notification.time }}</div>
                  </div>
                </div>
                <div v-else class="notification-empty">
                  暂无消息通知
                </div>
                <div class="notification-footer">
                  <el-button link type="primary" @click="viewAllNotifications">查看全部</el-button>
                </div>
              </template>
            </el-popover>
          </el-badge>
          <el-dropdown @command="handleUserAction" trigger="click">
            <div class="user-dropdown-link">
              <el-avatar :size="32" :src="userAvatar" class="user-avatar">
                {{ userInfo.name ? userInfo.name.charAt(0) : '用' }}
              </el-avatar>
              <span class="user-name">{{ userInfo.name || getRoleLabel(currentRole) }}</span>
              <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="profile">
                  <el-icon><User /></el-icon>个人中心
                </el-dropdown-item>
                <el-dropdown-item command="password">
                  <el-icon><Lock /></el-icon>修改密码
                </el-dropdown-item>
                <el-dropdown-item divided>
                  <span>切换角色</span>
                </el-dropdown-item>
                <el-dropdown-item
                  v-for="role in roles"
                  :key="role.value"
                  :command="'role:' + role.value"
                  :disabled="role.value === currentRole"
                >
                  {{ role.label }}
                </el-dropdown-item>
                <el-dropdown-item divided command="logout">
                  <el-icon><SwitchButton /></el-icon>退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </header>
      <main class="main-content">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </main>
    </div>
    
    <!-- 全局错误处理对话框 -->
    <el-dialog
      v-model="errorDialogVisible"
      title="系统错误"
      width="500px"
      :show-close="true"
      :close-on-click-modal="true"
      :close-on-press-escape="true"
    >
      <div class="error-dialog-content">
        <el-alert
          :title="errorInfo.title"
          :description="errorInfo.message"
          type="error"
          :closable="false"
          show-icon
        />
        <div class="error-details" v-if="errorInfo.details">
          <p class="error-details-title">错误详情：</p>
          <pre class="error-details-code">{{ errorInfo.details }}</pre>
        </div>
      </div>
      <template #footer>
        <el-button @click="errorDialogVisible = false">关闭</el-button>
        <el-button type="primary" @click="retryOperation">重试</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style>
html, body, #app {
  width: 100%;
  height: 100%;
  min-width: 0;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}
.layout-root {
  display: flex;
  height: 100vh;
  width: 100vw;
  min-width: 0;
  background: #f4f6fa;
}
.sidebar {
  width: 220px;
  height: 100vh;
  background: #232d3c;
  color: #fff;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
  transition: width 0.3s;
}
.sidebar.is-collapse {
  width: 64px;
}
.logo-area {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 56px;
  padding-left: 24px;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 2px;
}
.logo {
  font-size: 26px;
  margin-right: 8px;
}
.sys-title {
  font-size: 18px;
  color: #fff;
}
.main-area {
  flex: 1;
  margin-left: 220px;
  display: flex;
  flex-direction: column;
  min-width: 0;
  height: 100vh;
  transition: margin-left 0.3s;
}
.main-area.is-collapse {
  margin-left: 64px;
}
.header-bar {
  width: 100%;
  height: 56px;
  background: #fff;
  box-shadow: 0 2px 8px #f0f1f2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  z-index: 10;
}
.header-left {
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
}
.collapse-btn {
  color: #232d3c;
  font-size: 22px;
  cursor: pointer;
  margin-right: 16px;
}
.header-breadcrumb {
  font-size: 15px;
  flex: 1;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
  color: #232d3c;
  font-size: 15px;
  flex-shrink: 0;
}
.header-action {
  cursor: pointer;
  font-size: 20px;
  margin-right: 2px;
  transition: all 0.3s ease;
}
.header-action:hover {
  transform: scale(1.1);
  color: #409EFF;
}
.theme-toggle {
  transition: transform 0.3s;
}

.theme-toggle:hover {
  transform: rotate(30deg);
}

.notification-badge {
  margin-right: 8px;
}

.user-dropdown-link {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 2px 8px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.user-dropdown-link:hover {
  background-color: #f5f7fa;
}

.user-avatar {
  background: #409EFF;
  color: #fff;
  font-weight: bold;
}

.user-name {
  margin: 0 8px;
  font-size: 14px;
  color: #333;
  max-width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.main-content {
  flex: 1;
  width: 100%;
  min-width: 0;
  padding: 16px 8px 16px 8px;
  background: #f4f6fa;
  overflow: auto;
  box-sizing: border-box;
}
/* 全局去除max-width和margin:auto限制 */
.container, .main, .content-wrapper, .wrapper {
  max-width: none !important;
  margin: 0 !important;
  width: 100% !important;
  min-width: 0 !important;
  box-sizing: border-box !important;
}
.el-card, .el-table, .el-form {
  width: 100% !important;
  min-width: 0 !important;
  margin: 0 !important;
  box-sizing: border-box !important;
}
/* 下拉菜单图标样式 */
.el-dropdown-menu__item .el-icon {
  margin-right: 8px;
  font-size: 16px;
}

/* 消息通知样式 */
.notification-popover {
  padding: 0;
  max-width: 350px;
}

.notification-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  border-bottom: 1px solid #ebeef5;
}

.notification-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.notification-list {
  max-height: 300px;
  overflow-y: auto;
}

.notification-item {
  padding: 12px 15px;
  border-bottom: 1px solid #ebeef5;
  cursor: pointer;
  transition: background-color 0.2s;
}

.notification-item:hover {
  background-color: #f5f7fa;
}

.notification-unread {
  background-color: #ecf5ff;
}

.notification-unread:hover {
  background-color: #e6f1ff;
}

.notification-title {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 5px;
  color: #303133;
}

.notification-content {
  font-size: 13px;
  color: #606266;
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.notification-time {
  font-size: 12px;
  color: #909399;
}

.notification-empty {
  padding: 30px 0;
  text-align: center;
  color: #909399;
  font-size: 14px;
}

.notification-footer {
  padding: 10px 15px;
  text-align: center;
  border-top: 1px solid #ebeef5;
}

/* 错误对话框样式 */
.error-dialog-content {
  padding: 10px 0;
}

.error-details {
  margin-top: 20px;
  border-top: 1px solid #ebeef5;
  padding-top: 15px;
}

.error-details-title {
  font-weight: 600;
  margin-bottom: 10px;
  color: #606266;
}

.error-details-code {
  background-color: #f5f7fa;
  padding: 10px;
  border-radius: 4px;
  font-family: monospace;
  font-size: 12px;
  overflow-x: auto;
  max-height: 200px;
  white-space: pre-wrap;
  color: #606266;
}

body[data-theme='dark'] .error-details-code {
  background-color: #2c2c2c;
  color: #CFD3DC;
}

/* 暗色主题样式 */
body[data-theme='dark'] {
  background-color: #1f2937;
  color: #e5e7eb;
}

body[data-theme='dark'] .layout-root {
  background: #1f2937;
}

body[data-theme='dark'] .header-bar {
  background: #374151;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

body[data-theme='dark'] .main-content {
  background: #1f2937;
}

body[data-theme='dark'] .header-action {
  color: #e5e7eb;
}

body[data-theme='dark'] .user-name {
  color: #e5e7eb;
}

body[data-theme='dark'] .user-dropdown-link:hover {
  background-color: #4b5563;
}
</style>
