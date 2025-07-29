<template>
  <div class="login-container">
    <!-- 背景渐变 -->
    <div class="background-gradient">
      <div class="gradient-orb orb-1"></div>
      <div class="gradient-orb orb-2"></div>
      <div class="gradient-orb orb-3"></div>
    </div>

    <!-- 登录卡片 -->
    <div class="login-wrapper">
      <div class="login-card modern-card glass">
      <!-- 左侧品牌区域 -->
      <div class="brand-section">
        <div class="brand-content">
          <div class="brand-logo">
              <div class="logo-icon">
                <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
                  <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                </svg>
          </div>
            </div>
            <h1 class="brand-title">SHUJIN EDU</h1>
            <p class="brand-subtitle">青少年编程教育管理平台</p>
            
          <div class="brand-features">
            <div class="feature-item">
                <div class="feature-icon">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
              <span>专业编程教育</span>
            </div>
            <div class="feature-item">
                <div class="feature-icon">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <span>智能化管理</span>
            </div>
            <div class="feature-item">
                <div class="feature-icon">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
            </div>
                <span>高效教学工具</span>
              </div>
            </div>

            <div class="brand-stats">
              <div class="stat-item">
                <div class="stat-number">1000+</div>
                <div class="stat-label">学员</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">50+</div>
                <div class="stat-label">教师</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">20+</div>
                <div class="stat-label">课程</div>
              </div>
          </div>
        </div>
      </div>

      <!-- 右侧登录区域 -->
      <div class="login-section">
        <div class="login-header">
            <h2 class="login-title">欢迎回来</h2>
            <p class="login-subtitle">请登录您的管理账户</p>
        </div>

        <!-- 数据模式指示器 -->
        <div class="data-mode-indicator" v-if="dataSourceStore.isMockMode">
            <div class="mode-badge">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18v-2H3v2zm9-9a4 4 0 00-4 4v2h8V8a4 4 0 00-4-4z"/>
              </svg>
            模拟数据模式
            </div>
            <p class="mode-tip">当前为演示模式，可直接体验系统功能</p>
        </div>
        
        <!-- 登录方式切换 -->
        <div class="login-type-switch" v-if="!dataSourceStore.isMockMode">
            <div class="switch-tabs">
              <button 
                :class="['tab-button', { active: loginType === 'admin' }]"
                @click="loginType = 'admin'"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                管理员
              </button>
              <button 
                :class="['tab-button', { active: loginType === 'teacher' }]"
                @click="loginType = 'teacher'"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                教师
              </button>
            </div>
        </div>
        
        <!-- 登录表单 -->
        <el-form 
          :model="form" 
          :rules="rules" 
          ref="formRef" 
          @submit.native.prevent="onLogin" 
            class="login-form modern-form"
        >
            <el-form-item prop="username" v-if="loginType === 'admin'">
              <div class="input-group">
                <div class="input-icon">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
            <el-input 
              v-model="form.username" 
                  placeholder="请输入管理员账号"
                  size="large"
                  autocomplete="username"
            />
              </div>
          </el-form-item>

            <el-form-item prop="name" v-if="loginType === 'teacher'">
              <div class="input-group">
                <div class="input-icon">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>
              <el-input 
                v-model="form.name" 
                placeholder="请输入教师姓名"
                  size="large"
                  autocomplete="name"
              />
              </div>
            </el-form-item>

            <el-form-item prop="password">
              <div class="input-group">
                <div class="input-icon">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M12 17a2 2 0 002-2 2 2 0 00-2-2 2 2 0 00-2 2 2 2 0 002 2m6-9a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V10a2 2 0 012-2h1V6a5 5 0 015-5 5 5 0 015 5v2h1m-6-5a3 3 0 00-3 3v2h6V6a3 3 0 00-3-3z"/>
                  </svg>
                </div>
              <el-input 
                v-model="form.password" 
                type="password" 
                placeholder="请输入密码"
                  size="large"
                show-password
                  autocomplete="current-password"
              />
              </div>
            </el-form-item>
          
          <!-- 验证码 -->
            <el-form-item prop="captcha" v-if="!dataSourceStore.isMockMode">
              <div class="captcha-group">
                <div class="input-group">
                  <div class="input-icon">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <path d="M11,18H13C13,16.67 13.67,16 15,16V14A4,4 0 0,0 11,18M9,20A2,2 0 0,1 7,18A2,2 0 0,1 9,16A2,2 0 0,1 11,18A2,2 0 0,1 9,20Z"/>
                    </svg>
                  </div>
              <el-input 
                v-model="form.captcha" 
                    placeholder="验证码"
                    size="large"
              />
                </div>
                <div class="captcha-image" @click="refreshCaptcha">
                  <img :src="captchaImage" alt="验证码" />
                  <div class="refresh-hint">点击刷新</div>
              </div>
            </div>
          </el-form-item>
          
            <!-- 记住登录和忘记密码 -->
          <div class="login-options">
              <el-checkbox v-model="form.remember">记住登录状态</el-checkbox>
              <a href="#" class="forgot-password">忘记密码？</a>
          </div>
          
          <!-- 登录按钮 -->
          <el-button 
            type="primary" 
            size="large"
              @click="onLogin"
              :loading="isLoading"
              class="login-button modern-btn primary"
          >
              <span v-if="!isLoading">立即登录</span>
              <span v-else>登录中...</span>
          </el-button>
        
            <!-- 演示账号信息 -->
            <div class="demo-info" v-if="dataSourceStore.isMockMode">
              <div class="demo-title">演示账号信息</div>
              <div class="demo-accounts">
                <div class="demo-account">
                  <strong>管理员:</strong> admin / admin123
            </div>
                <div class="demo-account">
                  <strong>教师:</strong> 张老师 / teacher123
          </div>
        </div>
            </div>
          </el-form>
            </div>
          </div>
        </div>

    <!-- 底部信息 -->
    <div class="login-footer">
      <p>&copy; 2024 SHUJIN 教育科技. 专注青少年编程教育</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { User, Lock, Key, Phone } from '@element-plus/icons-vue'
import { useUserStore } from '../stores/user'
import { useDataSourceStore } from '../stores/dataSource'
import api from '../utils/api'

const router = useRouter()
const userStore = useUserStore()
const dataSourceStore = useDataSourceStore()

const loading = ref(false)
const showCaptcha = ref(false)
const rememberMe = ref(false)
const loginFailCount = ref(0)
const captchaImage = ref('')
const captchaKey = ref('')
const loginType = ref('admin') // 默认管理员登录

// 登录表单
const form = ref({
  username: '',
  password: '',
  name: '', // 教师姓名
  phone: '', // 教师手机号
  captcha: '',
  captchaKey: '',
  remember: false // 新增记住登录状态
})
const formRef = ref()

// 登录验证规则
const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  name: [{ required: true, message: '请输入教师姓名', trigger: 'blur' }],
  phone: [
    { required: true, message: '请输入手机号码', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
  ],
  captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
}

// 处理登录方式切换
const handleLoginTypeChange = (type) => {
  // 清空表单
  form.value = {
    username: '',
    password: '',
    name: '',
    phone: '',
    captcha: '',
    captchaKey: '',
    remember: false // 重置记住状态
  }
  
  // 重置验证
  formRef.value?.clearValidate()
  
  // 重置验证码
  showCaptcha.value = false
  loginFailCount.value = 0
}

// 自动登录（模拟数据模式）
const autoLogin = async () => {
  if (!dataSourceStore.isMockMode) return
  
  loading.value = true
  
  try {
    // 模拟登录延迟
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // 使用模拟数据自动登录
    await userStore.login({
      username: 'admin',
      password: 'admin123',
      loginType: 'admin',
      autoLogin: true
    })
    
    ElMessage.success('自动登录成功')
    router.push('/')
  } catch (error) {
    logger.error('自动登录失败', error, 'LOGIN')
    ElMessage.error('自动登录失败，请刷新页面重试')
  } finally {
    loading.value = false
  }
}

// 检查是否记住密码
onMounted(async () => {
  // 检查数据源模式
  await dataSourceStore.checkBackendStatus()
  
  // 如果是模拟数据模式，直接自动登录
  if (dataSourceStore.isMockMode) {
    autoLogin()
    return
  }
  
  // API模式下的正常登录流程
  const savedLoginType = localStorage.getItem('loginType') || 'admin'
  loginType.value = savedLoginType
  
  const savedUsername = localStorage.getItem('rememberedUsername')
  const savedPassword = localStorage.getItem('rememberedPassword')
  const savedName = localStorage.getItem('rememberedName')
  const savedPhone = localStorage.getItem('rememberedPhone')
  const savedRemember = localStorage.getItem('rememberMe') // 获取记住状态
  
  if (savedLoginType === 'admin' && savedUsername && savedPassword) {
    form.value.username = savedUsername
    form.value.password = savedPassword
    form.value.remember = savedRemember === 'true' // 设置记住状态
  } else if (savedLoginType === 'teacher' && savedName && savedPhone && savedPassword) {
    form.value.name = savedName
    form.value.phone = savedPhone
    form.value.password = savedPassword
    form.value.remember = savedRemember === 'true' // 设置记住状态
  }
  
  // 如果需要验证码，获取验证码
  if (showCaptcha.value) {
    refreshCaptcha()
  }
})

// 监听数据源变化
watch(() => dataSourceStore.type, (newType) => {
  if (newType === 'mock') {
    // 切换到模拟数据模式时自动登录
    autoLogin()
  }
})

// 登录
const onLogin = async () => {
  if (!formRef.value) return
  
  await formRef.value.validate(async (valid) => {
    if (!valid) return
    
    if (showCaptcha.value && !form.value.captcha) {
      ElMessage.error('请输入验证码')
      return
    }
    
    loading.value = true
    
    try {
      // 构建登录请求数据
      let loginData = {}
      
      if (loginType.value === 'admin') {
        // 管理员登录
        loginData = {
        username: form.value.username,
          password: form.value.password,
          loginType: 'admin'
        }
      } else {
        // 教师登录
        loginData = {
          name: form.value.name,
          phone: form.value.phone,
          password: form.value.password,
          loginType: 'teacher'
        }
      }
      
      // 如果有验证码，添加到请求数据
      if (showCaptcha.value && form.value.captcha) {
        loginData.captcha = form.value.captcha
        loginData.captchaKey = captchaKey.value
      }

      // 如果有记住登录，添加到请求数据
      loginData.remember = form.value.remember
      
      // 调用登录接口
      await userStore.login(loginData)
      
      // 记住密码
      if (form.value.remember) {
        localStorage.setItem('loginType', loginType.value)
        if (loginType.value === 'admin') {
        localStorage.setItem('rememberedUsername', form.value.username)
        localStorage.setItem('rememberedPassword', form.value.password)
        localStorage.setItem('rememberMe', 'true') // 保存记住状态
        } else {
          localStorage.setItem('rememberedName', form.value.name)
          localStorage.setItem('rememberedPhone', form.value.phone)
          localStorage.setItem('rememberedPassword', form.value.password)
          localStorage.setItem('rememberMe', 'true') // 保存记住状态
        }
      } else {
        localStorage.removeItem('loginType')
        localStorage.removeItem('rememberedUsername')
        localStorage.removeItem('rememberedPassword')
        localStorage.removeItem('rememberedName')
        localStorage.removeItem('rememberedPhone')
        localStorage.removeItem('rememberMe') // 移除记住状态
      }
      
      ElMessage.success('登录成功')
      router.push('/')
    } catch (error) {
      console.error('登录失败:', error)
      ElMessage.error(error.message || '登录失败，请检查输入信息')
      
      // 登录失败次数增加
      loginFailCount.value++
      
      // 超过3次失败显示验证码
      if (loginFailCount.value >= 3 && !showCaptcha.value) {
        showCaptcha.value = true
        refreshCaptcha()
      } else if (showCaptcha.value) {
        // 如果已经显示验证码，刷新验证码
        refreshCaptcha()
      }
    } finally {
      loading.value = false
    }
  })
}

// 刷新验证码
const refreshCaptcha = async () => {
  try {
    const result = await api.get('/auth/captcha')
    captchaImage.value = result.image
    captchaKey.value = result.key
    form.value.captchaKey = result.key
  } catch (error) {
    console.error('获取验证码失败:', error)
    ElMessage.error('获取验证码失败，请刷新页面重试')
  }
}
</script>

<style scoped>
/* 登录页面样式 */
.login-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

/* 背景渐变球体 */
.background-gradient {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
}

.gradient-orb {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  animation: float 15s ease-in-out infinite;
}

.orb-1 {
  width: 200px;
  height: 200px;
  top: -50px;
  left: -50px;
  animation-delay: 0s;
}

.orb-2 {
  width: 300px;
  height: 300px;
  bottom: 10%;
  right: 20%;
  animation-delay: 5s;
}

.orb-3 {
  width: 150px;
  height: 150px;
  top: 70%;
  left: 40%;
  animation-delay: 10s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-30px) rotate(180deg);
  }
}

/* 登录卡片容器 */
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 10;
}

.login-card {
  display: flex;
  width: 1000px;
  min-height: 600px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* 左侧品牌区域 */
.brand-section {
  flex: 1;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 60px 40px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
}

.brand-logo {
  margin-bottom: 30px;
}

.logo-icon {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.brand-title {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 10px;
  letter-spacing: 2px;
}

.brand-subtitle {
  font-size: 18px;
  margin-bottom: 40px;
  opacity: 0.9;
}

.brand-features {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 40px;
  width: 100%;
  max-width: 300px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 16px;
}

.feature-icon {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.brand-stats {
  display: flex;
  justify-content: space-around;
  width: 100%;
  max-width: 300px;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 24px;
  font-weight: 700;
  color: white;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
}

/* 右侧登录区域 */
.login-section {
  flex: 1;
  padding: 60px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.login-header {
  text-align: center;
  margin-bottom: 40px;
}

.login-title {
  font-size: 32px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 10px;
}

.login-subtitle {
  font-size: 16px;
  color: #6b7280;
}

/* 数据模式指示器 */
.data-mode-indicator {
  background: rgba(245, 158, 11, 0.1);
  border: 1px solid rgba(245, 158, 11, 0.2);
  border-radius: 12px;
  padding: 15px;
  margin-bottom: 30px;
  text-align: center;
}

.mode-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #d97706;
  margin-bottom: 8px;
}

.mode-tip {
  font-size: 14px;
  color: #92400e;
  margin: 0;
}

/* 登录方式切换 */
.login-type-switch {
  margin-bottom: 30px;
}

.switch-tabs {
  display: flex;
  background: #f3f4f6;
  border-radius: 12px;
  padding: 4px;
  gap: 4px;
}

.tab-button {
  flex: 1;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 600;
  color: #6b7280;
  border: none;
  background: none;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.tab-button:hover {
  color: #6366f1;
  background: rgba(99, 102, 241, 0.1);
}

.tab-button.active {
  color: white;
  background: #6366f1;
  box-shadow: 0 2px 4px rgba(99, 102, 241, 0.3);
}

/* 表单样式 */
.login-form {
  width: 100%;
}

.login-form :deep(.el-form-item) {
  margin-bottom: 24px;
}

.input-group {
  display: flex;
  align-items: center;
  width: 100%;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  background: #f9fafb;
  transition: all 0.3s ease;
  overflow: hidden;
}

.input-group:hover {
  border-color: #6366f1;
  background: white;
}

.input-group:focus-within {
  border-color: #6366f1;
  background: white;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.input-icon {
  padding: 0 16px;
  color: #6b7280;
  flex-shrink: 0;
}

.input-group :deep(.el-input) {
  flex: 1;
}

.input-group :deep(.el-input__wrapper) {
  border: none;
  background: none;
  box-shadow: none;
  padding: 16px 16px 16px 0;
}

.input-group :deep(.el-input__inner) {
  font-size: 16px;
  color: #1f2937;
}

.input-group :deep(.el-input__inner::placeholder) {
  color: #9ca3af;
}

/* 验证码区域 */
.captcha-group {
  display: flex;
  gap: 12px;
  align-items: center;
}

.captcha-group .input-group {
  flex: 1;
}

.captcha-image {
  width: 120px;
  height: 54px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  background: #f9fafb;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.captcha-image:hover {
  border-color: #6366f1;
  background: white;
}

.captcha-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.refresh-hint {
  position: absolute;
  bottom: 2px;
  right: 4px;
  font-size: 10px;
  color: #9ca3af;
  background: rgba(255, 255, 255, 0.9);
  padding: 1px 4px;
  border-radius: 3px;
}

/* 登录选项 */
.login-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.login-options :deep(.el-checkbox__label) {
  font-size: 14px;
  color: #6b7280;
}

.forgot-password {
  font-size: 14px;
  color: #6366f1;
  text-decoration: none;
  transition: color 0.3s ease;
}

.forgot-password:hover {
  color: #4f46e5;
}

/* 登录按钮 */
.login-button {
  width: 100%;
  height: 54px;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.login-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(99, 102, 241, 0.4);
}

.login-button:active {
  transform: translateY(0);
}

.login-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: 0.5s;
}

.login-button:hover::before {
  left: 100%;
}

/* 演示账号信息 */
.demo-info {
  margin-top: 30px;
  padding: 20px;
  background: #f0f9ff;
  border: 1px solid #e0f2fe;
  border-radius: 12px;
  text-align: center;
}

.demo-title {
  font-size: 16px;
  font-weight: 600;
  color: #0369a1;
  margin-bottom: 12px;
}

.demo-accounts {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.demo-account {
  font-size: 14px;
  color: #0c4a6e;
}

.demo-account strong {
  color: #0369a1;
}

/* 底部信息 */
.login-footer {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .login-card {
    width: 90%;
    max-width: 900px;
  }
}

@media (max-width: 768px) {
  .login-card {
    flex-direction: column;
    width: 95%;
    min-height: auto;
  }
  
  .brand-section {
    padding: 40px 30px;
  }
  
  .login-section {
    padding: 40px 30px;
  }
  
  .brand-title {
    font-size: 28px;
  }
  
  .login-title {
    font-size: 24px;
  }
  
  .brand-stats {
    margin-top: 30px;
  }
}

@media (max-width: 480px) {
  .login-card {
    margin: 20px;
    width: calc(100% - 40px);
  }
  
  .brand-section {
    padding: 30px 20px;
  }
  
  .login-section {
    padding: 30px 20px;
  }
  
  .captcha-group {
    flex-direction: column;
    gap: 16px;
  }
  
  .captcha-image {
    width: 100%;
    height: 60px;
  }
}
</style>