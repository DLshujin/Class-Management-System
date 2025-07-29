<template>
  <el-dialog
    v-model="visible"
    title="键盘快捷键"
    width="500px"
    center
    class="shortcut-help-dialog"
    @close="$emit('close')"
  >
    <div class="shortcuts-container">
      <div class="shortcuts-header">
        <div class="header-icon">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,19H5V5H19V19Z"/>
          </svg>
        </div>
        <div class="header-text">
          <h3>快捷键帮助</h3>
          <p>使用键盘快捷键提高工作效率</p>
        </div>
      </div>

      <div class="shortcuts-grid">
        <div 
          v-for="shortcut in shortcuts" 
          :key="shortcut.key"
          class="shortcut-item"
        >
          <div class="shortcut-key">
            <kbd v-for="key in shortcut.key.split(' + ')" :key="key" class="key">
              {{ key.replace('Ctrl/Cmd', isMac ? 'Cmd' : 'Ctrl') }}
            </kbd>
          </div>
          <div class="shortcut-description">
            {{ shortcut.description }}
          </div>
        </div>
      </div>

      <div class="shortcuts-tips">
        <div class="tip-item">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
          </svg>
          <span>提示：在任何页面按 <kbd class="key">Ctrl/Cmd + /</kbd> 可快速打开此帮助</span>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { computed } from 'vue'

defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  shortcuts: {
    type: Array,
    default: () => [
      { key: 'Ctrl/Cmd + K', description: '全局搜索' },
      { key: 'Ctrl/Cmd + /', description: '显示快捷键帮助' },
      { key: 'ESC', description: '关闭对话框/返回' },
      { key: 'Tab', description: '在元素间导航' },
      { key: 'Enter', description: '确认操作' },
      { key: 'Space', description: '选择/切换' },
      { key: '↑ ↓ ← →', description: '方向键导航' },
      { key: 'Ctrl/Cmd + S', description: '保存当前页面' },
      { key: 'Ctrl/Cmd + R', description: '刷新页面数据' },
      { key: 'F11', description: '切换全屏模式' }
    ]
  }
})

defineEmits(['close'])

// 检测操作系统
const isMac = computed(() => {
  return /Mac|iPod|iPhone|iPad/.test(navigator.platform)
})
</script>

<style scoped>
.shortcut-help-dialog :deep(.el-dialog) {
  border-radius: 16px;
  overflow: hidden;
}

.shortcut-help-dialog :deep(.el-dialog__header) {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  padding: 20px 24px;
}

.shortcut-help-dialog :deep(.el-dialog__title) {
  color: white;
  font-weight: 600;
}

.shortcut-help-dialog :deep(.el-dialog__body) {
  padding: 0;
}

.shortcuts-container {
  padding: 24px;
}

.shortcuts-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e5e7eb;
}

.header-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 12px;
  color: white;
}

.header-text h3 {
  margin: 0 0 4px 0;
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
}

.header-text p {
  margin: 0;
  font-size: 14px;
  color: #6b7280;
}

.shortcuts-grid {
  display: grid;
  gap: 16px;
  margin-bottom: 24px;
}

.shortcut-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #f9fafb;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  transition: all 0.2s ease;
}

.shortcut-item:hover {
  background: #f3f4f6;
  border-color: #d1d5db;
}

.shortcut-key {
  display: flex;
  align-items: center;
  gap: 4px;
}

.key {
  display: inline-block;
  padding: 4px 8px;
  background: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-family: 'SF Mono', Monaco, 'Consolas', 'Liberation Mono', 'Courier New', monospace;
  font-size: 12px;
  font-weight: 600;
  color: #374151;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  text-transform: uppercase;
  min-width: 28px;
  text-align: center;
}

.shortcut-description {
  font-size: 14px;
  color: #4b5563;
  font-weight: 500;
}

.shortcuts-tips {
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 8px;
  padding: 16px;
}

.tip-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #1e40af;
}

.tip-item .key {
  font-size: 11px;
  padding: 2px 6px;
  margin: 0 2px;
}

/* 响应式设计 */
@media (max-width: 640px) {
  .shortcut-help-dialog {
    width: 90vw !important;
  }
  
  .shortcuts-container {
    padding: 16px;
  }
  
  .shortcuts-header {
    flex-direction: column;
    text-align: center;
    gap: 12px;
  }
  
  .shortcut-item {
    flex-direction: column;
    gap: 8px;
    text-align: center;
  }
  
  .shortcut-key {
    justify-content: center;
  }
}
</style> 