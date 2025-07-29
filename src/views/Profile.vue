<template>
  <div class="profile-page-container">
    <!-- 现代化页面头部 -->
    <div class="page-header modern-card">
      <div class="header-content">
        <div class="page-title">
          <div class="title-icon">
            <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
              <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,6A2,2 0 0,0 10,8A2,2 0 0,0 12,10A2,2 0 0,0 14,8A2,2 0 0,0 12,6M12,13C16.42,13 20,15.79 20,19V21H4V19C4,15.79 7.58,13 12,13Z"/>
            </svg>
          </div>
          <div class="title-text">
            <h1>个人中心</h1>
            <p class="page-subtitle">管理您的个人信息和偏好设置</p>
          </div>
        </div>
        <div class="header-actions">
          <el-button @click="refreshData" class="modern-btn">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z"/>
            </svg>
            刷新数据
          </el-button>
          <el-button type="primary" @click="exportProfile" class="modern-btn primary">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
            </svg>
            导出资料
          </el-button>
        </div>
      </div>
    </div>

    <!-- 现代化内容区域 -->
    <div class="profile-content">
      <!-- 左侧用户信息卡片 -->
      <div class="profile-sidebar">
        <div class="user-profile-card modern-card">
          <div class="profile-avatar-section">
            <div class="avatar-container">
              <div class="avatar-image">
                <img v-if="userAvatar" :src="userAvatar" alt="用户头像" />
                <div v-else class="avatar-placeholder">
                  <span>{{ userInfo.name ? userInfo.name.charAt(0).toUpperCase() : 'U' }}</span>
              </div>
            </div>
              <div class="avatar-edit-overlay" @click="showAvatarUpload">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M4,4H7L9,2H15L17,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9Z"/>
                </svg>
              </div>
            </div>
          </div>

          <div class="profile-user-info">
            <h3 class="user-name">{{ userInfo.name || '未设置姓名' }}</h3>
            <p class="user-role">{{ getRoleText(userInfo.role) }}</p>
            <div class="user-status-badge" :class="{ active: userInfo.status === 'active' }">
              <span class="status-dot"></span>
              <span class="status-text">{{ userInfo.status === 'active' ? '在线' : '离线' }}</span>
            </div>
          </div>

          <div class="profile-contact-info">
            <div class="contact-item">
              <div class="contact-icon">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z"/>
                </svg>
            </div>
              <span class="contact-text">{{ userInfo.phone || '未设置手机号' }}</span>
            </div>
            <div class="contact-item">
              <div class="contact-icon">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"/>
                </svg>
            </div>
              <span class="contact-text">{{ userInfo.email || '未设置邮箱' }}</span>
            </div>
            <div class="contact-item">
              <div class="contact-icon">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.9 20.1,3 19,3H18V1M17,12H12V17H17V12Z"/>
                </svg>
              </div>
              <span class="contact-text">加入于 {{ formatDate(userInfo.joinDate) }}</span>
            </div>
            <div class="contact-item">
              <div class="contact-icon">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22S19,14.25 19,9A7,7 0 0,0 12,2Z"/>
                </svg>
              </div>
              <span class="contact-text">{{ userInfo.location || '未设置地址' }}</span>
            </div>
          </div>
          
          <div class="profile-quick-actions">
            <button 
              class="quick-action-btn primary" 
              :class="{ active: activeTab === 'info' }"
              @click="activeTab = 'info'"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"/>
              </svg>
              编辑资料
            </button>
            <button 
              class="quick-action-btn secondary" 
              :class="{ active: activeTab === 'password' }"
              @click="activeTab = 'password'"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z"/>
              </svg>
              修改密码
            </button>
          </div>
        </div>
      </div>

      <!-- 右侧主要内容区 -->
      <div class="profile-main">
        <div class="profile-content-card modern-card">
          <!-- 标签导航 -->
          <div class="profile-tabs">
            <div class="tabs-nav">
              <button 
                v-for="tab in profileTabs" 
                :key="tab.name"
                class="tab-btn"
                :class="{ active: activeTab === tab.name }"
                @click="activeTab = tab.name"
              >
                <component :is="tab.icon" />
                <span>{{ tab.label }}</span>
              </button>
            </div>
          </div>

          <!-- 标签内容 -->
          <div class="tab-content">
            <!-- 个人资料编辑 -->
            <div v-show="activeTab === 'info'" class="tab-panel">
              <div class="panel-header">
                <h3>
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"/>
                  </svg>
                  编辑个人资料
                </h3>
                <p>更新您的个人信息，保持资料最新</p>
              </div>

              <el-form 
                :model="profileForm" 
                :rules="profileRules" 
                ref="profileFormRef"
                label-width="120px"
                class="modern-form profile-form"
              >
                <div class="form-grid">
                  <div class="form-section">
                    <h4 class="section-title">基本信息</h4>
                <el-form-item label="姓名" prop="name" required>
                  <el-input v-model="profileForm.name" placeholder="请输入姓名" />
                </el-form-item>
                <el-form-item label="手机号码" prop="phone">
                  <el-input v-model="profileForm.phone" placeholder="请输入手机号码" />
                </el-form-item>
                    <el-form-item label="邮箱地址" prop="email">
                  <el-input v-model="profileForm.email" placeholder="请输入邮箱地址" />
                </el-form-item>
                <el-form-item label="性别" prop="gender">
                      <el-radio-group v-model="profileForm.gender" class="gender-group">
                        <el-radio-button label="male">男</el-radio-button>
                        <el-radio-button label="female">女</el-radio-button>
                        <el-radio-button label="other">其他</el-radio-button>
                  </el-radio-group>
                </el-form-item>
                  </div>

                  <div class="form-section">
                    <h4 class="section-title">详细信息</h4>
                    <el-form-item label="出生日期" prop="birthday">
                  <el-date-picker
                    v-model="profileForm.birthday"
                    type="date"
                    placeholder="选择生日"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    style="width: 100%"
                  />
                </el-form-item>
                    <el-form-item label="联系地址" prop="address">
                      <el-input v-model="profileForm.address" placeholder="请输入联系地址" />
                </el-form-item>
                <el-form-item label="个人简介" prop="bio">
                  <el-input 
                    v-model="profileForm.bio" 
                    type="textarea" 
                    :rows="4"
                        placeholder="介绍一下您自己..."
                        maxlength="500"
                        show-word-limit
                  />
                </el-form-item>
                  </div>
                </div>

                <div class="form-actions">
                  <el-button 
                    type="primary" 
                    :loading="loading"
                    @click="updateProfile"
                    class="modern-btn primary"
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                      <path d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V7L17,3Z"/>
                    </svg>
                    保存修改
                  </el-button>
                  <el-button @click="resetProfileForm" class="modern-btn">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                      <path d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z"/>
                    </svg>
                    重置
                  </el-button>
                </div>
              </el-form>
            </div>
            
            <!-- 课程统计 -->
            <div v-show="activeTab === 'stats'" class="tab-panel">
              <div class="panel-header">
                <h3>
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M16,11.78L20.24,4.45L21.97,5.45L16.74,14.5L10.23,10.75L5.46,19H22V21H2V3H4V17.54L9.5,8L16,11.78Z"/>
                  </svg>
                  课程统计
                </h3>
                <p>查看您的教学数据和统计信息</p>
                      </div>

              <div class="stats-overview">
                <div class="stats-grid">
                  <div class="stat-card total-courses">
                    <div class="stat-icon">
                      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                        <path d="M19,3H5C3.9,3 3,3.9 3,5V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V5C21,3.9 20.1,3 19,3M5,19V5H19V19H5M6.5,17.5H9.5V10.5H6.5V17.5M10.5,17.5H13.5V7.5H10.5V17.5M14.5,17.5H17.5V13.5H14.5V17.5Z"/>
                      </svg>
                      </div>
                    <div class="stat-content">
                      <div class="stat-number">{{ courseStats.totalCourses }}</div>
                      <div class="stat-label">总课程数</div>
                      <div class="stat-trend positive">+{{ courseStats.monthlyIncrease }} 本月</div>
                      </div>
                  </div>

                  <div class="stat-card total-hours">
                    <div class="stat-icon">
                      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                        <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.9L16.2,16.2Z"/>
                      </svg>
              </div>
                    <div class="stat-content">
                      <div class="stat-number">{{ courseStats.totalHours }}</div>
                      <div class="stat-label">已授课时</div>
                      <div class="stat-trend positive">+{{ courseStats.hoursIncrease }}h 本月</div>
                    </div>
                  </div>

                  <div class="stat-card total-students">
                    <div class="stat-icon">
                      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                        <path d="M16,4C16.88,4 17.67,4.35 18.22,4.9C18.77,5.45 19.12,6.24 19.12,7.12C19.12,8 18.77,8.79 18.22,9.34C17.67,9.89 16.88,10.24 16,10.24C15.12,10.24 14.33,9.89 13.78,9.34C13.23,8.79 12.88,8 12.88,7.12C12.88,6.24 13.23,5.45 13.78,4.9C14.33,4.35 15.12,4 16,4M8,6C8.88,6 9.67,6.35 10.22,6.9C10.77,7.45 11.12,8.24 11.12,9.12C11.12,10 10.77,10.79 10.22,11.34C9.67,11.89 8.88,12.24 8,12.24C7.12,12.24 6.33,11.89 5.78,11.34C5.23,10.79 4.88,10 4.88,9.12C4.88,8.24 5.23,7.45 5.78,6.9C6.33,6.35 7.12,6 8,6M8,13.5C10.33,13.5 15,14.66 15,17V20H1V17C1,14.66 5.67,13.5 8,13.5M16,12C18.33,12 23,13.16 23,15.5V18.5H17V17C17,15.9 16.22,14.84 15.03,14.09C15.68,13.95 16.34,13.87 17,13.87C21.67,13.87 23,15.03 23,17V20H17V17C17,16.12 16.65,15.33 16.1,14.78C15.55,14.23 14.76,13.88 13.88,13.88C13,13.88 12.21,14.23 11.66,14.78C11.11,15.33 10.76,16.12 10.76,17V20H17V17C17,14.66 21.67,13.5 24,13.5"/>
                      </svg>
                    </div>
                    <div class="stat-content">
                      <div class="stat-number">{{ courseStats.totalStudents }}</div>
                      <div class="stat-label">学员人数</div>
                      <div class="stat-trend positive">+{{ courseStats.studentsIncrease }} 本月</div>
                    </div>
              </div>
              
                  <div class="stat-card completion-rate">
                    <div class="stat-icon">
                      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                        <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/>
                      </svg>
                      </div>
                    <div class="stat-content">
                      <div class="stat-number">{{ courseStats.completionRate }}%</div>
                      <div class="stat-label">完课率</div>
                      <div class="stat-trend positive">+{{ courseStats.rateIncrease }}% 本月</div>
                      </div>
                      </div>
                    </div>
              </div>

              <!-- 图表区域 -->
              <div class="chart-section">
                <div class="chart-header">
                  <h4>教学趋势分析</h4>
                  <div class="chart-controls">
                    <el-select v-model="chartPeriod" size="small">
                      <el-option label="最近7天" value="7days" />
                      <el-option label="最近30天" value="30days" />
                      <el-option label="最近3个月" value="3months" />
                    </el-select>
              </div>
                </div>
                <div class="chart-container">
                  <v-chart :option="chartOption" autoresize style="height: 300px;" />
                </div>
              </div>
            </div>

            <!-- 密码修改 -->
            <div v-show="activeTab === 'password'" class="tab-panel">
              <div class="panel-header">
                <h3>
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z"/>
                  </svg>
                  修改密码
                </h3>
                <p>定期更换密码，保护账户安全</p>
              </div>
              
              <el-form 
                :model="passwordForm" 
                :rules="passwordRules" 
                ref="passwordFormRef"
                label-width="120px"
                class="modern-form password-form"
              >
                <div class="password-security-tips">
                  <div class="security-tip">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                      <path d="M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z"/>
                    </svg>
                    <span>密码至少8位，包含字母和数字</span>
                  </div>
                  <div class="security-tip">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                      <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1Z"/>
                    </svg>
                    <span>建议定期更换密码，提高安全性</span>
                  </div>
                </div>

                <el-form-item label="当前密码" prop="oldPassword" required>
                  <el-input 
                    v-model="passwordForm.oldPassword" 
                    type="password"
                    show-password
                    placeholder="请输入当前密码"
                  />
                </el-form-item>
                
                <el-form-item label="新密码" prop="newPassword" required>
                  <el-input 
                    v-model="passwordForm.newPassword" 
                    type="password"
                    show-password
                    placeholder="请输入新密码"
                  />
                </el-form-item>
                
                <el-form-item label="确认新密码" prop="confirmPassword" required>
                  <el-input 
                    v-model="passwordForm.confirmPassword" 
                    type="password"
                    show-password
                    placeholder="请再次输入新密码"
                  />
                </el-form-item>

                <div class="form-actions">
                  <el-button 
                    type="primary" 
                    :loading="loading"
                    @click="updatePassword"
                    class="modern-btn primary"
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                      <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1Z"/>
                    </svg>
                    修改密码
                  </el-button>
                  <el-button @click="resetPasswordForm" class="modern-btn">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                      <path d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z"/>
                    </svg>
                    重置
                  </el-button>
                </div>
              </el-form>
            </div>

            <!-- 上课记录 -->
            <div v-show="activeTab === 'records'" class="tab-panel">
              <div class="panel-header">
                <h3>
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z"/>
                  </svg>
                  上课记录
                </h3>
                <p>查看最近的授课记录和学员反馈</p>
              </div>

              <div class="records-header">
                <div class="records-filters">
                  <el-select v-model="recordsFilter" size="small" placeholder="筛选记录">
                    <el-option label="全部记录" value="all" />
                    <el-option label="本周记录" value="week" />
                    <el-option label="本月记录" value="month" />
                  </el-select>
                </div>
                <el-button type="primary" size="small" @click="exportRecords" class="modern-btn primary">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                  </svg>
                  导出记录
                </el-button>
              </div>

              <div class="records-timeline">
                <div 
                  v-for="record in filteredRecords" 
                  :key="record.id"
                  class="record-item"
                >
                  <div class="record-date">
                    <div class="date-dot" :class="record.type"></div>
                    <span class="date-text">{{ formatDate(record.date) }}</span>
                  </div>
                  
                  <div class="record-content">
                    <div class="record-header">
                      <h4 class="record-title">{{ record.course }}</h4>
                      <div class="record-status" :class="record.type">
                        {{ record.status }}
                      </div>
                    </div>
                    
                    <div class="record-details">
                      <div class="detail-item">
                        <strong>课程内容：</strong>{{ record.content }}
                      </div>
                      <div class="detail-item">
                        <strong>学员表现：</strong>{{ record.performance }}
                      </div>
                      <div class="detail-item">
                        <strong>上课时长：</strong>{{ record.duration }} 分钟
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 头像上传对话框 -->
    <el-dialog
      v-model="avatarDialogVisible"
      title="更换头像"
      width="400px"
      class="modern-dialog"
    >
      <div class="avatar-upload-content">
      <el-upload
        class="avatar-uploader"
        :show-file-list="false"
          :on-change="handleAvatarChange"
          :auto-upload="false"
          accept="image/*"
        >
          <div class="upload-area">
            <img v-if="previewAvatar" :src="previewAvatar" class="avatar-preview" />
            <div v-else class="upload-placeholder">
              <svg viewBox="0 0 24 24" width="48" height="48" fill="currentColor">
                <path d="M4,4H7L9,2H15L17,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9Z"/>
              </svg>
              <p>点击选择图片</p>
              <span>支持 JPG、PNG 格式</span>
        </div>
      </div>
        </el-upload>
      </div>
      
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="avatarDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmAvatarChange">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '../stores/user'
import api from '../utils/api'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart, BarChart } from 'echarts/charts'
import { 
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent 
} from 'echarts/components'
import VChart from 'vue-echarts'

// 注册ECharts组件
use([
  CanvasRenderer,
  LineChart,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
])

const userStore = useUserStore()

// 响应式数据
const activeTab = ref('info')
const loading = ref(false)
const passwordLoading = ref(false)
const avatarDialogVisible = ref(false)
const previewAvatar = ref('')
const chartPeriod = ref('30days')
const recordsFilter = ref('all')

// 标签页配置
const profileTabs = ref([
  {
    name: 'info',
    label: '个人资料',
    icon: 'info-icon'
  },
  {
    name: 'stats',
    label: '课程统计',
    icon: 'stats-icon'
  },
  {
    name: 'password',
    label: '修改密码',
    icon: 'password-icon'
  },
  {
    name: 'records',
    label: '上课记录',
    icon: 'records-icon'
  }
])

// 用户信息
const userInfo = reactive({
  id: 1,
  name: '张老师',
  email: 'teacher@example.com',
  phone: '13800138000',
  role: 'teacher',
  status: 'active',
  joinDate: '2024-01-01',
  location: '北京市朝阳区',
  bio: '专注青少年编程教育，有10年教学经验'
})

const userAvatar = ref('')

// 个人资料表单
const profileForm = reactive({
  name: userInfo.name,
  phone: userInfo.phone,
  email: userInfo.email,
  gender: 'male',
  birthday: '',
  address: userInfo.location,
  bio: userInfo.bio
})

// 密码修改表单
const passwordForm = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// 课程统计数据
const courseStats = reactive({
  totalCourses: 145,
  monthlyIncrease: 12,
  totalHours: 580,
  hoursIncrease: 48,
  totalStudents: 89,
  studentsIncrease: 15,
  completionRate: 95,
  rateIncrease: 3
})

// 上课记录数据
const recentRecords = ref([
  {
    id: 1,
    course: 'Python基础编程',
    content: '变量和数据类型',
    performance: '学员积极参与，掌握良好',
    duration: 90,
    date: '2024-01-15',
    status: '已完成',
    type: 'success'
  },
  {
    id: 2,
    course: 'JavaScript入门',
    content: '函数和作用域',
    performance: '部分学员需要额外辅导',
    duration: 120,
    date: '2024-01-14',
    status: '已完成',
    type: 'success'
  },
  {
    id: 3,
    course: 'Scratch创意编程',
    content: '游戏制作项目',
    performance: '学员创意表现优秀',
    duration: 60,
    date: '2024-01-13',
    status: '已完成',
    type: 'success'
  }
])

// 表单验证规则
const profileRules = {
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { min: 2, max: 20, message: '姓名长度在 2 到 20 个字符', trigger: 'blur' }
  ],
  phone: [
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
  ],
  email: [
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
  ]
}

const passwordRules = {
  oldPassword: [
    { required: true, message: '请输入当前密码', trigger: 'blur' }
  ],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 8, message: '密码长度至少8位', trigger: 'blur' },
    { pattern: /^(?=.*[a-zA-Z])(?=.*\d)/, message: '密码需包含字母和数字', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认新密码', trigger: 'blur' },
    { 
      validator: (rule, value, callback) => {
        if (value !== passwordForm.newPassword) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      }, 
      trigger: 'blur'
    }
  ]
}

const profileFormRef = ref(null)
const passwordFormRef = ref(null)

// 图表配置
const chartOption = computed(() => {
  return {
  title: {
      text: '教学趋势',
      left: 'center'
  },
  tooltip: {
      trigger: 'axis'
  },
  legend: {
      data: ['授课时长', '学员人数'],
      bottom: 10
  },
  grid: {
    left: '3%',
    right: '4%',
      bottom: '15%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月']
  },
  yAxis: {
      type: 'value'
  },
  series: [
    {
        name: '授课时长',
      type: 'line',
        data: [120, 150, 180, 200, 160, 180],
      smooth: true,
        lineStyle: {
          color: '#6366f1'
        },
        itemStyle: {
          color: '#6366f1'
        }
      },
      {
        name: '学员人数',
      type: 'line',
        data: [20, 25, 30, 35, 28, 32],
      smooth: true,
        lineStyle: {
          color: '#10b981'
        },
        itemStyle: {
          color: '#10b981'
        }
      }
    ]
  }
})

// 计算属性
const filteredRecords = computed(() => {
  if (recordsFilter.value === 'all') {
    return recentRecords.value
  }
  // 这里可以添加筛选逻辑
  return recentRecords.value
})

// 方法
const getRoleText = (role) => {
  const roleMap = {
    'admin': '系统管理员',
    'teacher': '授课教师',
    'student': '学员',
    'manager': '课程管理员'
  }
  return roleMap[role] || '未知角色'
}

const formatDate = (date) => {
  if (!date) return '未设置'
  return new Date(date).toLocaleDateString('zh-CN')
}

const showAvatarUpload = () => {
  avatarDialogVisible.value = true
}

const handleAvatarChange = (file) => {
  const reader = new FileReader()
  reader.onload = (e) => {
    previewAvatar.value = e.target.result
  }
  reader.readAsDataURL(file.raw)
}

const confirmAvatarChange = () => {
  if (previewAvatar.value) {
    userAvatar.value = previewAvatar.value
    ElMessage.success('头像更换成功')
  }
  avatarDialogVisible.value = false
  previewAvatar.value = ''
}

const updateProfile = async () => {
  if (!profileFormRef.value) return
  
  await profileFormRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true
      try {
        await api.put(`/users/${userInfo.id}/profile`, profileForm)
        
        // 更新用户信息
        Object.assign(userInfo, profileForm)
        
        ElMessage.success('个人资料更新成功')
      } catch (error) {
        console.error('更新个人资料失败:', error)
        ElMessage.error('更新失败，请稍后重试')
      } finally {
        loading.value = false
      }
    }
  })
}

const resetProfileForm = () => {
  if (profileFormRef.value) {
    profileFormRef.value.resetFields()
    Object.assign(profileForm, {
      name: userInfo.name,
      phone: userInfo.phone,
      email: userInfo.email,
      gender: 'male',
      birthday: '',
      address: userInfo.location,
      bio: userInfo.bio
    })
  }
}

const updatePassword = async () => {
  if (!passwordFormRef.value) return
  
  await passwordFormRef.value.validate(async (valid) => {
    if (valid) {
      passwordLoading.value = true
      try {
        await api.put(`/users/${userInfo.id}/change-password`, {
          oldPassword: passwordForm.oldPassword,
          newPassword: passwordForm.newPassword
        })
        
        ElMessage.success('密码修改成功')
        resetPasswordForm()
      } catch (error) {
        console.error('修改密码失败:', error)
        ElMessage.error('密码修改失败，请检查当前密码是否正确')
      } finally {
        passwordLoading.value = false
      }
    }
  })
}

const resetPasswordForm = () => {
  if (passwordFormRef.value) {
    passwordFormRef.value.resetFields()
    Object.assign(passwordForm, {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
  }
}

const refreshData = async () => {
  try {
    ElMessage.success('数据已刷新')
  } catch (error) {
    ElMessage.error('刷新失败')
  }
}

const exportProfile = () => {
  ElMessage.success('资料导出功能开发中')
}

const exportRecords = () => {
  ElMessage.success('记录导出功能开发中')
}

// 生命周期
onMounted(() => {
  // 初始化加载用户数据
  console.log('个人中心页面已加载')
})
</script>

<style scoped>
/* 个人中心页面样式 */
.profile-page-container {
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

/* 个人中心内容布局 */
.profile-content {
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 24px;
  align-items: start;
}

/* 左侧用户卡片 */
.profile-sidebar {
  position: sticky;
  top: 24px;
}

.user-profile-card {
  padding: 32px 24px;
  text-align: center;
}

.profile-avatar-section {
  margin-bottom: 24px;
}

.avatar-container {
  position: relative;
  display: inline-block;
  margin-bottom: 16px;
}

.avatar-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid var(--border-light);
  background: var(--bg-tertiary);
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: var(--font-size-3xl);
  font-weight: 600;
}

.avatar-edit-overlay {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 36px;
  height: 36px;
  background: var(--primary-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  border: 3px solid white;
  transition: var(--transition-fast);
}

.avatar-edit-overlay:hover {
  background: var(--primary-hover);
  transform: scale(1.1);
}

.profile-user-info {
  margin-bottom: 24px;
}

.user-name {
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 8px 0;
}

.user-role {
  color: var(--text-secondary);
  font-size: var(--font-size-md);
  margin: 0 0 12px 0;
}

.user-status-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background: var(--bg-tertiary);
  border-radius: var(--radius-full);
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
}

.user-status-badge.active {
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--text-light);
}

.user-status-badge.active .status-dot {
  background: #10b981;
}

.profile-contact-info {
  text-align: left;
  margin-bottom: 24px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid var(--border-light);
}

.contact-item:last-child {
  border-bottom: none;
}

.contact-icon {
  width: 32px;
  height: 32px;
  background: var(--bg-tertiary);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
}

.contact-text {
  flex: 1;
  color: var(--text-primary);
  font-size: var(--font-size-sm);
}

.profile-quick-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.quick-action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border: none;
  border-radius: var(--radius-lg);
  background: var(--bg-tertiary);
  color: var(--text-primary);
  font-size: var(--font-size-sm);
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition-fast);
  width: 100%;
  text-align: left;
}

.quick-action-btn:hover {
  background: var(--bg-hover);
}

.quick-action-btn.primary {
  background: var(--primary-color);
  color: white;
}

.quick-action-btn.primary:hover {
  background: var(--primary-hover);
}

.quick-action-btn.secondary {
  background: rgba(251, 146, 60, 0.1);
  color: #f59e0b;
}

.quick-action-btn.secondary:hover {
  background: rgba(251, 146, 60, 0.2);
}

.quick-action-btn.active {
  background: var(--primary-color);
  color: white;
}

/* 右侧主要内容区 */
.profile-main {
  width: 100%;
}

.profile-content-card {
  padding: 0;
  overflow: hidden;
}

/* 标签导航 */
.profile-tabs {
  border-bottom: 1px solid var(--border-light);
  background: var(--bg-tertiary);
}

.tabs-nav {
  display: flex;
  padding: 0 24px;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 20px;
  border: none;
  background: transparent;
  color: var(--text-secondary);
  font-size: var(--font-size-md);
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition-fast);
  border-bottom: 3px solid transparent;
}

.tab-btn:hover {
  color: var(--primary-color);
  background: rgba(99, 102, 241, 0.05);
}

.tab-btn.active {
  color: var(--primary-color);
  border-bottom-color: var(--primary-color);
  background: white;
}

/* 标签内容 */
.tab-content {
  padding: 32px;
}

.tab-panel {
  animation: fadeInUp 0.3s ease-out;
}

.panel-header {
  margin-bottom: 32px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border-light);
}

.panel-header h3 {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 8px 0;
}

.panel-header h3 svg {
  color: var(--primary-color);
}

.panel-header p {
  color: var(--text-secondary);
  font-size: var(--font-size-md);
  margin: 0;
  line-height: 1.5;
}

/* 表单样式 */
.modern-form {
  max-width: none;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}

.form-section {
  background: var(--bg-secondary);
  padding: 24px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-light);
}

.section-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 20px 0;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border-light);
}

.modern-form :deep(.el-form-item) {
  margin-bottom: 24px;
}

.modern-form :deep(.el-form-item__label) {
  color: var(--text-primary);
  font-weight: 600;
  font-size: var(--font-size-sm);
}

.modern-form :deep(.el-input__wrapper),
.modern-form :deep(.el-textarea__inner),
.modern-form :deep(.el-date-editor) {
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  transition: var(--transition-fast);
  box-shadow: none;
}

.modern-form :deep(.el-input__wrapper):hover,
.modern-form :deep(.el-textarea__inner):hover,
.modern-form :deep(.el-date-editor):hover {
  border-color: var(--primary-color);
}

.modern-form :deep(.el-input__wrapper.is-focus),
.modern-form :deep(.el-textarea__inner:focus),
.modern-form :deep(.el-date-editor.is-focus) {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.gender-group :deep(.el-radio-button__inner) {
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  background: white;
  color: var(--text-primary);
  padding: 8px 16px;
}

.gender-group :deep(.el-radio-button__original-radio:checked + .el-radio-button__inner) {
  background: var(--primary-color);
  border-color: var(--primary-color);
  color: white;
}

.form-actions {
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid var(--border-light);
  display: flex;
  gap: 12px;
}

/* 密码表单特殊样式 */
.password-form {
  max-width: 500px;
}

.password-security-tips {
  background: rgba(99, 102, 241, 0.05);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: var(--radius-lg);
  padding: 16px;
  margin-bottom: 24px;
}

.security-tip {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--primary-color);
  font-size: var(--font-size-sm);
  margin-bottom: 8px;
}

.security-tip:last-child {
  margin-bottom: 0;
}

/* 统计卡片样式 */
.stats-overview {
  margin-bottom: 32px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.stat-card {
  background: white;
  border-radius: var(--radius-lg);
  padding: 24px;
  border: 1px solid var(--border-light);
  position: relative;
  overflow: hidden;
  transition: var(--transition-fast);
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-color), var(--primary-light));
}

.stat-card.total-courses::before {
  background: linear-gradient(90deg, #6366f1, #8b5cf6);
}

.stat-card.total-hours::before {
  background: linear-gradient(90deg, #10b981, #34d399);
}

.stat-card.total-students::before {
  background: linear-gradient(90deg, #f59e0b, #fbbf24);
}

.stat-card.completion-rate::before {
  background: linear-gradient(90deg, #ef4444, #f87171);
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.total-courses .stat-icon {
  background: rgba(99, 102, 241, 0.1);
  color: #6366f1;
}

.total-hours .stat-icon {
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
}

.total-students .stat-icon {
  background: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
}

.completion-rate .stat-icon {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.stat-content {
  text-align: left;
}

.stat-number {
  font-size: var(--font-size-3xl);
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.stat-label {
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  font-weight: 500;
  margin-bottom: 8px;
}

.stat-trend {
  font-size: var(--font-size-xs);
  font-weight: 500;
  padding: 4px 8px;
  border-radius: var(--radius-md);
  display: inline-block;
}

.stat-trend.positive {
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
}

/* 图表区域 */
.chart-section {
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  padding: 24px;
  border: 1px solid var(--border-light);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.chart-header h4 {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.chart-controls {
  display: flex;
  gap: 12px;
}

.chart-container {
  background: white;
  border-radius: var(--radius-lg);
  padding: 20px;
  border: 1px solid var(--border-light);
}

/* 记录时间轴样式 */
.records-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border-light);
}

.records-filters {
  display: flex;
  gap: 12px;
}

.records-timeline {
  position: relative;
}

.record-item {
  display: flex;
  gap: 20px;
  margin-bottom: 24px;
  position: relative;
}

.record-item:not(:last-child)::after {
  content: '';
  position: absolute;
  left: 15px;
  top: 60px;
  bottom: -24px;
  width: 2px;
  background: var(--border-light);
}

.record-date {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 140px;
}

.date-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--primary-color);
  position: relative;
  z-index: 1;
}

.date-dot.success {
  background: #10b981;
}

.date-dot.warning {
  background: #f59e0b;
}

.date-dot.danger {
  background: #ef4444;
}

.date-text {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  font-weight: 500;
}

.record-content {
  flex: 1;
  background: white;
  border-radius: var(--radius-lg);
  padding: 20px;
  border: 1px solid var(--border-light);
  transition: var(--transition-fast);
}

.record-content:hover {
  box-shadow: var(--shadow-md);
}

.record-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.record-title {
  font-size: var(--font-size-md);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.record-status {
  padding: 4px 12px;
  border-radius: var(--radius-md);
  font-size: var(--font-size-xs);
  font-weight: 500;
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
}

.record-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.detail-item {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  line-height: 1.5;
}

.detail-item strong {
  color: var(--text-primary);
}

/* 头像上传对话框 */
.avatar-upload-content {
  text-align: center;
}

.avatar-uploader :deep(.el-upload) {
  border: 2px dashed var(--border-color);
  border-radius: var(--radius-lg);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--transition-fast);
}

.avatar-uploader :deep(.el-upload):hover {
  border-color: var(--primary-color);
}

.upload-area {
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-secondary);
}

.avatar-preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  color: var(--text-secondary);
}

.upload-placeholder svg {
  color: var(--text-light);
}

.upload-placeholder p {
  font-weight: 500;
  margin: 0;
}

.upload-placeholder span {
  font-size: var(--font-size-xs);
  color: var(--text-light);
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .profile-content {
    grid-template-columns: 300px 1fr;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  
  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  }
}

@media (max-width: 992px) {
  .profile-content {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .profile-sidebar {
    position: static;
  }
  
  .tabs-nav {
    flex-wrap: wrap;
    padding: 0 16px;
  }
  
  .tab-btn {
    padding: 12px 16px;
    font-size: var(--font-size-sm);
  }
}

@media (max-width: 768px) {
  .profile-page-container {
    padding: 16px;
  }
  
  .header-content {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
  
  .tab-content {
    padding: 24px 20px;
  }
  
  .user-profile-card {
    padding: 24px 20px;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .form-actions {
    flex-direction: column;
    gap: 8px;
  }
  
  .records-header {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }
  
  .record-item {
    flex-direction: column;
    gap: 12px;
  }
  
  .record-item:not(:last-child)::after {
    display: none;
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
  
  .tabs-nav {
    padding: 0 12px;
  }
  
  .tab-btn {
    flex: 1;
    min-width: 0;
    padding: 10px 12px;
  }
  
  .upload-area {
    width: 150px;
    height: 150px;
  }
}

/* 动画效果 */
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

.stat-card {
  animation: fadeInUp 0.4s ease-out forwards;
}

.stat-card:nth-child(2) { animation-delay: 0.1s; }
.stat-card:nth-child(3) { animation-delay: 0.2s; }
.stat-card:nth-child(4) { animation-delay: 0.3s; }

.record-item {
  animation: fadeInUp 0.3s ease-out forwards;
}

.record-item:nth-child(2) { animation-delay: 0.1s; }
.record-item:nth-child(3) { animation-delay: 0.2s; }
.record-item:nth-child(4) { animation-delay: 0.3s; }
</style>
