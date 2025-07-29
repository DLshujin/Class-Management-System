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
    
    <!-- 统计概览卡片 -->
    <div class="stats-overview">
      <div class="stats-grid">
        <div class="stat-card total-students fade-in-up">
          <div class="stat-header">
            <div class="stat-icon total-icon">
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
          <div class="stat-number">{{ total }}</div>
            <div class="stat-label">学员总数</div>
            <div class="stat-description">系统中注册的所有学员</div>
        </div>
      </div>

        <div class="stat-card active-students fade-in-up" style="animation-delay: 0.1s">
          <div class="stat-header">
            <div class="stat-icon active-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 4L13.5 7H10.5L9 4L3 7V9H21Z"/>
              </svg>
            </div>
            <div class="trend-badge positive">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
          </div>
          <div class="stat-body">
          <div class="stat-number">{{ studentList.filter(s => s.status === 1).length }}</div>
            <div class="stat-label">活跃学员</div>
            <div class="stat-description">当前正在学习的学员</div>
        </div>
      </div>

        <div class="stat-card new-students fade-in-up" style="animation-delay: 0.2s">
          <div class="stat-header">
            <div class="stat-icon new-icon">
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
          <div class="stat-number">{{ newStudentsCount }}</div>
          <div class="stat-label">本月新增</div>
            <div class="stat-description">本月新注册的学员</div>
          </div>
        </div>

        <div class="stat-card completion-rate fade-in-up" style="animation-delay: 0.3s">
          <div class="stat-header">
            <div class="stat-icon completion-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
            </div>
            <div class="trend-badge positive">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
              </svg>
            </div>
          </div>
          <div class="stat-body">
            <div class="stat-number">{{ getCompletionRate() }}%</div>
            <div class="stat-label">课程完成率</div>
            <div class="stat-description">平均课程完成进度</div>
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
          <el-button text @click="resetFilters" class="reset-btn">
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
              <el-button type="primary" @click="onSearch" class="search-btn modern-btn primary">
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
                  {{ scope.row.name.charAt(0) }}
              </el-avatar>
                <div class="student-details">
                  <div class="student-name">{{ scope.row.name }}</div>
                  <div class="student-meta">年龄: {{ scope.row.age }}岁</div>
                </div>
            </div>
          </template>
        </el-table-column>

          <el-table-column prop="parentPhone" label="联系方式" width="160">
          <template #default="scope">
              <div class="contact-info">
                <div class="phone-number">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                    <path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z"/>
                  </svg>
                  {{ scope.row.parentPhone }}
                </div>
              </div>
          </template>
        </el-table-column>

          <el-table-column prop="courses" label="课程信息" min-width="200">
          <template #default="scope">
              <div class="course-info">
                <div class="course-tags">
                  <el-tag 
                    v-for="course in scope.row.courses?.slice(0, 2)" 
                    :key="course" 
                    size="small" 
                    class="course-tag"
                  >
                    {{ course }}
                  </el-tag>
                  <el-tag v-if="scope.row.courses?.length > 2" size="small" type="info">
                    +{{ scope.row.courses.length - 2 }}
                  </el-tag>
                </div>
              </div>
          </template>
        </el-table-column>

          <el-table-column prop="status" label="状态" width="120" sortable>
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

          <el-table-column prop="enrollDate" label="入学时间" width="120" sortable>
          <template #default="scope">
              <div class="date-info">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                  <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.1 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
                </svg>
                {{ formatDate(scope.row.enrollDate) }}
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
            >
              <el-option 
                v-for="course in availableCourses" 
                :key="course.id" 
                :label="course.name" 
                :value="course.name"
              />
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
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Plus, Download, Search, Refresh, Edit, Check, Close, Delete } from '@element-plus/icons-vue';
import api from '../utils/api';
import { useStudentStore } from '../stores/student'
const studentStore = useStudentStore()

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

// 表格数据 - 直接使用store中的数据
const studentList = computed(() => studentStore.getStudents);
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

// 学生表单
const studentFormRef = ref(null);
const studentForm = reactive({
  id: null,
  name: '',
  gender: 1,
  birthday: null,
  school: '',
  grade: '',
  parentName: '',
  parentPhone: '',
  parentWechat: '',
  address: '',
  remark: '',
  status: 1
});

// 表单验证规则
const studentRules = {
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
  ],
  parentName: [
    { required: true, message: '请输入家长姓名', trigger: 'blur' }
  ],
  parentPhone: [
    { required: true, message: '请输入家长电话', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
  ]
};

// 对话框控制
const dialogVisible = ref(false);
const dialogType = ref('add'); // 'add' 或 'edit'

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
    console.error('获取学生列表失败:', error);
    ElMessage.error('获取学生列表失败，请稍后重试');
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
};

// 显示编辑对话框
const handleEdit = (row) => {
  dialogType.value = 'edit';
  Object.keys(studentForm).forEach(key => {
    studentForm[key] = row[key];
  });
  dialogVisible.value = true;
};

// 重置表单
const resetForm = () => {
  if (studentFormRef.value) {
    studentFormRef.value.resetFields();
  }
  Object.assign(studentForm, {
    id: null,
    name: '',
    gender: 1,
    birthday: null,
    school: '',
    grade: '',
    parentName: '',
    parentPhone: '',
    parentWechat: '',
    address: '',
    remark: '',
    status: 1
  });
};

// 提交表单
const submitForm = async () => {
  if (!studentFormRef.value) return;
  
  await studentFormRef.value.validate(async (valid) => {
    if (!valid) return;
    
    submitLoading.value = true;
    try {
      if (dialogType.value === 'add') {
        // 创建学生
        await studentStore.addStudent(studentForm);
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
      console.error('操作失败:', error);
      ElMessage.error(error.message || '操作失败，请稍后重试');
    } finally {
      submitLoading.value = false;
    }
  });
};

// 更改学生状态
const handleStatusChange = async (id, status) => {
  try {
    await studentStore.updateStudent(id, { status });
    ElMessage.success(`${status === 1 ? '启用' : '禁用'}成功`);
    fetchStudents();
  } catch (error) {
    console.error('更改状态失败:', error);
    ElMessage.error('更改状态失败，请稍后重试');
  }
};

// 删除学生
const handleDelete = (id) => {
  ElMessageBox.confirm('确定要删除该学生吗？此操作不可恢复', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    try {
      await studentStore.deleteStudent(id);
      ElMessage.success('删除成功');
      fetchStudents();
    } catch (error) {
      console.error('删除失败:', error);
      ElMessage.error('删除失败，请稍后重试');
    }
  }).catch(() => {});
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
/* 学员管理页面样式 */
.student-page-container {
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