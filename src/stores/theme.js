import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', {
  state: () => ({
    darkMode: localStorage.getItem('darkMode') === 'true',
    themeColors: {
      light: {
        primary: '#409eff',
        success: '#67c23a',
        warning: '#e6a23c',
        danger: '#f56c6c',
        info: '#909399',
        background: '#f5f7fa',
        textPrimary: '#303133',
        textRegular: '#606266',
        textSecondary: '#909399',
        borderColor: '#dcdfe6'
      },
      dark: {
        primary: '#409eff',
        success: '#67c23a',
        warning: '#e6a23c',
        danger: '#f56c6c',
        info: '#909399',
        background: '#1f2937',
        textPrimary: '#ffffff',
        textRegular: '#e5e7eb',
        textSecondary: '#9ca3af',
        borderColor: '#374151'
      }
    }
  }),
  
  getters: {
    isDark: (state) => state.darkMode,
    isDarkMode: (state) => state.darkMode,
    currentTheme: (state) => state.darkMode ? 'dark' : 'light',
    themeVariables: (state) => state.darkMode ? state.themeColors.dark : state.themeColors.light
  },
  
  actions: {
    /**
     * 初始化主题
     */
    initTheme() {
      // 从本地存储读取主题设置
      const savedDarkMode = localStorage.getItem('darkMode');
      if (savedDarkMode !== null) {
        this.darkMode = savedDarkMode === 'true';
      } else {
        // 如果没有保存的主题设置，则根据系统偏好设置
        this.darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
      
      // 应用主题
      this.applyTheme();
      
      // 监听系统主题变化
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (localStorage.getItem('darkMode') === null) {
          this.darkMode = e.matches;
          this.applyTheme();
        }
      });
    },
    
    /**
     * 切换主题
     */
    toggleTheme() {
      this.darkMode = !this.darkMode;
      localStorage.setItem('darkMode', this.darkMode);
      this.applyTheme();
    },
    
    /**
     * 设置主题
     * @param {boolean} isDark 是否为暗色主题
     */
    setTheme(isDark) {
      this.darkMode = isDark;
      localStorage.setItem('darkMode', this.darkMode);
      this.applyTheme();
    },
    
    /**
     * 应用主题
     */
    applyTheme() {
      const theme = this.darkMode ? this.themeColors.dark : this.themeColors.light;
      
      // 应用CSS变量
      document.documentElement.style.setProperty('--el-color-primary', theme.primary);
      document.documentElement.style.setProperty('--el-color-success', theme.success);
      document.documentElement.style.setProperty('--el-color-warning', theme.warning);
      document.documentElement.style.setProperty('--el-color-danger', theme.danger);
      document.documentElement.style.setProperty('--el-color-info', theme.info);
      
      document.documentElement.style.setProperty('--app-background', theme.background);
      document.documentElement.style.setProperty('--app-text-primary', theme.textPrimary);
      document.documentElement.style.setProperty('--app-text-regular', theme.textRegular);
      document.documentElement.style.setProperty('--app-text-secondary', theme.textSecondary);
      document.documentElement.style.setProperty('--app-border-color', theme.borderColor);
      
      // 设置HTML的data-theme属性
      document.documentElement.setAttribute('data-theme', this.darkMode ? 'dark' : 'light');
      
      // 设置body的class
      if (this.darkMode) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
    }
  }
}); 