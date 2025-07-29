<template>
  <div class="teacher-page-container">
    <!-- 现代化页面头部 -->
    <div class="page-header modern-card">
      <div class="header-content">
        <div class="header-left">
          <div class="page-title">
            <div class="title-icon">
              <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
          </div>
            <div class="title-text">
              <h1>教师管理</h1>
              <p class="page-subtitle">管理教师信息，跟踪教学质量</p>
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
            <el-button type="success" class="modern-btn success" @click="exportTeachers">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
              </svg>
              导出Excel
            </el-button>
            <el-button type="primary" class="modern-btn primary" @click="showAddTeacherDialog">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"/>
              </svg>
            添加教师
      </el-button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 统计概览卡片 -->
    <div class="stats-overview">
      <div class="stats-grid">
        <div class="stat-card total-teachers fade-in-up">
          <div class="stat-header">
            <div class="stat-icon total-icon">
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
          <div class="stat-number">{{ total }}</div>
            <div class="stat-label">教师总数</div>
            <div class="stat-description">系统中注册的所有教师</div>
        </div>
      </div>

        <div class="stat-card active-teachers fade-in-up" style="animation-delay: 0.1s">
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
          <div class="stat-number">{{ teacherList.filter(t => t.status === 1).length }}</div>
          <div class="stat-label">在职教师</div>
            <div class="stat-description">当前正在任教的教师</div>
        </div>
      </div>

        <div class="stat-card specialty-count fade-in-up" style="animation-delay: 0.2s">
          <div class="stat-header">
            <div class="stat-icon specialty-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
              </svg>
        </div>
            <div class="trend-badge positive">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
              </svg>
      </div>
          </div>
          <div class="stat-body">
          <div class="stat-number">{{ specialtyCount }}</div>
          <div class="stat-label">专业方向</div>
            <div class="stat-description">涵盖的教学专业数量</div>
          </div>
        </div>

        <div class="stat-card experience-avg fade-in-up" style="animation-delay: 0.3s">
          <div class="stat-header">
            <div class="stat-icon experience-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <div class="trend-badge positive">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
              </svg>
            </div>
          </div>
          <div class="stat-body">
            <div class="stat-number">{{ getAverageExperience() }}年</div>
            <div class="stat-label">平均教龄</div>
            <div class="stat-description">教师平均教学经验</div>
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
          <el-button text @click="resetFilter" class="reset-btn">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z"/>
            </svg>
            重置筛选
          </el-button>
        </div>
      </div>
      
      <el-form :inline="true" :model="filterForm" class="search-form modern-form">
        <div class="form-row">
        <el-form-item label="教师姓名">
            <div class="input-wrapper">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" class="input-icon">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
          <el-input 
            v-model="filterForm.name" 
            placeholder="请输入教师姓名" 
            clearable 
          />
            </div>
        </el-form-item>

        <el-form-item label="专业方向">
            <div class="input-wrapper">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" class="input-icon">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
              </svg>
          <el-select 
            v-model="filterForm.specialty" 
            placeholder="请选择专业方向" 
            clearable
            @change="handleSpecialtyChange"
                style="width: 100%;"
          >
            <el-option label="Python" value="Python"></el-option>
            <el-option label="Java" value="Java"></el-option>
            <el-option label="Web开发" value="Web开发"></el-option>
            <el-option label="人工智能" value="人工智能"></el-option>
            <el-option label="少儿编程" value="少儿编程"></el-option>
          </el-select>
            </div>
        </el-form-item>

          <el-form-item label="在职状态">
          <el-select 
            v-model="filterForm.status" 
            placeholder="请选择状态" 
            clearable
            @change="handleStatusChange"
              class="status-select"
          >
              <el-option label="全部状态" value="" />
              <el-option label="在职" :value="1" />
              <el-option label="离职" :value="0" />
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
          <span>教师列表 ({{ total }})</span>
        </div>
        <div class="table-actions">
          <el-tooltip content="刷新数据" placement="top">
            <el-button circle @click="loadTeachers" class="refresh-btn">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z"/>
              </svg>
            </el-button>
          </el-tooltip>
        </div>
      </div>
      
      <div class="table-container">
      <el-table
        v-loading="loading"
        :data="teacherList"
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
        
          <el-table-column label="教师信息" min-width="250">
          <template #default="scope">
            <div class="teacher-info">
                <el-avatar :size="40" :src="scope.row.avatar" class="teacher-avatar">
                {{ scope.row.name ? scope.row.name.charAt(0) : '?' }}
              </el-avatar>
              <div class="teacher-details">
                <div class="teacher-name">{{ scope.row.name }}</div>
                  <div class="teacher-meta">
                    <span class="teacher-title">{{ scope.row.title }}</span>
                    <span class="teacher-gender">
                      <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                        <path v-if="scope.row.gender === 1" d="M9,9C10.29,9 11.5,9.41 12.47,10.11L17.58,5H13V3H21V11H19V6.41L13.89,11.5C14.59,12.5 15,13.7 15,15A6,6 0 0,1 9,21A6,6 0 0,1 3,15A6,6 0 0,1 9,9M9,11A4,4 0 0,0 5,15A4,4 0 0,0 9,19A4,4 0 0,0 13,15A4,4 0 0,0 9,11Z"/>
                        <path v-else d="M12,4A6,6 0 0,1 18,10C18,12.97 15.84,15.44 13,15.92V18H15V20H13V22H11V20H9V18H11V15.92C8.16,15.44 6,12.97 6,10A6,6 0 0,1 12,4M12,6A4,4 0 0,0 8,10A4,4 0 0,0 12,14A4,4 0 0,0 16,10A4,4 0 0,0 12,6Z"/>
                      </svg>
                      {{ scope.row.gender === 1 ? '男' : '女' }}
                    </span>
                  </div>
              </div>
            </div>
          </template>
        </el-table-column>
        
          <el-table-column prop="specialty" label="专业方向" width="140">
          <template #default="scope">
              <div class="specialty-info">
                <el-tag class="specialty-tag" size="small">
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
                  </svg>
                  {{ scope.row.specialty }}
            </el-tag>
              </div>
          </template>
        </el-table-column>
        
          <el-table-column prop="phone" label="联系方式" width="160">
          <template #default="scope">
              <div class="contact-info">
                <div class="phone-number">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                    <path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z"/>
                  </svg>
                  {{ scope.row.phone }}
                </div>
                <div class="email-address" v-if="scope.row.email">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                    <path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"/>
                  </svg>
                  {{ scope.row.email }}
                </div>
              </div>
          </template>
        </el-table-column>
        
          <el-table-column prop="status" label="状态" width="120" sortable>
          <template #default="scope">
              <el-tag 
                :type="scope.row.status === 1 ? 'success' : 'info'"
                class="status-tag"
              >
                <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                  <path v-if="scope.row.status === 1" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  <path v-else d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,6A1.5,1.5 0 0,1 13.5,7.5A1.5,1.5 0 0,1 12,9A1.5,1.5 0 0,1 10.5,7.5A1.5,1.5 0 0,1 12,6M12,17A1,1 0 0,1 11,16V12A1,1 0 0,1 12,11A1,1 0 0,1 13,12V16A1,1 0 0,1 12,17Z"/>
                </svg>
              {{ scope.row.status === 1 ? '在职' : '离职' }}
            </el-tag>
          </template>
        </el-table-column>
        
          <el-table-column prop="joinDate" label="入职时间" width="120" sortable>
          <template #default="scope">
              <div class="date-info">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                  <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.1 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
                </svg>
                {{ formatDate(scope.row.joinDate) }}
              </div>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="180" fixed="right">
            <template #default="scope">
              <div class="action-buttons-cell">
                <el-tooltip content="查看详情" placement="top">
                  <el-button 
                    size="small" 
                    circle 
                    @click="viewTeacherDetail(scope.row)"
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
                    @click="editTeacher(scope.row)"
                    class="action-btn edit-btn"
                  >
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                      <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"/>
                    </svg>
              </el-button>
                </el-tooltip>
                
                <el-tooltip content="删除教师" placement="top">
            <el-popconfirm
              title="确定要删除此教师吗？"
              @confirm="deleteTeacher(scope.row.id)"
            >
              <template #reference>
                      <el-button 
                        size="small" 
                        type="danger" 
                        circle 
                        class="action-btn delete-btn"
                      >
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                          <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"/>
                        </svg>
                  </el-button>
              </template>
            </el-popconfirm>
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

    <!-- 教师详情对话框 -->
    <el-dialog
      v-model="teacherDetailVisible"
      title="教师详情"
      width="700px"
      destroy-on-close
      class="modern-dialog"
    >
      <div v-if="currentTeacher" class="teacher-detail">
        <div class="teacher-header">
          <el-avatar :size="80" :src="currentTeacher.avatar">
            {{ currentTeacher.name ? currentTeacher.name.charAt(0) : '?' }}
          </el-avatar>
          <div class="teacher-header-info">
            <h3>{{ currentTeacher.name }}</h3>
            <p>{{ currentTeacher.title }} | {{ currentTeacher.specialty }}</p>
          </div>
        </div>
        
        <el-divider />
        
        <el-descriptions :column="2" border>
          <el-descriptions-item label="性别">
            <span class="detail-value">{{ currentTeacher.gender === 1 ? '男' : '女' }}</span>
          </el-descriptions-item>
          <el-descriptions-item label="年龄">
            <span class="detail-value">{{ currentTeacher.age }}</span>
          </el-descriptions-item>
          <el-descriptions-item label="电话">
            <span class="detail-value">{{ currentTeacher.phone }}</span>
          </el-descriptions-item>
          <el-descriptions-item label="邮箱">
            <span class="detail-value">{{ currentTeacher.email }}</span>
          </el-descriptions-item>
          <el-descriptions-item label="入职时间">
            <span class="detail-value">{{ formatDate(currentTeacher.joinDate) }}</span>
          </el-descriptions-item>
          <el-descriptions-item label="状态">
            <el-tag :type="currentTeacher.status === 1 ? 'success' : 'info'">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                <path v-if="currentTeacher.status === 1" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                <path v-else d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,6A1.5,1.5 0 0,1 13.5,7.5A1.5,1.5 0 0,1 12,9A1.5,1.5 0 0,1 10.5,7.5A1.5,1.5 0 0,1 12,6M12,17A1,1 0 0,1 11,16V12A1,1 0 0,1 12,11A1,1 0 0,1 13,12V16A1,1 0 0,1 12,17Z"/>
              </svg>
              {{ currentTeacher.status === 1 ? '在职' : '离职' }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="学历背景" :span="2">
            <span class="detail-value">{{ currentTeacher.education || '未填写' }}</span>
          </el-descriptions-item>
          <el-descriptions-item label="教学经验" :span="2">
            <span class="detail-value">{{ currentTeacher.experience || '未填写' }}</span>
          </el-descriptions-item>
          <el-descriptions-item label="个人简介" :span="2">
            <span class="detail-value">{{ currentTeacher.bio || '未填写' }}</span>
          </el-descriptions-item>
        </el-descriptions>
        
        <el-divider />
        
        <!-- 统计信息 -->
        <div class="teacher-stats">
          <div class="stat-item">
            <div class="stat-value">{{ currentTeacher.courseCount || 0 }}</div>
            <div class="stat-label">授课数量</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">{{ currentTeacher.studentCount || 0 }}</div>
            <div class="stat-label">学员数量</div>
          </div>
        </div>
        
        <!-- 教师课程和排课 -->
        <el-tabs class="teacher-tabs">
          <el-tab-pane label="授课课程">
            <el-table :data="teacherCourses" border stripe style="width: 100%">
              <el-table-column prop="name" label="课程名称" />
              <el-table-column prop="type" label="课程类型" width="100" />
              <el-table-column prop="weekday" label="上课时间" width="180">
                <template #default="scope">
                  {{ scope.row.weekday }} {{ scope.row.timeSlot }}
                </template>
              </el-table-column>
              <el-table-column prop="studentCount" label="学员数" width="80" align="center" />
            </el-table>
          </el-tab-pane>
          
          <el-tab-pane label="近期排课">
            <el-table :data="teacherSchedules" border stripe style="width: 100%">
              <el-table-column prop="courseName" label="课程名称" />
              <el-table-column prop="date" label="日期" width="100" />
              <el-table-column label="时间" width="130">
                <template #default="scope">
                  {{ scope.row.startTime }}-{{ scope.row.endTime }}
                </template>
              </el-table-column>
              <el-table-column prop="classroom" label="教室" width="80" />
              <el-table-column prop="status" label="状态" width="80" align="center">
                <template #default="scope">
                  <el-tag :type="getStatusTagType(scope.row.status)">
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                      <path v-if="scope.row.status === 0" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,6A1.5,1.5 0 0,1 13.5,7.5A1.5,1.5 0 0,1 12,9A1.5,1.5 0 0,1 10.5,7.5A1.5,1.5 0 0,1 12,6M12,17A1,1 0 0,1 11,16V12A1,1 0 0,1 12,11A1,1 0 0,1 13,12V16A1,1 0 0,1 12,17Z"/>
                      <path v-else-if="scope.row.status === 1" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,6A1.5,1.5 0 0,1 13.5,7.5A1.5,1.5 0 0,1 12,9A1.5,1.5 0 0,1 10.5,7.5A1.5,1.5 0 0,1 12,6M12,17A1,1 0 0,1 11,16V12A1,1 0 0,1 12,11A1,1 0 0,1 13,12V16A1,1 0 0,1 12,17Z"/>
                      <path v-else d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,6A1.5,1.5 0 0,1 13.5,7.5A1.5,1.5 0 0,1 12,9A1.5,1.5 0 0,1 10.5,7.5A1.5,1.5 0 0,1 12,6M12,17A1,1 0 0,1 11,16V12A1,1 0 0,1 12,11A1,1 0 0,1 13,12V16A1,1 0 0,1 12,17Z"/>
                    </svg>
                    {{ getStatusText(scope.row.status) }}
                  </el-tag>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-dialog>

    <!-- 添加/编辑教师对话框 -->
    <el-dialog
      v-model="teacherFormVisible"
      :title="isEdit ? '编辑教师' : '添加教师'"
      width="700px"
      destroy-on-close
      class="modern-dialog"
    >
      <el-form
        :model="teacherForm"
        :rules="teacherRules"
        ref="teacherFormRef"
        label-width="120px"
      >
        <el-row :gutter="20">
          <el-col :span="12">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="teacherForm.name" placeholder="请输入教师姓名" />
        </el-form-item>
          </el-col>
          <el-col :span="12">
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="teacherForm.gender">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
          </el-col>
        </el-row>
        
        <el-row :gutter="20">
          <el-col :span="12">
        <el-form-item label="年龄" prop="age">
              <el-input-number v-model="teacherForm.age" :min="18" :max="70" style="width: 100%" />
        </el-form-item>
          </el-col>
          <el-col :span="12">
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="teacherForm.phone" placeholder="请输入手机号码" />
        </el-form-item>
          </el-col>
        </el-row>
        
        <el-row :gutter="20">
          <el-col :span="12">
        <el-form-item label="电子邮箱" prop="email">
          <el-input v-model="teacherForm.email" placeholder="请输入电子邮箱" />
        </el-form-item>
          </el-col>
          <el-col :span="12">
        <el-form-item label="职称" prop="title">
              <el-select v-model="teacherForm.title" placeholder="请选择职称" style="width: 100%">
            <el-option label="助教" value="助教" />
            <el-option label="讲师" value="讲师" />
            <el-option label="高级讲师" value="高级讲师" />
            <el-option label="教学总监" value="教学总监" />
          </el-select>
        </el-form-item>
          </el-col>
        </el-row>
        
        <el-row :gutter="20">
          <el-col :span="12">
        <el-form-item label="专业方向" prop="specialty">
              <el-select v-model="teacherForm.specialty" placeholder="请选择专业方向" style="width: 100%">
                <el-option label="Python" value="Python" />
                <el-option label="Java" value="Java" />
                <el-option label="Web开发" value="Web开发" />
                <el-option label="人工智能" value="人工智能" />
                <el-option label="少儿编程" value="少儿编程" />
                <el-option label="C++" value="C++" />
                <el-option label="GOC" value="GOC" />
              </el-select>
        </el-form-item>
          </el-col>
          <el-col :span="12">
        <el-form-item label="入职时间" prop="joinDate">
          <el-date-picker 
            v-model="teacherForm.joinDate" 
            type="date" 
            placeholder="选择入职日期"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
                style="width: 100%"
          />
        </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="学历背景" prop="education">
              <el-input v-model="teacherForm.education" placeholder="例如：计算机科学硕士" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="teacherForm.status">
            <el-radio :label="1">在职</el-radio>
            <el-radio :label="0">离职</el-radio>
          </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="教学经验" prop="experience">
          <el-input v-model="teacherForm.experience" placeholder="例如：5年编程教育经验" />
        </el-form-item>
        
        <el-form-item label="个人简介" prop="bio">
          <el-input 
            v-model="teacherForm.bio" 
            type="textarea" 
            :rows="3" 
            placeholder="请输入教师个人简介"
          />
        </el-form-item>

        <!-- 账号设置区域 -->
        <el-divider content-position="left">
          <span style="font-weight: bold; color: #409EFF;">账号设置</span>
        </el-divider>

        <el-alert
          title="账号信息"
          description="创建教师账号后，教师可以使用姓名和手机号登录系统"
          type="info"
          :closable="false"
          style="margin-bottom: 20px;"
        />

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="用户名" prop="username">
              <el-input 
                v-model="teacherForm.username" 
                placeholder="请输入用户名（可选，默认使用姓名）"
                :disabled="isEdit"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="初始密码" prop="password" v-if="!isEdit">
              <el-input 
                v-model="teacherForm.password" 
                type="password"
                show-password
                placeholder="请输入初始密码"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20" v-if="!isEdit">
          <el-col :span="12">
            <el-form-item label="确认密码" prop="confirmPassword">
              <el-input 
                v-model="teacherForm.confirmPassword" 
                type="password"
                show-password
                placeholder="请再次输入密码"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="密码强度">
              <div class="password-strength">
                <el-progress 
                  :percentage="passwordStrength.percentage" 
                  :color="passwordStrength.color"
                  :stroke-width="8"
                  :show-text="false"
                />
                <span class="strength-text">{{ passwordStrength.text }}</span>
              </div>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="账号权限" prop="permissions">
          <el-checkbox-group v-model="teacherForm.permissions">
            <el-checkbox label="view_students">查看学员</el-checkbox>
            <el-checkbox label="view_courses">查看课程</el-checkbox>
            <el-checkbox label="view_classes">查看班级</el-checkbox>
            <el-checkbox label="view_schedules">查看排课</el-checkbox>
            <el-checkbox label="manage_own_courses">管理自己的课程</el-checkbox>
            <el-checkbox label="view_notices">查看通知</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="teacherFormVisible = false">取消</el-button>
          <el-button type="primary" @click="submitTeacherForm" :loading="submitLoading">
            {{ isEdit ? '更新' : '创建账号' }}
          </el-button>
        </span>
      </template>
    </el-dialog>
    
    <!-- 移除调试面板 -->
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, Edit, Delete, Search, Download, Upload, View, Refresh } from '@element-plus/icons-vue'
import { useTeacherStore } from '../stores/teacher'
import { useDataSourceStore } from '../stores/dataSource'
import { formatDate } from '../utils/index'
import { logger } from '../utils/logger.js'
import { errorHandler } from '../utils/errorHandler.js'
import api from '../utils/api';
import { useTeacherDataStore } from '../stores/teacherData';
import { storeToRefs } from 'pinia'
import { getDataSource } from '../utils/dataManager';
import { useRoute } from 'vue-router';
const route = useRoute();

// 使用Pinia状态管理
const teacherStore = useTeacherStore();
const dataSourceStore = useDataSourceStore();
const teacherDataStore = useTeacherDataStore();
const { type: dataSourceType } = storeToRefs(dataSourceStore)

// 数据加载状态
const loading = computed(() => teacherStore.getLoading);
const submitLoading = ref(false);

// 专业方向数量
const specialtyCount = computed(() => {
  const specialties = new Set(teacherList.value.map(t => t.specialty));
  return specialties.size;
});

// 获取平均教学经验
const getAverageExperience = () => {
  if (teacherList.value.length === 0) {
    return 5.2; // 默认平均经验
  }
  
  // 模拟计算平均教学经验
  const totalExperience = teacherList.value.reduce((sum, teacher) => {
    // 假设每个教师都有experience字段，如果没有则根据入职时间估算
    if (teacher.experience) {
      return sum + parseFloat(teacher.experience);
    } else if (teacher.hireDate) {
      // 根据入职时间计算经验年数
      const hireYear = new Date(teacher.hireDate).getFullYear();
      const currentYear = new Date().getFullYear();
      const experience = Math.max(0, currentYear - hireYear);
      return sum + experience;
    } else {
      // 默认经验值
      return sum + 3;
    }
  }, 0);
  
  const averageExperience = totalExperience / teacherList.value.length;
  
  // 返回保留一位小数的平均经验
  return Math.round(averageExperience * 10) / 10;
};

// 分页相关
const total = computed(() => teacherStore.getPagination.total);
const pageSize = ref(10);
const currentPage = ref(1);

// 教师列表数据
const teacherList = computed(() => teacherStore.getTeachers);

// 过滤表单
const filterForm = reactive({
  name: '',
  specialty: '',
  status: ''
});

// 当前选中的教师
const currentTeacher = ref(null);
const teacherCourses = ref([]);
const teacherSchedules = ref([]);

// 对话框控制
const teacherDetailVisible = ref(false);
const teacherFormVisible = ref(false);
const isEdit = ref(false);

// 教师表单
const teacherForm = ref({
  id: '',
  name: '',
  gender: 1,
  age: 30,
  phone: '',
  email: '',
  title: '',
  specialty: '',
  education: '',
  experience: '',
  joinDate: '',
  status: 1,
  bio: '',
  username: '', // 新增用户名
  password: '', // 新增密码
  confirmPassword: '', // 新增确认密码
  permissions: ['view_students', 'view_courses', 'view_classes', 'view_schedules', 'manage_own_courses', 'view_notices'] // 新增权限
});

// 表单校验规则
const teacherRules = {
  name: [
    { required: true, message: '请输入教师姓名', trigger: 'blur' },
    { min: 2, max: 20, message: '长度在2到20个字符之间', trigger: 'blur' }
  ],
  gender: [
    { required: true, message: '请选择性别', trigger: 'change' }
  ],
  phone: [
    { required: true, message: '请输入手机号码', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入电子邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
  ],
  title: [
    { required: true, message: '请选择职称', trigger: 'change' }
  ],
  specialty: [
    { required: true, message: '请选择专业方向', trigger: 'change' }
  ],
  joinDate: [
    { required: true, message: '请选择入职时间', trigger: 'change' }
  ],
  username: [
    { min: 4, max: 20, message: '用户名长度在4到20个字符之间', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在6到20个字符之间', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    { 
      validator: (rule, value, callback) => {
        if (value !== teacherForm.value.password) {
          callback(new Error('两次输入密码不一致'));
        } else {
          callback();
        }
      }, 
      trigger: 'blur' 
    }
  ]
};

const teacherFormRef = ref(null);

// 密码强度检测
const passwordStrength = computed(() => {
  const password = teacherForm.value.password;
  if (!password) return { percentage: 0, text: '请输入密码', color: '#909399' };
  
  let score = 0;
  
  if (password.length >= 6) score += 20;
  if (password.length >= 8) score += 20;
  if (password.length >= 12) score += 20;
  if (/[a-z]/.test(password)) score += 20;
  if (/[A-Z]/.test(password)) score += 20;
  if (/[0-9]/.test(password)) score += 20;
  if (/[^A-Za-z0-9]/.test(password)) score += 20;
  
  let color = '#909399';
  let text = '弱';
  
  if (score >= 100) {
    color = '#67C23A';
    text = '强';
  } else if (score >= 80) {
    color = '#E6A23C';
    text = '中';
  } else if (score >= 60) {
    color = '#F56C6C';
    text = '弱';
  }
  
  return { 
    percentage: Math.min(score, 100), 
    text, 
    color 
  };
});

// 监听密码变化
watch(() => teacherForm.value.password, (newPassword) => {
  if (newPassword && teacherForm.value.confirmPassword) {
    // 触发确认密码的验证
    teacherFormRef.value?.validateField('confirmPassword');
  }
});

// 监听姓名变化，自动生成用户名
watch(() => teacherForm.value.name, (newName) => {
  if (newName && !teacherForm.value.username && !isEdit.value) {
    // 生成用户名：姓名拼音 + 随机数字
    const username = newName.toLowerCase().replace(/[^a-z]/g, '') + Math.floor(Math.random() * 1000);
    teacherForm.value.username = username;
  }
});

// 监听数据源切换，自动刷新教师列表
watch(dataSourceType, () => {
  getTeachers()
})

// 在页面头部添加数据源指示器
const showDataSourceInfo = () => {
  ElMessage.info(`当前使用${dataSourceType.value === 'mock' ? '模拟' : 'API'}数据源`);
};

// 获取教师列表
const getTeachers = async () => {
  try {
    logger.info('调用Pinia获取教师列表');
    await teacherStore.fetchTeachers({
      page: currentPage.value,
      size: pageSize.value,
      ...filterForm
    });
  } catch (error) {
    errorHandler.handleError(error, '获取教师列表失败');
  }
};

// 搜索
const handleSearch = () => {
  currentPage.value = 1;
  getTeachers();
};

// 重置过滤条件
const resetFilter = () => {
  Object.keys(filterForm).forEach(key => {
    filterForm[key] = '';
  });
  currentPage.value = 1;
  getTeachers();
};

// 分页处理
const handleSizeChange = (size) => {
  pageSize.value = size;
  getTeachers();
};

const handleCurrentChange = (page) => {
  currentPage.value = page;
  getTeachers();
};

// 专业方向变化处理
const handleSpecialtyChange = (value) => {
  logger.info('专业方向变化:', value);
  currentPage.value = 1; // 专业方向变化时重置当前页为1
  getTeachers();
};

// 状态变化处理
const handleStatusChange = (value) => {
  logger.info('状态变化:', value);
  currentPage.value = 1; // 状态变化时重置当前页为1
  getTeachers();
};

// 查看教师详情
const viewTeacherDetail = async (teacher) => {
  currentTeacher.value = null;
  teacherCourses.value = [];
  teacherSchedules.value = [];
  teacherDetailVisible.value = true;
  
  try {
    // 在模拟数据模式下，直接使用传入的教师数据
    if (dataSourceType.value === 'mock') {
      currentTeacher.value = teacher;
      // 模拟课程和排课数据
      teacherCourses.value = [
        { id: 1, name: 'Python基础', type: 'Python', periods: 32 },
        { id: 2, name: 'Java入门', type: 'Java', periods: 24 }
      ];
      teacherSchedules.value = [
        { id: 1, courseName: 'Python基础', day: '周一', time: '14:00-16:00', location: '教室A' },
        { id: 2, courseName: 'Java入门', day: '周三', time: '10:00-12:00', location: '教室B' }
      ];
    } else {
      // API数据模式
    const teacherDetail = await api.get(`/teachers/${teacher.id}`);
    currentTeacher.value = teacherDetail;
    
    // 获取教师课程
    const courses = await api.get(`/teachers/${teacher.id}/courses`);
    teacherCourses.value = courses || [];
    
    // 获取教师排课
    const schedules = await api.get(`/teachers/${teacher.id}/schedules`);
    teacherSchedules.value = schedules || [];
    }
  } catch (error) {
    errorHandler.handleError(error, '获取教师详情失败');
  }
};

// 编辑教师
const editTeacher = (teacher) => {
  isEdit.value = true;
  teacherForm.value = { 
    ...teacher,
    password: '',
    confirmPassword: '',
    permissions: teacher.permissions || ['view_students', 'view_courses', 'view_classes', 'view_schedules', 'manage_own_courses', 'view_notices']
  };
  teacherFormVisible.value = true;
};

// 添加教师
const showAddTeacherDialog = () => {
  isEdit.value = false;
  teacherForm.value = {
    name: '',
    gender: 1,
    age: 30,
    phone: '',
    email: '',
    title: '',
    specialty: '',
    education: '',
    experience: '',
    joinDate: new Date().toISOString().slice(0, 10),
    status: 1,
    bio: '',
    username: '', // 新增用户名
    password: '', // 新增密码
    confirmPassword: '', // 新增确认密码
    permissions: ['view_students', 'view_courses', 'view_classes', 'view_schedules', 'manage_own_courses', 'view_notices'] // 新增权限
  };
  teacherFormVisible.value = true;
};

// 提交教师表单
const submitTeacherForm = async () => {
  if (!teacherFormRef.value) return;
  await teacherFormRef.value.validate(async (valid) => {
    if (valid) {
      submitLoading.value = true;
      try {
        const formData = { ...teacherForm.value };
        if (isEdit.value) {
          delete formData.password;
          delete formData.confirmPassword;
        } else {
          if (!formData.username) {
            formData.username = formData.name.toLowerCase().replace(/[^a-z]/g, '') + Math.floor(Math.random() * 1000);
          }
        }
        if (isEdit.value) {
          await teacherStore.updateTeacher(formData.id, formData);
          ElMessage.success('教师信息更新成功');
          // 重新获取数据以确保列表更新
          await getTeachers();
        } else {
          await teacherStore.addTeacher(formData);
          ElMessage.success(`教师账号创建成功！\n用户名：${formData.username}\n密码：${formData.password}\n请告知教师使用姓名和手机号登录系统`);
          // 重新获取数据以确保列表更新
          await getTeachers();
        }
        teacherFormVisible.value = false;
      } catch (error) {
        errorHandler.handleError(error, '提交教师表单失败');
      } finally {
        submitLoading.value = false;
      }
    }
  });
};

// 删除教师
const deleteTeacher = async (id) => {
  try {
    await teacherStore.deleteTeacher(id);
    ElMessage.success('教师删除成功');
  } catch (error) {
    errorHandler.handleError(error, '删除教师失败');
  }
};

// 获取状态文本
const getStatusText = (status) => {
  const statusMap = {
    0: '未开始',
    1: '进行中',
    2: '已完成',
    3: '已取消'
  };
  return statusMap[status] || '未知';
};

// 获取状态标签类型
const getStatusTagType = (status) => {
  const typeMap = {
    0: 'info',
    1: 'warning',
    2: 'success',
    3: 'danger'
  };
  return typeMap[status] || 'info';
};

// 加载教师数据
const loadTeachers = async () => {
  logger.info('页面加载，获取教师数据');
  try {
    await getTeachers();
    // 如果获取数据后列表仍为空，则重试一次
    if (teacherList.value.length === 0) {
      logger.warn('教师列表为空，尝试重新获取');
      await teacherStore.fetchTeachers({
        page: 1,
        size: 10
      });
    }
  } catch (error) {
    errorHandler.handleError(error, '加载教师数据失败');
  }
};

// 在组件挂载时加载数据
onMounted(async () => {
  console.log('教师页面挂载，开始加载数据');
  // 确保数据源设置为mock模式
  dataSourceStore.forceMockMode();
  // 强制初始化教师数据
  await teacherStore.fetchTeachers();
  await loadTeachers();
  console.log('教师数据加载完成，当前教师数量:', teacherList.value.length);
});

// 路由变化监听（确保route已定义）
watch(() => route.path, (newPath, oldPath) => {
  if (newPath.includes('/teacher')) {
    getTeachers();
  }
});
</script>

<style scoped>
/* 教师管理页面样式 */
.teacher-page-container {
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
  align-items: center;
}

.data-source-badge {
  margin-right: 8px;
}

.source-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: var(--radius-lg);
  font-size: var(--font-size-sm);
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition-fast);
}

.source-indicator.mock {
  background: rgba(245, 158, 11, 0.1);
  color: var(--warning-color);
  border: 1px solid rgba(245, 158, 11, 0.2);
}

.source-indicator.api {
  background: rgba(16, 185, 129, 0.1);
  color: var(--success-color);
  border: 1px solid rgba(16, 185, 129, 0.2);
}

/* 统计概览样式 */
.stats-overview {
  margin-bottom: 24px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
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

.stat-card.total-teachers::before {
  background: linear-gradient(90deg, #8b5cf6, #7c3aed);
}

.stat-card.active-teachers::before {
  background: linear-gradient(90deg, #10b981, #059669);
}

.stat-card.specialty-count::before {
  background: linear-gradient(90deg, #f59e0b, #d97706);
}

.stat-card.experience-avg::before {
  background: linear-gradient(90deg, #06b6d4, #0891b2);
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
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
}

.active-icon {
  background: linear-gradient(135deg, #10b981, #059669);
}

.specialty-icon {
  background: linear-gradient(135deg, #f59e0b, #d97706);
}

.experience-icon {
  background: linear-gradient(135deg, #06b6d4, #0891b2);
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
  margin-bottom: 24px;
  padding: 24px;
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

.input-wrapper :deep(.el-input__wrapper),
.input-wrapper :deep(.el-select .el-input__wrapper) {
  padding-left: 40px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  transition: var(--transition-fast);
}

.input-wrapper :deep(.el-input__wrapper):hover,
.input-wrapper :deep(.el-select .el-input__wrapper):hover {
  border-color: var(--primary-color);
}

.input-wrapper :deep(.el-input__wrapper.is-focus),
.input-wrapper :deep(.el-select .el-input__wrapper.is-focus) {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.status-select {
  min-width: 160px;
}

/* 数据表格区域 */
.data-table-section {
  background: white;
  padding: 24px;
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
  background: var(--bg-secondary);
}

/* 表格单元格样式 */
.id-cell {
  display: flex;
  align-items: center;
}

.id-badge {
  background: var(--bg-tertiary);
  color: var(--text-secondary);
  padding: 4px 8px;
  border-radius: var(--radius-md);
  font-size: var(--font-size-xs);
  font-weight: 600;
}

.teacher-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.teacher-avatar {
  background: var(--primary-gradient);
  color: white;
  font-weight: 600;
  border: 2px solid white;
  box-shadow: var(--shadow-sm);
}

.teacher-details {
  flex: 1;
}

.teacher-name {
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 2px;
}

.teacher-meta {
  display: flex;
  gap: 12px;
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
}

.teacher-title {
  padding: 2px 6px;
  background: rgba(99, 102, 241, 0.1);
  border-radius: var(--radius-sm);
  color: var(--primary-color);
}

.teacher-gender {
  display: flex;
  align-items: center;
  gap: 4px;
}

.specialty-info .specialty-tag {
  background: rgba(245, 158, 11, 0.1);
  color: var(--warning-color);
  border: 1px solid rgba(245, 158, 11, 0.2);
  border-radius: var(--radius-md);
  font-size: var(--font-size-xs);
  display: flex;
  align-items: center;
  gap: 4px;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.phone-number,
.email-address {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.email-address {
  font-size: var(--font-size-xs);
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

/* 教师详情样式 */
.teacher-detail {
  text-align: center;
}

.teacher-avatar-large {
  width: 80px;
  height: 80px;
  margin: 0 auto 16px;
  background: var(--primary-gradient);
  color: white;
  font-size: 32px;
  font-weight: 600;
  border: 3px solid white;
  box-shadow: var(--shadow-lg);
}

.teacher-basic-info h3 {
  margin: 0 0 8px 0;
  color: var(--text-primary);
  font-size: var(--font-size-xl);
}

.teacher-basic-info p {
  margin: 0 0 16px 0;
  color: var(--text-secondary);
  font-size: var(--font-size-md);
}

.detail-value {
  color: var(--text-primary);
  font-weight: 500;
}

/* 课程列表样式 */
.course-list :deep(.el-table__header) {
  background: var(--bg-tertiary);
}

.course-list :deep(.el-table__header th) {
  background: var(--bg-tertiary);
  color: var(--text-primary);
  font-weight: 600;
  border: none;
}

/* 表单样式 */
.modern-form :deep(.el-form-item__label) {
  color: var(--text-primary);
  font-weight: 600;
}

.modern-form :deep(.el-input__wrapper),
.modern-form :deep(.el-select .el-input__wrapper),
.modern-form :deep(.el-textarea__inner) {
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  transition: var(--transition-fast);
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
}

@media (max-width: 768px) {
  .teacher-page-container {
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
  
  .action-buttons {
    flex-direction: column;
    gap: 8px;
}

  .contact-info {
    font-size: var(--font-size-xs);
}

  .teacher-meta {
    flex-direction: column;
    gap: 4px;
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

  .teacher-info {
    flex-direction: column;
    text-align: center;
    gap: 8px;
}

  .contact-info {
  align-items: center;
}
}
</style> 