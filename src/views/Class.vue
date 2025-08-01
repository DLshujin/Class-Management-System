<template>
  <div class="class-management-container">
    <!-- 现代化页面头部 -->
    <div class="page-header modern-card">
      <div class="header-content">
        <div class="header-left">
          <div class="page-title">
            <div class="title-icon">
              <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
                <path d="M12,3L1,9L12,15L21,10.09V17H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z"/>
              </svg>
            </div>
            <div class="title-text">
              <h1>智慧班级</h1>
              <p class="page-subtitle">统一管理班级信息，实时掌握班级动态</p>
            </div>
          </div>
        </div>
        <div class="header-right">
          <div class="status-indicator">
            <div class="status-item" :class="{ 'loading': classStore.loading }">
              <div class="status-icon">
                <svg v-if="classStore.loading" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" class="spin">
                  <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"/>
                </svg>
                <svg v-else-if="dataSource === 'mock'" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
                </svg>
                <svg v-else viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/>
                </svg>
              </div>
              <span class="status-text">
                {{ classStore.loading ? '加载中...' : dataSource === 'mock' ? '模拟数据' : '实时数据' }}
              </span>
            </div>
          </div>
          <div class="header-actions">
            <el-button type="info" class="modern-btn info" @click="exportData">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
              </svg>
              导出数据
            </el-button>
            <el-button type="success" class="modern-btn success" @click="printData">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M18,3H6V7H18M19,12A1,1 0 0,1 18,11A1,1 0 0,1 19,10A1,1 0 0,1 20,11A1,1 0 0,1 19,12M16,19H8V14H16M19,8H5A3,3 0 0,0 2,11V17H6V21H18V17H22V11A3,3 0 0,0 19,8Z"/>
              </svg>
              打印报表
            </el-button>
            <el-button type="primary" class="modern-btn primary" @click="handleAdd">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"/>
              </svg>
              新建班级
            </el-button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 统计概览卡片 -->
    <div class="stats-overview">
      <div class="stats-grid">
        <div class="stat-card total-classes fade-in-up">
          <div class="stat-header">
            <div class="stat-icon total-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M12,3L1,9L12,15L21,10.09V17H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z"/>
              </svg>
            </div>
            <div class="trend-badge positive">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
              </svg>
            </div>
          </div>
          <div class="stat-body">
            <div class="stat-number">{{ classes.length }}</div>
            <div class="stat-label">班级总数</div>
            <div class="stat-description">系统中创建的所有班级</div>
          </div>
        </div>

        <div class="stat-card active-classes fade-in-up" style="animation-delay: 0.1s">
          <div class="stat-header">
            <div class="stat-icon active-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div class="trend-badge positive">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
              </svg>
            </div>
          </div>
          <div class="stat-body">
            <div class="stat-number">{{ classes.filter(c => c.status === 'active').length }}</div>
            <div class="stat-label">正常授课</div>
            <div class="stat-description">当前正在授课的班级</div>
          </div>
        </div>

        <div class="stat-card student-count fade-in-up" style="animation-delay: 0.2s">
          <div class="stat-header">
            <div class="stat-icon student-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M16 4C16 2.9 15.1 2 14 2H10C8.9 2 8 2.9 8 4H16M16 4H20C20.6 4 21 4.4 21 5S20.6 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.4 6 3 5.6 3 5S3.4 4 4 4H8"/>
              </svg>
            </div>
            <div class="trend-badge positive">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
              </svg>
            </div>
          </div>
          <div class="stat-body">
            <div class="stat-number">{{ getTotalStudents() }}</div>
            <div class="stat-label">学员总数</div>
            <div class="stat-description">所有班级的学员总数</div>
          </div>
        </div>

        <div class="stat-card teacher-count fade-in-up" style="animation-delay: 0.3s">
          <div class="stat-header">
            <div class="stat-icon teacher-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <div class="trend-badge positive">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
              </svg>
            </div>
          </div>
          <div class="stat-body">
            <div class="stat-number">{{ getUniqueTeachers() }}</div>
            <div class="stat-label">授课教师</div>
            <div class="stat-description">参与授课的教师数量</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 现代化搜索和筛选区域 -->
    <div class="search-controls modern-card">
      <div class="search-header">
        <div class="search-title">
          <div class="search-icon">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"/>
            </svg>
          </div>
          <div class="search-text">
            <h3>智能筛选</h3>
            <p>快速定位目标班级，提升管理效率</p>
          </div>
        </div>
        <div class="search-stats">
          <div class="stat-badge">
            <span class="stat-number">{{ filteredClasses.length }}</span>
            <span class="stat-label">个班级</span>
          </div>
        </div>
      </div>
      
      <div class="search-form">
        <div class="search-row">
          <div class="search-group main-search">
            <div class="search-label">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M15.5,14H14.71L14.43,13.73C15.41,12.59 16,11.11 16,9.5A6.5,6.5 0 0,0 9.5,3A6.5,6.5 0 0,0 3,9.5A6.5,6.5 0 0,0 9.5,16C11.11,16 12.59,15.41 13.73,14.43L14,14.71V15.5L20,21.5L21.5,20L15.5,14M9.5,14C7,14 5,12 5,9.5C5,7 7,5 9.5,5C12,5 14,7 14,9.5C14,12 12,14 9.5,14Z"/>
              </svg>
              关键词搜索
            </div>
            <el-input
              v-model="searchForm.keyword"
              placeholder="输入班级名称、班主任或描述关键词..."
              clearable
              @input="handleSearch"
              class="modern-input"
              size="large"
            >
              <template #suffix>
                <div class="search-suffix">
                  <el-button 
                    type="primary" 
                    size="small" 
                    circle
                    @click="handleSearch"
                    class="search-btn"
                  >
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                      <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"/>
                    </svg>
                  </el-button>
                </div>
              </template>
            </el-input>
          </div>
        </div>
        
        <div class="search-row filters">
          <div class="search-group">
            <div class="search-label">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8Z"/>
              </svg>
              状态筛选
            </div>
            <el-select
              v-model="searchForm.status"
              placeholder="选择班级状态"
              clearable
              @change="handleSearch"
              class="modern-select"
            >
              <el-option label="全部状态" value="" />
              <el-option label="正常授课" value="active">
                <div class="option-content">
                  <span class="option-dot active"></span>
                  <span>正常授课</span>
                </div>
              </el-option>
              <el-option label="暂时停课" value="paused">
                <div class="option-content">
                  <span class="option-dot paused"></span>
                  <span>暂时停课</span>
                </div>
              </el-option>
              <el-option label="已经结课" value="ended">
                <div class="option-content">
                  <span class="option-dot ended"></span>
                  <span>已经结课</span>
                </div>
              </el-option>
            </el-select>
          </div>
          
          <div class="search-group">
            <div class="search-label">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M12,3L1,9L12,15L21,10.09V17H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z"/>
              </svg>
              班级类型
            </div>
            <el-select
              v-model="searchForm.type"
              placeholder="选择班级类型"
              clearable
              @change="handleSearch"
              class="modern-select"
            >
              <el-option label="全部类型" value="" />
              <el-option label="普通班" value="regular" />
              <el-option label="重点班" value="advanced" />
              <el-option label="补习班" value="remedial" />
            </el-select>
          </div>
          
          <div class="search-group">
            <div class="search-label">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M5,3H7V5H5V10A2,2 0 0,1 3,8V5A2,2 0 0,1 5,3M19,3A2,2 0 0,1 21,5V8A2,2 0 0,1 19,10V5H17V3H19M3,19A2,2 0 0,0 5,21V16H3V19M21,19V16H19V21A2,2 0 0,0 21,19M16,3V5H13V8H11V5H8V3H16M16,10V12H13V15H11V12H8V10H16M16,16V18H13V21H11V18H8V16H16Z"/>
              </svg>
              年级筛选
            </div>
            <el-select
              v-model="searchForm.grade"
              placeholder="选择年级"
              clearable
              @change="handleSearch"
              class="modern-select"
            >
              <el-option label="全部年级" value="" />
              <el-option label="一年级" value="grade1" />
              <el-option label="二年级" value="grade2" />
              <el-option label="三年级" value="grade3" />
              <el-option label="四年级" value="grade4" />
              <el-option label="五年级" value="grade5" />
              <el-option label="六年级" value="grade6" />
            </el-select>
          </div>
                  
          <div class="search-group action-group">
            <div class="search-buttons">
              <el-button 
                type="primary" 
                @click="handleSearch" 
                class="modern-btn primary"
                size="large"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"/>
                </svg>
                精确搜索
              </el-button>
              <el-button 
                @click="resetSearch" 
                class="modern-btn secondary"
                size="large"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z"/>
                </svg>
                重置筛选
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>



    
    <!-- 现代化班级列表 -->
    <div class="data-table-section modern-card">
      <div class="table-header">
        <div class="table-title">
          <div class="title-icon">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M3,3H21V7H3V3M4,8H20V21H4V8M9.5,11A1.5,1.5 0 0,0 8,12.5A1.5,1.5 0 0,0 9.5,14A1.5,1.5 0 0,0 11,12.5A1.5,1.5 0 0,0 9.5,11M14.5,11A1.5,1.5 0 0,0 13,12.5A1.5,1.5 0 0,0 14.5,14A1.5,1.5 0 0,0 16,12.5A1.5,1.5 0 0,0 14.5,11Z"/>
            </svg>
          </div>
          <div class="title-content">
            <h3>班级列表</h3>
            <p>管理所有班级的详细信息</p>
          </div>
        </div>
        <div class="table-meta">
          <div class="record-info">
            <div class="record-count">
              <span class="count-number">{{ filteredClasses.length }}</span>
              <span class="count-label">条记录</span>
            </div>
            <div class="record-total">
              <span class="total-text">总计 {{ totalClasses }} 个班级</span>
            </div>
          </div>
        </div>
      </div>
        
      <div class="modern-table-container">
        <div class="table-scroll-wrapper">
          <el-table
          :data="paginatedClasses"
          v-loading="classStore.loading"
          class="modern-table"
          :header-cell-style="{
            backgroundColor: '#f8fafc',
            color: '#374151',
            fontWeight: '600',
            borderColor: '#e5e7eb',
            height: '48px'
          }"
          :cell-style="{
            borderColor: '#f3f4f6',
            padding: '8px 12px'
          }"
          :row-style="{ height: '52px' }"
          style="width: 100%"
          size="default"
        >
          <el-table-column type="index" label="序号" width="80" align="center">
            <template #default="{ $index }">
              <div class="index-cell">
                {{ (currentPage - 1) * pageSize + $index + 1 }}
              </div>
            </template>
          </el-table-column>
          
          <el-table-column prop="name" label="班级信息" min-width="150">
            <template #default="{ row }">
              <div class="class-info">
                <div class="class-avatar">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M12,3L1,9L12,15L21,10.09V17H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z"/>
                  </svg>
                </div>
                <div class="class-details">
                  <div class="class-name">{{ row.name }}</div>
                  <div class="class-code">编号: {{ row.code || 'AUTO-' + row.id }}</div>
                </div>
              </div>
            </template>
          </el-table-column>
          
          <el-table-column prop="teacher" label="班主任" width="90">
            <template #default="{ row }">
              <div class="teacher-info">
                <div class="teacher-avatar">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"/>
                  </svg>
                </div>
                <span class="teacher-name">{{ row.teacher }}</span>
              </div>
            </template>
          </el-table-column>
          
          <el-table-column prop="type" label="班级类型" width="90">
            <template #default="{ row }">
              <div class="type-badge" :class="'type-' + row.type">
                <span class="type-dot"></span>
                <span class="type-text">{{ getTypeLabel(row.type) }}</span>
              </div>
            </template>
          </el-table-column>
          
          <el-table-column prop="grade" label="年级" width="70" align="center">
            <template #default="{ row }">
              <div class="grade-badge">
                <span class="grade-text">{{ getGradeLabel(row.grade) }}</span>
              </div>
            </template>
          </el-table-column>
          
          <el-table-column prop="studentCount" label="学生数" width="80" align="center">
            <template #default="{ row }">
              <div class="student-count">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                  <path d="M16,4C18.11,4 20.11,4.87 21.66,6.38L20.25,7.81C19.15,6.75 17.63,6.1 16,6.1C14.37,6.1 12.85,6.75 11.75,7.81L10.34,6.38C11.89,4.87 13.89,4 16,4M16,8.2C17.2,8.2 18.35,8.64 19.22,9.5L17.81,10.94C17.35,10.5 16.7,10.25 16,10.25C15.3,10.25 14.65,10.5 14.19,10.94L12.78,9.5C13.65,8.64 14.8,8.2 16,8.2M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M16,12.3A1.7,1.7 0 0,1 17.7,14A1.7,1.7 0 0,1 16,15.7A1.7,1.7 0 0,1 14.3,14A1.7,1.7 0 0,1 16,12.3Z"/>
                </svg>
                <span class="count-number">{{ row.studentCount || 0 }}</span>
                <span class="count-unit">人</span>
              </div>
            </template>
          </el-table-column>
          
          <el-table-column prop="status" label="状态" width="80" align="center">
            <template #default="{ row }">
              <div class="status-badge" :class="'status-' + row.status">
                <span class="status-dot"></span>
                <span class="status-text">{{ getStatusLabel(row.status) }}</span>
              </div>
            </template>
          </el-table-column>
          
          <el-table-column prop="startDate" label="开班时间" width="100" align="center">
            <template #default="{ row }">
              <div class="date-info">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                  <path d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,4.11 20.1,3 19,3H18V1M17,12H12V17H17V12Z"/>
                </svg>
                <span>{{ formatDate(row.startDate) }}</span>
              </div>
            </template>
          </el-table-column>
          
          <el-table-column prop="endDate" label="结束时间" width="100" align="center">
            <template #default="{ row }">
              <div class="date-info">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                  <path d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,4.11 20.1,3 19,3H18V1M17,12H12V17H17V12Z"/>
                </svg>
                <span>{{ formatDate(row.endDate) }}</span>
              </div>
            </template>
          </el-table-column>
          
          <el-table-column prop="description" label="备注信息" width="120" show-overflow-tooltip>
            <template #default="{ row }">
              <div class="description-text">
                {{ row.description || '暂无备注' }}
              </div>
            </template>
          </el-table-column>
          
          <el-table-column label="操作" width="150" fixed="right" align="center">
            <template #default="{ row }">
              <div class="action-buttons">
                <el-button 
                  size="small" 
                  type="info" 
                  @click="handleViewDetail(row)" 
                  class="modern-action-btn view"
                  circle
                >
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                    <path d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z"/>
                  </svg>
                </el-button>
                <el-button 
                  size="small" 
                  type="warning" 
                  @click="handleEdit(row)" 
                  class="modern-action-btn edit"
                  circle
                >
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                    <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"/>
                  </svg>
                </el-button>
                <el-button 
                  size="small" 
                  type="danger" 
                  @click="handleDelete(row)" 
                  class="modern-action-btn delete"
                  circle
                >
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                    <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"/>
                  </svg>
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        </div>
      </div>
      
      <!-- 现代化分页 -->
      <div class="modern-pagination">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="filteredClasses.length"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          class="pagination-component"
        />
      </div>
    </div>
    
    <!-- 新增/编辑班级对话框 -->
    <el-dialog
      v-model="showAddDialog"
      :title="editingClass ? '编辑班级' : '新增班级'"
      width="600px"
      @close="resetForm"
    >
      <el-form
        ref="classFormRef"
        :model="classForm"
        :rules="classFormRules"
        label-width="100px"
      >
        <el-row :gutter="20">
          <el-col :span="12">
        <el-form-item label="班级名称" prop="name">
          <el-input v-model="classForm.name" placeholder="请输入班级名称" />
        </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="班主任" prop="teacher">
              <el-select
                v-model="classForm.teacher"
                placeholder="请选择班主任"
                filterable
                clearable
              >
                <el-option
                  v-for="teacher in teacherOptions"
                  :key="teacher.id"
                  :label="teacher.name"
                  :value="teacher.name"
                />
              </el-select>
        </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="课程" prop="courseId" required>
              <el-select v-model="classForm.courseId" placeholder="请选择课程">
                <el-option
                  v-for="course in courseOptions"
                  :key="course.id"
                  :label="course.name"
                  :value="course.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="班级类型" prop="type">
              <el-select v-model="classForm.type" placeholder="请选择班级类型">
                <el-option label="普通班" value="regular" />
                <el-option label="重点班" value="advanced" />
                <el-option label="补习班" value="remedial" />
          </el-select>
        </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="年级" prop="grade">
              <el-select v-model="classForm.grade" placeholder="请选择年级">
                <el-option label="一年级" value="grade1" />
                <el-option label="二年级" value="grade2" />
                <el-option label="三年级" value="grade3" />
                <el-option label="四年级" value="grade4" />
                <el-option label="五年级" value="grade5" />
                <el-option label="六年级" value="grade6" />
          </el-select>
        </el-form-item>
          </el-col>
        </el-row>
        
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="开班时间" prop="startDate">
              <el-date-picker
                v-model="classForm.startDate"
                type="date"
                placeholder="选择开班时间"
                style="width: 100%"
              />
        </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结束时间" prop="endDate">
              <el-date-picker
                v-model="classForm.endDate"
                type="date"
                placeholder="选择结束时间"
                style="width: 100%"
              />
        </el-form-item>
          </el-col>
        </el-row>
        
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="班级状态" prop="status">
              <el-select v-model="classForm.status" placeholder="请选择状态">
                <el-option label="正常" value="active" />
                <el-option label="暂停" value="paused" />
                <el-option label="已结束" value="ended" />
              </el-select>
        </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="最大人数" prop="maxStudents">
              <el-input-number
                v-model="classForm.maxStudents"
                :min="1"
                :max="100"
                style="width: 100%"
              />
        </el-form-item>
          </el-col>
        </el-row>
        
        <el-form-item label="备注" prop="description">
          <el-input
            v-model="classForm.description"
            type="textarea"
            :rows="3"
            placeholder="请输入备注信息"
          />
        </el-form-item>
      </el-form>
      
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="showAddDialog = false">取消</el-button>
          <el-button type="primary" @click="submitForm">确定</el-button>
        </div>
      </template>
    </el-dialog>
    
    <!-- 班级详情对话框 -->
    <el-dialog
      v-model="showDetailDialog"
      title="班级详情"
      width="700px"
    >
      <div v-if="selectedClass" class="class-detail">
        <el-descriptions :column="2" border>
          <el-descriptions-item label="班级名称">{{ selectedClass.name }}</el-descriptions-item>
          <el-descriptions-item label="班主任">{{ selectedClass.teacher }}</el-descriptions-item>
          <el-descriptions-item label="班级类型">
            <el-tag :type="getTypeTagType(selectedClass.type)">
              {{ getTypeLabel(selectedClass.type) }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="年级">{{ getGradeLabel(selectedClass.grade) }}</el-descriptions-item>
          <el-descriptions-item label="学生数量">{{ selectedClass.studentCount || 0 }}人</el-descriptions-item>
          <el-descriptions-item label="最大人数">{{ selectedClass.maxStudents || 0 }}人</el-descriptions-item>
          <el-descriptions-item label="班级状态">
            <el-tag :type="getStatusTagType(selectedClass.status)">
              {{ getStatusLabel(selectedClass.status) }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="开班时间">{{ formatDate(selectedClass.startDate) }}</el-descriptions-item>
          <el-descriptions-item label="结束时间">{{ formatDate(selectedClass.endDate) }}</el-descriptions-item>
          <el-descriptions-item label="备注" :span="2">{{ selectedClass.description || '无' }}</el-descriptions-item>
        </el-descriptions>
        
        <!-- 学生列表 -->
        <div class="student-list">
          <h4>班级学生</h4>
          <el-table :data="selectedClass.students || []" border>
        <el-table-column prop="name" label="姓名" width="100" />
            <el-table-column prop="phone" label="联系电话" width="120" />
            <el-table-column prop="parentPhone" label="家长电话" width="120" />
            <el-table-column prop="joinDate" label="加入时间" width="120">
              <template #default="{ row }">
                {{ formatDate(row.joinDate) }}
          </template>
        </el-table-column>
            <el-table-column prop="status" label="状态" width="80">
              <template #default="{ row }">
                <el-tag :type="row.status === 'active' ? 'success' : 'info'">
                  {{ row.status === 'active' ? '在读' : '休学' }}
                </el-tag>
          </template>
        </el-table-column>
      </el-table>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, Download, Printer, Search, School, User, Clock, CircleCheck, View, Edit, Delete } from '@element-plus/icons-vue'
import { useClassStore } from '@/stores/class'
import { useTeacherStore } from '@/stores/teacher'
import { useDataSourceStore } from '@/stores/dataSource'
import { useCourseStore } from '@/stores/course'

// 获取数据源信息
const dataSourceStore = useDataSourceStore()
const dataSource = computed(() => dataSourceStore.getDataSourceType)

// 初始化 stores
const classStore = useClassStore()
const teacherStore = useTeacherStore()
const courseStore = useCourseStore()

// 响应式数据
const showAddDialog = ref(false)
const showDetailDialog = ref(false)
const editingClass = ref(null)
const selectedClass = ref(null)
const classFormRef = ref()

// 搜索表单
const searchForm = reactive({
  keyword: '',
  status: '',
  type: '',
  grade: ''
})

// 统计计算属性 - 添加安全性检查
const classes = computed(() => {
  const classData = classStore.classes || classStore.getClasses || []
  return Array.isArray(classData) ? classData : []
})
const totalClasses = computed(() => classes.value.length)
const activeClasses = computed(() => classes.value.filter(c => c.status === 'active').length)
const pausedClasses = computed(() => classes.value.filter(c => c.status === 'paused').length)
const totalStudents = computed(() => {
  return classes.value.reduce((total, cls) => {
    return total + (cls.studentCount || 0)
  }, 0)
})

// 统计方法
const getTotalStudents = () => {
  return classes.value.reduce((total, cls) => {
    return total + (cls.studentCount || 0)
  }, 0)
}

const getUniqueTeachers = () => {
  const teacherNames = new Set()
  classes.value.forEach(cls => {
    if (cls.teacherName || cls.teacher) {
      teacherNames.add(cls.teacherName || cls.teacher)
    }
  })
  return teacherNames.size
}

// 分页
const currentPage = ref(1)
const pageSize = ref(10)

// 班级表单
const classForm = reactive({
  name: '',
  teacher: '',
  type: '',
  grade: '',
  startDate: '',
  endDate: '',
  status: 'active',
  maxStudents: 30,
  description: '',
  courseId: '' // 新增
})

// 表单验证规则
const classFormRules = {
  name: [
    { required: true, message: '请输入班级名称', trigger: 'blur' },
    { min: 2, max: 20, message: '班级名称长度在 2 到 20 个字符', trigger: 'blur' }
  ],
  teacher: [
    { required: true, message: '请选择班主任', trigger: 'change' }
  ],
  type: [
    { required: true, message: '请选择班级类型', trigger: 'change' }
  ],
  grade: [
    { required: true, message: '请选择年级', trigger: 'change' }
  ],
  startDate: [
    { required: true, message: '请选择开班时间', trigger: 'change' }
  ],
  status: [
    { required: true, message: '请选择班级状态', trigger: 'change' }
  ],
  maxStudents: [
    { required: true, message: '请输入最大人数', trigger: 'blur' },
    { type: 'number', min: 1, max: 100, message: '人数范围在 1 到 100', trigger: 'blur' }
  ],
  courseId: [
    { required: true, message: '请选择课程', trigger: 'change' }
  ]
}

// 计算属性
const filteredClasses = computed(() => {
  let filteredList = [...classes.value]
  
  if (searchForm.keyword) {
    const keyword = searchForm.keyword.toLowerCase()
    filteredList = filteredList.filter(cls => 
      cls.name.toLowerCase().includes(keyword) ||
      cls.teacher.toLowerCase().includes(keyword)
    )
  }
  
  if (searchForm.status) {
    filteredList = filteredList.filter(cls => cls.status === searchForm.status)
  }
  
  if (searchForm.type) {
    filteredList = filteredList.filter(cls => cls.type === searchForm.type)
  }
  
  if (searchForm.grade) {
    filteredList = filteredList.filter(cls => cls.grade === searchForm.grade)
  }
  
  return filteredList
})

const paginatedClasses = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredClasses.value.slice(start, end)
})

const classStats = computed(() => {
  return {
    totalClasses: totalClasses.value,
    activeClasses: activeClasses.value,
    pausedClasses: pausedClasses.value,
    totalStudents: totalStudents.value
  }
})

const teacherOptions = computed(() => {
  return teacherStore.getTeachers || []
})

const courseOptions = computed(() => courseStore.getCourses || [])

// 方法
const loadData = async () => {
  try {
    console.log('🔄 开始加载班级数据...')
    await classStore.fetchClasses()
    await teacherStore.fetchTeachers()
    console.log('✅ 班级数据加载完成，共', classStore.classes?.length || 0, '条记录')
    console.log('📊 当前classes数据:', classStore.classes)
  } catch (error) {
    console.error('❌ 数据加载失败:', error)
    ElMessage.error('数据加载失败: ' + error.message)
  }
}

const handleSearch = () => {
  currentPage.value = 1
}

const resetSearch = () => {
  Object.assign(searchForm, {
    keyword: '',
    status: '',
    type: '',
    grade: ''
  })
  currentPage.value = 1
}

const handleSizeChange = (val) => {
  pageSize.value = val
  currentPage.value = 1
}

const handleCurrentChange = (val) => {
  currentPage.value = val
}

const getTypeLabel = (type) => {
  const typeMap = {
    regular: '普通班',
    advanced: '重点班',
    remedial: '补习班'
  }
  return typeMap[type] || type
}

const getTypeTagType = (type) => {
  const typeMap = {
    regular: '',
    advanced: 'success',
    remedial: 'warning'
  }
  return typeMap[type] || ''
}

const getGradeLabel = (grade) => {
  const gradeMap = {
    grade1: '一年级',
    grade2: '二年级',
    grade3: '三年级',
    grade4: '四年级',
    grade5: '五年级',
    grade6: '六年级'
  }
  return gradeMap[grade] || grade
}

const getStatusLabel = (status) => {
  const statusMap = {
    active: '正常',
    paused: '暂停',
    ended: '已结束'
  }
  return statusMap[status] || status
}

const getStatusTagType = (status) => {
  const statusMap = {
    active: 'success',
    paused: 'warning',
    ended: 'info'
  }
  return statusMap[status] || ''
}

const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('zh-CN')
}

const resetForm = () => {
  Object.assign(classForm, {
    name: '',
    teacher: '',
    type: '',
    grade: '',
    startDate: '',
    endDate: '',
    status: 'active',
    maxStudents: 30,
    description: '',
    courseId: '' // 新增
  })
  editingClass.value = null
}

const handleAdd = () => {
  resetForm()
  showAddDialog.value = true
}

const handleEdit = (row) => {
  editingClass.value = row
  Object.assign(classForm, {
    name: row.name || '',
    teacher: row.teacherName || row.teacher || '',  // 修正字段名映射
    type: row.type || '重点班',  // 提供默认值
    grade: row.grade || '三年级',  // 提供默认值
    startDate: row.startDate || '',
    endDate: row.endDate || '',
    status: row.status === '在读' ? 'active' : (row.status === '结业' ? 'graduated' : (row.status === '停用' ? 'paused' : row.status)),  // 状态值映射
    maxStudents: row.maxStudents || 30,
    description: row.description || row.syllabus || '',  // 备注可能来自syllabus字段
    courseId: row.courseId || ''
  })
  showAddDialog.value = true
}

const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm(
      `确定要删除班级"${row.name}"吗？此操作不可恢复。`,
      '确认删除',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
    
    const result = await classStore.deleteClass(row.id)
    if (result.success || result.code === 0) {
      ElMessage.success('删除成功')
      // 统计数据会自动更新，因为使用了computed
      selectedClass.value = null
      editingClass.value = null
      showDetailDialog.value = false
    } else {
      ElMessage.error(result.message || '删除失败')
    }
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('删除失败')
    }
  }
}

const handleViewDetail = (row) => {
  selectedClass.value = row
  showDetailDialog.value = true
}

const submitForm = async () => {
  try {
    await classFormRef.value.validate()
    
    // 准备提交数据，转换状态值回数据库格式
    const formData = { ...classForm }
    
    // 状态值转换：表单值 -> 数据库值
    const statusMap = {
      'active': '在读',
      'graduated': '结业',
      'paused': '停用'
    }
    
    if (formData.status && statusMap[formData.status]) {
      formData.status = statusMap[formData.status]
    }
    
    // 确保字段完整性
    formData.teacherName = formData.teacher  // 兼容字段
    
    if (editingClass.value) {
      // 编辑模式
      const result = await classStore.updateClass(editingClass.value.id, formData)
      if (result.success) {
        ElMessage.success('更新成功')
        showAddDialog.value = false
        resetForm()  // 重置表单
        // 重新加载数据以确保列表更新
        await loadData()
      } else {
        ElMessage.error(result.message || '更新失败')
      }
    } else {
      // 新增模式
      const result = await classStore.addClass(formData)
      if (result.success) {
        ElMessage.success('添加成功')
        showAddDialog.value = false
        resetForm()  // 重置表单
        // 重新加载数据以确保列表更新
        await loadData()
      } else {
        ElMessage.error(result.message || '添加失败')
      }
    }
  } catch (error) {
    console.error('表单提交失败:', error)
    ElMessage.error('提交失败，请检查表单数据')
  }
}

const exportData = () => {
  ElMessage.info('导出功能开发中...')
}

const printData = () => {
  ElMessage.info('打印功能开发中...')
}

// 监听数据源变化
watch(() => dataSource.value, () => {
  loadData()
})

// 页面加载时初始化数据
onMounted(() => {
  loadData()
  courseStore.fetchCourses()
})
</script>

<style scoped>
/* 现代化CSS变量 */
:root {
  --primary-color: #6366f1;
  --primary-light: #a5b4fc;
  --primary-dark: #4f46e5;
  --success-color: #10b981;
  --warning-color: #f59e0b;
  --danger-color: #ef4444;
  --info-color: #3b82f6;
  --text-primary: #111827;
  --text-secondary: #6b7280;
  --text-light: #9ca3af;
  --bg-primary: #ffffff;
  --bg-secondary: #f9fafb;
  --bg-tertiary: #f3f4f6;
  --border-color: #e5e7eb;
  --border-light: #f3f4f6;
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --transition-fast: all 0.2s ease;
  --transition-medium: all 0.3s ease;
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-md: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;
}

/* 页面容器 */
.class-management-container {
  padding: 24px;
  background: var(--bg-secondary);
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

/* 页面响应式设计 */
@media (max-width: 768px) {
  .class-management-container {
    padding: 12px;
  }
  
  .page-header {
    padding: 16px;
    margin-bottom: 16px;
  }
  
  .header-content {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
  
  .header-right {
    width: 100%;
    justify-content: flex-end;
  }
  
  .header-actions {
    flex-wrap: wrap;
    gap: 8px;
  }
  
  .modern-btn {
    flex: 1;
    min-width: 120px;
  }

  /* 搜索区域响应式 */
  .search-controls {
    padding: 16px;
  }
  
  .search-form {
    padding: 16px;
  }
  
  .search-row {
    flex-direction: column;
    gap: 12px;
  }
  
  .search-group {
    width: 100%;
  }
  
  .search-buttons {
    flex-direction: column;
    gap: 8px;
  }
  
  .search-btn, .reset-btn {
    width: 100%;
  }
  
  /* 统计卡片响应式 */
  .stats-container {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    margin-bottom: 16px;
  }
}

@media (max-width: 480px) {
  .class-management-container {
    padding: 8px;
  }
  
  .page-title h1 {
    font-size: 24px !important;
  }
  
  .page-subtitle {
    font-size: 12px !important;
  }
  
  .header-actions {
    flex-direction: column;
    width: 100%;
  }
  
  .modern-btn {
    width: 100%;
    justify-content: center;
  }
  
  /* 超小屏幕统计卡片单列显示 */
  .stats-container {
    grid-template-columns: 1fr;
    gap: 8px;
  }
  
  /* 超小屏幕搜索区域优化 */
  .search-controls {
    margin-bottom: 12px;
  }
  
  .search-header {
    padding: 12px 16px;
  }
  
  .search-title h3 {
    font-size: 16px;
  }
  
  .search-title p {
    font-size: 12px;
  }
}

/* 现代化卡片基础样式 */
.modern-card {
  background: var(--bg-primary);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-light);
  overflow: hidden;
  transition: var(--transition-medium);
}

.modern-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

/* 页面头部 */
.page-header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.page-title {
  display: flex;
  align-items: center;
  gap: 12px;
}

.title-icon {
  font-size: 32px;
  animation: bounce 2s infinite;
}

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

.page-title h2 {
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-subtitle {
  margin: 0;
  color: #666;
  font-size: 14px;
}

.data-source-tags {
  display: flex;
  gap: 8px;
}

.header-right {
  display: flex;
  gap: 12px;
}

.action-btn {
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

/* 搜索卡片 */
.search-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  margin-bottom: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
}

.search-header {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 20px 24px;
}

.search-header h3 {
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 600;
}

.search-header p {
  margin: 0;
  opacity: 0.9;
  font-size: 14px;
}

.search-form {
  padding: 24px;
}

.custom-input,
.custom-select {
  border-radius: 8px;
  transition: all 0.3s ease;
}

.custom-input:focus,
.custom-select:focus {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
}

.search-buttons {
  display: flex;
  gap: 12px;
}

.search-btn,
.reset-btn {
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.search-btn:hover,
.reset-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

/* 统计卡片 */
.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 24px;
}

.stat-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  height: 120px; /* 统一统计卡片高度 */
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.stat-icon {
  font-size: 24px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}

.stat-content {
  flex: 1;
}

.stat-number {
  font-size: 32px;
  font-weight: 700;
  color: #333;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
  color: #666;
  font-weight: 500;
}

.action-buttons {
  display: flex;
  gap: 4px;
  justify-content: center;
  flex-wrap: wrap;
}

.action-btn {
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.3s ease;
  padding: 4px 8px;
  font-size: 12px;
}

.action-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.table-section {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.record-count {
  font-size: 14px;
  color: var(--el-text-color-secondary);
}

.class-name {
  display: flex;
  align-items: center;
  gap: 5px;
}

.pagination-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.dialog-footer {
  text-align: right;
}

.class-detail {
  padding: 20px 0;
}

.student-list {
  margin-top: 20px;
}

.student-list h4 {
  margin-bottom: 15px;
  color: var(--el-text-color-primary);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }
  
  .header-right {
    width: 100%;
    justify-content: flex-end;
  }
  
  .search-section .el-row {
    margin: 0;
  }
  
  .search-section .el-col {
    margin-bottom: 15px;
  }
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

.header-right {
  display: flex;
  align-items: center;
  gap: 24px;
}

.status-indicator {
  display: flex;
  align-items: center;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: var(--radius-lg);
  color: var(--primary-color);
  font-size: var(--font-size-sm);
  font-weight: 500;
}

.status-item.loading {
  background: rgba(59, 130, 246, 0.1);
  border-color: rgba(59, 130, 246, 0.2);
  color: var(--info-color);
}

.status-icon .spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.header-actions {
  display: flex;
  gap: 12px;
}

.modern-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: var(--radius-lg);
  font-weight: 600;
  font-size: var(--font-size-sm);
  transition: var(--transition-fast);
  border: none;
  cursor: pointer;
  text-decoration: none;
  box-shadow: var(--shadow-sm);
}

.modern-btn:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.modern-btn.primary {
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
  color: white;
}

.modern-btn.success {
  background: linear-gradient(135deg, var(--success-color), #059669);
  color: white;
}

.modern-btn.info {
  background: linear-gradient(135deg, var(--info-color), #2563eb);
  color: white;
}

.modern-btn.secondary {
  background: var(--bg-tertiary);
  color: var(--text-secondary);
  border: 1px solid var(--border-color);
}

/* 现代化搜索控件 */
.search-controls {
  margin-bottom: 24px;
  padding: 24px;
}

.search-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.search-title {
  display: flex;
  align-items: center;
  gap: 16px;
}

.search-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.search-text h3 {
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 4px 0;
}

.search-text p {
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  margin: 0;
}

.search-stats {
  display: flex;
  align-items: center;
}

.stat-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: var(--radius-lg);
  color: var(--success-color);
  font-weight: 600;
}

.stat-number {
  font-size: var(--font-size-lg);
  font-weight: 700;
}

.search-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.search-row {
  display: flex;
  gap: 16px;
  align-items: end;
}

.search-row.filters {
  flex-wrap: wrap;
}

.search-group {
  flex: 1;
  min-width: 200px;
}

.search-group.main-search {
  flex: 2;
}

.search-group.action-group {
  flex: 0 0 auto;
}

.search-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 8px;
}

.modern-input :deep(.el-input__wrapper) {
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  transition: var(--transition-fast);
  box-shadow: var(--shadow-sm);
}

.modern-input :deep(.el-input__wrapper):hover {
  border-color: var(--primary-color);
}

.modern-select :deep(.el-select__wrapper) {
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  transition: var(--transition-fast);
  box-shadow: var(--shadow-sm);
}

.option-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.option-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.option-dot.active {
  background: var(--success-color);
}

.option-dot.paused {
  background: var(--warning-color);
}

.option-dot.ended {
  background: var(--text-light);
}

.search-buttons {
  display: flex;
  gap: 12px;
}

/* 现代化统计仪表板 */
.stats-overview {
  margin-bottom: 20px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.stat-card {
  background: white;
  border-radius: var(--radius-xl);
  padding: 16px;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-light);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  height: 120px;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
}

.stat-card.total-classes::before {
  background: linear-gradient(90deg, #3b82f6, #1d4ed8);
}

.stat-card.active-classes::before {
  background: linear-gradient(90deg, #10b981, #059669);
}

.stat-card.student-count::before {
  background: linear-gradient(90deg, #f59e0b, #d97706);
}

.stat-card.teacher-count::before {
  background: linear-gradient(90deg, #8b5cf6, #7c3aed);
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.stat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.total-icon {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
}

.active-icon {
  background: linear-gradient(135deg, #10b981, #059669);
}

.student-icon {
  background: linear-gradient(135deg, #f59e0b, #d97706);
}

.teacher-icon {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
}

.trend-badge {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
}

.trend-badge.positive {
  background: rgba(16, 185, 129, 0.1);
  color: var(--success-color);
}

.stat-body {
  text-align: left;
}

.stat-number {
  font-size: 36px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
  line-height: 1;
}

.stat-label {
  font-size: var(--font-size-lg);
  color: var(--text-primary);
  font-weight: 600;
  margin-bottom: 4px;
}

.stat-description {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.stat-card.total {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
}

.stat-card.active {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
}

.stat-card.paused {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
}

.stat-card.students {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
}

.stat-background {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  opacity: 0.1;
  overflow: hidden;
}

.stat-pattern {
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: url("data:image/svg+xml,%3Csvg viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
}

.stat-content {
  position: relative;
  z-index: 1;
}

.stat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.stat-icon {
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-trend {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: var(--radius-md);
  font-size: var(--font-size-xs);
  font-weight: 600;
}

.stat-trend.positive {
  background: rgba(16, 185, 129, 0.2);
  color: #065f46;
}

.stat-trend.neutral {
  background: rgba(156, 163, 175, 0.2);
  color: #374151;
}

.stat-data {
  text-align: left;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1;
  margin-bottom: 8px;
}

.stat-label {
  font-size: var(--font-size-lg);
  font-weight: 600;
  margin-bottom: 4px;
}

.stat-description {
  font-size: var(--font-size-sm);
  opacity: 0.8;
}

/* 现代化数据表格 */
.data-table-section {
  padding: 0;
}

.table-header {
  padding: 24px 24px 16px 24px;
  border-bottom: 1px solid var(--border-light);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.table-title {
  display: flex;
  align-items: center;
  gap: 16px;
}

.title-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.title-content h3 {
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 4px 0;
}

.title-content p {
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  margin: 0;
}

.table-meta {
  display: flex;
  align-items: center;
  gap: 16px;
}

.record-info {
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 4px;
}

.record-count {
  display: flex;
  align-items: center;
  gap: 4px;
}

.count-number {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--primary-color);
}

.count-label {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.total-text {
  font-size: var(--font-size-xs);
  color: var(--text-light);
}

.modern-table-container {
  padding: 0 24px 24px 24px;
}

.modern-table {
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--border-light);
}

.table-scroll-wrapper {
  overflow-x: auto;
  overflow-y: hidden;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .table-scroll-wrapper {
    min-width: 800px;
  }
}

@media (max-width: 768px) {
  .modern-table-container {
    padding: 0 12px 24px 12px;
  }
  
  .table-scroll-wrapper {
    min-width: 700px;
  }
  
  .modern-table :deep(.el-table__cell) {
    padding: 6px 8px !important;
    font-size: 14px;
  }
  
  .modern-table :deep(.el-table__header-wrapper) {
    font-size: 13px;
  }
}

.index-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: var(--bg-tertiary);
  border-radius: var(--radius-md);
  font-weight: 600;
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
}

.class-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.class-avatar {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.class-details {
  flex: 1;
}

.class-name {
  font-weight: 600;
  color: var(--text-primary);
  font-size: var(--font-size-md);
  margin-bottom: 4px;
}

.class-code {
  font-size: var(--font-size-xs);
  color: var(--text-light);
}

.teacher-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.teacher-avatar {
  width: 24px;
  height: 24px;
  background: var(--bg-tertiary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
}

.teacher-name {
  font-weight: 500;
  color: var(--text-primary);
}

.type-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: var(--radius-md);
  font-size: var(--font-size-xs);
  font-weight: 600;
}

.type-badge.type-regular {
  background: rgba(59, 130, 246, 0.1);
  color: var(--info-color);
}

.type-badge.type-advanced {
  background: rgba(245, 158, 11, 0.1);
  color: var(--warning-color);
}

.type-badge.type-remedial {
  background: rgba(139, 92, 246, 0.1);
  color: #7c3aed;
}

.type-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
}

.grade-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 12px;
  background: var(--bg-tertiary);
  border-radius: var(--radius-md);
  font-weight: 600;
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
}

.student-count {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  background: rgba(16, 185, 129, 0.1);
  border-radius: var(--radius-md);
  color: var(--success-color);
  font-weight: 600;
  font-size: var(--font-size-sm);
}

.status-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: var(--radius-md);
  font-size: var(--font-size-xs);
  font-weight: 600;
}

.status-badge.status-active {
  background: rgba(16, 185, 129, 0.1);
  color: var(--success-color);
}

.status-badge.status-paused {
  background: rgba(245, 158, 11, 0.1);
  color: var(--warning-color);
}

.status-badge.status-ended {
  background: rgba(156, 163, 175, 0.1);
  color: var(--text-light);
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
}

.date-info {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
}

.description-text {
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  line-height: 1.4;
}

.action-buttons {
  display: flex;
  gap: 6px;
  justify-content: center;
}

.modern-action-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition-fast);
  border: none;
  cursor: pointer;
}

.modern-action-btn:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.modern-action-btn.view {
  background: rgba(59, 130, 246, 0.1);
  color: var(--info-color);
}

.modern-action-btn.edit {
  background: rgba(245, 158, 11, 0.1);
  color: var(--warning-color);
}

.modern-action-btn.delete {
  background: rgba(239, 68, 68, 0.1);
  color: var(--danger-color);
}

/* 现代化分页 */
.modern-pagination {
  display: flex;
  justify-content: center;
  padding: 20px 24px;
  border-top: 1px solid var(--border-light);
}

.pagination-component :deep(.el-pagination) {
  --el-pagination-font-size: var(--font-size-sm);
  --el-pagination-bg-color: var(--bg-primary);
  --el-pagination-text-color: var(--text-secondary);
  --el-pagination-border-radius: var(--radius-md);
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .header-content {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
  
  .search-row {
    flex-direction: column;
    align-items: stretch;
  }
  
  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  }
}

@media (max-width: 768px) {
  .class-management-container {
    padding: 16px;
  }
  
  .page-header {
    padding: 20px;
  }
  
  .search-controls {
    padding: 16px;
  }
  
  .modern-table-container {
    padding: 0 16px 16px 16px;
  }
  
  .table-header {
    padding: 16px;
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
  
  .action-buttons {
    flex-direction: column;
    gap: 4px;
  }
}

/* 打印样式 */
@media print {
  .page-header,
  .search-controls,
  .stats-dashboard,
  .modern-pagination {
    display: none !important;
  }
  
  .data-table-section {
    margin: 0;
    box-shadow: none !important;
    border: none !important;
  }
}
</style> 