<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.back()
}

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="not-found-container">
    <div class="not-found-content modern-card">
      <!-- 现代化404图标 -->
      <div class="error-visual">
        <div class="error-code-large">4</div>
        <div class="error-icon-container">
          <svg viewBox="0 0 24 24" width="80" height="80" fill="currentColor" class="error-icon">
            <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M13,17H11V15H13V17M13,13H11V7H13V13Z"/>
          </svg>
        </div>
        <div class="error-code-large">4</div>
      </div>

      <!-- 标题和描述 -->
      <div class="error-text">
        <h1 class="error-title">页面未找到</h1>
        <p class="error-subtitle">抱歉，您访问的页面不存在或已被移除</p>
        <p class="error-description">
          可能的原因：页面链接错误、页面已删除或您没有访问权限
        </p>
      </div>

      <!-- 操作按钮 -->
      <div class="error-actions">
        <el-button type="primary" size="large" class="modern-btn primary" @click="goHome">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z"/>
          </svg>
          返回首页
        </el-button>
        <el-button size="large" class="modern-btn" @click="goBack">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"/>
          </svg>
          返回上一页
        </el-button>
      </div>

      <!-- 品牌信息 -->
      <div class="brand-footer">
        <div class="brand-logo">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
          </svg>
        </div>
        <span class="brand-text">SHUJIN EDU - 青少年编程教育平台</span>
      </div>
    </div>

    <!-- 装饰性背景元素 -->
    <div class="background-decoration">
      <div class="decoration-orb orb-1"></div>
      <div class="decoration-orb orb-2"></div>
      <div class="decoration-orb orb-3"></div>
    </div>
  </div>
</template>

<style scoped>
/* CSS变量系统 */
:root {
  --color-primary: #3b82f6;
  --color-primary-light: #dbeafe;
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-danger: #ef4444;
  --color-info: #6366f1;
  
  --color-textPrimary: #1f2937;
  --color-textSecondary: #6b7280;
  --color-textDisabled: #9ca3af;
  
  --color-bgPrimary: #ffffff;
  --color-bgSecondary: #f9fafb;
  --color-bgTertiary: #f3f4f6;
  
  --border-radius-sm: 6px;
  --border-radius-md: 8px;
  --border-radius-lg: 12px;
  --border-radius-xl: 16px;
  --border-radius-2xl: 20px;
  
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  
  --font-size-xs: 12px;
  --font-size-sm: 14px;
  --font-size-base: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 20px;
  --font-size-2xl: 24px;
  --font-size-3xl: 30px;
  --font-size-4xl: 36px;
  --font-size-5xl: 48px;
}

/* 页面容器 */
.not-found-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 24px;
  position: relative;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* 现代化卡片 */
.modern-card {
  background: var(--color-bgPrimary);
  border-radius: var(--border-radius-2xl);
  box-shadow: var(--shadow-xl);
  border: 1px solid rgba(229, 231, 235, 0.8);
  backdrop-filter: blur(10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.not-found-content {
  text-align: center;
  max-width: 500px;
  width: 100%;
  padding: 48px 40px;
  position: relative;
  z-index: 10;
}

.not-found-content:hover {
  transform: translateY(-4px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
}

/* 错误视觉展示 */
.error-visual {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
  position: relative;
}

.error-code-large {
  font-size: 120px;
  font-weight: 800;
  color: var(--color-primary);
  line-height: 1;
  text-shadow: 0 4px 8px rgba(59, 130, 246, 0.3);
  animation: bounce 2s infinite ease-in-out;
}

.error-icon-container {
  margin: 0 16px;
  position: relative;
}

.error-icon {
  color: var(--color-danger);
  animation: pulse 2s infinite ease-in-out;
  filter: drop-shadow(0 4px 8px rgba(239, 68, 68, 0.3));
}

/* 文字内容 */
.error-text {
  margin-bottom: 40px;
}

.error-title {
  font-size: var(--font-size-4xl);
  font-weight: 700;
  color: var(--color-textPrimary);
  margin: 0 0 16px 0;
  line-height: 1.2;
}

.error-subtitle {
  font-size: var(--font-size-lg);
  color: var(--color-textSecondary);
  margin: 0 0 12px 0;
  font-weight: 500;
  line-height: 1.5;
}

.error-description {
  font-size: var(--font-size-sm);
  color: var(--color-textDisabled);
  margin: 0;
  line-height: 1.6;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

/* 操作按钮 */
.error-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 40px;
}

.modern-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 24px;
  border-radius: var(--border-radius-lg);
  font-size: var(--font-size-base);
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
  white-space: nowrap;
  box-shadow: var(--shadow-sm);
  min-width: 140px;
  justify-content: center;
}

.modern-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.modern-btn.primary {
  background: var(--color-primary);
  color: white;
}

.modern-btn.primary:hover {
  background: #2563eb;
  box-shadow: 0 12px 24px rgba(59, 130, 246, 0.4);
}

.modern-btn:not(.primary) {
  background: var(--color-bgSecondary);
  color: var(--color-textPrimary);
  border: 1px solid var(--color-bgTertiary);
}

.modern-btn:not(.primary):hover {
  background: var(--color-bgTertiary);
  border-color: var(--color-primary);
  color: var(--color-primary);
}

/* 品牌页脚 */
.brand-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding-top: 24px;
  border-top: 1px solid var(--color-bgTertiary);
  margin-top: 24px;
}

.brand-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, var(--color-primary), var(--color-info));
  border-radius: var(--border-radius-md);
  color: white;
}

.brand-text {
  font-size: var(--font-size-sm);
  color: var(--color-textSecondary);
  font-weight: 500;
}

/* 背景装饰 */
.background-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.decoration-orb {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(99, 102, 241, 0.1));
  animation: float 6s ease-in-out infinite;
}

.orb-1 {
  width: 200px;
  height: 200px;
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.orb-2 {
  width: 150px;
  height: 150px;
  top: 60%;
  right: 15%;
  animation-delay: 2s;
}

.orb-3 {
  width: 100px;
  height: 100px;
  bottom: 20%;
  left: 20%;
  animation-delay: 4s;
}

/* 动画效果 */
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  33% {
    transform: translateY(-20px) rotate(120deg);
  }
  66% {
    transform: translateY(10px) rotate(240deg);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.not-found-content {
  animation: fadeInUp 1s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .not-found-container {
    padding: 16px;
  }

  .not-found-content {
    padding: 32px 24px;
    max-width: 400px;
  }

  .error-code-large {
    font-size: 80px;
  }

  .error-icon {
    width: 60px;
    height: 60px;
  }

  .error-title {
    font-size: var(--font-size-2xl);
  }

  .error-subtitle {
    font-size: var(--font-size-base);
  }

  .error-actions {
    flex-direction: column;
    gap: 12px;
  }

  .modern-btn {
    width: 100%;
    min-width: auto;
  }

  .decoration-orb {
    opacity: 0.3;
  }

  .orb-1 {
    width: 120px;
    height: 120px;
  }

  .orb-2 {
    width: 100px;
    height: 100px;
  }

  .orb-3 {
    width: 80px;
    height: 80px;
  }
}

@media (max-width: 480px) {
  .not-found-content {
    padding: 24px 16px;
  }

  .error-code-large {
    font-size: 60px;
  }

  .error-icon {
    width: 40px;
    height: 40px;
  }

  .error-title {
    font-size: var(--font-size-xl);
  }

  .brand-footer {
    flex-direction: column;
    gap: 8px;
  }

  .brand-text {
    text-align: center;
    font-size: var(--font-size-xs);
  }
}
</style> 