<template>
  <div class="student-page-container">
    <!-- 现代化页面头部 -->
    <div class="page-header modern-card">
      <div class="header-content">
        <div class="header-left">
          <div class="page-title">
            <div class="title-icon">
              <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 4L13.5 7H10.5L9 4L3 7V9H21ZM21 10H3V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V10Z"/>
              </svg>
            </div>
            <div class="title-text">
              <h1>学员管理</h1>
              <p class="page-subtitle">管理学员信息，追踪学习进度</p>
            </div>
          </div>
        </div>
        <div class="header-actions">
          <div class="action-buttons">
            <div class="data-source-badge" v-if="dataSourceType">
              <div :class="['source-indicator', dataSourceType]" @click="showDataSourceInfo">
                <div class="indicator-icon">
                  <svg v-if="dataSourceType === 'mock'" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18v-2H3v2zm9-9a4 4 0 00-4 4v2h8V8a4 4 0 00-4-4z"/>
                  </svg>
                  <svg v-else viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                {{ dataSourceType === 'mock' ? '演示模式' : 'API模式' }}
              </div>
            </div>
            <el-button type="success" class="modern-btn success" @click="exportStudents">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
              </svg>
              导出Excel
            </el-button>
            <el-button type="primary" class="modern-btn primary" @click="showAddDialog">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"/>
              </svg>
              添加学员
            </el-button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 统计概览卡片 - 简化版本 -->
    <div class="stats-overview">
      <div class="stats-grid-compact">
        <div class="stat-card-compact total-students">
          <div class="stat-icon-compact total-icon">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M16 4C16 2.9 15.1 2 14 2H10C8.9 2 8 2.9 8 4H16M16 4H20C20.6 4 21 4.4 21 5S20.6 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.4 6 3 5.6 3 5S3.4 4 4 4H8"/>
            </svg>
          </div>
          <div class="stat-content-compact">
            <div class="stat-number-compact">{{ total }}</div>
            <div class="stat-label-compact">学员总数</div>
          </div>
        </div>

        <div class="stat-card-compact active-students">
          <div class="stat-icon-compact active-icon">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div class="stat-content-compact">
            <div class="stat-number-compact">{{ studentList.filter(s => s.status === 1).length }}</div>
            <div class="stat-label-compact">活跃学员</div>
          </div>
        </div>

        <div class="stat-card-compact new-students">
          <div class="stat-icon-compact new-icon">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <div class="stat-content-compact">
            <div class="stat-number-compact">{{ newStudentsCount }}</div>
            <div class="stat-label-compact">本月新增</div>
          </div>
        </div>

        <div class="stat-card-compact completion-rate">
          <div class="stat-icon-compact completion-icon">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
          </div>
          <div class="stat-content-compact">
            <div class="stat-number-compact">{{ getCompletionRate() }}%</div>
            <div class="stat-label-compact">完成率</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 搜索筛选区域 -->
    <div class="search-filter-section modern-card">
      <div class="section-header">
        <div class="section-title">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"/>
          </svg>
          <span>智能搜索与筛选</span>
        </div>
        <div class="filter-actions">
          <el-button text @click="resetSearch" class="reset-btn">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z"/>
            </svg>
            重置筛选
          </el-button>
        </div>
      </div>
      
      <el-form :inline="true" :model="searchForm" class="search-form modern-form">
        <div class="form-row">
          <el-form-item label="学员姓名">
            <div class="input-wrapper">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" class="input-icon">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
          <el-input 
            v-model="searchForm.name" 
                placeholder="请输入学员姓名" 
            clearable 
          />
            </div>
        </el-form-item>

          <el-form-item label="联系电话">
            <div class="input-wrapper">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" class="input-icon">
                <path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z"/>
              </svg>
          <el-input 
            v-model="searchForm.phone" 
                placeholder="请输入联系电话" 
            clearable 
          />
            </div>
        </el-form-item>

          <el-form-item label="学员状态">
          <el-select 
            v-model="searchForm.status" 
            placeholder="请选择状态" 
            clearable
              class="status-select"
          >
              <el-option label="全部状态" value="" />
              <el-option label="正常学习" :value="1" />
              <el-option label="暂停学习" :value="0" />
          </el-select>
        </el-form-item>

          <el-form-item>
            <div class="action-buttons">
              <el-button type="primary" @click="handleSearch" class="search-btn modern-btn primary">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"/>
                </svg>
            搜索
          </el-button>
            </div>
        </el-form-item>
        </div>
      </el-form>
    </div>
    
    <!-- 现代化数据表格 -->
    <div class="data-table-section modern-card">
      <div class="table-header">
        <div class="table-title">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M4,3H18A2,2 0 0,1 20,5V19A2,2 0 0,1 18,21H4A2,2 0 0,1 2,19V5A2,2 0 0,1 4,3M4,7V9H8V7H4M10,7V9H14V7H10M16,7V9H20V7H16M4,11V13H8V11H4M4,15V17H8V15H4M4,19V21H8V19H4M10,11V13H14V11H10M16,11V13H20V11H16M10,15V17H14V15H10M16,15V17H20V15H16M10,19V21H14V19H10M16,19V21H20V19H16Z"/>
          </svg>
          <span>学员列表 ({{ total }})</span>
        </div>
        <div class="table-actions">
          <el-tooltip content="刷新数据" placement="top">
            <el-button circle @click="loadStudents" class="refresh-btn">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z"/>
              </svg>
            </el-button>
          </el-tooltip>
        </div>
      </div>
      
      <div class="table-container">
              <el-table
          :data="studentList" 
        style="width: 100%"
          class="modern-table"
          :row-class-name="getRowClassName"
          @selection-change="handleSelectionChange"
      >
          <el-table-column type="selection" width="55" />
          
          <el-table-column prop="id" label="ID" width="80" sortable>
          <template #default="scope">
              <div class="id-cell">
                <span class="id-badge">#{{ scope.row.id }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="name" label="学员信息" min-width="200">
            <template #default="scope">
              <div class="student-info">
                <el-avatar :size="40" class="student-avatar">
                  {{ scope.row.name ? scope.row.name.charAt(0).toUpperCase() : '?' }}
              </el-avatar>
                <div class="student-details">
                  <div class="student-name">{{ scope.row.name || '未知学员' }}</div>
                  <div class="student-meta">年龄: {{ scope.row.age || '未知' }}岁</div>
                </div>
            </div>
          </template>
        </el-table-column>

          <el-table-column prop="parentPhone" label="联系方式" width="150">
          <template #default="scope">
              <div class="contact-info">
                <div class="phone-number">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                    <path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z"/>
                  </svg>
                  {{ scope.row.parentPhone || scope.row.phone || '无联系方式' }}
                </div>
              </div>
          </template>
        </el-table-column>

          <el-table-column prop="courses" label="课程信息" width="120">
          <template #default="scope">
              <div class="course-info">
                <div class="course-tags">
                  <el-tag 
                    v-for="course in (scope.row.courses || []).slice(0, 2)" 
                    :key="course" 
                    size="small" 
                    class="course-tag"
                  >
                    {{ course }}
                  </el-tag>
                  <el-tag v-if="(scope.row.courses || []).length > 2" size="small" type="info">
                    +{{ (scope.row.courses || []).length - 2 }}
                  </el-tag>
                  <span v-if="!(scope.row.courses || []).length" class="no-courses">暂无课程</span>
                </div>
              </div>
          </template>
        </el-table-column>

          <el-table-column prop="remainingHours" label="课时信息" width="100" sortable>
          <template #default="scope">
              <div class="hours-info">
                <div class="hours-stats">
                  <div class="remaining-hours">
                    <span class="hours-number">{{ scope.row.remainingHours || 0 }}</span>
                    <span class="hours-unit">剩余</span>
                  </div>
                  <div class="total-hours">
                    <span class="hours-total">共{{ scope.row.totalHours || 0 }}课时</span>
                  </div>
                </div>
                <div class="hours-progress">
                  <el-progress 
                    :percentage="getHoursProgress(scope.row)" 
                    :stroke-width="4" 
                    :show-text="false"
                    :color="getProgressColor(scope.row)"
                  />
                </div>
              </div>
          </template>
        </el-table-column>

          <el-table-column prop="totalPrice" label="费用信息" width="100" sortable>
          <template #default="scope">
              <div class="price-info">
                <div class="total-price">
                  <span class="price-label">总费用:</span>
                  <span class="price-amount">¥{{ scope.row.totalPrice || 0 }}</span>
                </div>
                <div class="paid-amount">
                  <span class="paid-label">已付:</span>
                  <span class="paid-value">¥{{ scope.row.paidAmount || 0 }}</span>
                </div>
                <div class="payment-status">
                  <el-tag 
                    :type="getPaymentStatus(scope.row).type" 
                    size="small"
                    class="payment-tag"
                  >
                    {{ getPaymentStatus(scope.row).text }}
                  </el-tag>
                </div>
              </div>
          </template>
        </el-table-column>

          <el-table-column prop="status" label="状态" width="80" sortable>
          <template #default="scope">
              <el-tag 
                :type="scope.row.status === 1 ? 'success' : 'warning'"
                class="status-tag"
              >
                <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                  <path v-if="scope.row.status === 1" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  <path v-else d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,6A1.5,1.5 0 0,1 13.5,7.5A1.5,1.5 0 0,1 12,9A1.5,1.5 0 0,1 10.5,7.5A1.5,1.5 0 0,1 12,6M12,17A1,1 0 0,1 11,16V12A1,1 0 0,1 12,11A1,1 0 0,1 13,12V16A1,1 0 0,1 12,17Z"/>
                </svg>
                {{ scope.row.status === 1 ? '正常学习' : '暂停学习' }}
            </el-tag>
          </template>
        </el-table-column>

          <el-table-column prop="enrollDate" label="入学时间" width="100" sortable>
          <template #default="scope">
              <div class="date-info">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                  <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.1 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
                </svg>
                {{ formatDate(scope.row.enrollDate) }}
              </div>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="150" fixed="right">
            <template #default="scope">
              <div class="action-buttons-cell">
                <el-tooltip content="查看详情" placement="top">
                  <el-button 
                    size="small" 
                    circle 
                    @click="viewStudent(scope.row)"
                    class="action-btn view-btn"
                  >
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                      <path d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z"/>
                    </svg>
              </el-button>
                </el-tooltip>
                
                <el-tooltip content="编辑信息" placement="top">
            <el-button
              size="small"
                    type="primary" 
                    circle 
                    @click="editStudent(scope.row)"
                    class="action-btn edit-btn"
            >
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                      <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"/>
                    </svg>
            </el-button>
                </el-tooltip>
                
                <el-tooltip content="付款记录" placement="top">
                  <el-button 
                    size="small" 
                    type="warning"
                    circle 
                    @click="viewPaymentRecords(scope.row)"
                    class="action-btn payment-btn"
                  >
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                      <path d="M5,6H23V18H5V6M14,9A3,3 0 0,1 17,12A3,3 0 0,1 14,15A3,3 0 0,1 11,12A3,3 0 0,1 14,9M9,8A2,2 0 0,1 7,10V14A2,2 0 0,1 9,16H19A2,2 0 0,1 21,14V10A2,2 0 0,1 19,8H9Z"/>
                    </svg>
                  </el-button>
                </el-tooltip>
                
                <el-tooltip content="添加付款" placement="top">
                  <el-button 
                    size="small" 
                    type="success"
                    circle 
                    @click="addPayment(scope.row)"
                    class="action-btn add-payment-btn"
                    v-if="getPaymentStatus(scope.row).type !== 'success'"
                  >
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                      <path d="M11,13H5V11H11V5H13V11H19V13H13V19H11V13Z"/>
                    </svg>
                  </el-button>
                </el-tooltip>
                
                <el-tooltip content="删除学员" placement="top">
            <el-button
              size="small"
                    type="danger" 
                    circle 
                    @click="deleteStudent(scope.row)"
                    class="action-btn delete-btn"
            >
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                      <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"/>
                    </svg>
            </el-button>
                </el-tooltip>
            </div>
          </template>
        </el-table-column>
      </el-table>
      </div>
      
      <!-- 现代化分页器 -->
      <div class="pagination-wrapper">
        <div class="pagination-info">
          <span>共 {{ total }} 条记录，显示第 {{ (currentPage - 1) * pageSize + 1 }}-{{ Math.min(currentPage * pageSize, total) }} 条</span>
        </div>
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="total"
          layout="sizes, prev, pager, next, jumper"
          class="modern-pagination"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    
    <!-- 添加/编辑学员对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="isEditing ? '编辑学员信息' : '添加新学员'"
      width="600px"
      class="modern-dialog"
      :before-close="handleDialogClose"
    >
      <el-form
        :model="studentForm"
        :rules="studentRules"
        ref="studentFormRef"
        label-width="100px"
        class="student-form modern-form"
      >
        <div class="form-grid">
          <el-form-item label="学员姓名" prop="name" required>
            <el-input v-model="studentForm.name" placeholder="请输入学员姓名" />
        </el-form-item>

          <el-form-item label="年龄" prop="age" required>
            <el-input-number 
              v-model="studentForm.age" 
              :min="4" 
              :max="18" 
              placeholder="请输入年龄"
              style="width: 100%;"
          />
        </el-form-item>

        <el-form-item label="家长姓名" prop="parentName">
          <el-input v-model="studentForm.parentName" placeholder="请输入家长姓名" />
        </el-form-item>

          <el-form-item label="联系电话" prop="parentPhone" required>
            <el-input v-model="studentForm.parentPhone" placeholder="请输入联系电话" />
        </el-form-item>

          <el-form-item label="选择课程" prop="courses" class="full-width">
            <el-select 
              v-model="studentForm.courses" 
              multiple 
              placeholder="请选择课程"
              style="width: 100%;"
              @change="handleCourseChange"
            >
              <el-option 
                v-for="course in availableCourses" 
                :key="course.id" 
                :label="`${course.name} (¥${course.price}/课时)`" 
                :value="course.name"
              />
            </el-select>
            <div class="form-hint">选择的课程将决定课时单价</div>
        </el-form-item>

          <el-form-item label="课时数" prop="totalHours">
            <el-input-number 
              v-model="studentForm.totalHours" 
              :min="10" 
              :max="500" 
              placeholder="请输入课时数"
              style="width: 100%;" 
              @change="calculateTotalPrice"
            />
        </el-form-item>

          <el-form-item label="总价格" prop="totalPrice">
            <el-input-number 
              v-model="studentForm.totalPrice" 
              :min="0" 
              :precision="2"
              placeholder="系统自动计算或手动输入"
              style="width: 100%;"
            />
            <div class="form-hint">根据选择的课程和课时数自动计算</div>
        </el-form-item>

          <el-form-item label="已付金额" prop="paidAmount">
            <el-input-number 
              v-model="studentForm.paidAmount" 
              :min="0" 
              :max="studentForm.totalPrice || 999999"
              :precision="2"
              placeholder="请输入已付金额"
              style="width: 100%;"
            />
            <div class="payment-info">
              <span v-if="studentForm.totalPrice && studentForm.paidAmount" class="payment-status">
                剩余金额: <strong style="color: #e6a23c;">¥{{ (studentForm.totalPrice - studentForm.paidAmount).toFixed(2) }}</strong>
              </span>
            </div>
        </el-form-item>

          <el-form-item label="付款方式" prop="paymentMethod">
            <el-select v-model="studentForm.paymentMethod" placeholder="请选择付款方式" style="width: 100%;">
              <el-option label="现金支付" value="cash" />
              <el-option label="微信支付" value="wechat" />
              <el-option label="支付宝" value="alipay" />
              <el-option label="银行转账" value="bank" />
              <el-option label="分期付款" value="installment" />
            </el-select>
        </el-form-item>

          <el-form-item label="学员状态" prop="status" class="full-width">
            <el-radio-group v-model="studentForm.status">
              <el-radio :value="1">正常学习</el-radio>
              <el-radio :value="0">暂停学习</el-radio>
            </el-radio-group>
        </el-form-item>

          <el-form-item label="备注信息" prop="remarks" class="full-width">
          <el-input
              v-model="studentForm.remarks" 
            type="textarea"
            :rows="3"
              placeholder="请输入备注信息"
          />
        </el-form-item>
        </div>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false" class="modern-btn ghost">取消</el-button>
          <el-button type="primary" @click="submitForm" :loading="submitLoading" class="modern-btn primary">
            {{ isEditing ? '更新' : '添加' }}
          </el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 添加付款对话框 -->
    <el-dialog
      v-model="paymentDialogVisible"
      title="添加付款记录"
      width="500px"
      class="modern-dialog"
    >
      <el-form
        :model="paymentForm"
        :rules="paymentRules"
        ref="paymentFormRef"
        label-width="100px"
        class="payment-form modern-form"
      >
        <el-form-item label="学员姓名">
          <el-input :value="selectedStudent?.name" disabled />
        </el-form-item>

        <el-form-item label="剩余金额">
          <el-input 
            :value="`¥${getRemainingAmount(selectedStudent)}`" 
            disabled 
          />
        </el-form-item>

        <el-form-item label="付款金额" prop="amount" required>
          <el-input-number 
            v-model="paymentForm.amount" 
            :min="0.01" 
            :max="getRemainingAmount(selectedStudent)"
            :precision="2"
            placeholder="请输入付款金额"
            style="width: 100%;"
          />
        </el-form-item>

        <el-form-item label="付款方式" prop="method" required>
          <el-select v-model="paymentForm.method" placeholder="请选择付款方式" style="width: 100%;">
            <el-option label="现金支付" value="cash" />
            <el-option label="微信支付" value="wechat" />
            <el-option label="支付宝" value="alipay" />
            <el-option label="银行转账" value="bank" />
          </el-select>
        </el-form-item>

        <el-form-item label="备注说明" prop="note">
          <el-input
            v-model="paymentForm.note" 
            type="textarea"
            :rows="3"
            placeholder="请输入付款备注"
          />
        </el-form-item>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="paymentDialogVisible = false" class="modern-btn ghost">取消</el-button>
          <el-button type="primary" @click="submitPayment" :loading="paymentSubmitLoading" class="modern-btn primary">
            确认付款
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Plus, Download, Search, Refresh, Edit, Check, Close, Delete } from '@element-plus/icons-vue';
import api from '../utils/api';
import { useStudentStore } from '../stores/student'
import { useDataSourceStore } from '@/stores/dataSource'

const studentStore = useStudentStore()
const dataSourceStore = useDataSourceStore()

// 数据源相关
const dataSourceType = computed(() => dataSourceStore.getDataSourceType)

// 数据源信息显示
const showDataSourceInfo = () => {
  ElMessage.info({
    message: dataSourceType.value === 'mock' ? '当前使用演示数据，所有操作为模拟效果' : '当前连接实际API服务',
    duration: 3000
  })
}

// 数据加载状态
const loading = computed(() => studentStore.getLoading);
const submitLoading = ref(false);

// 新增学生数量（模拟数据）
const newStudentsCount = computed(() => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  return studentList.value.filter(student => {
    const joinDate = new Date(student.joinDate);
    return joinDate.getMonth() === currentMonth && joinDate.getFullYear() === currentYear;
  }).length;
});

// 获取课程完成率函数
const getCompletionRate = () => {
  if (studentList.value.length === 0) {
    return 85.5; // 默认完成率
  }
  
  // 模拟计算课程完成率
  const totalStudents = studentList.value.length;
  const completedCount = studentList.value.filter(student => {
    // 模拟：状态为1（正常）的学员默认有80-95%的完成率
    if (student.status === 1) {
      return Math.random() > 0.2; // 80%的学员完成了课程
    }
    return false;
  }).length;
  
  const completionRate = totalStudents > 0 ? (completedCount / totalStudents) * 100 : 85.5;
  
  // 返回保留一位小数的完成率
  return Math.round(completionRate * 10) / 10;
};

// 获取总收入
const getTotalRevenue = () => {
  if (studentList.value.length === 0) {
    return '0.00';
  }
  
  const totalRevenue = studentList.value.reduce((sum, student) => {
    return sum + (student.paidAmount || 0);
  }, 0);
  
  return totalRevenue.toFixed(2);
};

// 获取待收款金额
const getPendingAmount = () => {
  if (studentList.value.length === 0) {
    return '0.00';
  }
  
  const pendingAmount = studentList.value.reduce((sum, student) => {
    const remaining = (student.totalPrice || 0) - (student.paidAmount || 0);
    return sum + Math.max(0, remaining);
  }, 0);
  
  return pendingAmount.toFixed(2);
};

// 格式化日期函数
const formatDate = (date) => {
  if (!date) return '-';
  
  try {
    const d = new Date(date);
    if (isNaN(d.getTime())) return '-';
    
    return d.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  } catch (error) {
    return '-';
  }
};

// 查看学员详情
const viewStudent = (row) => {
  ElMessage.info(`查看学员详情：${row.name}`);
  // 这里可以跳转到详情页面或显示详情对话框
  console.log('查看学员详情:', row);
};

// 编辑学员（模板中调用的函数名）
const editStudent = (row) => {
  handleEdit(row);
};

// 删除学员（模板中调用的函数名）
const deleteStudent = (row) => {
  handleDelete(row.id);
};

// 表格数据 - 直接使用store中的数据，添加防御性处理
const studentList = computed(() => {
  const students = studentStore.getStudents || [];
  // 确保每个学员对象都有必要的字段
  return students.map(student => ({
    ...student,
    name: student.name || '未知学员',
    age: student.age || 0,
    parentPhone: student.parentPhone || student.phone || '',
    courses: student.courses || [],
    enrollDate: student.enrollDate || student.joinDate || new Date().toISOString().split('T')[0],
    status: student.status !== undefined ? student.status : 1,
    totalHours: student.totalHours || 0,
    remainingHours: student.remainingHours || student.totalHours || 0,
    totalPrice: student.totalPrice || 0,
    paidAmount: student.paidAmount || 0
  }));
});
const total = computed(() => studentStore.getPagination.total);
const currentPage = ref(1);
const pageSize = ref(10);

// 搜索表单
const searchForm = reactive({
  name: '',
  phone: '',
  grade: '',
  status: ''
});

// 可选课程列表
const availableCourses = ref([
  { id: 1, name: 'Python基础编程', price: 150, category: 'python' },
  { id: 2, name: 'Java面向对象', price: 160, category: 'java' },
  { id: 3, name: '人工智能入门', price: 180, category: 'ai' },
  { id: 4, name: 'Web前端开发', price: 140, category: 'web' },
  { id: 5, name: 'C++算法设计', price: 170, category: 'cpp' },
  { id: 6, name: '数据结构与算法', price: 165, category: 'algorithm' }
]);

// 学生表单
const studentFormRef = ref(null);
const studentForm = reactive({
  id: null,
  name: '',
  age: null,
  gender: 1,
  birthday: null,
  school: '',
  grade: '',
  parentName: '',
  parentPhone: '',
  parentWechat: '',
  address: '',
  courses: [],
  totalHours: 0,
  remainingHours: 0,
  totalPrice: 0,
  paidAmount: 0,
  remarks: '',
  status: 1,
  enrollDate: new Date().toISOString().split('T')[0]
});

// 表单验证规则
const studentRules = {
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
  ],
  age: [
    { required: true, message: '请输入年龄', trigger: 'blur' },
    { type: 'number', min: 4, max: 18, message: '年龄应在4-18岁之间', trigger: 'blur' }
  ],
  parentName: [
    { required: true, message: '请输入家长姓名', trigger: 'blur' }
  ],
  parentPhone: [
    { required: true, message: '请输入家长电话', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
  ],
  courses: [
    { required: true, message: '请至少选择一门课程', trigger: 'change' }
  ],
  totalHours: [
    { required: true, message: '请输入课时数', trigger: 'blur' },
    { type: 'number', min: 10, message: '课时数不能少于10小时', trigger: 'blur' }
  ],
  totalPrice: [
    { required: true, message: '请输入总价格', trigger: 'blur' },
    { type: 'number', min: 0, message: '价格不能为负数', trigger: 'blur' }
  ]
};

// 对话框控制
const dialogVisible = ref(false);
const dialogType = ref('add'); // 'add' 或 'edit'

// 计算属性：是否为编辑模式
const isEditing = computed(() => dialogType.value === 'edit');

// 付款对话框控制
const paymentDialogVisible = ref(false);
const selectedStudent = ref(null);
const paymentSubmitLoading = ref(false);

// 付款表单
const paymentFormRef = ref(null);
const paymentForm = reactive({
  amount: 0,
  method: '',
  note: ''
});

// 付款表单验证规则
const paymentRules = {
  amount: [
    { required: true, message: '请输入付款金额', trigger: 'blur' },
    { type: 'number', min: 0.01, message: '付款金额必须大于0', trigger: 'blur' }
  ],
  method: [
    { required: true, message: '请选择付款方式', trigger: 'change' }
  ]
};

// 年级选项
const gradeOptions = [
  { value: '幼儿园小班', label: '幼儿园小班' },
  { value: '幼儿园中班', label: '幼儿园中班' },
  { value: '幼儿园大班', label: '幼儿园大班' },
  { value: '小学一年级', label: '小学一年级' },
  { value: '小学二年级', label: '小学二年级' },
  { value: '小学三年级', label: '小学三年级' },
  { value: '小学四年级', label: '小学四年级' },
  { value: '小学五年级', label: '小学五年级' },
  { value: '小学六年级', label: '小学六年级' },
  { value: '初中一年级', label: '初中一年级' },
  { value: '初中二年级', label: '初中二年级' },
  { value: '初中三年级', label: '初中三年级' },
  { value: '高中一年级', label: '高中一年级' },
  { value: '高中二年级', label: '高中二年级' },
  { value: '高中三年级', label: '高中三年级' }
];

// 获取学生列表 - 使用store方法
const fetchStudents = async () => {
  try {
    const params = {
      page: currentPage.value,
      size: pageSize.value,
      name: searchForm.name || undefined,
      phone: searchForm.phone || undefined,
      grade: searchForm.grade || undefined,
      status: searchForm.status !== '' ? searchForm.status : undefined
    };
    
    await studentStore.fetchStudents(params);
    // 数据会通过计算属性自动更新
  } catch (error) {
    console.warn('获取学生列表失败:', error.message || error);
    ElMessage.error('获取学生列表失败: ' + (error.message || '请稍后重试'));
  }
};

// 搜索
const handleSearch = () => {
  currentPage.value = 1;
  fetchStudents();
};

// 重置搜索
const resetSearch = () => {
  Object.keys(searchForm).forEach(key => {
    searchForm[key] = '';
  });
  currentPage.value = 1;
  fetchStudents();
};

// 重置筛选器（和重置搜索功能相同）
const resetFilters = () => {
  resetSearch();
};

// 年级变化处理
const handleGradeChange = (value) => {
  console.log('年级变化:', value);
  currentPage.value = 1;
  fetchStudents();
};

// 状态变化处理
const handleSearchStatusChange = (value) => {
  console.log('状态变化:', value);
  currentPage.value = 1;
  fetchStudents();
};

// 分页大小变化
const handleSizeChange = (size) => {
  pageSize.value = size;
  currentPage.value = 1;
  fetchStudents();
};

// 页码变化
const handleCurrentChange = (page) => {
  currentPage.value = page;
  fetchStudents();
};

// 显示添加对话框
const showAddDialog = () => {
  dialogType.value = 'add';
  resetForm();
  dialogVisible.value = true;
  console.log('打开添加学员对话框, dialogType:', dialogType.value); // 调试日志
};

// 显示编辑对话框
const handleEdit = (row) => {
  dialogType.value = 'edit';
  Object.keys(studentForm).forEach(key => {
    studentForm[key] = row[key];
  });
  dialogVisible.value = true;
};

// 处理课程选择变化
const handleCourseChange = (selectedCourses) => {
  // 计算基础价格
  calculateTotalPrice();
  // 设置剩余课时等于总课时
  studentForm.remainingHours = studentForm.totalHours;
};

// 计算总价格
const calculateTotalPrice = () => {
  if (studentForm.courses.length === 0 || !studentForm.totalHours) {
    studentForm.totalPrice = 0;
    return;
  }
  
  // 计算平均课时单价
  const selectedCourseNames = studentForm.courses;
  const selectedCourseObjects = availableCourses.value.filter(course => 
    selectedCourseNames.includes(course.name)
  );
  
  if (selectedCourseObjects.length === 0) {
    studentForm.totalPrice = 0;
    return;
  }
  
  // 计算平均价格
  const averagePrice = selectedCourseObjects.reduce((sum, course) => sum + course.price, 0) / selectedCourseObjects.length;
  
  // 总价格 = 平均单价 × 课时数
  studentForm.totalPrice = Math.round(averagePrice * studentForm.totalHours * 100) / 100;
};

// 重置表单
const resetForm = () => {
  if (studentFormRef.value) {
    studentFormRef.value.resetFields();
  }
  Object.assign(studentForm, {
    id: null,
    name: '',
    age: null,
    gender: 1,
    birthday: null,
    school: '',
    grade: '',
    parentName: '',
    parentPhone: '',
    parentWechat: '',
    address: '',
    courses: [],
    totalHours: 0,
    remainingHours: 0,
    totalPrice: 0,
    paidAmount: 0,
    paymentMethod: '',
    paymentRecords: [],
    remarks: '',
    status: 1,
    enrollDate: new Date().toISOString().split('T')[0]
  });
};

// 提交表单
const submitForm = async () => {
  if (!studentFormRef.value) {
    ElMessage.warning('表单引用不存在');
    return;
  }
  
  try {
    submitLoading.value = true;
    
    const isValid = await new Promise((resolve) => {
      studentFormRef.value.validate((valid) => {
        resolve(valid);
      });
    });
    
    if (!isValid) {
      ElMessage.warning('请检查表单填写是否正确');
      return;
    }
    
    if (dialogType.value === 'add') {
      // 为新学员创建付款记录
      const finalStudentData = { 
        ...studentForm,
        // 确保字段映射和类型正确
        phone: studentForm.parentPhone, // store需要phone字段
        gender: studentForm.gender || 1, // 确保性别字段存在
        age: Number(studentForm.age), // 确保年龄是数字类型
        totalHours: Number(studentForm.totalHours) || 0, // 确保总课时是数字
        remainingHours: Number(studentForm.totalHours) || 0, // 确保剩余课时是数字
        totalPrice: Number(studentForm.totalPrice) || 0, // 确保总价格是数字
        paidAmount: Number(studentForm.paidAmount) || 0, // 确保已付金额是数字
        joinDate: studentForm.enrollDate, // 映射注册日期字段
      };
      
      if (finalStudentData.paidAmount > 0) {
        finalStudentData.paymentRecords = [{
          id: `payment_${Date.now()}`,
          amount: finalStudentData.paidAmount,
          method: finalStudentData.paymentMethod || 'cash',
          date: new Date().toISOString(),
          type: 'initial', // 初始付款
          note: '初始报名付款',
          createdAt: new Date().toISOString()
        }];
      }
      
      // 设置剩余课时等于总课时
      finalStudentData.remainingHours = finalStudentData.totalHours;
      
      console.log('提交的学员数据:', finalStudentData); // 调试日志
      console.log('dialogType:', dialogType.value); // 调试日志
      
      // 创建学生
      await studentStore.addStudent(finalStudentData);
      
      // 延迟保存费用记录，确保学员数据已经保存到store
      setTimeout(() => {
        // 获取刚刚添加的学员数据（带有正确的ID）
        const addedStudent = studentStore.getStudents.find(s => s.name === finalStudentData.name && s.phone === finalStudentData.phone);
        const recordData = addedStudent || finalStudentData;
        
        console.log('保存费用记录的学员数据:', recordData); // 调试日志
        saveFeeRecord(recordData, 'create');
      }, 100);
      
      ElMessage.success('添加成功');
      // 重新获取数据以确保列表更新
      await fetchStudents();
    } else {
      // 更新学生
      await studentStore.updateStudent(studentForm.id, studentForm);
      ElMessage.success('更新成功');
      // 重新获取数据以确保列表更新
      await fetchStudents();
    }
    
    dialogVisible.value = false;
  } catch (error) {
    console.error('操作失败详情:', error);
    const errorMsg = error.message || error.toString() || '请稍后重试';
    ElMessage.error('操作失败: ' + errorMsg);
  } finally {
    submitLoading.value = false;
  }
};

// 更改学生状态
const handleStatusChange = async (id, status) => {
  try {
    await studentStore.updateStudent(id, { status });
    ElMessage.success(`${status === 1 ? '启用' : '禁用'}成功`);
    await fetchStudents();
  } catch (error) {
    console.warn('更改状态失败:', error.message || error);
    ElMessage.error('更改状态失败: ' + (error.message || '请稍后重试'));
  }
};

// 删除学生
const handleDelete = async (id) => {
  try {
    await ElMessageBox.confirm('确定要删除该学生吗？此操作不可恢复', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    
    try {
      await studentStore.deleteStudent(id);
      ElMessage.success('删除成功');
      await fetchStudents();
    } catch (error) {
      console.warn('删除失败:', error.message || error);
      ElMessage.error('删除失败: ' + (error.message || '未知错误'));
    }
  } catch (error) {
    // 用户取消操作或其他错误，静默处理
    if (error !== 'cancel' && error !== 'close') {
      console.warn('删除确认框错误:', error);
    }
  }
};

// 计算课时进度百分比
const getHoursProgress = (student) => {
  if (!student.totalHours || student.totalHours === 0) {
    return 0;
  }
  const usedHours = student.totalHours - (student.remainingHours || 0);
  return Math.round((usedHours / student.totalHours) * 100);
};

// 获取进度条颜色
const getProgressColor = (student) => {
  const progress = getHoursProgress(student);
  if (progress >= 80) return '#f56c6c'; // 红色，课时即将用完
  if (progress >= 50) return '#e6a23c'; // 橙色，课时使用过半
  return '#67c23a'; // 绿色，课时充足
};

// 获取付款状态
const getPaymentStatus = (student) => {
  const totalPrice = student.totalPrice || 0;
  const paidAmount = student.paidAmount || 0;
  
  if (paidAmount >= totalPrice) {
    return { type: 'success', text: '已付清' };
  } else if (paidAmount > 0) {
    return { type: 'warning', text: '部分付款' };
  } else {
    return { type: 'danger', text: '未付款' };
  }
};

// 保存费用记录
const saveFeeRecord = (studentData, actionType) => {
  try {
    const feeRecords = JSON.parse(localStorage.getItem('feeRecords') || '[]');
    
    // 确保有学员ID，如果没有则生成一个
    const studentId = studentData.id || `student_${Date.now()}`;
    
    const record = {
      id: `fee_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      studentId: studentId,
      studentName: studentData.name || '未知学员',
      actionType: actionType, // create, payment, refund
      totalPrice: Number(studentData.totalPrice) || 0,
      paidAmount: Number(studentData.paidAmount) || 0,
      remainingAmount: (Number(studentData.totalPrice) || 0) - (Number(studentData.paidAmount) || 0),
      courses: studentData.courses || [],
      totalHours: Number(studentData.totalHours) || 0,
      paymentMethod: studentData.paymentMethod || '未知',
      createdAt: new Date().toISOString(),
      createdDate: new Date().toISOString().split('T')[0] // 添加简化的日期格式
    };
    
    console.log('保存费用记录:', record); // 调试日志
    
    feeRecords.push(record);
    localStorage.setItem('feeRecords', JSON.stringify(feeRecords));
    
    console.log('费用记录已保存，当前总记录数:', feeRecords.length); // 调试日志
    
    // 触发一个自定义事件，通知其他组件数据已更新
    window.dispatchEvent(new CustomEvent('studentFeeRecordUpdated', {
      detail: { record, action: actionType }
    }));
    
  } catch (error) {
    console.error('保存费用记录失败:', error);
  }
};

// 查看学员付款记录
const viewPaymentRecords = (student) => {
  ElMessage.info(`查看 ${student.name} 的付款记录功能开发中`);
  // TODO: 实现付款记录查看功能
};

// 获取剩余金额
const getRemainingAmount = (student) => {
  if (!student) return 0;
  const remaining = (student.totalPrice || 0) - (student.paidAmount || 0);
  return Math.max(0, remaining);
};

// 添加付款记录
const addPayment = (student) => {
  selectedStudent.value = student;
  paymentForm.amount = 0;
  paymentForm.method = '';
  paymentForm.note = '';
  paymentDialogVisible.value = true;
};

// 提交付款
const submitPayment = async () => {
  if (!paymentFormRef.value) {
    ElMessage.warning('表单引用不存在');
    return;
  }

  try {
    paymentSubmitLoading.value = true;
    
    const isValid = await new Promise((resolve) => {
      paymentFormRef.value.validate((valid) => {
        resolve(valid);
      });
    });
    
    if (!isValid) {
      ElMessage.warning('请检查表单填写是否正确');
      return;
    }

    const student = selectedStudent.value;
    const newPaidAmount = (student.paidAmount || 0) + paymentForm.amount;
    
    // 创建付款记录
    const paymentRecord = {
      id: `payment_${Date.now()}`,
      amount: paymentForm.amount,
      method: paymentForm.method,
      date: new Date().toISOString(),
      type: 'additional', // 追加付款
      note: paymentForm.note || '追加付款',
      createdAt: new Date().toISOString()
    };

    // 更新学员数据
    const updatedData = {
      ...student,
      paidAmount: newPaidAmount,
      paymentRecords: [...(student.paymentRecords || []), paymentRecord]
    };

    // 保存到store
    await studentStore.updateStudent(student.id, updatedData);
    
    // 保存费用记录
    saveFeeRecord(updatedData, 'payment');
    
    ElMessage.success(`付款成功！已收款 ¥${paymentForm.amount}，剩余金额 ¥${(student.totalPrice - newPaidAmount).toFixed(2)}`);
    
    // 重新获取数据
    await fetchStudents();
    
    paymentDialogVisible.value = false;
  } catch (error) {
    console.warn('添加付款失败:', error.message || error);
    ElMessage.error('添加付款失败: ' + (error.message || '请稍后重试'));
  } finally {
    paymentSubmitLoading.value = false;
  }
};

// 导出学生列表
const exportStudents = () => {
  ElMessage.info('导出功能暂未实现');
};

onMounted(() => {
  fetchStudents();
});
</script>

<style scoped>
/* 数据源指示器样式 */
.data-source-badge {
  margin-right: 12px;
}

.source-indicator {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.source-indicator.mock {
  background: linear-gradient(135deg, #ffeaa7, #fdcb6e);
  color: #2d3436;
}

.source-indicator.api {
  background: linear-gradient(135deg, #74b9ff, #0984e3);
  color: white;
}

.source-indicator:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.indicator-icon {
  display: flex;
  align-items: center;
}

/* 优化搜索筛选区域 */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e5e7eb;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
}

.filter-actions .reset-btn {
  color: #6b7280;
  border: none;
  background: transparent;
}

.filter-actions .reset-btn:hover {
  color: #3b82f6;
  background: rgba(59, 130, 246, 0.1);
}

/* 学员管理页面样式 - 优化90%缩放显示 */
.student-page-container {
  padding: 12px;
  background: var(--bg-secondary);
  min-height: 100vh;
  overflow-x: hidden;
}

/* 页面布局优化 - 紧凑型统计区域 */
.stats-overview {
  margin-bottom: 16px;
}

.stats-grid-compact {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.stat-card-compact {
  background: white;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  gap: 10px;
  height: 60px;
  transition: none !important;
}

.stat-icon-compact {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.stat-icon-compact.total-icon {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.stat-icon-compact.active-icon {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

.stat-icon-compact.new-icon {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
}

.stat-icon-compact.completion-icon {
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
}

.stat-content-compact {
  flex: 1;
  min-width: 0;
}

.stat-number-compact {
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
  line-height: 1;
  margin-bottom: 2px;
}

.stat-label-compact {
  font-size: 12px;
  color: #6b7280;
  line-height: 1;
}

@media (max-width: 1200px) {
  .stats-grid-compact {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .stats-grid-compact {
    grid-template-columns: 1fr;
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
}

.page-title {
  display: flex;
  align-items: center;
  gap: 20px;
}

.title-icon {
  width: 56px;
  height: 56px;
  background: var(--primary-gradient);
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

.action-buttons {
  display: flex;
  gap: 12px;
}

/* 统计概览样式 */
.stats-overview {
  margin-bottom: 24px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 18px;
}

@media (min-width: 1400px) {
  .stats-grid {
    grid-template-columns: repeat(5, 1fr);
  }
}

@media (max-width: 1200px) {
  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
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
  height: 120px; /* 统一统计卡片高度 */
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
}

.stat-card.total-students::before {
  background: linear-gradient(90deg, #3b82f6, #1d4ed8);
}

.stat-card.active-students::before {
  background: linear-gradient(90deg, #10b981, #059669);
}

.stat-card.new-students::before {
  background: linear-gradient(90deg, #f59e0b, #d97706);
}

.stat-card.completion-rate::before {
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

.new-icon {
  background: linear-gradient(135deg, #f59e0b, #d97706);
}

.completion-icon {
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

.stat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
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

.new-icon {
  background: linear-gradient(135deg, #f59e0b, #d97706);
}

.completion-icon {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
}

.revenue-icon {
  background: linear-gradient(135deg, #f093fb, #f5576c);
}

.pending-icon {
  background: linear-gradient(135deg, #ffecd2, #fcb69f);
  color: #8b5a3c;
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

/* 搜索筛选区域 */
.search-filter-section {
  margin-bottom: 20px;
  padding: 20px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-primary);
}

.filter-actions .reset-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
}

.search-form .form-row {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.search-form :deep(.el-form-item) {
  margin-bottom: 0;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 12px;
  z-index: 2;
  color: var(--text-light);
}

.input-wrapper :deep(.el-input__wrapper) {
  padding-left: 40px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  transition: var(--transition-fast);
}

.input-wrapper :deep(.el-input__wrapper):hover {
  border-color: var(--primary-color);
}

.input-wrapper :deep(.el-input__wrapper.is-focus) {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.status-select {
  min-width: 160px;
}

/* 数据表格区域 - 紧凑型 */
.data-table-section {
  background: white;
  padding: 12px;
  margin-bottom: 0;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border-light);
}

.table-title {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-primary);
}

.refresh-btn {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-lg);
  background: var(--bg-secondary);
  border: 1px solid var(--border-light);
  color: var(--text-secondary);
  transition: var(--transition-fast);
}

.refresh-btn:hover {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.table-container {
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--border-light);
}

.modern-table {
  width: 100%;
}

.modern-table :deep(.el-table__header) {
  background: var(--bg-tertiary);
}

.modern-table :deep(.el-table__header th) {
  background: var(--bg-tertiary);
  color: var(--text-primary);
  font-weight: 600;
  border: none;
  padding: 16px 12px;
}

.modern-table :deep(.el-table__body tr) {
  transition: var(--transition-fast);
}

.modern-table :deep(.el-table__body tr:hover) {
  background: var(--bg-secondary) !important;
  filter: none !important;
  backdrop-filter: none !important;
  transform: none !important;
}

/* 优化表格行高度和紧凑性 - 更紧凑 */
.modern-table :deep(.el-table__row) {
  height: 50px !important;
}

.modern-table :deep(.el-table__cell) {
  padding: 6px 8px !important;
}

/* 紧凑型学员信息显示 */
.student-info .student-avatar {
  width: 36px !important;
  height: 36px !important;
  font-size: 14px;
}

.student-details .student-name {
  font-size: 14px;
  line-height: 1.2;
  margin-bottom: 2px;
}

.student-details .student-meta {
  font-size: 12px;
  line-height: 1.2;
}

/* 操作按钮优化 */
.action-buttons-cell .action-btn {
  width: 28px !important;
  height: 28px !important;
  padding: 0 !important;
  border-radius: 6px !important;
}

/* 状态标签和其他小组件优化 */
.status-tag {
  padding: 4px 8px !important;
  font-size: 11px !important;
  height: auto !important;
  border-radius: 4px !important;
}

.payment-tag {
  font-size: 10px !important;
  height: 18px !important;
  padding: 0 6px !important;
}

.date-info {
  font-size: 12px;
  gap: 4px;
}

/* 表格单元格样式 */
.id-cell {
  display: flex;
  align-items: center;
}

.id-badge {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
}

.student-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.student-avatar {
  background: var(--primary-gradient);
  color: white;
  font-weight: 600;
  border: 2px solid white;
  box-shadow: var(--shadow-sm);
}

.student-details {
  flex: 1;
}

.student-name {
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 2px;
}

.student-meta {
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
}

.contact-info .phone-number {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.course-info .course-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.course-tag {
  background: rgba(99, 102, 241, 0.1);
  color: var(--primary-color);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: var(--radius-md);
  font-size: var(--font-size-xs);
}

.no-courses {
  font-size: 12px;
  color: #999;
  font-style: italic;
}

/* 课时信息样式 */
.hours-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.hours-stats {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.remaining-hours {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.hours-number {
  font-size: 16px;
  font-weight: 600;
  color: #409eff;
}

.hours-unit {
  font-size: 12px;
  color: #909399;
}

.total-hours {
  font-size: 11px;
  color: #909399;
}

.hours-progress {
  margin-top: 4px;
}

/* 费用信息样式 */
.price-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.total-price {
  display: flex;
  flex-direction: column;
}

.price-label {
  font-size: 11px;
  color: #909399;
}

.price-amount {
  font-size: 14px;
  font-weight: 600;
  color: #e6a23c;
}

.paid-amount {
  display: flex;
  gap: 4px;
  font-size: 11px;
}

.paid-label {
  color: #909399;
}

.paid-value {
  color: #67c23a;
  font-weight: 500;
}

.payment-tag {
  margin-top: 2px;
}

/* 表单提示样式 */
.form-hint {
  font-size: 12px;
  color: #909399;
  margin-top: 4px;
  line-height: 1.2;
}

/* 付款信息样式 */
.payment-info {
  margin-top: 6px;
}

.payment-status {
  font-size: 12px;
  color: #606266;
  background: #f5f7fa;
  padding: 4px 8px;
  border-radius: 4px;
  border-left: 3px solid #e6a23c;
}

/* 操作按钮样式 */
.action-buttons-cell {
  display: flex;
  gap: 6px;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.payment-btn {
  background: #e6a23c !important;
  border-color: #e6a23c !important;
}

.payment-btn:hover {
  background: #ebb563 !important;
  border-color: #ebb563 !important;
}

.add-payment-btn {
  background: #67c23a !important;
  border-color: #67c23a !important;
}

.add-payment-btn:hover {
  background: #85ce61 !important;
  border-color: #85ce61 !important;
}

.status-tag {
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: var(--radius-lg);
}

.date-info {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.action-buttons-cell {
  display: flex;
  gap: 8px;
  justify-content: center;
}

.action-btn {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-light);
  transition: var(--transition-fast);
}

.view-btn {
  background: rgba(6, 182, 212, 0.1);
  color: var(--info-color);
  border-color: rgba(6, 182, 212, 0.2);
}

.view-btn:hover {
  background: var(--info-color);
  color: white;
  border-color: var(--info-color);
}

.edit-btn {
  background: rgba(99, 102, 241, 0.1);
  color: var(--primary-color);
  border-color: rgba(99, 102, 241, 0.2);
}

.edit-btn:hover {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.delete-btn {
  background: rgba(239, 68, 68, 0.1);
  color: var(--error-color);
  border-color: rgba(239, 68, 68, 0.2);
}

.delete-btn:hover {
  background: var(--error-color);
  color: white;
  border-color: var(--error-color);
}

/* 分页器样式 */
.pagination-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid var(--border-light);
}

.pagination-info {
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
}

.modern-pagination :deep(.el-pagination__sizes),
.modern-pagination :deep(.el-pager),
.modern-pagination :deep(.el-pagination__jump) {
  display: flex;
  align-items: center;
  gap: 8px;
}

.modern-pagination :deep(.el-pager li) {
  border-radius: var(--radius-md);
  border: 1px solid var(--border-light);
  transition: var(--transition-fast);
}

.modern-pagination :deep(.el-pager li:hover) {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.modern-pagination :deep(.el-pager li.is-active) {
  background: var(--primary-color);
  border-color: var(--primary-color);
  color: white;
}

/* 对话框样式 */
.modern-dialog :deep(.el-dialog) {
  border-radius: var(--radius-xl);
  overflow: hidden;
}

.modern-dialog :deep(.el-dialog__header) {
  background: var(--bg-tertiary);
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-light);
}

.modern-dialog :deep(.el-dialog__body) {
  padding: 24px;
}

.student-form .form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.student-form .form-grid .full-width {
  grid-column: span 2;
}

.student-form :deep(.el-form-item__label) {
  color: var(--text-primary);
  font-weight: 600;
}

.student-form :deep(.el-input__wrapper),
.student-form :deep(.el-select .el-input__wrapper),
.student-form :deep(.el-textarea__inner) {
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  transition: var(--transition-fast);
}

.student-form :deep(.el-input__wrapper):hover,
.student-form :deep(.el-select .el-input__wrapper):hover,
.student-form :deep(.el-textarea__inner):hover {
  border-color: var(--primary-color);
}

.student-form :deep(.el-input__wrapper.is-focus),
.student-form :deep(.el-select .el-input__wrapper.is-focus),
.student-form :deep(.el-textarea__inner:focus) {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid var(--border-light);
}

/* 动画效果 */
.fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
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

/* 响应式设计 */
@media (max-width: 1200px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .student-form .form-grid {
    grid-template-columns: 1fr;
  }
  
  .student-form .form-grid .full-width {
    grid-column: span 1;
  }
}

@media (max-width: 768px) {
  .student-page-container {
    padding: 16px;
  }
  
  .header-content {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .search-form .form-row {
    flex-direction: column;
    gap: 16px;
  }
  
  .pagination-wrapper {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }
  
  .action-buttons-cell {
    flex-direction: column;
    gap: 6px;
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
  
  .stat-number {
    font-size: 28px;
  }
}
</style> 