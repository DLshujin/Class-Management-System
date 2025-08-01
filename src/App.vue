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
import { HomeFilled, UserFilled, Avatar, Notebook, Collection, Calendar, BellFilled, Wallet, Setting, Fold, Expand, FullScreen, User, Lock, SwitchButton, ArrowDown } from '@element-plus/icons-vue'
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
  
  // 加载通知 - 暂时注释掉，等后端完成后启用
  // notificationStore.fetchNotifications()
  
  // 监听全屏状态变化
  document.addEventListener('fullscreenchange', handleFullscreenChange)
  
  // 全局错误处理 - 增强版
  window.addEventListener('unhandledrejection', (event) => {
    // 过滤掉浏览器扩展相关错误
    const errorMessage = event.reason?.message || String(event.reason) || '未知错误'
    
    // 忽略扩展相关错误，避免控制台噪音
    if (errorMessage.includes('AttaTransport') || 
        errorMessage.includes('message port closed') ||
        errorMessage.includes('Extension context invalidated') ||
        errorMessage.includes('chrome-extension://') ||
        errorMessage.includes('addReadyCallback') ||
        errorMessage.includes('inject success')) {
      event.preventDefault()
      return
    }
    
    // 只处理真正的应用错误
    logger.warn('应用Promise错误', errorMessage)
    console.warn('应用Promise错误:', errorMessage)
    event.preventDefault()
  })

  // 全局脚本错误捕获
  window.addEventListener('error', (event) => {
    // 过滤扩展相关错误
    if (event.filename?.includes('chrome-extension://') || 
        event.message?.includes('AttaTransport') ||
        event.message?.includes('inject success')) {
      return
    }
    
    logger.warn('应用脚本错误', event.message)
    console.warn('应用脚本错误:', event.message, event.filename, event.lineno)
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
      <el-menu :default-active="activeMenu" class="el-menu-vertical-demo" router :collapse="isCollapse">
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
/* 🌐 全局应用样式 */
#app {
  width: 100vw;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

/* 🏗️ 主布局容器 */
.layout-root {
  display: flex;
  min-height: 100vh;
  width: 100vw;
  min-width: 0;
  background: var(--el-bg-color-page, #f4f6fa);
  transition: all 0.3s ease;
}



/* 🧭 现代化侧边栏设计 */
.sidebar {
  width: 200px;
  height: 100vh;
  background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
  color: #e2e8f0;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.15);
  border-right: 1px solid rgba(148, 163, 184, 0.1);
}

.sidebar.is-collapse {
  width: 60px;
}

/* 🎨 Logo区域现代化设计 */
.logo-area {
  padding: 24px 16px;
  background: rgba(99, 102, 241, 0.08);
  border-bottom: 1px solid rgba(148, 163, 184, 0.1);
  text-align: center;
  position: relative;
  overflow: hidden;
}

.logo-area::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%);
  z-index: -1;
}

.logo {
  font-size: 28px;
  margin-bottom: 8px;
  display: block;
  filter: drop-shadow(0 2px 8px rgba(99, 102, 241, 0.3));
  transition: all 0.3s ease;
}

.logo:hover {
  transform: scale(1.05);
  filter: drop-shadow(0 4px 12px rgba(99, 102, 241, 0.4));
}

.sys-title {
  font-size: 14px;
  color: #f1f5f9;
  font-weight: 600;
  letter-spacing: 0.3px;
  margin: 0;
  opacity: 0.95;
  transition: all 0.3s ease;
}

/* 🎯 菜单容器优化 */
.el-menu-vertical-demo {
  background: transparent !important;
  border: none !important;
  padding: 12px 8px !important;
  flex: 1;
  overflow-y: auto;
}

/* 📋 现代化菜单项设计 */
.el-menu-item {
  background: transparent !important;
  border: none !important;
  border-radius: 10px !important;
  margin: 4px 0 !important;
  padding: 12px 14px !important;
  color: #cbd5e1 !important;
  font-size: 13px !important;
  font-weight: 500 !important;
  height: auto !important;
  line-height: 1.4 !important;
  position: relative !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  overflow: hidden !important;
}

.el-menu-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.05));
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.el-menu-item:hover {
  background: rgba(99, 102, 241, 0.12) !important;
  color: #f1f5f9 !important;
  transform: translateX(4px) !important;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.15) !important;
}

.el-menu-item:hover::before {
  opacity: 1;
}

.el-menu-item.is-active {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%) !important;
  color: #ffffff !important;
  font-weight: 600 !important;
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.3) !important;
  transform: translateX(6px) !important;
}

.el-menu-item.is-active::after {
  content: '';
  position: absolute;
  left: -12px;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 24px;
  background: #ffffff;
  border-radius: 0 2px 2px 0;
  box-shadow: 0 2px 8px rgba(255, 255, 255, 0.3);
}

/* 🎨 菜单图标优化 */
.el-menu-item .el-icon {
  font-size: 16px !important;
  margin-right: 10px !important;
  color: inherit !important;
  transition: all 0.3s ease !important;
}

.el-menu-item:hover .el-icon {
  transform: scale(1.1);
}

.el-menu-item.is-active .el-icon {
  color: #ffffff !important;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

/* 📱 折叠状态优化 */
.sidebar.is-collapse .logo-area {
  padding: 16px 6px;
}

.sidebar.is-collapse .sys-title {
  display: none;
}

.sidebar.is-collapse .el-menu-item {
  padding: 12px 6px !important;
  justify-content: center !important;
}

.sidebar.is-collapse .el-menu-item .el-icon {
  margin-right: 0 !important;
  font-size: 18px !important;
}

.sidebar.is-collapse .el-menu-item span {
  display: none;
}

/* 🎪 滚动条美化 */
.el-menu-vertical-demo::-webkit-scrollbar {
  width: 4px;
}

.el-menu-vertical-demo::-webkit-scrollbar-track {
  background: rgba(148, 163, 184, 0.1);
  border-radius: 2px;
}

.el-menu-vertical-demo::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #6366f1, #8b5cf6);
  border-radius: 2px;
}

.el-menu-vertical-demo::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #5b61f0, #7c3aed);
}



/* 🎯 主内容区域 */
.main-area {
  flex: 1;
  margin-left: 200px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  z-index: 1;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: visible;
}

.main-area.is-collapse {
  margin-left: 60px;
}

/* 🎪 现代化顶部导航栏 */
.header-bar {
  width: 100%;
  height: 64px;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  position: relative;
  z-index: 99;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-bottom: 1px solid rgba(148, 163, 184, 0.1);
}



/* 🔀 现代化折叠按钮 */
.collapse-btn {
  color: #64748b;
  font-size: 20px;
  cursor: pointer;
  margin-right: 20px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 10px;
  border-radius: 10px;
  background: rgba(99, 102, 241, 0.05);
  border: 1px solid rgba(99, 102, 241, 0.1);
}

.collapse-btn:hover {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: #ffffff;
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
}



/* 🎭 现代化右侧操作区域 */
.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #64748b;
  font-size: 14px;
  flex-shrink: 0;
}



/* 🎨 现代化操作按钮 */
.header-action {
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 10px;
  border-radius: 10px;
  background: rgba(99, 102, 241, 0.05);
  border: 1px solid rgba(99, 102, 241, 0.1);
  color: #64748b;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  height: 40px;
}

.header-action:hover {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: #ffffff;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
}



/* 👤 现代化用户信息区域 */
.user-dropdown-link {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: 10px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(99, 102, 241, 0.05);
  border: 1px solid rgba(99, 102, 241, 0.1);
  cursor: pointer;
}

.user-dropdown-link:hover {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: #ffffff;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
}



.user-avatar {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: #ffffff;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.user-avatar:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 16px rgba(99, 102, 241, 0.4);
}



.user-name {
  margin: 0 12px;
  font-size: 14px;
  color: #475569;
  max-width: 120px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
  transition: color 0.3s ease;
}

.user-dropdown-link:hover .user-name {
  color: #ffffff;
}



/* 🖼️ 现代化主内容容器 */
.main-content {
  width: 100%;
  min-width: 0;
  padding: 20px 24px;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  flex: 1;
  position: relative;
  min-height: calc(100vh - 64px); /* 减去header高度 */
  max-height: none;
}

.main-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.02) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.02) 0%, transparent 50%);
  pointer-events: none;
  z-index: -1;
}



/* 🔔 现代化通知面板 */
.notification-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-bottom: 1px solid rgba(148, 163, 184, 0.1);
  border-radius: 12px 12px 0 0;
}

.notification-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #334155;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.notification-item {
  padding: 16px 20px;
  border-bottom: 1px solid rgba(148, 163, 184, 0.1);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.notification-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  transform: scaleY(0);
  transition: transform 0.3s ease;
}

.notification-item:hover {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(139, 92, 246, 0.03));
  transform: translateX(4px);
}

.notification-item:hover::before {
  transform: scaleY(1);
}





/* 📱 完善的响应式设计 */

/* 大屏幕优化 (1400px+) */
@media (min-width: 1400px) {
  .sidebar {
    width: 220px;
  }
  
  .main-area {
    margin-left: 220px;
  }
  
  .main-content {
    padding: 24px 32px;
  }
  
  .header-bar {
    padding: 0 32px;
  }
}

/* 中大屏幕 (1200px - 1399px) */
@media (max-width: 1399px) and (min-width: 1200px) {
  .main-content {
    padding: 20px 24px;
  }
}

/* 中等屏幕 (992px - 1199px) */
@media (max-width: 1199px) and (min-width: 992px) {
  .sidebar {
    width: 180px;
  }
  
  .main-area {
    margin-left: 180px;
  }
  
  .main-content {
    padding: 18px 20px;
  }
  
  .header-bar {
    padding: 0 20px;
  }
}

/* 小屏幕 (768px - 991px) */
@media (max-width: 991px) and (min-width: 769px) {
  .sidebar {
    width: 160px;
  }
  
  .main-area {
    margin-left: 160px;
  }
  
  .main-content {
    padding: 16px 20px;
  }
  
  .header-bar {
    height: 56px;
    padding: 0 20px;
  }
  
  .collapse-btn {
    font-size: 18px;
    padding: 8px;
  }
  
  .header-action {
    min-width: 36px;
    height: 36px;
    font-size: 14px;
  }
}

/* 移动设备 (768px以下) */
@media (max-width: 768px) {
  .sidebar {
    width: 240px;
    transform: translateX(-100%);
    box-shadow: 0 0 60px rgba(0, 0, 0, 0.3);
    z-index: 1000;
  }
  
  .sidebar.mobile-open {
    transform: translateX(0);
  }
  
  .main-area {
    margin-left: 0;
  }
  
  .main-content {
    padding: 16px;
  }
  
  .header-bar {
    height: 56px;
    padding: 0 16px;
  }
  
  .collapse-btn {
    margin-right: 8px;
    font-size: 18px;
    padding: 8px;
  }
  
  .header-action {
    min-width: 32px;
    height: 32px;
    font-size: 14px;
    padding: 6px;
  }
  
  .user-dropdown-link {
    padding: 6px 8px;
  }
  
  .user-name {
    display: none;
  }
}

/* 超小屏幕 (480px以下) */
@media (max-width: 480px) {
  .sidebar {
    width: 240px;
  }
  
  .main-content {
    padding: 12px;
  }
  
  .header-bar {
    padding: 0 12px;
  }
  
  .header-right {
    gap: 8px;
  }
  
  .collapse-btn {
    margin-right: 6px;
  }
}

/* 🧭 现代化面包屑导航 */
.header-breadcrumb {
  margin-left: 8px;
}

.header-breadcrumb .el-breadcrumb__item {
  font-size: 14px;
  font-weight: 500;
}

.header-breadcrumb .el-breadcrumb__inner {
  color: #64748b;
  transition: color 0.3s ease;
}

.header-breadcrumb .el-breadcrumb__inner:hover {
  color: #6366f1;
}

.header-breadcrumb .el-breadcrumb__item:last-child .el-breadcrumb__inner {
  color: #334155;
  font-weight: 600;
}

/* 🏷️ 现代化徽章样式 */
.notification-badge .el-badge__content {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  border: 2px solid #ffffff;
  box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);
  font-weight: 600;
  min-width: 18px;
  height: 18px;
  line-height: 14px;
}

/* 🎯 内容区域布局优化 */
.page-container {
  width: 100%;
  max-width: none;
  min-height: 100%;
}

/* 🎨 页面内容区域 */
.page-content {
  width: 100%;
  min-height: calc(100vh - 120px); /* 确保有足够的最小高度 */
}

/* 📄 确保内容能完整显示 */
.content-wrapper {
  width: 100%;
  overflow: visible;
}

/* 🎪 数据展示区域优化 */
.data-section {
  width: 100%;
  margin-bottom: 24px;
}

.data-section:last-child {
  margin-bottom: 0;
  padding-bottom: 24px; /* 底部留白 */
}

.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.search-container {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  margin-bottom: 20px;
}

.search-item {
  min-width: 0;
  flex: 1;
  min-width: 150px;
}

.search-actions {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}

/* 📊 统计卡片响应式优化 */
@media (max-width: 1199px) {
  .stats-container {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 12px;
  }
}

@media (max-width: 991px) {
  .stats-container {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  
  .search-container {
    flex-direction: column;
    align-items: stretch;
  }
  
  .search-item {
    min-width: auto;
  }
  
  .search-actions {
    justify-content: stretch;
  }
  
  .search-actions .el-button {
    flex: 1;
  }
}

@media (max-width: 768px) {
  .stats-container {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }
  
  .search-container {
    gap: 8px;
  }
}

@media (max-width: 480px) {
  .stats-container {
    grid-template-columns: 1fr;
    gap: 8px;
  }
  
  .search-actions {
    flex-direction: column;
  }
}

/* 🎪 数据表格响应式 */
.table-container {
  overflow-x: auto;
  margin-top: 16px;
  width: 100%;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.table-container .el-table {
  min-width: 800px;
  width: 100%;
}

/* 🎯 Element Plus 组件高度优化 */
.el-table {
  background-color: transparent !important;
}

.el-table__body-wrapper {
  max-height: none !important;
  overflow-y: visible !important;
}

.el-table__fixed-body-wrapper {
  max-height: none !important;
}

/* 🎨 分页器优化 */
.pagination-container {
  padding: 16px 0;
  text-align: center;
  background: #ffffff;
  border-radius: 0 0 12px 12px;
  margin-top: -1px;
}

/* 📋 确保所有内容可见 */
.el-card {
  margin-bottom: 16px;
  overflow: visible !important;
}

.el-card__body {
  overflow: visible !important;
}

@media (max-width: 991px) {
  .table-container .el-table {
    min-width: 600px;
  }
}

@media (max-width: 768px) {
  .table-container .el-table {
    min-width: 500px;
  }
  
  .table-container {
    margin-left: -16px;
    margin-right: -16px;
    padding-left: 16px;
    padding-right: 16px;
  }
}


</style>
