<template>
  <div class="course-page-container">
    <!-- 现代化页面头部 -->
    <div class="page-header modern-card">
      <div class="header-content">
        <div class="header-left">
          <div class="page-title">
            <div class="title-icon">
              <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
                <path d="M12 3L1 9l11 6 9-4.91V17h2V9M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82Z"/>
              </svg>
            </div>
            <div class="title-text">
              <h1>课程管理</h1>
              <p class="page-subtitle">管理课程内容，打造精品教学</p>
            </div>
          </div>
        </div>
        <div class="header-actions">
          <div class="action-buttons">
            <el-button type="info" class="modern-btn info" @click="toggleViewMode">
              <svg v-if="viewMode === 'grid'" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M3 14h4v-4H3v4zm0 5h4v-4H3v4zM3 9h4V5H3v4zm5 5h13v-4H8v4zm0 5h13v-4H8v4zM8 5v4h13V5H8z"/>
              </svg>
              <svg v-else viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M3 3v8h8V3H3zm6 6H5V5h4v4zm-6 4v8h8v-8H3zm6 6H5v-4h4v4zm4-16v8h8V3h-8zm6 6h-4V5h4v4zm-6 4v8h8v-8h-8zm6 6h-4v-4h4v4z"/>
              </svg>
              {{ viewMode === 'grid' ? '列表视图' : '卡片视图' }}
            </el-button>
            <el-button type="success" class="modern-btn success" @click="exportCourses">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
              </svg>
              导出数据
            </el-button>
            <el-button type="primary" class="modern-btn primary" @click="showAddDialog">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"/>
              </svg>
              新建课程
            </el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 统计概览卡片 -->
    <div class="stats-overview">
      <div class="stats-grid">
        <div class="stat-card total-courses fade-in-up">
          <div class="stat-header">
            <div class="stat-icon total-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M12 3L1 9l11 6 9-4.91V17h2V9M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82Z"/>
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
            <div class="stat-label">课程总数</div>
            <div class="stat-description">系统中的所有课程</div>
          </div>
        </div>

        <div class="stat-card active-courses fade-in-up" style="animation-delay: 0.1s">
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
            <div class="stat-number">{{ courseList.filter(c => c.status === 1).length }}</div>
            <div class="stat-label">正常课程</div>
            <div class="stat-description">当前可报名的课程</div>
          </div>
        </div>

        <div class="stat-card course-types fade-in-up" style="animation-delay: 0.2s">
          <div class="stat-header">
            <div class="stat-icon type-icon">
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
            <div class="stat-number">{{ courseTypeCount }}</div>
            <div class="stat-label">课程类型</div>
            <div class="stat-description">涵盖的专业方向</div>
          </div>
        </div>

        <div class="stat-card avg-price fade-in-up" style="animation-delay: 0.3s">
          <div class="stat-header">
            <div class="stat-icon price-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M7,15H9C9,16.08 10.37,17 12,17C13.63,17 15,16.08 15,15C15,13.9 13.96,13.5 11.76,12.97C9.64,12.44 7,11.78 7,9C7,7.21 8.47,5.69 10.5,5.18V3H13.5V5.18C15.53,5.69 17,7.21 17,9H15C15,7.92 13.63,7 12,7C10.37,7 9,7.92 9,9C9,10.1 10.04,10.5 12.24,11.03C14.36,11.56 17,12.22 17,15C17,16.79 15.53,18.31 13.5,18.82V21H10.5V18.82C8.47,18.31 7,16.79 7,15Z"/>
              </svg>
            </div>
            <div class="trend-badge positive">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
              </svg>
            </div>
          </div>
          <div class="stat-body">
            <div class="stat-number">¥{{ getAveragePrice() }}</div>
            <div class="stat-label">平均价格</div>
            <div class="stat-description">课程平均收费标准</div>
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
          <el-form-item label="课程名称">
            <div class="input-wrapper">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" class="input-icon">
                <path d="M12 3L1 9l11 6 9-4.91V17h2V9M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82Z"/>
              </svg>
              <el-input 
                v-model="searchForm.name" 
                placeholder="请输入课程名称" 
                clearable 
              />
            </div>
          </el-form-item>

          <el-form-item label="课程类型">
            <div class="input-wrapper">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" class="input-icon">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
              </svg>
              <el-select 
                v-model="searchForm.type" 
                placeholder="请选择课程类型" 
                clearable
                style="width: 100%;"
              >
                <el-option v-for="type in courseTypes" :key="type.value" :label="type.label" :value="type.value" />
              </el-select>
            </div>
          </el-form-item>

          <el-form-item label="课程状态">
            <el-select 
              v-model="searchForm.status" 
              placeholder="请选择状态" 
              clearable
              class="status-select"
            >
              <el-option label="全部状态" value="" />
              <el-option label="正常" :value="1" />
              <el-option label="禁用" :value="0" />
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

    <!-- 课程内容区域 -->
    <div class="courses-content-section modern-card">
       <div class="content-header">
         <div class="content-title">
           <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
             <path v-if="viewMode === 'grid'" d="M3 3v8h8V3H3zm6 6H5V5h4v4zm-6 4v8h8v-8H3zm6 6H5v-4h4v4zm4-16v8h8V3h-8zm6 6h-4V5h4v4zm-6 4v8h8v-8h-8zm6 6h-4v-4h4v4z"/>
             <path v-else d="M3 14h4v-4H3v4zm0 5h4v-4H3v4zM3 9h4V5H3v4zm5 5h13v-4H8v4zm0 5h13v-4H8v4zM8 5v4h13V5H8z"/>
           </svg>
           <span>{{ viewMode === 'grid' ? '课程卡片' : '课程列表' }} ({{ total }})</span>
         </div>
         <div class="content-actions">
           <el-tooltip content="刷新数据" placement="top">
             <el-button circle @click="loadCourses" class="refresh-btn">
               <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                 <path d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z"/>
               </svg>
             </el-button>
           </el-tooltip>
         </div>
       </div>

       <!-- 卡片网格视图 -->
       <div v-if="viewMode === 'grid'" class="courses-grid" v-loading="loading">
         <div 
           v-for="course in courseList" 
           :key="course.id" 
           class="course-card fade-in-up"
           :style="{ animationDelay: `${(course.id % 6) * 0.1}s` }"
         >
           <!-- 课程封面 -->
           <div class="course-cover-container">
             <div class="course-cover">
               <img 
                 v-if="course.cover" 
                 :src="course.cover" 
                 :alt="course.name"
                 @error="handleImageError"
               />
               <div v-else class="default-cover">
                 <svg viewBox="0 0 24 24" width="48" height="48" fill="currentColor">
                   <path d="M12 3L1 9l11 6 9-4.91V17h2V9M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82Z"/>
                 </svg>
               </div>
             </div>
             <div class="course-status-badge">
               <el-tag 
                 :type="course.status === 1 ? 'success' : 'info'" 
                 size="small"
                 class="status-tag"
               >
                 <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                   <path v-if="course.status === 1" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                   <path v-else d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,6A1.5,1.5 0 0,1 13.5,7.5A1.5,1.5 0 0,1 12,9A1.5,1.5 0 0,1 10.5,7.5A1.5,1.5 0 0,1 12,6M12,17A1,1 0 0,1 11,16V12A1,1 0 0,1 12,11A1,1 0 0,1 13,12V16A1,1 0 0,1 12,17Z"/>
                 </svg>
                 {{ course.status === 1 ? '正常' : '禁用' }}
               </el-tag>
             </div>
           </div>

           <!-- 课程信息 -->
           <div class="course-content">
             <div class="course-header">
               <h3 class="course-title">{{ course.name }}</h3>
               <div class="course-code">{{ course.code }}</div>
             </div>

             <div class="course-meta">
               <div class="course-type">
                 <el-tag size="small" class="type-tag">
                   <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                     <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
                   </svg>
                   {{ course.type || course.category }}
                 </el-tag>
               </div>
               <div class="course-age">
                 <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                   <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                 </svg>
                 {{ course.suitableAge || course.ageRange || '8-16岁' }}
               </div>
             </div>

             <div class="course-details">
               <div class="course-periods">
                 <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                   <path d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z"/>
                 </svg>
                 <span>{{ course.periods || course.duration || '32' }} 课时</span>
               </div>
               <div class="course-price">
                 <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                   <path d="M7,15H9C9,16.08 10.37,17 12,17C13.63,17 15,16.08 15,15C15,13.9 13.96,13.5 11.76,12.97C9.64,12.44 7,11.78 7,9C7,7.21 8.47,5.69 10.5,5.18V3H13.5V5.18C15.53,5.69 17,7.21 17,9H15C15,7.92 13.63,7 12,7C10.37,7 9,7.92 9,9C9,10.1 10.04,10.5 12.24,11.03C14.36,11.56 17,12.22 17,15C17,16.79 15.53,18.31 13.5,18.82V21H10.5V18.82C8.47,18.31 7,16.79 7,15Z"/>
                 </svg>
                 <span class="price">¥{{ course.price || '0' }}</span>
               </div>
             </div>

             <div class="course-description" v-if="course.description">
               <p>{{ course.description }}</p>
             </div>
           </div>

           <!-- 课程操作 -->
           <div class="course-actions">
             <el-tooltip content="编辑课程" placement="top">
               <el-button 
                 size="small" 
                 type="primary" 
                 circle 
                 @click="handleEdit(course)"
                 class="action-btn edit-btn"
               >
                 <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                   <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"/>
                 </svg>
               </el-button>
             </el-tooltip>
             
             <el-tooltip content="上传封面" placement="top">
               <el-button 
                 size="small" 
                 type="info" 
                 circle 
                 @click="handleUploadCover(course)"
                 class="action-btn upload-btn"
               >
                 <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                   <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                 </svg>
               </el-button>
             </el-tooltip>
             
             <el-tooltip :content="course.status === 1 ? '禁用课程' : '启用课程'" placement="top">
               <el-button 
                 size="small" 
                 :type="course.status === 1 ? 'warning' : 'success'" 
                 circle 
                 @click="handleStatusChange(course.id, course.status === 1 ? 0 : 1)"
                 class="action-btn status-btn"
               >
                 <svg v-if="course.status === 1" viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                   <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,6A1.5,1.5 0 0,1 13.5,7.5A1.5,1.5 0 0,1 12,9A1.5,1.5 0 0,1 10.5,7.5A1.5,1.5 0 0,1 12,6M12,17A1,1 0 0,1 11,16V12A1,1 0 0,1 12,11A1,1 0 0,1 13,12V16A1,1 0 0,1 12,17Z"/>
                 </svg>
                 <svg v-else viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                   <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                 </svg>
               </el-button>
             </el-tooltip>
             
             <el-tooltip content="删除课程" placement="top">
               <el-popconfirm
                 title="确定要删除此课程吗？"
                 @confirm="handleDelete(course.id)"
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
         </div>
       </div>

       <!-- 列表视图（保留原有表格但现代化样式） -->
       <div v-else class="table-container" v-loading="loading">
         <el-table 
           :data="courseList" 
           style="width: 100%"
           class="modern-table"
           :row-class-name="getRowClassName"
           @selection-change="handleSelectionChange"
         >
        <el-table-column type="index" width="50" label="#" align="center" />
        <el-table-column prop="name" label="课程名称" width="180">
            <template #default="scope">
            <div class="course-name">
              <el-avatar :size="32" class="course-avatar">
                {{ scope.row.name ? scope.row.name.charAt(0) : '?' }}
              </el-avatar>
              <span>{{ scope.row.name }}</span>
              </div>
            </template>
          </el-table-column>
        <el-table-column prop="code" label="课程编码" width="100" />
        <el-table-column prop="type" label="课程类型" width="100">
            <template #default="scope">
            <el-tag type="info" size="small">{{ scope.row.type || scope.row.category }}</el-tag>
            </template>
          </el-table-column>
        <el-table-column prop="price" label="价格" width="80" align="center">
            <template #default="scope">
            <span class="price-tag" v-if="scope.row.price">¥{{ scope.row.price }}</span>
            <span v-else>-</span>
            </template>
          </el-table-column>
        <el-table-column prop="periods" label="课时数" width="70" align="center">
            <template #default="scope">
            <span>{{ scope.row.periods || scope.row.duration || '32' }}</span>
            </template>
          </el-table-column>
        <el-table-column prop="suitableAge" label="适合年龄" width="100">
            <template #default="scope">
            <span>{{ scope.row.suitableAge || scope.row.ageRange || '8-16岁' }}</span>
            </template>
          </el-table-column>
        <el-table-column prop="cover" label="封面" width="80" align="center">
            <template #default="scope">
            <el-image
              v-if="scope.row.cover"
              :src="scope.row.cover"
              :preview-src-list="[scope.row.cover]"
              fit="cover"
              class="course-cover"
            />
            <span v-else class="no-cover">无封面</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="70" align="center">
          <template #default="scope">
            <el-tag :type="scope.row.status === 1 ? 'success' : 'danger'" size="small">
                {{ scope.row.status === 1 ? '正常' : '禁用' }}
              </el-tag>
            </template>
          </el-table-column>
        <el-table-column label="操作" fixed="right" width="280" align="center">
            <template #default="scope">
            <div class="action-buttons">
              <el-button type="primary" size="small" @click="handleEdit(scope.row)" class="action-btn">
                <el-icon><Edit /></el-icon>
                编辑
                  </el-button>
              <el-button type="info" size="small" @click="handleUploadCover(scope.row)" class="action-btn">
                <el-icon><Upload /></el-icon>
                上传
                  </el-button>
                  <el-button 
              type="success"
                    size="small" 
              v-if="scope.row.status === 0"
              @click="handleStatusChange(scope.row.id, 1)"
                    class="action-btn"
                  >
                <el-icon><Check /></el-icon>
              启用
                  </el-button>
            <el-button
              type="warning"
              size="small"
              v-else
              @click="handleStatusChange(scope.row.id, 0)"
                class="action-btn"
            >
                <el-icon><Close /></el-icon>
              禁用
            </el-button>
              <el-button type="danger" size="small" @click="handleDelete(scope.row.id)" class="action-btn">
                <el-icon><Delete /></el-icon>
                删除
              </el-button>
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
           :page-sizes="[12, 24, 48, 96]"
           :total="total"
           layout="sizes, prev, pager, next, jumper"
           class="modern-pagination"
           @size-change="handleSizeChange"
           @current-change="handleCurrentChange"
         />
       </div>
    </div>
    
    <!-- 添加/编辑课程对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogType === 'add' ? '添加课程' : '编辑课程'"
      width="700px"
    >
      <el-form
        ref="courseFormRef"
        :model="courseForm"
        :rules="courseRules"
        label-width="100px"
      >
        <el-form-item label="课程名称" prop="name">
          <el-input v-model="courseForm.name" placeholder="请输入课程名称" />
        </el-form-item>
        <el-form-item label="课程编码" prop="code">
          <el-input v-model="courseForm.code" placeholder="请输入课程编码" :disabled="dialogType === 'edit'" />
        </el-form-item>
        <el-form-item label="课程类型" prop="type">
          <el-select v-model="courseForm.type" placeholder="请选择课程类型" style="width: 100%">
            <el-option v-for="type in courseTypes" :key="type.value" :label="type.label" :value="type.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="课程价格" prop="price">
          <el-input-number v-model="courseForm.price" :precision="2" :step="0.01" :min="0" style="width: 100%" />
        </el-form-item>
        <el-form-item label="课时数" prop="periods">
          <el-input-number v-model="courseForm.periods" :min="1" :step="1" style="width: 100%" />
        </el-form-item>
        <el-form-item label="适合年龄" prop="suitableAge">
          <el-input v-model="courseForm.suitableAge" placeholder="请输入适合年龄，如：7-12岁" />
        </el-form-item>
        <el-form-item label="适合年级" prop="suitableGrade">
          <el-input v-model="courseForm.suitableGrade" placeholder="请输入适合年级，如：小学1-6年级" />
        </el-form-item>
        <el-form-item label="课程描述" prop="description">
          <el-input
            v-model="courseForm.description"
            type="textarea"
            :rows="3"
            placeholder="请输入课程描述"
          />
        </el-form-item>
        <el-form-item label="课程目标" prop="objective">
          <el-input
            v-model="courseForm.objective"
            type="textarea"
            :rows="3"
            placeholder="请输入课程目标"
          />
        </el-form-item>
        <el-form-item label="课程大纲" prop="outline">
          <el-input
            v-model="courseForm.outline"
            type="textarea"
            :rows="3"
            placeholder="请输入课程大纲"
          />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="courseForm.status">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm" :loading="submitLoading">确定</el-button>
        </span>
      </template>
    </el-dialog>
    
    <!-- 上传封面对话框 -->
    <el-dialog
      v-model="coverDialogVisible"
      title="上传课程封面"
      width="400px"
    >
      <el-upload
        class="cover-uploader"
        :action="`/api/courses/${selectedCourse?.id}/cover`"
        :headers="uploadHeaders"
        :show-file-list="false"
        :on-success="handleCoverSuccess"
        :on-error="handleCoverError"
        :before-upload="beforeCoverUpload"
      >
        <img v-if="coverPreview" :src="coverPreview" class="cover-preview" />
        <el-icon v-else class="cover-uploader-icon"><Plus /></el-icon>
      </el-upload>
      <div class="upload-tips">
        <p>支持jpg、jpeg、png格式，文件大小不超过2MB</p>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="coverDialogVisible = false">关闭</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Plus, Search, Refresh, Edit, Upload, Check, Close, Delete } from '@element-plus/icons-vue';
import api from '../utils/api';
import { useCourseStore } from '../stores/course'
import { useDataSourceStore } from '../stores/dataSource'
const courseStore = useCourseStore()
const dataSourceStore = useDataSourceStore()

// 数据加载状态
const loading = ref(false);
const submitLoading = ref(false);

// 课程类型数量
const courseTypeCount = computed(() => {
  const types = new Set(courseList.value.map(c => c.type));
  return types.size;
});

// 获取平均价格
const getAveragePrice = () => {
  if (courseList.value.length === 0) {
    return 158; // 默认平均价格
  }
  
  // 计算平均价格
  const totalPrice = courseList.value.reduce((sum, course) => {
    const price = parseFloat(course.price) || 0;
    return sum + price;
  }, 0);
  
  const averagePrice = totalPrice / courseList.value.length;
  
  // 返回整数价格
  return Math.round(averagePrice);
};

// 表格数据 - 直接使用store中的数据
const courseList = computed(() => courseStore.getCourses);
const total = computed(() => courseStore.getPagination.total);
const currentPage = ref(1);
const pageSize = ref(10);

// 搜索表单
const searchForm = reactive({
  name: '',
  type: '',
  status: ''
});

// 课程表单
const courseFormRef = ref(null);
const courseForm = reactive({
  id: null,
  name: '',
  code: '',
  type: '',
  description: '',
  objective: '',
  outline: '',
  price: 0,
  periods: 1,
  suitableAge: '',
  suitableGrade: '',
  status: 1
});

// 表单验证规则
const courseRules = {
  name: [
    { required: true, message: '请输入课程名称', trigger: 'blur' },
    { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
  ],
  code: [
    { required: true, message: '请输入课程编码', trigger: 'blur' },
    { pattern: /^[A-Za-z0-9-_]+$/, message: '课程编码只能包含字母、数字、下划线和连字符', trigger: 'blur' }
  ],
  type: [
    { required: true, message: '请选择课程类型', trigger: 'change' }
  ],
  price: [
    { required: true, message: '请输入课程价格', trigger: 'blur' }
  ],
  periods: [
    { required: true, message: '请输入课时数', trigger: 'blur' }
  ]
};

// 对话框控制
const dialogVisible = ref(false);
const dialogType = ref('add'); // 'add' 或 'edit'

// 课程类型选项
const courseTypes = [
  { value: '编程启蒙', label: '编程启蒙' },
  { value: 'GOC', label: 'GOC' },
  { value: 'Scratch', label: 'Scratch' },
  { value: 'Python', label: 'Python' },
  { value: 'Java', label: 'Java' },
  { value: 'C++', label: 'C++' },
  { value: '人工智能', label: '人工智能' },
  { value: '机器人', label: '机器人' },

  { value: '其他', label: '其他' }
];

// 封面上传相关
const coverDialogVisible = ref(false);
const coverPreview = ref('');
const selectedCourse = ref(null);
const uploadHeaders = computed(() => ({
  Authorization: `Bearer ${localStorage.getItem('token')}`
}));

// 获取课程列表 - 使用store方法
const fetchCourses = async () => {
  try {
    const params = {
      page: currentPage.value,
      size: pageSize.value,
      name: searchForm.name || undefined,
      type: searchForm.type || undefined,
      status: searchForm.status !== '' ? searchForm.status : undefined
    };
    
    await courseStore.fetchCourses(params);
    // 数据会通过计算属性自动更新
  } catch (error) {
    console.error('获取课程列表失败:', error);
    ElMessage.error('获取课程列表失败，请稍后重试');
  }
};

// 搜索
const handleSearch = () => {
  currentPage.value = 1;
  fetchCourses();
};

// 重置搜索
const resetSearch = () => {
  Object.keys(searchForm).forEach(key => {
    searchForm[key] = '';
  });
  currentPage.value = 1;
  fetchCourses();
};

// 分页大小变化
const handleSizeChange = (size) => {
  pageSize.value = size;
  currentPage.value = 1;
  fetchCourses();
};

// 页码变化
const handleCurrentChange = (page) => {
  currentPage.value = page;
  fetchCourses();
};

// 显示添加对话框
const showAddDialog = () => {
  dialogType.value = 'add';
  resetForm();
  dialogVisible.value = true;
};

// 显示编辑对话框
const handleEdit = (row) => {
  dialogType.value = 'edit';
  Object.keys(courseForm).forEach(key => {
    courseForm[key] = row[key];
  });
  dialogVisible.value = true;
};

// 重置表单
const resetForm = () => {
  if (courseFormRef.value) {
    courseFormRef.value.resetFields();
  }
  Object.assign(courseForm, {
    id: null,
    name: '',
    code: '',
    type: '',
    description: '',
    objective: '',
    outline: '',
    price: 0,
    periods: 1,
    suitableAge: '',
    suitableGrade: '',
    status: 1
  });
};

// 提交表单
const submitForm = async () => {
  if (!courseFormRef.value) return;
  
  await courseFormRef.value.validate(async (valid) => {
    if (!valid) return;
    
    submitLoading.value = true;
    try {
      if (dialogType.value === 'add') {
        // 创建课程
        await courseStore.addCourse(courseForm);
        ElMessage.success('添加成功');
        // 重新获取数据以确保列表更新
        await fetchCourses();
      } else {
        // 更新课程
        await courseStore.updateCourse(courseForm.id, courseForm);
        ElMessage.success('更新成功');
        // 重新获取数据以确保列表更新
        await fetchCourses();
      }
      
      dialogVisible.value = false;
    } catch (error) {
      console.error('操作失败:', error);
      ElMessage.error(error.message || '操作失败，请稍后重试');
    } finally {
      submitLoading.value = false;
    }
  });
};

// 更改课程状态
const handleStatusChange = async (id, status) => {
  try {
    await courseStore.updateCourseStatus(id, status);
    ElMessage.success(`${status === 1 ? '启用' : '禁用'}成功`);
    // 不需要重新获取数据，因为updateCourseStatus已经更新了本地数据
  } catch (error) {
    console.error('更改状态失败:', error);
    ElMessage.error('更改状态失败，请稍后重试');
  }
};

// 删除课程
const handleDelete = (id) => {
  ElMessageBox.confirm('确定要删除该课程吗？此操作不可恢复', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    try {
      await courseStore.deleteCourse(id);
      ElMessage.success('删除成功');
      fetchCourses();
    } catch (error) {
      console.error('删除失败:', error);
      ElMessage.error('删除失败，请稍后重试');
    }
  }).catch(() => {});
};

// 显示上传封面对话框
const handleUploadCover = (row) => {
  selectedCourse.value = row;
  coverPreview.value = row.cover || '';
  coverDialogVisible.value = true;
};

// 封面上传前的验证
const beforeCoverUpload = (file) => {
  const isValidType = ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type);
  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isValidType) {
    ElMessage.error('封面只能是JPG、JPEG或PNG格式!');
    return false;
  }
  if (!isLt2M) {
    ElMessage.error('封面大小不能超过2MB!');
    return false;
  }
  return true;
};

// 封面上传成功
const handleCoverSuccess = (response) => {
  if (response.code === 200) {
    coverPreview.value = response.data;
    ElMessage.success('封面上传成功');
    fetchCourses();
  } else {
    ElMessage.error(response.message || '封面上传失败');
  }
};

// 封面上传失败
const handleCoverError = (error) => {
  console.error('封面上传失败:', error);
  ElMessage.error('封面上传失败，请稍后重试');
};

onMounted(async () => {
  console.log('课程页面挂载，开始加载数据');
  // 确保数据源设置为mock模式
  if (window.useDataSourceStore) {
    const dataSourceStore = window.useDataSourceStore();
    dataSourceStore.forceMockMode();
  }
  // 强制初始化课程数据
  await courseStore.fetchCourses();
  await fetchCourses();
  console.log('课程数据加载完成，当前课程数量:', courseList.value.length);
});
</script>

<style scoped>
/* 课程管理页面样式 */
.course-page-container {
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

.stat-card.total-courses::before {
  background: linear-gradient(90deg, #8b5cf6, #7c3aed);
}

.stat-card.active-courses::before {
  background: linear-gradient(90deg, #10b981, #059669);
}

.stat-card.course-types::before {
  background: linear-gradient(90deg, #f59e0b, #d97706);
}

.stat-card.avg-price::before {
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

.type-icon {
  background: linear-gradient(135deg, #f59e0b, #d97706);
}

.price-icon {
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

/* 课程内容区域 */
.courses-content-section {
  background: white;
  padding: 24px;
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border-light);
}

.content-title {
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

/* 课程卡片网格 */
.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  margin-bottom: 24px;
}

.course-card {
  background: white;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-light);
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;
}

.course-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.course-cover-container {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.course-cover {
  width: 100%;
  height: 100%;
  background: var(--bg-tertiary);
  display: flex;
  align-items: center;
  justify-content: center;
}

.course-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.default-cover {
  color: var(--text-light);
  background: linear-gradient(135deg, #f8fafc, #f1f5f9);
}

.course-status-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 2;
}

.status-tag {
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: var(--radius-lg);
  backdrop-filter: blur(10px);
}

.course-content {
  padding: 20px;
}

.course-header {
  margin-bottom: 16px;
}

.course-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 8px 0;
  line-height: 1.3;
}

.course-code {
  font-size: var(--font-size-sm);
  color: var(--text-light);
  font-family: 'Courier New', monospace;
  background: var(--bg-tertiary);
  padding: 2px 8px;
  border-radius: var(--radius-sm);
  display: inline-block;
}

.course-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.course-type .type-tag {
  background: rgba(245, 158, 11, 0.1);
  color: var(--warning-color);
  border: 1px solid rgba(245, 158, 11, 0.2);
  border-radius: var(--radius-md);
  font-size: var(--font-size-xs);
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
}

.course-age {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.course-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 12px;
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
}

.course-periods,
.course-price {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.course-price .price {
  font-weight: 600;
  color: var(--error-color);
  font-size: var(--font-size-md);
}

.course-description {
  margin-bottom: 16px;
}

.course-description p {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  line-height: 1.5;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.course-actions {
  display: flex;
  gap: 8px;
  justify-content: center;
  padding: 16px 20px 20px;
  background: var(--bg-secondary);
  border-top: 1px solid var(--border-light);
}

.action-btn {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-light);
  transition: var(--transition-fast);
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

.upload-btn {
  background: rgba(6, 182, 212, 0.1);
  color: var(--info-color);
  border-color: rgba(6, 182, 212, 0.2);
}

.upload-btn:hover {
  background: var(--info-color);
  color: white;
  border-color: var(--info-color);
}

.status-btn {
  background: rgba(245, 158, 11, 0.1);
  color: var(--warning-color);
  border-color: rgba(245, 158, 11, 0.2);
}

.status-btn:hover {
  background: var(--warning-color);
  color: white;
  border-color: var(--warning-color);
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

/* 表格视图样式 */
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

.course-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.course-avatar {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--bg-tertiary);
  display: flex;
  align-items: center;
  justify-content: center;
}

.course-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.course-details {
  flex: 1;
}

.course-name {
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 2px;
}

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

.price-display {
  font-weight: 600;
  color: var(--error-color);
}

.table-action-buttons {
  display: flex;
  gap: 6px;
  justify-content: center;
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
  
  .courses-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .course-page-container {
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
  
  .courses-grid {
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
  
  .course-details {
    flex-direction: column;
    gap: 8px;
  }
  
  .course-actions {
    gap: 6px;
  }
  
  .action-buttons {
    flex-direction: column;
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
  
  .stat-number {
    font-size: 28px;
  }
  
  .course-cover-container {
    height: 160px;
  }
  
  .course-content {
    padding: 16px;
  }
  
  .course-actions {
    padding: 12px 16px 16px;
  }
 }
</style> 