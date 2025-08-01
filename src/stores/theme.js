import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', {
  state: () => ({
    themeColors: {
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
    }
  }),
  
  getters: {
    currentTheme: () => 'light',
    themeVariables: (state) => state.themeColors
  },
  
  actions: {
    /**
     * 初始化主题
     */
    initTheme() {
      // 应用亮色主题
      this.applyTheme();
    },
    
    /**
     * 应用主题
     */
    applyTheme() {
      const theme = this.themeColors;
      
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
      
      // 设置HTML的data-theme属性为light
      document.documentElement.setAttribute('data-theme', 'light');
      
      // 清理可能存在的暗色主题类
      document.body.classList.remove('dark-mode', 'dark');
      document.documentElement.classList.remove('dark');
      
      console.log('主题已设置为亮色模式');
    }
  }
}); 