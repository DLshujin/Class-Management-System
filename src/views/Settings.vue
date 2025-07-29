<template>
  <div class="settings-page-container">
    <!-- 现代化页面头部 -->
    <div class="page-header modern-card">
      <div class="header-content">
        <div class="page-title">
          <div class="title-icon">
            <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
              <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"/>
            </svg>
          </div>
          <div class="title-text">
            <h1>系统设置</h1>
            <p class="page-subtitle">配置系统参数，优化用户体验</p>
          </div>
        </div>
        <div class="header-actions">
          <el-button type="info" @click="testConnection" class="modern-btn info">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M10.59,13.41C11,13.8 11,14.4 10.59,14.81C10.2,15.2 9.6,15.2 9.19,14.81L7.78,13.4L6.37,14.81C5.96,15.22 5.34,15.22 4.93,14.81C4.54,14.4 4.54,13.8 4.93,13.41L6.34,12L4.93,10.59C4.54,10.2 4.54,9.6 4.93,9.19C5.34,8.78 5.96,8.78 6.37,9.19L7.78,10.6L9.19,9.19C9.6,8.78 10.2,8.78 10.59,9.19C11,9.6 11,10.2 10.59,10.59L9.18,12L10.59,13.41M19.07,4.93C19.48,5.34 19.48,5.96 19.07,6.37L17.66,7.78L19.07,9.19C19.48,9.6 19.48,10.2 19.07,10.59C18.68,11 18.06,11 17.65,10.59L16.24,9.18L14.83,10.59C14.42,11 13.8,11 13.41,10.59C13,10.2 13,9.6 13.41,9.19L14.82,7.78L13.41,6.37C13,5.96 13,5.34 13.41,4.93C13.8,4.54 14.42,4.54 14.83,4.93L16.24,6.34L17.65,4.93C18.06,4.54 18.68,4.54 19.07,4.93Z"/>
            </svg>
            测试连接
          </el-button>
          <el-button @click="resetForm" class="modern-btn">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z"/>
            </svg>
            重置
          </el-button>
          <el-button type="primary" @click="saveSettings" :loading="saving" class="modern-btn primary">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z"/>
            </svg>
            保存设置
          </el-button>
        </div>
      </div>
    </div>

    <!-- 现代化设置内容区域 -->
    <div class="settings-content">
      <!-- 侧边导航 -->
      <div class="settings-sidebar">
        <div class="sidebar-nav">
          <div 
            v-for="tab in settingsTabs" 
            :key="tab.name"
            class="nav-item"
            :class="{ active: activeTab === tab.name }"
            @click="activeTab = tab.name"
          >
            <div class="nav-icon">
              <svg v-if="tab.name === 'basic'" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z"/>
              </svg>
              <svg v-else-if="tab.name === 'database'" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M12,3C7.58,3 4,4.79 4,7C4,9.21 7.58,11 12,11C16.42,11 20,9.21 20,7C20,4.79 16.42,3 12,3M4,9V12C4,14.21 7.58,16 12,16C16.42,16 20,14.21 20,12V9C20,11.21 16.42,13 12,13C7.58,13 4,11.21 4,9M4,14V17C4,19.21 7.58,21 12,21C16.42,21 20,19.21 20,17V14C20,16.21 16.42,18 12,18C7.58,18 4,16.21 4,14Z"/>
              </svg>
              <svg v-else-if="tab.name === 'api'" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M7,7H17V10H7V7M7,12H17V15H7V12M7,17H17V20H7V17M5,7A2,2 0 0,1 7,5H17A2,2 0 0,1 19,7V20A2,2 0 0,1 17,22H7A2,2 0 0,1 5,20V7Z"/>
              </svg>
              <svg v-else-if="tab.name === 'backup'" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M17,18H7V6H17M17,4H7A2,2 0 0,0 5,6V18A2,2 0 0,0 7,20H17A2,2 0 0,0 19,18V6A2,2 0 0,0 17,4M14,9H16V7L19,10L16,13V11H14V9M10,15H8V17L5,14L8,11V13H10V15Z"/>
              </svg>
              <svg v-else-if="tab.name === 'notification'" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M14,21A2,2 0 0,1 12,23A2,2 0 0,1 10,21"/>
              </svg>
              <svg v-else-if="tab.name === 'security'" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11H16V18H8V11H9.2V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.4,8.7 10.4,10V11H13.6V10C13.6,8.7 12.8,8.2 12,8.2Z"/>
              </svg>
              <svg v-else-if="tab.name === 'logging'" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
              </svg>
            </div>
            <div class="nav-content">
              <div class="nav-title">{{ tab.title }}</div>
              <div class="nav-description">{{ tab.description }}</div>
            </div>
            <div class="nav-arrow">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- 现代化设置表单 -->
      <div class="settings-main">
        <div class="settings-form-container modern-card">
          <div class="form-header">
            <div class="form-title">
              <svg v-if="activeTab === 'basic'" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z"/>
              </svg>
              <svg v-else-if="activeTab === 'database'" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M12,3C7.58,3 4,4.79 4,7C4,9.21 7.58,11 12,11C16.42,11 20,9.21 20,7C20,4.79 16.42,3 12,3M4,9V12C4,14.21 7.58,16 12,16C16.42,16 20,14.21 20,12V9C20,11.21 16.42,13 12,13C7.58,13 4,11.21 4,9M4,14V17C4,19.21 7.58,21 12,21C16.42,21 20,19.21 20,17V14C20,16.21 16.42,18 12,18C7.58,18 4,16.21 4,14Z"/>
              </svg>
              <svg v-else-if="activeTab === 'api'" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M7,7H17V10H7V7M7,12H17V15H7V12M7,17H17V20H7V17M5,7A2,2 0 0,1 7,5H17A2,2 0 0,1 19,7V20A2,2 0 0,1 17,22H7A2,2 0 0,1 5,20V7Z"/>
              </svg>
              <svg v-else-if="activeTab === 'backup'" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M17,18H7V6H17M17,4H7A2,2 0 0,0 5,6V18A2,2 0 0,0 7,20H17A2,2 0 0,0 19,18V6A2,2 0 0,0 17,4M14,9H16V7L19,10L16,13V11H14V9M10,15H8V17L5,14L8,11V13H10V15Z"/>
              </svg>
              <svg v-else-if="activeTab === 'notification'" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M14,21A2,2 0 0,1 12,23A2,2 0 0,1 10,21"/>
              </svg>
              <svg v-else-if="activeTab === 'security'" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11H16V18H8V11H9.2V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.4,8.7 10.4,10V11H13.6V10C13.6,8.7 12.8,8.2 12,8.2Z"/>
              </svg>
              <svg v-else-if="activeTab === 'logging'" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
              </svg>
              <span>{{ getCurrentTabTitle() }}</span>
            </div>
            <div class="form-subtitle">{{ getCurrentTabDescription() }}</div>
          </div>

          <el-form :model="form" label-width="140px" class="modern-form">
            <!-- 基础设置 -->
            <div v-show="activeTab === 'basic'" class="tab-content">
              <div class="settings-section">
                <div class="section-header">
                  <h3>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M17.5,12A1.5,1.5 0 0,1 16,10.5A1.5,1.5 0 0,1 17.5,9A1.5,1.5 0 0,1 19,10.5A1.5,1.5 0 0,1 17.5,12M14.5,8A1.5,1.5 0 0,1 13,6.5A1.5,1.5 0 0,1 14.5,5A1.5,1.5 0 0,1 16,6.5A1.5,1.5 0 0,1 14.5,8M9.5,8A1.5,1.5 0 0,1 8,6.5A1.5,1.5 0 0,1 9.5,5A1.5,1.5 0 0,1 11,6.5A1.5,1.5 0 0,1 9.5,8M6.5,12A1.5,1.5 0 0,1 5,10.5A1.5,1.5 0 0,1 6.5,9A1.5,1.5 0 0,1 8,10.5A1.5,1.5 0 0,1 6.5,12M12,3A9,9 0 0,0 3,12A9,9 0 0,0 12,21A8.5,8.5 0 0,0 20.5,12.5M11,4.07C6.81,4.56 4,8.03 4,12A8,8 0 0,0 12,20C15.97,20 19.44,17.19 19.93,13H15L13,15L11,13L13,11L15,13H19.93C19.76,7.61 15.15,3.78 11,4.07Z"/>
                    </svg>
                    系统外观
                  </h3>
                  <p>配置系统的基本外观和品牌信息</p>
                </div>

                <el-form-item label="系统名称">
                  <el-input v-model="form.systemName" placeholder="请输入系统名称" />
                </el-form-item>

                <el-form-item label="系统Logo">
                  <div class="logo-upload-area">
                    <el-upload
                      class="logo-uploader"
                      :show-file-list="false"
                      :on-change="handleLogoChange"
                      :auto-upload="false"
                    >
                      <div class="upload-content">
                        <img v-if="form.logoUrl" :src="form.logoUrl" class="logo-preview" />
                        <div v-else class="upload-placeholder">
                          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                            <path d="M4,4H7L9,2H15L17,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9Z"/>
                          </svg>
                          <p>点击上传Logo</p>
                          <span class="upload-hint">推荐尺寸: 200px x 60px</span>
                        </div>
                      </div>
                    </el-upload>
                  </div>
                </el-form-item>

                <el-form-item label="主题颜色">
                  <div class="color-picker-wrapper">
                    <el-color-picker v-model="form.themeColor" />
                    <div class="color-preview" :style="{ backgroundColor: form.themeColor }"></div>
                  </div>
                </el-form-item>
              </div>

              <div class="settings-section">
                <div class="section-header">
                  <h3>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z"/>
                    </svg>
                    系统配置
                  </h3>
                  <p>配置系统的基本运行参数</p>
                </div>

                <el-form-item label="系统域名">
                  <el-input v-model="form.domain" placeholder="例如: www.example.com" />
                </el-form-item>

                <el-form-item label="系统端口">
                  <el-input-number v-model="form.port" :min="1" :max="65535" />
                </el-form-item>

                <el-form-item label="版权信息">
                  <el-input v-model="form.copyright" placeholder="例如: © 2024 公司名称" />
                </el-form-item>
              </div>
            </div>

            <!-- 数据库设置 -->
            <div v-show="activeTab === 'database'" class="tab-content">
              <div class="settings-section">
                <div class="section-header">
                  <h3>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M12,3C7.58,3 4,4.79 4,7C4,9.21 7.58,11 12,11C16.42,11 20,9.21 20,7C20,4.79 16.42,3 12,3M4,9V12C4,14.21 7.58,16 12,16C16.42,16 20,14.21 20,12V9C20,11.21 16.42,13 12,13C7.58,13 4,11.21 4,9M4,14V17C4,19.21 7.58,21 12,21C16.42,21 20,19.21 20,17V14C20,16.21 16.42,18 12,18C7.58,18 4,16.21 4,14Z"/>
                    </svg>
                    数据库连接
                  </h3>
                  <p>配置系统数据库连接参数</p>
                </div>

                <el-form-item label="数据库类型">
                  <el-select v-model="form.dbType" placeholder="请选择数据库类型">
                    <el-option label="MySQL" value="mysql">MySQL</el-option>
                    <el-option label="PostgreSQL" value="postgresql">PostgreSQL</el-option>
                    <el-option label="SQLite" value="sqlite">SQLite</el-option>
                    <el-option label="MongoDB" value="mongodb">MongoDB</el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="数据库地址">
                  <el-input v-model="form.dbHost" placeholder="例如: localhost" />
                </el-form-item>

                <el-form-item label="端口号">
                  <el-input-number v-model="form.dbPort" :min="1" :max="65535" />
                </el-form-item>

                <el-form-item label="数据库名">
                  <el-input v-model="form.dbName" placeholder="请输入数据库名称" />
                </el-form-item>

                <el-form-item label="用户名">
                  <el-input v-model="form.dbUsername" placeholder="请输入数据库用户名" />
                </el-form-item>

                <el-form-item label="密码">
                  <el-input v-model="form.dbPassword" type="password" show-password placeholder="请输入数据库密码" />
                </el-form-item>

                <el-form-item label="连接池大小">
                  <el-input-number v-model="form.dbPoolSize" :min="1" :max="50" />
                  <div class="setting-tip">数据库连接池大小，建议10-20</div>
                </el-form-item>
              </div>
            </div>

            <!-- API设置 -->
            <div v-show="activeTab === 'api'" class="tab-content">
              <div class="settings-section">
                <div class="section-header">
                  <h3>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M7,7H17V10H7V7M7,12H17V15H7V12M7,17H17V20H7V17M5,7A2,2 0 0,1 7,5H17A2,2 0 0,1 19,7V20A2,2 0 0,1 17,22H7A2,2 0 0,1 5,20V7Z"/>
                    </svg>
                    API配置
                  </h3>
                  <p>配置API接口相关参数</p>
                </div>

                <el-form-item label="API版本">
                  <el-input v-model="form.apiVersion" placeholder="例如: v1" />
                </el-form-item>

                <el-form-item label="API密钥">
                  <div class="api-key-wrapper">
                    <el-input v-model="form.apiKey" placeholder="用于第三方API调用" />
                    <el-button type="primary" @click="generateApiKey" class="generate-btn">
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                        <path d="M7,14A3,3 0 0,0 10,17A3,3 0 0,0 13,14A3,3 0 0,0 10,11A3,3 0 0,0 7,14M12.65,10C11.83,7.67 9.61,6 7,6A6,6 0 0,0 1,12A6,6 0 0,0 7,18C9.61,18 11.83,16.33 12.65,14H17V18H21V14H23V10H12.65Z"/>
                      </svg>
                      生成新密钥
                    </el-button>
                  </div>
                </el-form-item>

                <el-form-item label="接口限流">
                  <el-switch v-model="form.apiRateLimit" />
                  <div class="setting-tip">开启后将限制API调用频率</div>
                </el-form-item>

                <el-form-item label="限流次数" v-if="form.apiRateLimit">
                  <el-input-number v-model="form.rateLimitCount" :min="1" :max="10000" />
                  <span class="unit-text">次/分钟</span>
                </el-form-item>

                <el-form-item label="CORS设置">
                  <el-switch v-model="form.corsEnabled" />
                  <div class="setting-tip">允许跨域请求访问</div>
                </el-form-item>

                <el-form-item label="允许域名" v-if="form.corsEnabled">
                  <el-input v-model="form.corsOrigins" placeholder="例如: https://example.com 或 * (允许所有)" />
                </el-form-item>
              </div>
            </div>

            <!-- 其他标签页的内容可以类似地添加... -->
            <div v-show="activeTab === 'backup'" class="tab-content">
              <div class="settings-section">
                <div class="section-header">
                  <h3>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M17,18H7V6H17M17,4H7A2,2 0 0,0 5,6V18A2,2 0 0,0 7,20H17A2,2 0 0,0 19,18V6A2,2 0 0,0 17,4M14,9H16V7L19,10L16,13V11H14V9M10,15H8V17L5,14L8,11V13H10V15Z"/>
                    </svg>
                    数据备份
                  </h3>
                  <p>配置数据备份策略和存储位置</p>
                </div>

                <el-form-item label="自动备份">
                  <el-switch v-model="form.autoBackup" />
                  <div class="setting-tip">定期自动备份系统数据</div>
                </el-form-item>
              </div>
            </div>

            <div v-show="activeTab === 'notification'" class="tab-content">
              <div class="settings-section">
                <div class="section-header">
                  <h3>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M14,21A2,2 0 0,1 12,23A2,2 0 0,1 10,21"/>
                    </svg>
                    通知配置
                  </h3>
                  <p>配置系统通知和消息推送</p>
                </div>

                <el-form-item label="邮件通知">
                  <el-switch v-model="form.emailNotification" />
                  <div class="setting-tip">开启邮件通知功能</div>
                </el-form-item>
              </div>
            </div>

            <div v-show="activeTab === 'security'" class="tab-content">
              <div class="settings-section">
                <div class="section-header">
                  <h3>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11H16V18H8V11H9.2V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.4,8.7 10.4,10V11H13.6V10C13.6,8.7 12.8,8.2 12,8.2Z"/>
                    </svg>
                    安全配置
                  </h3>
                  <p>配置系统安全策略和访问控制</p>
                </div>

                <el-form-item label="强制HTTPS">
                  <el-switch v-model="form.forceHttps" />
                  <div class="setting-tip">强制使用HTTPS协议访问</div>
                </el-form-item>
              </div>
            </div>

            <div v-show="activeTab === 'logging'" class="tab-content">
              <div class="settings-section">
                <div class="section-header">
                  <h3>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                    </svg>
                    日志配置
                  </h3>
                  <p>配置系统日志记录策略</p>
                </div>

                <el-form-item label="日志级别">
                  <el-select v-model="form.logLevel" placeholder="请选择日志级别">
                    <el-option label="DEBUG - 调试信息" value="debug" />
                    <el-option label="INFO - 一般信息" value="info" />
                    <el-option label="WARN - 警告信息" value="warn" />
                    <el-option label="ERROR - 错误信息" value="error" />
                  </el-select>
                </el-form-item>

                <el-form-item label="操作日志">
                  <el-switch v-model="form.operationLog" />
                  <div class="setting-tip">记录用户操作日志</div>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

const activeTab = ref('basic')
const saving = ref(false)

// 设置标签配置
const settingsTabs = [
  {
    name: 'basic',
    title: '基础设置',
    description: '系统外观和基本配置',
  },
  {
    name: 'database',
    title: '数据库设置',
    description: '数据库连接和配置',
  },
  {
    name: 'api',
    title: 'API设置',
    description: 'API接口相关配置',
  },
  {
    name: 'backup',
    title: '备份设置',
    description: '数据备份和恢复',
  },
  {
    name: 'notification',
    title: '通知设置',
    description: '系统通知配置',
  },
  {
    name: 'security',
    title: '安全设置',
    description: '安全策略和权限',
  },
  {
    name: 'logging',
    title: '日志设置',
    description: '系统日志配置',
  }
]

// 计算属性
const getCurrentTabTitle = () => {
  const tab = settingsTabs.find(t => t.name === activeTab.value)
  return tab ? tab.title : '设置'
}

const getCurrentTabDescription = () => {
  const tab = settingsTabs.find(t => t.name === activeTab.value)
  return tab ? tab.description : '配置系统参数'
}

const form = reactive({
  systemName: '青少年编程后台管理系统',
  logoUrl: '',
  themeColor: '#6366f1',
  domain: 'www.example.com',
  port: 3000,
  copyright: '© 2024 青少年编程教育',
  dbType: 'mysql',
  dbHost: 'localhost',
  dbPort: 3306,
  dbName: 'youth_programming',
  dbUsername: '',
  dbPassword: '',
  dbPoolSize: 10,
  apiVersion: 'v1',
  apiKey: '',
  apiRateLimit: false,
  rateLimitCount: 100,
  corsEnabled: false,
  corsOrigins: '*',
  autoBackup: false,
  emailNotification: false,
  forceHttps: false,
  logLevel: 'info',
  operationLog: true
})

// 方法
const handleLogoChange = (file) => {
  const reader = new FileReader()
  reader.onload = (e) => {
    form.logoUrl = e.target.result
  }
  reader.readAsDataURL(file.raw)
}

const generateApiKey = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < 32; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  form.apiKey = result
  ElMessage.success('API密钥已生成')
}

const saveSettings = async () => {
  saving.value = true
  try {
    // 模拟保存设置
    await new Promise(resolve => setTimeout(resolve, 1000))
    ElMessage.success('设置已保存')
  } catch (error) {
    ElMessage.error('保存失败: ' + error.message)
  } finally {
    saving.value = false
  }
}

const resetForm = () => {
  ElMessage.info('设置已重置')
}

const testConnection = async () => {
  try {
    // 模拟测试连接
    await new Promise(resolve => setTimeout(resolve, 1000))
    ElMessage.success('连接测试成功')
  } catch (error) {
    ElMessage.error('连接测试失败')
  }
}
</script>

<style scoped>
/* 设置页面样式 */
.settings-page-container {
  padding: 24px;
  background: var(--bg-secondary);
  min-height: 100vh;
}

/* 现代化页面头部 */
.page-header {
  margin-bottom: 24px;
  padding: 32px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 32px;
}

.page-title {
  display: flex;
  align-items: center;
  gap: 20px;
}

.title-icon {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: var(--radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: var(--shadow-md);
}

.title-text h1 {
  font-size: var(--font-size-3xl);
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.page-subtitle {
  color: var(--text-secondary);
  font-size: var(--font-size-md);
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

/* 设置内容布局 */
.settings-content {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 24px;
  align-items: start;
}

/* 侧边导航样式 */
.settings-sidebar {
  background: white;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-light);
  overflow: hidden;
  position: sticky;
  top: 24px;
}

.sidebar-nav {
  padding: 0;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 24px;
  cursor: pointer;
  transition: var(--transition-fast);
  border-bottom: 1px solid var(--border-light);
  position: relative;
}

.nav-item:last-child {
  border-bottom: none;
}

.nav-item:hover {
  background: var(--bg-secondary);
}

.nav-item.active {
  background: rgba(99, 102, 241, 0.1);
  border-right: 3px solid var(--primary-color);
}

.nav-item.active .nav-title {
  color: var(--primary-color);
  font-weight: 600;
}

.nav-icon {
  width: 40px;
  height: 40px;
  background: var(--bg-tertiary);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  transition: var(--transition-fast);
}

.nav-item.active .nav-icon {
  background: var(--primary-color);
  color: white;
}

.nav-content {
  flex: 1;
}

.nav-title {
  font-size: var(--font-size-md);
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.nav-description {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  line-height: 1.4;
}

.nav-arrow {
  color: var(--text-light);
  opacity: 0;
  transition: var(--transition-fast);
}

.nav-item:hover .nav-arrow,
.nav-item.active .nav-arrow {
  opacity: 1;
  color: var(--primary-color);
}

/* 主要设置区域 */
.settings-main {
  width: 100%;
}

.settings-form-container {
  background: white;
  padding: 0;
  overflow: hidden;
}

.form-header {
  padding: 24px 32px;
  background: var(--bg-tertiary);
  border-bottom: 1px solid var(--border-light);
}

.form-title {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.form-title svg {
  color: var(--primary-color);
}

.form-subtitle {
  color: var(--text-secondary);
  font-size: var(--font-size-md);
  margin: 0;
}

/* 表单内容样式 */
.modern-form {
  padding: 32px;
}

.tab-content {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.settings-section {
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  padding: 24px;
  border: 1px solid var(--border-light);
}

.section-header {
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border-light);
}

.section-header h3 {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 8px 0;
}

.section-header h3 svg {
  color: var(--primary-color);
}

.section-header p {
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  margin: 0;
  line-height: 1.5;
}

/* 表单项样式 */
.modern-form :deep(.el-form-item) {
  margin-bottom: 24px;
}

.modern-form :deep(.el-form-item__label) {
  color: var(--text-primary);
  font-weight: 600;
  font-size: var(--font-size-sm);
}

.modern-form :deep(.el-input__wrapper),
.modern-form :deep(.el-select .el-input__wrapper),
.modern-form :deep(.el-textarea__inner) {
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  transition: var(--transition-fast);
  box-shadow: none;
}

.modern-form :deep(.el-input__wrapper):hover,
.modern-form :deep(.el-select .el-input__wrapper):hover,
.modern-form :deep(.el-textarea__inner):hover {
  border-color: var(--primary-color);
}

.modern-form :deep(.el-input__wrapper.is-focus),
.modern-form :deep(.el-select .el-input__wrapper.is-focus),
.modern-form :deep(.el-textarea__inner:focus) {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.modern-form :deep(.el-switch__core) {
  border-radius: var(--radius-lg);
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
}

.modern-form :deep(.el-switch.is-checked .el-switch__core) {
  background: var(--primary-color);
  border-color: var(--primary-color);
}

/* 特殊表单元素 */
.logo-upload-area {
  display: flex;
  justify-content: center;
}

.logo-uploader :deep(.el-upload) {
  border: 2px dashed var(--border-color);
  border-radius: var(--radius-lg);
  background: var(--bg-secondary);
  transition: var(--transition-fast);
  overflow: hidden;
}

.logo-uploader :deep(.el-upload):hover {
  border-color: var(--primary-color);
  background: rgba(99, 102, 241, 0.05);
}

.upload-content {
  width: 200px;
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.logo-preview {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.upload-placeholder {
  text-align: center;
  color: var(--text-secondary);
}

.upload-placeholder svg {
  font-size: 32px;
  color: var(--text-light);
  margin-bottom: 8px;
}

.upload-placeholder p {
  margin: 8px 0 4px 0;
  font-size: var(--font-size-sm);
  font-weight: 500;
}

.upload-hint {
  font-size: var(--font-size-xs);
  color: var(--text-light);
}

.color-picker-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
}

.color-preview {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-lg);
  border: 2px solid var(--border-light);
  transition: var(--transition-fast);
}

.api-key-wrapper {
  display: flex;
  gap: 12px;
  align-items: center;
}

.api-key-wrapper .el-input {
  flex: 1;
}

.generate-btn {
  flex-shrink: 0;
}

.setting-tip {
  margin-top: 8px;
  font-size: var(--font-size-xs);
  color: var(--text-light);
  background: rgba(99, 102, 241, 0.05);
  padding: 8px 12px;
  border-radius: var(--radius-md);
  border-left: 3px solid var(--primary-color);
}

.unit-text {
  margin-left: 8px;
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
}

/* 数据库选项图标样式 */
.modern-form :deep(.el-select-dropdown__item) {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .settings-content {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .settings-sidebar {
    position: static;
  }
  
  .sidebar-nav {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
  
  .nav-item {
    border-bottom: 1px solid var(--border-light);
    border-right: 1px solid var(--border-light);
  }
  
  .nav-item:last-child {
    border-bottom: 1px solid var(--border-light);
  }
}

@media (max-width: 768px) {
  .settings-page-container {
    padding: 16px;
  }
  
  .header-content {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
  
  .sidebar-nav {
    grid-template-columns: 1fr;
  }
  
  .nav-item {
    border-right: none;
  }
  
  .modern-form {
    padding: 24px 20px;
  }
  
  .settings-section {
    padding: 20px;
  }
  
  .form-header {
    padding: 20px 24px;
  }
  
  .api-key-wrapper {
    flex-direction: column;
    gap: 12px;
  }
  
  .api-key-wrapper .el-input {
    width: 100%;
  }
  
  .color-picker-wrapper {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}

@media (max-width: 480px) {
  .page-title {
    flex-direction: column;
    gap: 12px;
    text-align: center;
  }
  
  .title-text h1 {
    font-size: var(--font-size-2xl);
  }
  
  .header-actions {
    flex-direction: column;
    gap: 8px;
  }
  
  .nav-item {
    padding: 16px 20px;
  }
  
  .nav-icon {
    width: 36px;
    height: 36px;
  }
  
  .modern-form {
    padding: 20px 16px;
  }
  
  .settings-section {
    padding: 16px;
  }
  
  .form-header {
    padding: 16px 20px;
  }
  
  .upload-content {
    width: 160px;
    height: 100px;
    padding: 16px;
  }
}

/* 动画效果 */
.nav-item {
  animation: fadeInLeft 0.3s ease-out forwards;
}

.nav-item:nth-child(2) { animation-delay: 0.1s; }
.nav-item:nth-child(3) { animation-delay: 0.2s; }
.nav-item:nth-child(4) { animation-delay: 0.3s; }
.nav-item:nth-child(5) { animation-delay: 0.4s; }
.nav-item:nth-child(6) { animation-delay: 0.5s; }
.nav-item:nth-child(7) { animation-delay: 0.6s; }

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.settings-section {
  animation: fadeInUp 0.4s ease-out forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>