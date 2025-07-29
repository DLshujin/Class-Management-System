/**
 * 性能监控工具
 */

// 页面加载性能监控
export class PerformanceMonitor {
  constructor() {
    this.pageLoadStart = Date.now()
    this.metrics = {}
  }

  // 记录页面加载完成时间
  recordPageLoad(pageName) {
    const loadTime = Date.now() - this.pageLoadStart
    this.metrics[pageName] = {
      loadTime,
      timestamp: new Date().toISOString()
    }
    
    // 如果加载时间超过3秒，显示提示
    if (loadTime > 3000) {
      console.warn(`页面 ${pageName} 加载较慢: ${loadTime}ms`)
    }
    
    return loadTime
  }

  // 获取性能报告
  getReport() {
    return {
      metrics: this.metrics,
      totalPages: Object.keys(this.metrics).length,
      averageLoadTime: this.calculateAverageLoadTime()
    }
  }

  // 计算平均加载时间
  calculateAverageLoadTime() {
    const times = Object.values(this.metrics).map(m => m.loadTime)
    return times.length > 0 ? times.reduce((a, b) => a + b, 0) / times.length : 0
  }
}

// 用户体验增强功能
export class UXEnhancer {
  constructor() {
    this.initKeyboardShortcuts()
    this.initAccessibility()
  }

  // 初始化键盘快捷键
  initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Ctrl/Cmd + K：全局搜索
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        this.triggerGlobalSearch()
      }
      
      // Ctrl/Cmd + /：显示快捷键帮助
      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault()
        this.showShortcutHelp()
      }
      
      // ESC：关闭当前对话框或返回
      if (e.key === 'Escape') {
        this.handleEscape()
      }
    })
  }

  // 初始化无障碍功能
  initAccessibility() {
    // 为所有按钮添加键盘导航支持
    const buttons = document.querySelectorAll('button:not([tabindex])')
    buttons.forEach(button => {
      if (!button.hasAttribute('tabindex')) {
        button.setAttribute('tabindex', '0')
      }
    })
  }

  // 触发全局搜索
  triggerGlobalSearch() {
    const searchEvent = new CustomEvent('global-search', {
      detail: { timestamp: Date.now() }
    })
    window.dispatchEvent(searchEvent)
  }

  // 显示快捷键帮助
  showShortcutHelp() {
    const helpEvent = new CustomEvent('show-shortcuts', {
      detail: {
        shortcuts: [
          { key: 'Ctrl/Cmd + K', description: '全局搜索' },
          { key: 'Ctrl/Cmd + /', description: '显示快捷键帮助' },
          { key: 'ESC', description: '关闭对话框/返回' },
          { key: 'Tab', description: '在元素间导航' }
        ]
      }
    })
    window.dispatchEvent(helpEvent)
  }

  // 处理ESC键
  handleEscape() {
    const escapeEvent = new CustomEvent('escape-pressed')
    window.dispatchEvent(escapeEvent)
  }
}

// 创建全局实例
export const performanceMonitor = new PerformanceMonitor()
export const uxEnhancer = new UXEnhancer()

// 页面可见性API监控
export const initVisibilityMonitor = () => {
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      console.log('页面重新获得焦点，刷新数据...')
      // 触发数据刷新事件
      window.dispatchEvent(new CustomEvent('page-focus'))
    }
  })
}

// 网络状态监控
export const initNetworkMonitor = () => {
  window.addEventListener('online', () => {
    console.log('网络连接已恢复')
    window.dispatchEvent(new CustomEvent('network-online'))
  })
  
  window.addEventListener('offline', () => {
    console.log('网络连接已断开')
    window.dispatchEvent(new CustomEvent('network-offline'))
  })
} 