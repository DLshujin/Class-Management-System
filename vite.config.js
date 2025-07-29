import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [vue()],
    
    // 路径别名
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    
    // 服务器选项
    server: {
      host: '0.0.0.0',
      port: 3000,
      open: true,
      cors: true
    },
    
    // 配置路由回退，支持 history 模式
    base: '/',
    
    // 构建选项
    build: {
      // 启用/禁用 CSS 代码拆分
      cssCodeSplit: true,
      
      // 启用/禁用 brotli 压缩大小报告
      brotliSize: false,
      
      // 指定输出路径
      outDir: 'dist',
      
      // 生成 sourcemap
      sourcemap: command === 'serve',
      
      // chunk 大小警告的限制（以 kbs 为单位）
      chunkSizeWarningLimit: 2000,
      
      // 禁用 CSS 提取
      // cssCodeSplit: false,
      
      // 启用/禁用 gzip 压缩大小报告
      reportCompressedSize: false,
      
      // 设置最小化混淆器
      minify: 'terser',
      
      // terser 选项
      terserOptions: {
        compress: {
          // 生产环境去除 console
          drop_console: command === 'build',
          drop_debugger: command === 'build',
        },
      },
      
      // rollup 选项
      rollupOptions: {
        output: {
          // 静态资源分类打包
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          // 拆分打包
          manualChunks: {
            vue: ['vue', 'vue-router', 'pinia'],
            elementPlus: ['element-plus'],
            echarts: ['echarts', 'vue-echarts'],
          },
        },
      },
    },
    
    // CSS 预处理器选项
    css: {
      preprocessorOptions: {
        scss: {
          // additionalData: `@import "@/styles/variables.scss";`,
        },
      },
    },
    
    // 性能优化
    optimizeDeps: {
      include: ['vue', 'vue-router', 'pinia', 'element-plus', 'echarts'],
    },

    // 全局配置
    define: {
      __VUE_I18N_FULL_INSTALL__: true,
      __VUE_I18N_LEGACY_API__: false,
      __INTLIFY_PROD_DEVTOOLS__: false,
    },

    // 编码设置
    fs: {
      strict: true,
    }
  }
})
