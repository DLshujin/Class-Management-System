<template>
  <div class="schedule-container">
    <!-- 🎯 现代化顶部区域 -->
    <div class="schedule-header">
      <div class="header-banner">
        <div class="banner-content">
          <div class="banner-left">
            <div class="page-icon">
              <svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor">
                <path d="M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5A2,2 0 0,1 5,3H6V1H8V3H16V1H18V3H19M19,19V8H5V19H19M9,10V12H7V10H9M13,10V12H11V10H13M17,10V12H15V10H17M9,14V16H7V14H9M13,14V16H11V14H13M17,14V16H15V14H17Z"/>
              </svg>
            </div>
            <div class="page-info">
              <h1 class="page-title">智能排课系统</h1>
              <p class="page-description">高效管理课程安排，优化教学资源配置</p>
              <div class="page-stats">
                <span class="stat-item">
                  <span class="stat-number">{{ scheduleStore.getSchedules?.length || 0 }}</span>
                  <span class="stat-label">本周课程</span>
                </span>
                <span class="stat-item">
                  <span class="stat-number">{{ activeClassrooms }}</span>
                  <span class="stat-label">活跃教室</span>
                </span>
                <span class="stat-item">
                  <span class="stat-number">{{ todaySchedules }}</span>
                  <span class="stat-label">今日安排</span>
                </span>
              </div>
            </div>
          </div>
          <div class="banner-right">
            <div class="quick-actions">
              <el-button type="primary" class="action-btn primary" @click="showSmartScheduleDialog = true">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7H14A7,7 0 0,1 21,14H22A1,1 0 0,1 23,15V18A1,1 0 0,1 22,19H21V20A2,2 0 0,1 19,22H5A2,2 0 0,1 3,20V19H2A1,1 0 0,1 1,18V15A1,1 0 0,1 2,14H3A7,7 0 0,1 10,7H11V5.73C10.4,5.39 10,4.74 10,4A2,2 0 0,1 12,2M7.5,13A2.5,2.5 0 0,0 5,15.5A2.5,2.5 0 0,0 7.5,18A2.5,2.5 0 0,0 10,15.5A2.5,2.5 0 0,0 7.5,13M16.5,13A2.5,2.5 0 0,0 14,15.5A2.5,2.5 0 0,0 16.5,18A2.5,2.5 0 0,0 19,15.5A2.5,2.5 0 0,0 16.5,13Z"/>
                </svg>
                智能排课
              </el-button>
              <el-button type="primary" class="action-btn primary" @click="showBatchScheduleDialog = true">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"/>
                </svg>
                批量排课
              </el-button>
              <el-button type="info" class="action-btn" @click="exportSchedule">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                </svg>
                导出课表
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 🎮 智能控制面板 -->
    <div class="control-panel">
      <div class="panel-section view-controls">
        <div class="section-title">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.9L16.2,16.2Z"/>
          </svg>
          <span>视图模式</span>
        </div>
        <el-radio-group v-model="viewType" class="view-radio-group" @change="switchView">
          <el-radio-button label="month" class="view-radio">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5A2,2 0 0,1 5,3H6V1H8V3H16V1H18V3H19M19,19V8H5V19H19M9,10V12H7V10H9M13,10V12H11V10H13M17,10V12H15V10H17M9,14V16H7V14H9M13,14V16H11V14H13M17,14V16H15V14H17Z"/>
            </svg>
            月视图
          </el-radio-button>
          <el-radio-button label="week" class="view-radio">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M6,1V3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3H18V1H16V3H8V1H6M5,8H19V19H5V8M7,10V12H9V10H7M11,10V12H13V10H11M15,10V12H17V10H15Z"/>
            </svg>
            周视图
          </el-radio-button>

        </el-radio-group>
      </div>

      <div class="panel-section date-navigation">
        <div class="section-title">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M15,13H16.5V15.82L18.94,17.23L18.19,18.53L15,16.69V13M19,8H5V19H9.67C9.24,18.09 9,17.07 9,16A7,7 0 0,1 16,9C17.07,9 18.09,9.24 19,9.67V8M5,21C3.89,21 3,20.1 3,19V5C3.89,5 4.89,5 6,5H7V3H9V5H15V3H17V5H18C19.1,5 20,5.89 20,7V10.68C21.36,12.36 22,14.61 22,17A6,6 0 0,1 16,23C14.61,23 13.36,22.36 12.32,21H5M16,11.15A4.85,4.85 0 0,0 11.15,16C11.15,18.68 13.32,20.85 16,20.85A4.85,4.85 0 0,0 20.85,16C20.85,13.32 18.68,11.15 16,11.15Z"/>
          </svg>
          <span>日期导航</span>
        </div>
        <div class="date-controls">
          <el-button @click="previousPeriod" class="nav-btn">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"/>
            </svg>
          </el-button>
          <div class="current-period">{{ currentPeriodText }}</div>
          <el-button @click="nextPeriod" class="nav-btn">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/>
            </svg>
          </el-button>
                        <el-button @click="goToToday" type="primary" class="today-btn">今天</el-button>
        </div>
      </div>

      <div class="panel-section course-legend">
        <div class="section-title">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7H14A7,7 0 0,1 21,14H22A1,1 0 0,1 23,15V18A1,1 0 0,1 22,19H21V20A2,2 0 0,1 19,22H5A2,2 0 0,1 3,20V19H2A1,1 0 0,1 1,18V15A1,1 0 0,1 2,14H3A7,7 0 0,1 10,7H11V5.73C10.4,5.39 10,4.74 10,4A2,2 0 0,1 12,2M7.5,13A2.5,2.5 0 0,0 5,15.5A2.5,2.5 0 0,0 7.5,18A2.5,2.5 0 0,0 10,15.5A2.5,2.5 0 0,0 7.5,13M16.5,13A2.5,2.5 0 0,0 14,15.5A2.5,2.5 0 0,0 16.5,18A2.5,2.5 0 0,0 19,15.5A2.5,2.5 0 0,0 16.5,13Z"/>
          </svg>
          <span>课程分类</span>
        </div>
        <div class="legend-grid">
          <div class="legend-item python">
            <div class="legend-color"></div>
            <span class="legend-text">Python基础</span>
          </div>
          <div class="legend-item java">
            <div class="legend-color"></div>
            <span class="legend-text">Java开发</span>
          </div>
          <div class="legend-item ai">
            <div class="legend-color"></div>
            <span class="legend-text">人工智能</span>
          </div>
          <div class="legend-item web">
            <div class="legend-color"></div>
            <span class="legend-text">Web前端</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 现代化日历视图 -->
    <div class="calendar-container modern-card">
      <!-- 月视图 -->
      <div v-if="viewType === 'month'" class="month-view">
        <div class="month-header">
          <div class="weekday-headers">
            <div v-for="day in weekdayNames" :key="day" class="weekday-header">
              {{ day }}
            </div>
          </div>
        </div>
        <div class="month-body">
          <div v-for="week in monthWeeks" :key="week.weekNum" class="week-row">
            <div 
              v-for="day in week.days" 
              :key="day.date" 
              class="day-cell" 
              :class="getDayCellClass(day)"
              @click="selectDay(day)"
            >
              <div class="day-header">
                <span class="day-number">{{ day.dayNumber }}</span>
                <div class="day-badges">
                  <span v-if="day.isToday" class="today-badge">今天</span>
                  <span v-if="day.schedules.length > 0" class="schedule-count-badge">
                    {{ day.schedules.length }}
                  </span>
                </div>
              </div>
              <div class="day-schedules">
                <div 
                  v-for="(schedule, index) in day.schedules.slice(0, 3)" 
                  :key="schedule.id" 
                  class="schedule-item" 
                  :class="[getScheduleItemClass(schedule), { 'attendance-completed': isAttendanceCompleted(schedule) }]"
                >
                  <div class="schedule-content">
                    <div class="schedule-time">{{ formatTime(schedule.startTime) }}</div>
                    <div class="schedule-title">{{ schedule.courseName }}</div>
                    <div class="schedule-meta">
                      <span class="teacher">{{ schedule.teacherName }}</span>
                      <span class="location">{{ schedule.classroom }}</span>
                    </div>
                    <!-- 点名状态标记 -->
                    <div v-if="isAttendanceCompleted(schedule)" class="attendance-badge completed">
                      <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                        <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/>
                      </svg>
                      已点名
                    </div>
                  </div>
                  <div class="month-schedule-actions">
                    <el-button 
                      size="small" 
                      :type="isAttendanceCompleted(schedule) ? 'success' : 'primary'" 
                      @click.stop="handleAttendanceClick(schedule)" 
                      :title="isAttendanceCompleted(schedule) ? '查看点名' : '开始点名'"
                    >
                      <svg viewBox="0 0 24 24" width="10" height="10" fill="currentColor">
                        <path v-if="!isAttendanceCompleted(schedule)" d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,14L18,7L16.59,5.59L11,11.17L7.41,7.59L6,9L11,14Z"/>
                        <path v-else d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,14L18,7L16.59,5.59L11,11.17L7.41,7.59L6,9L11,14Z"/>
                      </svg>
                    </el-button>
                    <el-button size="small" @click.stop="editSchedule(schedule)" title="编辑">
                      <svg viewBox="0 0 24 24" width="10" height="10" fill="currentColor">
                        <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"/>
                      </svg>
                    </el-button>
                  </div>
                </div>
                <div v-if="day.schedules.length > 3" class="more-schedules" @click.stop="showDayDetail(day)">
                  +{{ day.schedules.length - 3 }} 更多
                </div>
                <div v-if="day.schedules.length === 0" class="no-schedule-hint">
                  暂无课程
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 周视图 -->
      <div v-else-if="viewType === 'week'" class="week-view">
        <!-- 周视图表头 -->
        <div class="week-grid-header">
          <div class="time-header-cell">时间</div>
          <div 
            v-for="day in weekDays" 
            :key="day.date" 
            class="day-header-cell"
            :class="{ 'today': day.isToday }"
          >
            <div class="day-info">
              <div class="day-name">{{ day.dayName }}</div>
              <div class="day-date">{{ day.dayNumber }}</div>
              <div v-if="day.isToday" class="today-badge">今天</div>
            </div>
          </div>
        </div>
        
        <!-- 周视图内容网格 -->
        <div class="week-grid-body">
          <div v-for="hour in [9, 10, 14, 15, 19, 20]" :key="hour" class="week-time-row">
            <div class="time-cell">
              <span class="time-text">{{ formatHour(hour) }}</span>
            </div>
            <div 
              v-for="day in weekDays" 
              :key="`${day.date}-${hour}`" 
              class="schedule-cell"
              @click="addScheduleAtTime(day, hour)"
            >
              <div 
                v-for="schedule in getSchedulesForDayHour(day, hour)" 
                :key="schedule.id"
                class="week-schedule-card"
                :class="getScheduleItemClass(schedule)"
              >
                <div class="schedule-header">
                  <span class="schedule-time">{{ formatTime(schedule.startTime) }}</span>
                  <span class="schedule-duration">{{ formatTime(schedule.endTime) }}</span>
                </div>
                <div class="schedule-content">
                  <div class="course-name">{{ schedule.courseName }}</div>
                  <div class="schedule-details">
                    <span class="teacher">{{ schedule.teacherName }}</span>
                    <span class="location">{{ schedule.classroom }}</span>
                  </div>
                  <div class="week-schedule-actions">
                    <el-button size="small" type="primary" @click.stop="openAttendance(schedule)" title="点名">
                      <svg viewBox="0 0 24 24" width="10" height="10" fill="currentColor">
                        <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,14L18,7L16.59,5.59L11,11.17L7.41,7.59L6,9L11,14Z"/>
                      </svg>
                    </el-button>
                    <el-button size="small" @click.stop="editSchedule(schedule)" title="编辑">
                      <svg viewBox="0 0 24 24" width="10" height="10" fill="currentColor">
                        <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"/>
                      </svg>
                    </el-button>
                  </div>
                </div>
              </div>
              <div v-if="getSchedulesForDayHour(day, hour).length === 0" class="empty-slot">
                <span class="add-hint">+</span>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>

    <!-- 添加/编辑排课对话框 -->
    <el-dialog
      :title="dialogTitle"
      v-model="scheduleDialogVisible"
      width="600px"
      class="modern-dialog"
    >
      <el-form
        ref="scheduleFormRef"
        :model="scheduleForm"
        :rules="rules"
        label-width="100px"
        class="modern-form"
      >
        <el-form-item label="课程" prop="courseId">
          <el-select
            v-model="scheduleForm.courseId"
            placeholder="请选择课程"
            style="width: 100%"
            @change="handleCourseChange"
          >
            <el-option
              v-for="course in courses"
              :key="course.id"
              :label="course.name"
              :value="course.id"
            />
          </el-select>
        </el-form-item>
        
        <el-form-item label="班级" prop="classId">
          <el-select
            v-model="scheduleForm.classId"
            placeholder="请选择班级"
            style="width: 100%"
            @change="handleClassChange"
          >
            <el-option
              v-for="classItem in classes"
              :key="classItem.id"
              :label="classItem.name"
              :value="classItem.id"
            />
          </el-select>
        </el-form-item>
        
        <el-form-item label="教师" prop="teacherId">
          <el-select
            v-model="scheduleForm.teacherId"
            placeholder="请选择教师"
            style="width: 100%"
            @change="handleTeacherChange"
          >
            <el-option
              v-for="teacher in teachers"
              :key="teacher.id"
              :label="teacher.name"
              :value="teacher.id"
            />
          </el-select>
        </el-form-item>
        
        <el-form-item label="上课日期" prop="scheduleDate">
          <el-date-picker
            v-model="scheduleForm.scheduleDate"
            type="date"
            placeholder="选择日期"
            style="width: 100%"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        
        <el-form-item label="上课时间" prop="timeRange">
          <el-time-picker
            v-model="scheduleForm.timeRange"
            is-range
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            format="HH:mm"
            value-format="HH:mm:ss"
            style="width: 100%"
          />
        </el-form-item>
        
        <el-form-item label="教室/地点" prop="location">
          <el-input
            v-model="scheduleForm.location"
            placeholder="请输入教室或地点"
          />
        </el-form-item>
        
        <el-form-item label="课时数" prop="periods">
          <el-input-number
            v-model="scheduleForm.periods"
            :min="1"
            :max="10"
            style="width: 100%"
          />
        </el-form-item>
        
        <el-form-item label="状态">
          <el-radio-group v-model="scheduleForm.status">
            <el-radio :label="0">正常</el-radio>
            <el-radio :label="1">取消</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="scheduleDialogVisible = false">取消</el-button>
          <el-button v-if="scheduleForm.id" type="danger" @click="deleteSchedule">
            删除
          </el-button>
          <el-button type="primary" @click="saveSchedule">
            {{ scheduleForm.id ? '更新' : '创建' }}
          </el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 批量排课对话框 -->
    <el-dialog
      title="批量排课"
      v-model="showBatchScheduleDialog"
      width="700px"
      class="modern-dialog"
    >
      <el-form
        ref="batchScheduleFormRef"
        :model="batchScheduleForm"
        :rules="batchRules"
        label-width="120px"
        class="modern-form"
      >
        <el-form-item label="课程" prop="courseId">
          <el-select
            v-model="batchScheduleForm.courseId"
            placeholder="请选择课程"
            style="width: 100%"
            @change="handleBatchCourseChange"
          >
            <el-option
              v-for="course in courses"
              :key="course.id"
              :label="course.name"
              :value="course.id"
            />
          </el-select>
        </el-form-item>
        
        <el-form-item label="班级" prop="classId">
          <el-select
            v-model="batchScheduleForm.classId"
            placeholder="请选择班级"
            style="width: 100%"
            @change="handleBatchClassChange"
          >
            <el-option
              v-for="classItem in classes"
              :key="classItem.id"
              :label="classItem.name"
              :value="classItem.id"
            />
          </el-select>
        </el-form-item>
        
        <el-form-item label="教师" prop="teacherId">
          <el-select
            v-model="batchScheduleForm.teacherId"
            placeholder="请选择教师"
            style="width: 100%"
            @change="handleBatchTeacherChange"
          >
            <el-option
              v-for="teacher in teachers"
              :key="teacher.id"
              :label="teacher.name"
              :value="teacher.id"
            />
          </el-select>
        </el-form-item>
        
        <el-form-item label="日期范围" prop="dateRange">
          <el-date-picker
            v-model="batchScheduleForm.dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 100%"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        
        <el-form-item label="上课时间" prop="timeRange">
          <el-time-picker
            v-model="batchScheduleForm.timeRange"
            is-range
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            format="HH:mm"
            value-format="HH:mm:ss"
            style="width: 100%"
          />
        </el-form-item>
        
        <el-form-item label="重复方式" prop="repeatType">
          <el-radio-group v-model="batchScheduleForm.repeatType">
            <el-radio label="weekly">每周</el-radio>
            <el-radio label="daily">每天</el-radio>
          </el-radio-group>
        </el-form-item>
        
        <el-form-item v-if="batchScheduleForm.repeatType === 'weekly'" label="重复星期" prop="repeatDays">
          <el-checkbox-group v-model="batchScheduleForm.repeatDays">
            <el-checkbox label="1">周一</el-checkbox>
            <el-checkbox label="2">周二</el-checkbox>
            <el-checkbox label="3">周三</el-checkbox>
            <el-checkbox label="4">周四</el-checkbox>
            <el-checkbox label="5">周五</el-checkbox>
            <el-checkbox label="6">周六</el-checkbox>
            <el-checkbox label="0">周日</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        
        <el-form-item label="教室/地点" prop="location">
          <el-input
            v-model="batchScheduleForm.location"
            placeholder="请输入教室或地点"
          />
        </el-form-item>
        
        <el-form-item label="每节课时数" prop="periods">
          <el-input-number
            v-model="batchScheduleForm.periods"
            :min="1"
            :max="10"
            style="width: 100%"
          />
        </el-form-item>
      </el-form>
      
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="showBatchScheduleDialog = false">取消</el-button>
          <el-button @click="resetBatchForm">重置</el-button>
          <el-button type="primary" @click="submitBatchSchedule">
            确认批量排课
          </el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 🤖 智能排课对话框 -->
    <el-dialog
      title="🤖 智能排课系统"
      v-model="showSmartScheduleDialog"
      width="800px"
      class="modern-dialog smart-schedule-dialog"
    >
      <div class="smart-schedule-content">
        <!-- 课程选择卡片 -->
        <div class="schedule-section">
          <div class="section-header">
            <div class="section-icon">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M12,3L1,9L12,15L21,10.09V17H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z"/>
              </svg>
            </div>
            <h3>选择要排课的课程</h3>
            <p>系统将自动根据课程、教师、学生信息进行智能排课</p>
          </div>
          
          <div class="course-cards">
            <div 
              v-for="course in courses" 
              :key="course.id"
              :class="['course-card', { active: smartScheduleForm.selectedCourses.includes(course.id) }]"
              @click="toggleCourseSelection(course.id)"
            >
              <div class="course-header">
                <div class="course-name">{{ course.name }}</div>
                <div class="course-type">{{ course.type }}</div>
              </div>
              <div class="course-details">
                <div class="detail-item">
                  <span class="label">教师：</span>
                  <span class="value">{{ course.teacherName }}</span>
                </div>
                <div class="detail-item">
                  <span class="label">年龄：</span>
                  <span class="value">{{ course.ageRange }}</span>
                </div>
                <div class="detail-item">
                  <span class="label">课时：</span>
                  <span class="value">{{ course.duration }}课时</span>
                </div>
                <div class="detail-item">
                  <span class="label">价格：</span>
                  <span class="value">¥{{ course.price }}</span>
                </div>
              </div>
              <div class="selection-indicator">
                <svg v-if="smartScheduleForm.selectedCourses.includes(course.id)" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- 排课参数设置 -->
        <div class="schedule-section">
          <div class="section-header">
            <div class="section-icon">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z"/>
              </svg>
            </div>
            <h3>智能排课设置</h3>
            <p>设置排课的时间范围和偏好</p>
          </div>
          
          <el-form :model="smartScheduleForm" label-width="120px" class="smart-form">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="开始日期">
                  <el-date-picker
                    v-model="smartScheduleForm.startDate"
                    type="date"
                    placeholder="选择开始日期"
                    style="width: 100%"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="结束日期">
                  <el-date-picker
                    v-model="smartScheduleForm.endDate"
                    type="date"
                    placeholder="选择结束日期"
                    style="width: 100%"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            
            <el-form-item label="优先时间段">
              <el-checkbox-group v-model="smartScheduleForm.preferredTimes">
                <el-checkbox label="morning">上午 (09:00-12:00)</el-checkbox>
                <el-checkbox label="afternoon">下午 (14:00-17:00)</el-checkbox>
                <el-checkbox label="evening">晚上 (19:00-21:00)</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            
            <el-form-item label="可用星期">
              <el-checkbox-group v-model="smartScheduleForm.availableDays">
                <el-checkbox label="1">周一</el-checkbox>
                <el-checkbox label="2">周二</el-checkbox>
                <el-checkbox label="3">周三</el-checkbox>
                <el-checkbox label="4">周四</el-checkbox>
                <el-checkbox label="5">周五</el-checkbox>
                <el-checkbox label="6">周六</el-checkbox>
                <el-checkbox label="0">周日</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            
            <el-form-item label="避免冲突">
              <el-switch
                v-model="smartScheduleForm.avoidConflicts"
                active-text="自动避免时间冲突"
                inactive-text="允许时间重叠"
              />
            </el-form-item>
            
            <el-form-item label="最大课程密度">
              <el-slider
                v-model="smartScheduleForm.maxDensity"
                :min="1"
                :max="5"
                :marks="densityMarks"
                show-stops
              />
            </el-form-item>
          </el-form>
        </div>

        <!-- 预览结果 -->
        <div class="schedule-section" v-if="smartSchedulePreview.length > 0">
          <div class="section-header">
            <div class="section-icon">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M11,17V16H13V17H11M11,15V7H13V15H11Z"/>
              </svg>
            </div>
            <h3>智能排课预览</h3>
            <p>以下是系统为您生成的排课方案，共 {{ smartSchedulePreview.length }} 节课</p>
          </div>
          
          <div class="preview-cards">
            <div 
              v-for="(schedule, index) in smartSchedulePreview" 
              :key="index"
              class="preview-card"
            >
              <div class="schedule-date">
                {{ formatScheduleDate(schedule.date) }}
                <span class="day-name">{{ getDayName(schedule.dayOfWeek) }}</span>
              </div>
              <div class="schedule-content">
                <div class="course-info">
                  <h4>{{ schedule.courseName }}</h4>
                  <p>{{ schedule.className }}</p>
                </div>
                <div class="schedule-meta">
                  <span class="time">{{ schedule.startTime }} - {{ schedule.endTime }}</span>
                  <span class="teacher">{{ schedule.teacherName }}</span>
                  <span class="classroom">{{ schedule.classroom }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="showSmartScheduleDialog = false">取消</el-button>
          <el-button @click="generateSmartSchedule" :loading="smartScheduleLoading">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7H14A7,7 0 0,1 21,14H22A1,1 0 0,1 23,15V18A1,1 0 0,1 22,19H21V20A2,2 0 0,1 19,22H5A2,2 0 0,1 3,20V19H2A1,1 0 0,1 1,18V15A1,1 0 0,1 2,14H3A7,7 0 0,1 10,7H11V5.73C10.4,5.39 10,4.74 10,4A2,2 0 0,1 12,2Z"/>
            </svg>
            生成智能排课
          </el-button>
          <el-button 
            type="primary" 
            @click="confirmSmartSchedule"
            :disabled="smartSchedulePreview.length === 0"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/>
            </svg>
            确认排课 ({{ smartSchedulePreview.length }}节)
          </el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 点名弹窗 -->
    <el-dialog
      v-model="attendanceVisible"
      :title="currentScheduleForAttendance && isAttendanceCompleted(currentScheduleForAttendance) ? '📊 点名记录' : '🎯 课堂点名'"
      width="1000px"
      class="attendance-dialog modern-attendance"
      :close-on-click-modal="false"
      :show-close="false"
      top="5vh"
    >
      <div class="attendance-content" v-if="currentScheduleForAttendance">
        <!-- 课程信息 -->
        <div class="class-info-card modern-card">
          <div class="info-header">
            <div class="completion-status" v-if="currentScheduleForAttendance && isAttendanceCompleted(currentScheduleForAttendance)">
              <div class="status-badge completed">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/>
                </svg>
                点名已完成
              </div>
            </div>
            <div class="close-button" @click="attendanceVisible = false">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
              </svg>
            </div>
          </div>
          <div class="class-header">
            <div class="course-info">
              <div class="course-badge">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M12,3L1,9L12,15L21,10.09V17H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z"/>
                </svg>
                课程
              </div>
              <h3 class="course-name">{{ currentScheduleForAttendance.courseName }}</h3>
              <div class="class-meta">
                <div class="meta-item">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                    <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z"/>
                  </svg>
                  <span>{{ currentScheduleForAttendance.className }}</span>
                </div>
                <div class="meta-item">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                    <path d="M12,2A3,3 0 0,1 15,5V7A3,3 0 0,1 12,10A3,3 0 0,1 9,7V5A3,3 0 0,1 12,2M21,22H3V20C3,17.79 4.79,16 7,16H17C19.21,16 21,17.79 21,20V22Z"/>
                  </svg>
                  <span>{{ currentScheduleForAttendance.teacherName }}</span>
                </div>
                <div class="meta-item">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                    <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z"/>
                  </svg>
                  <span>{{ formatTime(currentScheduleForAttendance.startTime) }} - {{ formatTime(currentScheduleForAttendance.endTime) }}</span>
                </div>
              </div>
            </div>
            <div class="attendance-summary">
              <div class="summary-item present">
                <div class="summary-icon">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/>
                  </svg>
                </div>
                <div class="summary-data">
                  <span class="count">{{ attendanceStudents.filter(s => s.attendance === 'present').length }}</span>
                  <span class="label">出勤</span>
                </div>
              </div>
              <div class="summary-item absent">
                <div class="summary-icon">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
                  </svg>
                </div>
                <div class="summary-data">
                  <span class="count">{{ attendanceStudents.filter(s => s.attendance === 'absent').length }}</span>
                  <span class="label">缺勤</span>
                </div>
              </div>
              <div class="summary-item late">
                <div class="summary-icon">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z"/>
                  </svg>
                </div>
                <div class="summary-data">
                  <span class="count">{{ attendanceStudents.filter(s => s.attendance === 'late').length }}</span>
                  <span class="label">迟到</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 学生列表 -->
        <div class="student-list">
          <div class="list-header">
            <div class="header-content">
              <div class="header-icon">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M16,4C16.88,4 17.67,4.38 18.18,5H20C21.11,5 22,5.89 22,7V19C22,20.11 21.11,21 20,21H4C2.89,21 2,20.11 2,19V7C2,5.89 2.89,5 4,5H5.82C6.33,4.38 7.12,4 8,4H16M8,6A1,1 0 0,0 7,7V8H4V19H20V8H17V7A1,1 0 0,0 16,6H8Z"/>
                </svg>
              </div>
              <h4>👥 学生点名</h4>
            </div>
            <div class="batch-actions" v-if="currentScheduleForAttendance && !isAttendanceCompleted(currentScheduleForAttendance)">
              <el-button size="small" type="success" @click="() => attendanceStudents.forEach(s => s.attendance = 'present')">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                  <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/>
                </svg>
                全部出勤
              </el-button>
              <el-button size="small" type="warning" @click="() => attendanceStudents.forEach(s => s.attendance = 'absent')">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                  <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
                </svg>
                全部缺勤
              </el-button>
              <el-button size="small" type="info" @click="() => attendanceStudents.forEach(s => s.attendance = 'late')">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                  <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z"/>
                </svg>
                全部迟到
              </el-button>
            </div>
            <div class="readonly-notice" v-else>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
              </svg>
              点名已完成，仅供查看
            </div>
          </div>
          
          <div class="student-cards">
            <div 
              v-for="student in attendanceStudents" 
              :key="student.id"
              class="student-card"
              :class="{ 
                'present': student.attendance === 'present',
                'absent': student.attendance === 'absent',
                'late': student.attendance === 'late'
              }"
            >
              <div class="student-card-main">
                <div class="student-avatar">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                    <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,8.39C10.33,8.39 9.13,9.59 9.13,11.26C9.13,12.93 10.33,14.13 12,14.13C13.67,14.13 14.87,12.93 14.87,11.26C14.87,9.59 13.67,8.39 12,8.39M12,15.42C9.94,15.42 6.87,16.45 6.87,18.5V20H17.13V18.5C17.13,16.45 14.06,15.42 12,15.42Z"/>
                  </svg>
                </div>
                
                <div class="student-info">
                  <div class="student-name">{{ student.name }}</div>
                  <div class="student-details">
                    <div class="student-phone">
                      <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                        <path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z"/>
                      </svg>
                      {{ student.phone }}
                    </div>
                    <div class="remaining-hours">
                      <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                        <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z"/>
                      </svg>
                      剩余 {{ student.remainingHours }}h
                    </div>
                  </div>
                </div>
                
                <div class="attendance-status">
                  <div class="status-indicator" :class="student.attendance"></div>
                </div>
              </div>
              
              <div class="student-card-controls">
                <div class="attendance-controls">
                  <el-radio-group 
                    v-model="student.attendance" 
                    size="small"
                    :disabled="currentScheduleForAttendance && isAttendanceCompleted(currentScheduleForAttendance)"
                  >
                    <el-radio-button label="present" class="present-btn">
                      <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                        <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/>
                      </svg>
                      出勤
                    </el-radio-button>
                    <el-radio-button label="late" class="late-btn">
                      <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                        <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z"/>
                      </svg>
                      迟到
                    </el-radio-button>
                    <el-radio-button label="absent" class="absent-btn">
                      <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                        <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
                      </svg>
                      缺勤
                    </el-radio-button>
                  </el-radio-group>
                </div>
                
                <div class="student-notes" v-if="student.attendance !== 'present'">
                  <el-input
                    v-model="student.notes"
                    placeholder="✍️ 备注原因..."
                    size="small"
                    type="textarea"
                    :rows="1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 课程主题和上课记录 -->
        <div class="class-content-section">
          <div class="section-header">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
            </svg>
            <h3>📝 课程记录</h3>
          </div>
          
          <div class="content-row">
            <div class="content-item subject-item">
              <div class="item-header">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M12,2L13.09,8.26L22,9L17,14L18.18,22L12,19L5.82,22L7,14L2,9L10.91,8.26L12,2Z"/>
                </svg>
                <h4>课程主题</h4>
              </div>
              <el-input
                v-model="classSubject"
                placeholder="✨ 输入本节课的主题或重点内容"
                maxlength="50"
                show-word-limit
              />
            </div>
            <div class="content-item type-item">
              <div class="item-header">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7H14A7,7 0 0,1 21,14H22A1,1 0 0,1 23,15V18A1,1 0 0,1 22,19H21V20A2,2 0 0,1 19,22H5A2,2 0 0,1 3,20V19H2A1,1 0 0,1 1,18V15A1,1 0 0,1 2,14H3A7,7 0 0,1 10,7H11V5.73C10.4,5.39 10,4.74 10,4A2,2 0 0,1 12,2Z"/>
                </svg>
                <h4>课程类型</h4>
              </div>
              <el-select v-model="classType" placeholder="🎯 选择课程类型" style="width: 100%">
                <el-option label="📚 理论课" value="theory" />
                <el-option label="🛠️ 实践课" value="practice" />
                <el-option label="📖 复习课" value="review" />
                <el-option label="📝 测试课" value="test" />
                <el-option label="🚀 项目课" value="project" />
              </el-select>
            </div>
          </div>
          
          <div class="notes-section">
            <div class="item-header">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
              </svg>
              <h4>详细记录</h4>
            </div>
            <el-input
              v-model="classNotes"
              type="textarea"
              placeholder="📋 记录本节课的教学内容、学生表现、课堂互动等详细情况..."
              :rows="4"
              maxlength="500"
              show-word-limit
            />
          </div>
          
          <div class="homework-section">
            <div class="item-header">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M19,3H5C3.9,3 3,3.9 3,5V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V5C21,3.9 20.1,3 19,3M19,19H5V5H19V19M17,12H7V10H17V12M15,16H7V14H15V16Z"/>
              </svg>
              <h4>作业布置</h4>
            </div>
            <el-input
              v-model="homework"
              type="textarea"
              placeholder="📝 输入作业内容和要求..."
              :rows="2"
              maxlength="200"
              show-word-limit
            />
          </div>
        </div>
      </div>

      <template #footer>
        <div class="dialog-footer">
          <div class="footer-info">
            <div class="total-students">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M16,4C16.88,4 17.67,4.38 18.18,5H20C21.11,5 22,5.89 22,7V19C22,20.11 21.11,21 20,21H4C2.89,21 2,20.11 2,19V7C2,5.89 2.89,5 4,5H5.82C6.33,4.38 7.12,4 8,4H16M8,6A1,1 0 0,0 7,7V8H4V19H20V8H17V7A1,1 0 0,0 16,6H8Z"/>
              </svg>
              共 {{ attendanceStudents.length }} 人
            </div>
          </div>
          <div class="footer-actions">
            <el-button @click="attendanceVisible = false" size="large">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
              </svg>
              取消
            </el-button>
            <el-button type="primary" @click="submitAttendance" size="large">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/>
              </svg>
              完成点名
            </el-button>
          </div>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed, watch } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Download, Setting } from '@element-plus/icons-vue';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart, PieChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, LegendComponent, TitleComponent } from 'echarts/components';
import VChart from 'vue-echarts';
import { useScheduleStore } from '../stores/schedule';
import { useCourseStore } from '../stores/course';
import { useClassStore } from '../stores/class';
import { useTeacherStore } from '../stores/teacher';
import { useDataSourceStore } from '@/stores/dataSource';
import { errorHandler } from '@/utils/errorHandler';
import api from '@/utils/api';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Calendar, Plus, ArrowLeft, ArrowRight } from '@element-plus/icons-vue';

// 获取各个store
const scheduleStore = useScheduleStore();
const courseStore = useCourseStore();
const classStore = useClassStore();
const teacherStore = useTeacherStore();
const dataSourceStore = useDataSourceStore();

// 获取数据源信息
const dataSource = computed(() => dataSourceStore.getDataSourceType);

// 获取数据
const courses = computed(() => courseStore.getCourses || []);
const classes = computed(() => classStore.getClasses || []);
const teachers = computed(() => teacherStore.getTeachers || []);

// 辅助方法
const isSameDay = (date1, date2) => {
  return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate();
};

const getStartOfWeek = (date) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day;
  return new Date(d.setDate(diff));
};

const getDayName = (day) => {
  const names = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  return names[day];
};

const formatTime = (time) => {
  if (!time) return '';
  
  // 如果是时间字符串格式（HH:mm:ss），直接截取前5位
  if (typeof time === 'string' && time.includes(':')) {
    return time.slice(0, 5); // "09:00:00" -> "09:00"
  }
  
  // 如果是Date对象或时间戳，使用原来的方法
  const date = new Date(time);
  if (!isNaN(date.getTime())) {
    return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
  }
  
  return '';
};

const getSchedulesForDate = (date) => {
  const schedules = scheduleStore.getSchedules || [];
  const dateStr = date.toISOString().split('T')[0];
  
  console.log('📅 getSchedulesForDate 被调用:', {
    查询日期: dateStr,
    总数据量: schedules.length,
    scheduleStore状态: !!scheduleStore,
    getSchedules类型: typeof scheduleStore.getSchedules,
    前3条数据: schedules.slice(0, 3)
  });
  
  if (!schedules.length) {
    console.log('📅 getSchedulesForDate: 没有排课数据, schedules:', schedules);
    return [];
  }
  
  const filtered = schedules.filter(schedule => {
    try {
      if (!schedule.scheduleDate) {
        console.warn('📅 排课记录缺少日期:', schedule);
        return false;
      }
      
      const scheduleDate = new Date(schedule.scheduleDate);
      const result = isSameDay(scheduleDate, date);
      
      console.log('📅 日期匹配检查:', {
        排课日期: schedule.scheduleDate,
        查询日期: dateStr,
        排课Date对象: scheduleDate.toISOString().split('T')[0],
        匹配结果: result,
        课程名: schedule.courseName
      });
      
      if (result) {
        console.log('📅 ✅ 找到匹配的排课:', {
          date: dateStr,
          schedule: schedule.courseName,
          scheduleDate: schedule.scheduleDate
        });
      }
      return result;
    } catch (error) {
      console.error('📅 处理排课数据时出错:', error, schedule);
      return false;
    }
  });
  
  console.log(`📅 getSchedulesForDate 查询日期 ${dateStr}:`, `总数据 ${schedules.length} 条，匹配 ${filtered.length} 条`);
  if (filtered.length > 0) {
    console.log('📅 匹配的排课:', filtered.map(s => ({ 课程: s.courseName, 日期: s.scheduleDate })));
  }
  return filtered;
};

// 获取时间段副标题
const getPeriodSubtitle = () => {
  const now = new Date();
  const hour = now.getHours();
  
  if (hour >= 6 && hour < 12) {
    return '上午时段 · 精力充沛的学习时光';
  } else if (hour >= 12 && hour < 18) {
    return '下午时段 · 思维活跃的探索时间';
  } else if (hour >= 18 && hour < 22) {
    return '晚上时段 · 专注深入的学习时刻';
  } else {
    return '课程时段 · 合理安排学习计划';
  }
};

// 获取当前时间段的总课程数
const getTotalSchedulesForPeriod = () => {
  const schedules = scheduleStore.getSchedules || [];
  if (!schedules.length) return 0;
  
  const now = new Date();
  const hour = now.getHours();
  
  return schedules.filter(schedule => {
    const scheduleTime = new Date(schedule.startTime);
    const scheduleHour = scheduleTime.getHours();
    
    // 根据当前时间判断时间段
    if (hour >= 6 && hour < 12) {
      return scheduleHour >= 8 && scheduleHour < 12; // 上午时段
    } else if (hour >= 12 && hour < 18) {
      return scheduleHour >= 14 && scheduleHour < 18; // 下午时段
    } else {
      return scheduleHour >= 18 && scheduleHour < 21; // 晚上时段
    }
  }).length;
};



// 获取唯一教师列表
const getUniqueTeachers = () => {
  if (!scheduleStore.getSchedules) return [];
  
  const teacherIds = new Set();
  const uniqueTeachers = [];
  
  scheduleStore.getSchedules.forEach(schedule => {
    if (schedule.teacherId && !teacherIds.has(schedule.teacherId)) {
      teacherIds.add(schedule.teacherId);
      // 从教师列表中找到对应的教师信息
      const teacher = teachers.value.find(t => t.id === schedule.teacherId);
      if (teacher) {
        uniqueTeachers.push(teacher);
      } else {
        // 如果找不到教师信息，使用调度中的教师名称
        uniqueTeachers.push({
          id: schedule.teacherId,
          name: schedule.teacherName || '未知教师'
        });
      }
    }
  });
  
  return uniqueTeachers;
};



const getScheduleClass = (schedule) => {
  const course = courses.value.find(c => c.id === schedule.courseId);
  if (!course) return 'schedule-default';
  
  const category = course.category;
  if (category.includes('Python')) return 'schedule-python';
  if (category.includes('Java')) return 'schedule-java';
  if (category.includes('AI') || category.includes('人工智能')) return 'schedule-ai';
  if (category.includes('Web') || category.includes('前端')) return 'schedule-web';
  return 'schedule-default';
};

// 添加缺失的getDayCellClass函数
const getDayCellClass = (day) => {
  const classes = [];
  
  if (day.isToday) {
    classes.push('today');
  }
  
  if (!day.isCurrentMonth) {
    classes.push('other-month');
  }
  
  if (day.schedules && day.schedules.length > 0) {
    classes.push('has-schedules');
  }
  
  return classes;
};

// 添加缺失的getScheduleItemClass函数
const getScheduleItemClass = (schedule) => {
  // 根据课程名称确定分类
  const courseName = schedule.courseName || '';
  
  if (courseName.includes('Python')) return 'python';
  if (courseName.includes('Java')) return 'java';
  if (courseName.includes('人工智能') || courseName.includes('AI')) return 'ai';
  if (courseName.includes('Web') || courseName.includes('前端')) return 'web';
  
  // 根据班级名称确定分类（备用方案）
  const className = schedule.className || '';
  if (className.includes('Python')) return 'python';
  if (className.includes('Java')) return 'java';
  if (className.includes('AI')) return 'ai';
  if (className.includes('Web')) return 'web';
  
  return 'default';
};

const updateCurrentPeriodText = () => {
  if (viewType.value === 'month') {
    const year = currentDate.value.getFullYear();
    const month = currentDate.value.getMonth() + 1;
    currentPeriodText.value = `${year}年${month}月`;
  } else if (viewType.value === 'week') {
    const startOfWeek = getStartOfWeek(currentDate.value);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    currentPeriodText.value = `${startOfWeek.getMonth() + 1}月${startOfWeek.getDate()}日 - ${endOfWeek.getMonth() + 1}月${endOfWeek.getDate()}日`;
  } else {
    const year = currentDate.value.getFullYear();
    const month = currentDate.value.getMonth() + 1;
    const day = currentDate.value.getDate();
    currentPeriodText.value = `${year}年${month}月${day}日`;
  }
};

// 基础数据
const weekdayNames = ['日', '一', '二', '三', '四', '五', '六'];
const timeSlots = Array.from({ length: 14 }, (_, i) => i + 8); // 8点到21点


// 选择日期
const selectDay = (day) => {
  selectedDay.value = day.date;
};

// 显示日期详情
const showDayDetail = (day) => {
  selectedDay.value = day.date;
  switchView('day');
};

// 格式化小时
const formatHour = (hour) => {
  if (hour === undefined || hour === null || typeof hour !== 'number') {
    console.warn('formatHour received invalid hour value:', hour);
    return '00:00';
  }
  return `${hour.toString().padStart(2, '0')}:00`;
};

// 获取某天某小时的课程
const getSchedulesForDayHour = (day, hour) => {
  const schedules = scheduleStore.getSchedules || [];
  if (!schedules.length || !day || hour === undefined || hour === null) {
    return [];
  }
  
  return schedules.filter(schedule => {
    try {
      const scheduleDate = new Date(schedule.scheduleDate);
      
      // 处理时间字符串格式 "HH:mm:ss"
      let startHour;
      if (typeof schedule.startTime === 'string' && schedule.startTime.includes(':')) {
        startHour = parseInt(schedule.startTime.split(':')[0], 10);
      } else if (schedule.startTime) {
        startHour = new Date(schedule.startTime).getHours();
      } else {
        return false;
      }
      
      return isSameDay(scheduleDate, day.date) && startHour === hour;
    } catch (error) {
      console.error('Error in getSchedulesForDayHour:', error);
      return false;
    }
  });
};

// 在特定时间添加课程
const addScheduleAtTime = (day, hour) => {
  scheduleForm.value = {
    scheduleDate: day.date.toISOString().slice(0, 10),
    timeRange: [
      new Date(day.date.getFullYear(), day.date.getMonth(), day.date.getDate(), hour, 0),
      new Date(day.date.getFullYear(), day.date.getMonth(), day.date.getDate(), hour + 2, 0)
    ]
  };
  dialogTitle.value = '新增排课';
  scheduleDialogVisible.value = true;
};

// 获取课程样式
const getScheduleStyle = (schedule) => {
  let duration = 2; // 默认2小时
  
  try {
    // 处理时间字符串格式 "HH:mm:ss"
    if (typeof schedule.startTime === 'string' && typeof schedule.endTime === 'string' && 
        schedule.startTime.includes(':') && schedule.endTime.includes(':')) {
      const [startHour, startMin] = schedule.startTime.split(':').map(n => parseInt(n, 10));
      const [endHour, endMin] = schedule.endTime.split(':').map(n => parseInt(n, 10));
      
      const startMinutes = startHour * 60 + startMin;
      const endMinutes = endHour * 60 + endMin;
      duration = (endMinutes - startMinutes) / 60; // 转换为小时数
    } else {
      // 处理Date对象
      const startTime = new Date(schedule.startTime);
      const endTime = new Date(schedule.endTime);
      if (!isNaN(startTime.getTime()) && !isNaN(endTime.getTime())) {
        duration = (endTime - startTime) / (1000 * 60 * 60); // 小时数
      }
    }
  } catch (error) {
    console.warn('时间解析错误:', error);
    duration = 2; // 使用默认值
  }
  
  const height = Math.max(duration * 60, 40); // 最小40px高度
  
  return {
    height: `${height}px`,
    minHeight: '40px'
  };
};

// 快速编辑课程
const quickEditSchedule = (schedule) => {
  editSchedule(schedule);
};

// 点名功能相关
const attendanceVisible = ref(false);
const currentScheduleForAttendance = ref(null);
const attendanceStudents = ref([]);
const classNotes = ref('');
const classSubject = ref(''); // 课程主题
const classType = ref('theory'); // 课程类型
const homework = ref(''); // 作业布置

    // 检查课程是否已完成点名
    const isAttendanceCompleted = (schedule) => {
      // 添加空值检查
      if (!schedule || !schedule.id || !schedule.scheduleDate) {
        return false;
      }
      
      const completedAttendance = JSON.parse(localStorage.getItem('completedAttendance') || '[]');
      const attendanceKey = `${schedule.id}_${schedule.scheduleDate}`;
      return completedAttendance.includes(attendanceKey);
    };

    // 修改已完成的点名记录
    const editCompletedAttendance = (schedule) => {
      // 获取已保存的课堂记录
      const classRecords = JSON.parse(localStorage.getItem('classRecords') || '[]');
      const existingRecord = classRecords.find(record => 
        record.scheduleId === schedule.id && 
        record.date === schedule.scheduleDate
      );

      if (existingRecord) {
        // 预填已有数据
        classSubject.value = existingRecord.classSubject || '';
        classType.value = existingRecord.classType || '';
        classNotes.value = existingRecord.classNotes || '';
        homework.value = existingRecord.homework || '';

        // 恢复学生点名状态
        const studentClassRecords = JSON.parse(localStorage.getItem('studentClassRecords') || '[]');
        const scheduleStudentRecords = studentClassRecords.filter(record => record.classRecordId === existingRecord.id);
        
        // 打开点名弹窗并设置为编辑模式
        openAttendance(schedule, true, scheduleStudentRecords);
      } else {
        openAttendance(schedule);
      }
    };

    // 处理点名按钮点击
const handleAttendanceClick = (schedule) => {
      if (schedule && isAttendanceCompleted(schedule)) {
    editCompletedAttendance(schedule);
  } else {
    openAttendance(schedule);
  }
};

// 打开点名弹窗
const openAttendance = async (schedule, isEdit = false, existingAttendanceData = null) => {
  currentScheduleForAttendance.value = schedule;
  
  try {
    // 获取该班级的真实学生数据
    attendanceStudents.value = await getStudentsForClass(schedule.className);
  } catch (error) {
    console.warn('获取学生数据失败，使用模拟数据:', error);
    attendanceStudents.value = generateMockStudents(schedule.className);
  }
  
  // 重置表单数据
  classNotes.value = '';
  classSubject.value = '';
  classType.value = 'theory';
  homework.value = '';
  
  attendanceVisible.value = true;
};

// 从学员Store获取真实学员数据
const getStudentsForClass = async (className) => {
  try {
    // 导入学员store
    const { useStudentStore } = await import('../stores/student');
    const studentStore = useStudentStore();
    
    // 获取所有学员数据
    await studentStore.fetchStudents({ size: 1000 }); // 获取大量数据
    const allStudents = studentStore.getStudents;
    
    // 过滤出该班级的学员（根据课程匹配）
    const classStudents = allStudents.filter(student => {
      // 检查学员是否选择了对应的课程
      return student.courses && student.courses.some(course => 
        className.includes(course) || course.includes(className.replace('班', ''))
      );
    }).map(student => ({
      id: student.id,
      name: student.name,
      phone: student.parentPhone || student.phone || '',
      remainingHours: student.remainingHours || 0,
      totalHours: student.totalHours || 0,
      attendance: 'present', // 默认出勤状态
      notes: '',
      originalStudent: student // 保存原始学员数据的引用
    }));
    
    // 如果没有找到学员，返回模拟数据
    if (classStudents.length === 0) {
      return generateMockStudents(className);
    }
    
    return classStudents;
  } catch (error) {
    console.warn('获取学员数据失败，使用模拟数据:', error);
    return generateMockStudents(className);
  }
};

// 生成模拟学生数据（作为后备）
const generateMockStudents = (className) => {
  const baseStudents = [
    { id: 1, name: '张三', phone: '13800138001', remainingHours: 48, totalHours: 80 },
    { id: 2, name: '李四', phone: '13800138002', remainingHours: 36, totalHours: 60 },
    { id: 3, name: '王五', phone: '13800138003', remainingHours: 42, totalHours: 70 },
    { id: 4, name: '赵六', phone: '13800138004', remainingHours: 30, totalHours: 50 },
    { id: 5, name: '孙七', phone: '13800138005', remainingHours: 54, totalHours: 90 },
    { id: 6, name: '周八', phone: '13800138006', remainingHours: 24, totalHours: 40 },
    { id: 7, name: '吴九', phone: '13800138007', remainingHours: 60, totalHours: 100 },
    { id: 8, name: '郑十', phone: '13800138008', remainingHours: 18, totalHours: 30 }
  ];
  
  // 根据班级返回不同数量的学生
  const studentCount = Math.floor(Math.random() * 5) + 4; // 4-8个学生
  return baseStudents.slice(0, studentCount).map(student => ({
    ...student,
    attendance: 'present',
    notes: '',
    originalStudent: null // 标记为模拟数据
  }));
};

// 提交点名
const submitAttendance = async () => {
  try {
    const schedule = currentScheduleForAttendance.value;
    const presentStudents = attendanceStudents.value.filter(s => s.attendance === 'present');
    
    // 计算课时（假设每节课2小时）
    const hoursPerClass = 2;
    
    // 更新真实学员的课时数据
    try {
      const { useStudentStore } = await import('../stores/student');
      const studentStore = useStudentStore();
      
      for (const student of presentStudents) {
        if (student.originalStudent) {
          // 更新真实学员数据
          const updatedData = {
            ...student.originalStudent,
            remainingHours: Math.max(0, (student.originalStudent.remainingHours || 0) - hoursPerClass)
          };
          
          // 保存到store
          await studentStore.updateStudent(student.originalStudent.id, updatedData);
        }
        
        // 更新本地显示数据
        student.remainingHours = Math.max(0, student.remainingHours - hoursPerClass);
      }
    } catch (error) {
      console.warn('更新学员课时失败:', error);
      // 即使更新失败，也继续执行记录保存
      for (const student of presentStudents) {
        student.remainingHours = Math.max(0, student.remainingHours - hoursPerClass);
      }
    }
    
    // 创建上课记录
    const classRecord = {
      id: `record_${Date.now()}`,
      scheduleId: schedule.id,
      className: schedule.className,
      courseName: schedule.courseName,
      teacherName: schedule.teacherName || schedule.teacher,
      date: schedule.scheduleDate || schedule.date,
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      totalStudents: attendanceStudents.value.length,
      presentCount: presentStudents.length,
      absentCount: attendanceStudents.value.filter(s => s.attendance === 'absent').length,
      lateCount: attendanceStudents.value.filter(s => s.attendance === 'late').length,
      students: attendanceStudents.value.map(s => ({
        id: s.id,
        name: s.name,
        phone: s.phone,
        attendance: s.attendance,
        notes: s.notes,
        hoursDeducted: s.attendance === 'present' ? hoursPerClass : 0,
        isRealStudent: !!s.originalStudent
      })),
      notes: classNotes.value,
      createdAt: new Date().toISOString()
    };
    
    // 保存记录到localStorage（实际项目中应该发送到后端）
    const existingRecords = JSON.parse(localStorage.getItem('classRecords') || '[]');
    existingRecords.push(classRecord);
    localStorage.setItem('classRecords', JSON.stringify(existingRecords));
    
    // 同时保存学员的学习记录
    const existingStudentRecords = JSON.parse(localStorage.getItem('studentClassRecords') || '{}');
    for (const student of attendanceStudents.value) {
      if (!existingStudentRecords[student.id]) {
        existingStudentRecords[student.id] = [];
      }
      
      existingStudentRecords[student.id].push({
        recordId: classRecord.id,
        courseName: schedule.courseName,
        className: schedule.className,
        teacher: schedule.teacherName || schedule.teacher,
        date: schedule.scheduleDate || schedule.date,
        startTime: schedule.startTime,
        endTime: schedule.endTime,
        attendance: student.attendance,
        notes: student.notes,
        hoursDeducted: student.attendance === 'present' ? hoursPerClass : 0,
        createdAt: new Date().toISOString()
      });
    }
    localStorage.setItem('studentClassRecords', JSON.stringify(existingStudentRecords));
    
    ElMessage.success(`点名完成！出勤：${presentStudents.length}人，缺勤：${classRecord.absentCount}人，迟到：${classRecord.lateCount}人`);
    
    // 重置表单数据
    classNotes.value = '';
    classSubject.value = '';
    classType.value = 'theory';
    homework.value = '';
    
    attendanceVisible.value = false;
    
  } catch (error) {
    console.error('提交点名失败:', error);
    ElMessage.error('提交点名失败，请重试');
  }
};

// 导出排课表
const exportSchedule = () => {
  try {
    // 获取当前视图的排课数据
    const schedules = scheduleStore.getSchedules || [];
    
    // 创建CSV内容
    const headers = ['日期', '开始时间', '结束时间', '课程名称', '班级', '教师', '教室', '状态'];
    const csvContent = [
      headers.join(','),
      ...schedules.map(schedule => [
        schedule.scheduleDate,
        schedule.startTime,
        schedule.endTime,
        schedule.courseName || '',
        schedule.className || '',
        schedule.teacherName || '',
        schedule.classroom || '',
        schedule.status === 0 ? '正常' : schedule.status === 1 ? '取消' : '未知'
      ].join(','))
    ].join('\n');
    
    // 创建并下载文件
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `排课表_${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    ElMessage.success('排课表导出成功');
  } catch (error) {
    console.error('导出失败:', error);
    ElMessage.error('导出失败，请重试');
  }
};

// 视图控制方法
const switchView = (type) => {
  viewType.value = type;
  updateCurrentPeriodText();
};

const goToToday = () => {
  currentDate.value = new Date();
  console.log('🔄 点击"今天"按钮，当前日期设置为:', currentDate.value.toDateString());
};

const previousPeriod = () => {
  const newDate = new Date(currentDate.value);
  if (viewType.value === 'month') {
    newDate.setMonth(newDate.getMonth() - 1);
  } else if (viewType.value === 'week') {
    newDate.setDate(newDate.getDate() - 7);
  } else {
    newDate.setDate(newDate.getDate() - 1);
  }
  currentDate.value = newDate;
};

const nextPeriod = () => {
  const newDate = new Date(currentDate.value);
  if (viewType.value === 'month') {
    newDate.setMonth(newDate.getMonth() + 1);
  } else if (viewType.value === 'week') {
    newDate.setDate(newDate.getDate() + 7);
  } else {
    newDate.setDate(newDate.getDate() + 1);
  }
  currentDate.value = newDate;
};

const showAddDialog = () => {
  scheduleForm.value = {
    scheduleDate: currentDate.value
  };
  dialogTitle.value = '新增排课';
  scheduleDialogVisible.value = true;
};

const editSchedule = (schedule) => {
  scheduleForm.value = { ...schedule };
  dialogTitle.value = '编辑排课';
  scheduleDialogVisible.value = true;
};

// 数据加载
const loadData = async () => {
  try {
    console.log('🔄 开始加载排课相关数据...');
    await Promise.all([
      scheduleStore.fetchSchedules(),
      courseStore.fetchCourses(),
      classStore.fetchClasses(),
      teacherStore.fetchTeachers()
    ]);
    console.log('✅ 所有数据加载完成');
    console.log('📊 最终检查 - scheduleStore.getSchedules:', scheduleStore.getSchedules?.length || 0);
  } catch (error) {
    console.error('❌ 数据加载失败:', error);
    errorHandler.handleApiError(error, {
      module: 'SCHEDULE',
      operation: '数据加载'
    });
  }
};

// 🤖 智能排课功能
const toggleCourseSelection = (courseId) => {
  const index = smartScheduleForm.value.selectedCourses.indexOf(courseId);
  if (index > -1) {
    smartScheduleForm.value.selectedCourses.splice(index, 1);
  } else {
    smartScheduleForm.value.selectedCourses.push(courseId);
  }
};

const generateSmartSchedule = async () => {
  if (smartScheduleForm.value.selectedCourses.length === 0) {
    ElMessage.warning('请至少选择一个课程');
    return;
  }

  smartScheduleLoading.value = true;
  
  try {
    // 获取选中的课程信息
    const selectedCourses = courses.value.filter(course => 
      smartScheduleForm.value.selectedCourses.includes(course.id)
    );
    
    // 生成智能排课方案
    const schedules = [];
    const startDate = new Date(smartScheduleForm.value.startDate);
    const endDate = new Date(smartScheduleForm.value.endDate);
    
    // 可用时间段配置
    const timeSlots = {
      morning: [
        { start: '09:00:00', end: '11:00:00' },
        { start: '10:30:00', end: '12:30:00' }
      ],
      afternoon: [
        { start: '14:00:00', end: '16:00:00' },
        { start: '15:30:00', end: '17:30:00' }
      ],
      evening: [
        { start: '19:00:00', end: '21:00:00' }
      ]
    };
    
    // 教室配置
    const classrooms = ['A教室', 'B教室', 'C教室', 'D教室', 'E教室', 'F教室'];
    
    let scheduleId = Date.now();
    
    // 为每个选中的课程生成排课
    selectedCourses.forEach(course => {
      // 找到对应的班级和教师信息
      const classInfo = classes.value.find(c => c.courseId === course.id);
      const teacherInfo = teachers.value.find(t => t.id === course.teacherId);
      
      // 计算要排课的周数
      const totalWeeks = Math.ceil((endDate - startDate) / (7 * 24 * 60 * 60 * 1000));
      const weeksToSchedule = Math.min(totalWeeks, smartScheduleForm.value.maxDensity * 2);
      
      for (let week = 0; week < weeksToSchedule; week++) {
        // 随机选择一个可用星期
        const availableDays = smartScheduleForm.value.availableDays;
        const selectedDay = availableDays[Math.floor(Math.random() * availableDays.length)];
        
        // 计算该周该天的日期
        const currentWeekStart = new Date(startDate);
        currentWeekStart.setDate(startDate.getDate() + (week * 7));
        const targetDate = new Date(currentWeekStart);
        const dayOffset = (parseInt(selectedDay) - currentWeekStart.getDay() + 7) % 7;
        targetDate.setDate(currentWeekStart.getDate() + dayOffset);
        
        // 确保日期在范围内
        if (targetDate >= startDate && targetDate <= endDate) {
          // 随机选择时间段
          const availableTimePeriods = smartScheduleForm.value.preferredTimes;
          const randomPeriod = availableTimePeriods[Math.floor(Math.random() * availableTimePeriods.length)];
          const availableSlots = timeSlots[randomPeriod] || timeSlots.morning;
          const selectedSlot = availableSlots[Math.floor(Math.random() * availableSlots.length)];
          
          // 随机选择教室
          const selectedClassroom = classrooms[Math.floor(Math.random() * classrooms.length)];
          
          // 生成学员列表
          const relatedStudents = students.value.filter(s => s.courseId === course.id);
          const studentList = relatedStudents.map(student => ({
            id: student.id,
            name: student.name,
            status: 1,
            attendanceRate: 85 + Math.floor(Math.random() * 15),
            performance: ['优秀', '良好', '中等'][Math.floor(Math.random() * 3)]
          }));
          
          const schedule = {
            id: scheduleId++,
            courseId: course.id,
            courseName: course.name,
            classId: classInfo ? classInfo.id : null,
            className: classInfo ? classInfo.name : `${course.name}班`,
            teacherId: teacherInfo ? teacherInfo.id : null,
            teacherName: teacherInfo ? teacherInfo.name : '待分配',
            date: targetDate.toISOString().slice(0, 10),
            scheduleDate: targetDate.toISOString().slice(0, 10),
            dayOfWeek: targetDate.getDay(),
            startTime: selectedSlot.start,
            endTime: selectedSlot.end,
            classroom: selectedClassroom,
            location: selectedClassroom,
            maxStudents: course.maxStudents || 20,
            currentStudents: studentList.length,
            status: 1,
            type: 'regular',
            week: week + 1,
            session: `第${week + 1}周课程`,
            description: `${course.name} - ${selectedClassroom} - 第${week + 1}周智能排课`,
            students: studentList,
            attendanceCount: studentList.filter(s => s.status === 1).length,
            homework: `第${week + 1}周作业：${course.name}相关练习`,
            notes: `智能排课生成：第${week + 1}周${course.name}课程`,
            materials: [`教材第${week + 1}章`, '课堂练习', '课后作业'],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          
          schedules.push(schedule);
        }
      }
    });
    
    // 如果启用了冲突避免，检查时间冲突
    if (smartScheduleForm.value.avoidConflicts) {
      const conflictFreeSchedules = [];
      const usedTimeSlots = new Set();
      
      schedules.forEach(schedule => {
        const timeKey = `${schedule.date}_${schedule.startTime}_${schedule.classroom}`;
        if (!usedTimeSlots.has(timeKey)) {
          usedTimeSlots.add(timeKey);
          conflictFreeSchedules.push(schedule);
        }
      });
      
      smartSchedulePreview.value = conflictFreeSchedules;
    } else {
      smartSchedulePreview.value = schedules;
    }
    
    ElMessage.success(`智能排课完成！生成了 ${smartSchedulePreview.value.length} 节课`);
    
  } catch (error) {
    console.error('智能排课生成失败:', error);
    ElMessage.error('智能排课生成失败，请重试');
  } finally {
    smartScheduleLoading.value = false;
  }
};

const confirmSmartSchedule = async () => {
  try {
    // 批量提交排课到store
    for (const schedule of smartSchedulePreview.value) {
      await scheduleStore.addSchedule(schedule);
    }
    
    ElMessage.success(`成功添加 ${smartSchedulePreview.value.length} 节排课！`);
    showSmartScheduleDialog.value = false;
    smartSchedulePreview.value = [];
    smartScheduleForm.value.selectedCourses = [];
    
    // 刷新排课数据
    await scheduleStore.fetchSchedules();
    
  } catch (error) {
    console.error('确认智能排课失败:', error);
    ElMessage.error('排课添加失败，请重试');
  }
};

const formatScheduleDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', { 
    month: 'long', 
    day: 'numeric' 
  });
};



// 页面初始化 - 合并所有初始化逻辑
onMounted(async () => {
  console.log('🚀 开始初始化排课页面...');
  
  // 加载所有必要数据
  await loadData();
  
  console.log('🔄 排课页面数据加载完成，排课数量:', scheduleStore.getSchedules?.length || 0);
  console.log('📋 排课数据详情:', scheduleStore.getSchedules);
  
  // 延迟一下以确保日历组件已经挂载
  setTimeout(() => {
    console.log('⏰ 延迟检查排课数据:', {
      总数据: scheduleStore.getSchedules?.length,
      今日排课: todaySchedules.value,
      活跃教室: activeClassrooms.value,
      monthWeeks计算: monthWeeks.value?.length || 0
    });
    
    // 强制重新计算月视图
    const testDate = new Date('2025-08-01');
    const testSchedules = getSchedulesForDate(testDate);
    console.log('🧪 测试8月1日排课:', testSchedules);
    
    // 初始化日历
    if (calendar.value) {
      const calendarApi = calendar.value.getApi();
      
      // 初始加载所有排课数据，不限制日期范围
      loadEvents({
        startStr: '', // 不限制开始日期
        endStr: ''    // 不限制结束日期
      });
    }
  }, 1000);
});

const calendar = ref(null);
const scheduleDialogVisible = ref(false);
const showBatchScheduleDialog = ref(false);
const showSmartScheduleDialog = ref(false);
const dialogTitle = ref('新增排课');

// 卡片视图相关数据
const viewType = ref('month'); // 'month', 'week'
const currentDate = ref(new Date());
const currentPeriodText = ref('');
const selectedDay = ref(new Date());



// 统计数据计算属性
const activeClassrooms = computed(() => {
  if (!scheduleStore.getSchedules) return 0;
  const classrooms = new Set();
  scheduleStore.getSchedules.forEach(schedule => {
    if (schedule.classroom && schedule.status === 1) {
      classrooms.add(schedule.classroom);
    }
  });
  console.log('🏫 活跃教室统计:', classrooms.size, '个教室');
  return classrooms.size;
});

const todaySchedules = computed(() => {
  const schedules = scheduleStore.getSchedules || [];
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  
  console.log('📊 计算今日排课统计:', {
    今天日期: todayStr,
    总排课数: schedules.length,
    schedules前3条: schedules.slice(0, 3)
  });
  
  if (!schedules.length) {
    console.log('📊 没有排课数据，返回0');
    return 0;
  }
  
  const todayCount = schedules.filter(schedule => {
    try {
      if (!schedule.scheduleDate) return false;
      const scheduleDate = new Date(schedule.scheduleDate);
      const result = isSameDay(scheduleDate, today) && schedule.status === 1;
      
      if (result) {
        console.log('📊 找到今日排课:', {
          课程: schedule.courseName,
          日期: schedule.scheduleDate,
          状态: schedule.status
        });
      }
      
      return result;
    } catch (error) {
      console.error('📊 处理今日排课时出错:', error, schedule);
      return false;
    }
  }).length;
  
  console.log(`📊 今日排课统计完成: ${todayCount} 条`);
  return todayCount;
});

// 计算属性
const monthWeeks = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());
  
  const weeks = [];
  let currentWeek = [];
  let tempDate = new Date(startDate);
  
  for (let i = 0; i < 42; i++) {
    const schedules = getSchedulesForDate(tempDate);
    const dayData = {
      date: new Date(tempDate),
      dayNumber: tempDate.getDate(),
      isCurrentMonth: tempDate.getMonth() === month,
      isToday: isSameDay(tempDate, new Date()),
      schedules: schedules
    };
    
    if (schedules.length > 0) {
      console.log(`📅 ✅ ${tempDate.toISOString().split('T')[0]} 有 ${schedules.length} 个排课:`, schedules.map(s => s.courseName));
    } else {
      // 只对当前月份的日期记录调试信息
      if (tempDate.getMonth() === month) {
        console.log(`📅 ❌ ${tempDate.toISOString().split('T')[0]} 无排课`);
      }
    }
    
    currentWeek.push(dayData);
    
    if (currentWeek.length === 7) {
      weeks.push({ weekNum: weeks.length, days: [...currentWeek] });
      currentWeek = [];
    }
    
    tempDate.setDate(tempDate.getDate() + 1);
  }
  
  return weeks;
});

const weekDays = computed(() => {
  const startOfWeek = getStartOfWeek(currentDate.value);
  const days = [];
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek);
    date.setDate(date.getDate() + i);
    
    days.push({
      date: date,
      dayName: getDayName(date.getDay()),
      dayNumber: date.getDate(),
      isToday: isSameDay(date, new Date()),
      schedules: getSchedulesForDate(date)
    });
  }
  
  return days;
});

const dayHours = computed(() => {
  return Array.from({ length: 24 }, (_, i) => i);
});

// 更新当前期间文本
watch(currentDate, () => {
  updateCurrentPeriodText();
}, { immediate: true });

// 表单和规则
const scheduleForm = ref({
  courseId: null,
  classId: null,
  teacherId: null,
  scheduleDate: '',
  timeRange: [],
  location: '',
  periods: 2,
  status: 0
});
const scheduleFormRef = ref(null);
const batchScheduleForm = ref({
  courseId: null,
  classId: null,
  teacherId: null,
  dateRange: [],
  timeRange: [],
  repeatType: 'weekly',
  repeatDays: [],
  location: '',
  periods: 2,
  status: 0
});
const batchScheduleFormRef = ref(null);

// 🤖 智能排课相关数据
const smartScheduleForm = ref({
  selectedCourses: [],
  startDate: new Date().toISOString().slice(0, 10),
  endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10), // 30天后
  preferredTimes: ['morning', 'afternoon'],
  availableDays: ['1', '2', '3', '4', '5', '6'],
  avoidConflicts: true,
  maxDensity: 3
});

const smartSchedulePreview = ref([]);
const smartScheduleLoading = ref(false);

const densityMarks = {
  1: '轻松',
  2: '适中',
  3: '正常',
  4: '紧凑',
  5: '密集'
};

const rules = {
  courseId: [{ required: true, message: '请选择课程', trigger: 'change' }],
  classId: [{ required: true, message: '请选择班级', trigger: 'change' }],
  teacherId: [{ required: true, message: '请选择教师', trigger: 'change' }],
  scheduleDate: [{ required: true, message: '请选择上课日期', trigger: 'change' }],
  timeRange: [{ required: true, message: '请选择上课时间', trigger: 'change' }],
  location: [{ required: true, message: '请输入教室/地点', trigger: 'blur' }],
  periods: [{ required: true, message: '请输入课时数', trigger: 'blur' }]
};

const batchRules = {
  courseId: [{ required: true, message: '请选择课程', trigger: 'change' }],
  classId: [{ required: true, message: '请选择班级', trigger: 'change' }],
  teacherId: [{ required: true, message: '请选择教师', trigger: 'change' }],
  location: [{ required: true, message: '请输入教室或地点', trigger: 'blur' }],
  dateRange: [{ required: true, message: '请选择排课日期范围', trigger: 'change' }],
  timeRange: [{ required: true, message: '请选择上课时间', trigger: 'change' }],
  repeatType: [{ required: true, message: '请选择重复方式', trigger: 'change' }],
  repeatDays: [{ required: true, message: '请选择星期', trigger: 'change' }],
  periods: [{ required: true, message: '请输入课时数', trigger: 'blur' }],
};

// 下拉框数据 - 使用computed属性替代
// const courses = ref([]);
// const classes = ref([]);
// const teachers = ref([]);

// 日历配置
const calendarOptions = reactive({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay'
  },
  editable: true,
  selectable: true,
  selectMirror: true,
  dayMaxEvents: true,
  weekends: true,
  nowIndicator: true,
  height: 'auto',
  aspectRatio: 1.8,
  expandRows: true,
  navLinks: true,
  businessHours: {
    daysOfWeek: [0, 1, 2, 3, 4, 5, 6], // 0=周日, 1=周一, etc.
    startTime: '08:00',
    endTime: '22:00',
  },
  slotMinTime: '08:00:00',
  slotMaxTime: '22:00:00',
  slotDuration: '00:30:00',
  slotLabelInterval: '01:00:00',
  slotLabelFormat: {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  },
  allDaySlot: false,
  select: handleDateSelect,
  eventClick: handleEventClick,
  eventDrop: handleEventDrop,
  eventResize: handleEventResize,
  datesSet: handleDatesSet,
  // 添加中文本地化设置
  locale: 'zh-cn',
  buttonText: {
    today: '今天',
    month: '月',
    week: '周',
    day: '日'
  },
  // 美化事件样式
  eventTimeFormat: {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  },
  // 美化日历样式
  dayMaxEvents: true,
  eventColor: '#409EFF',
  eventBorderColor: '#409EFF',
  eventTextColor: '#ffffff',
  // 添加工具提示
  eventDidMount: function(info) {
    const { event } = info;
    const tooltip = document.createElement('div');
    tooltip.className = 'fc-tooltip';
    tooltip.innerHTML = `
      <div><strong>课程:</strong> ${event.extendedProps.courseName || ''}</div>
      <div><strong>班级:</strong> ${event.extendedProps.className || ''}</div>
      <div><strong>教师:</strong> ${event.extendedProps.teacherName || ''}</div>
      <div><strong>时间:</strong> ${event.start.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - ${event.end.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
      <div><strong>地点:</strong> ${event.extendedProps.classroom || ''}</div>
    `;
    
    // 使用Element Plus的tooltip
    const el = info.el;
    el.setAttribute('data-tooltip', 'true');
    
    el.addEventListener('mouseenter', () => {
      el.appendChild(tooltip);
    });
    
    el.addEventListener('mouseleave', () => {
      if (el.contains(tooltip)) {
        el.removeChild(tooltip);
      }
    });
  }
});

// 删除重复的onMounted函数 - 逻辑已合并到主onMounted中

// 加载初始数据
async function loadInitialData() {
  try {
    console.log('开始加载初始数据...');
    
    // 使用Pinia store确保数据一致性
    const courseStore = useCourseStore();
    const classStore = useClassStore();
    const teacherStore = useTeacherStore();
    
    // 并行加载所有数据
    await Promise.all([
      courseStore.fetchCourses(),
      classStore.fetchClasses(),
      teacherStore.fetchTeachers()
    ]);
    
    console.log('获取到课程数据:', courseStore.getCourses);
    console.log('获取到班级数据:', classStore.getClasses);
    console.log('获取到教师数据:', teacherStore.getTeachers);
    
    console.log('处理后的课程列表:', courses.value);
    console.log('处理后的班级列表:', classes.value);
    console.log('处理后的教师列表:', teachers.value);
    
    if (courses.value.length === 0) {
      console.warn('警告: 没有获取到课程数据');
    }
    
    if (classes.value.length === 0) {
      console.warn('警告: 没有获取到班级数据');
    }
    
    if (teachers.value.length === 0) {
      console.warn('警告: 没有获取到教师数据');
    }
  } catch (error) {
    console.error('加载初始数据失败:', error);
    ElMessage.error('加载初始数据失败');
  }
}

// 加载日历事件
async function loadEvents(info) {
  try {
    const start = info.startStr?.slice(0, 10) || new Date().toISOString().slice(0, 10);
    const end = info.endStr?.slice(0, 10) || '';
    
    console.log('加载日期范围:', start, '至', end);
    
    // 使用scheduleStore获取数据
    const scheduleStore = useScheduleStore();
    await scheduleStore.fetchSchedules();
    
    const data = scheduleStore.getSchedules || [];
    console.log('获取到排课数据:', data);
    
    // 确保日历API已初始化
    if (!calendar.value) {
      console.error('日历组件未初始化');
      return;
    }
    
    const calendarApi = calendar.value.getApi();
    
    // 先清除所有现有事件
    calendarApi.removeAllEvents();
    
    // 添加新事件
    const events = data.map(item => {
      // 确保所有必要的字段都有值
      const courseName = item.courseName || '未知课程';
      const className = item.className || '未知班级';
      const teacherName = item.teacherName || '未知教师';
      const classroom = item.classroom || '未指定教室';
      
      // 确保时间格式正确
      const startTime = item.startTime || '00:00:00';
      const endTime = item.endTime || '00:00:00';
      
      // 根据课程类型设置颜色
      let courseType = 'default';
      if (courseName.includes('Python')) courseType = 'Python';
      else if (courseName.includes('Java')) courseType = 'Java';
      else if (courseName.includes('AI') || courseName.includes('人工智能')) courseType = 'AI';
      else if (courseName.includes('Web') || courseName.includes('前端')) courseType = 'Web';
      
      // 创建事件对象
      return {
        id: item.id,
        title: `${courseName} ${className}`,
        start: `${item.scheduleDate}T${startTime}`,
        end: `${item.scheduleDate}T${endTime}`,
        allDay: false,
        className: `course-${courseType.toLowerCase()}`,
        extendedProps: {
          ...item,
          courseName,
          className,
          teacherName,
          classroom,
          courseType
        }
      };
    });
    
    // 添加事件到日历
    events.forEach(event => {
      calendarApi.addEvent(event);
    });
    
    console.log('日历事件已更新:', events.length, '个事件');
    
    // 刷新视图
    calendarApi.refetchEvents();
  } catch (error) {
    console.error('加载排课数据失败:', error);
    ElMessage.error('加载排课数据失败');
  }
}

// 日期选择
function handleDateSelect(selectInfo) {
  dialogTitle.value = '新增排课';
  
  console.log('选择日期:', selectInfo);
  
  // 初始化表单数据，确保所有字段都有初始值
  scheduleForm.value = {
    scheduleDate: selectInfo.startStr,
    timeRange: [new Date(selectInfo.start), new Date(selectInfo.end)],
    courseId: undefined,
    classId: undefined,
    teacherId: undefined,
    location: '',
    periods: 2,
    content: '',
    status: 0
  };
  
  console.log('新增排课表单初始数据:', scheduleForm.value);
  
  scheduleDialogVisible.value = true;
}

// 事件点击
function handleEventClick(clickInfo) {
  dialogTitle.value = '编辑排课';
  const eventData = clickInfo.event.extendedProps;
  
  console.log('点击事件数据:', eventData);
  
  // 确保有正确的时间范围
  const timeRange = eventData.timeRange || [
    new Date(`${eventData.scheduleDate}T${eventData.startTime || '00:00:00'}`),
    new Date(`${eventData.scheduleDate}T${eventData.endTime || '00:00:00'}`)
  ];
  
  // 构建完整的表单数据
  scheduleForm.value = {
    ...eventData,
    id: eventData.id,
    courseId: eventData.courseId,
    courseName: eventData.courseName,
    classId: eventData.classId,
    className: eventData.className,
    teacherId: eventData.teacherId,
    teacherName: eventData.teacherName,
    scheduleDate: eventData.scheduleDate,
    timeRange: timeRange,
    classroom: eventData.classroom,
    status: eventData.status,
    topic: eventData.topic,
    periods: eventData.periods
  };
  
  console.log('编辑排课表单数据:', scheduleForm.value);
  
  scheduleDialogVisible.value = true;
}

// 事件拖拽
async function handleEventDrop(dropInfo) {
  const { event } = dropInfo;
  const payload = {
    ...event.extendedProps,
    scheduleDate: event.start.toISOString().slice(0, 10),
    startTime: event.start.toTimeString().slice(0, 8),
    endTime: event.end.toTimeString().slice(0, 8),
  };
  delete payload.timeRange;

  try {
    // 使用scheduleStore检查冲突和更新
    const scheduleStore = useScheduleStore();
    
    // 检查冲突（这里简化处理，实际应该调用store的冲突检查方法）
    const hasConflict = false; // 简化处理
    
    if (hasConflict) {
      ElMessage.error('该时间段存在冲突，无法移动');
      dropInfo.revert();
      return;
    }
    
    // 更新排课
    await scheduleStore.updateSchedule(event.id, payload);
    ElMessage.success('排课时间已更新');
    loadEvents(calendar.value.getApi().view);
  } catch (error) {
    ElMessage.error(`更新排课失败: ${error.message || ''}`);
    dropInfo.revert();
  }
}

// 事件缩放
async function handleEventResize(resizeInfo) {
  const { event } = resizeInfo;
  const payload = {
    ...event.extendedProps,
    startTime: event.start.toTimeString().slice(0, 8),
    endTime: event.end.toTimeString().slice(0, 8),
  };
  delete payload.timeRange;

  try {
    // 使用scheduleStore更新
    const scheduleStore = useScheduleStore();
    
    await scheduleStore.updateSchedule(event.id, payload);
    ElMessage.success('排课时间已更新');
    loadEvents(calendar.value.getApi().view);
  } catch (error) {
    ElMessage.error(`更新排课失败: ${error.message || ''}`);
    resizeInfo.revert();
  }
}

// 日历视图切换
function handleDatesSet(dateInfo) {
  loadEvents(dateInfo);
}

// 课程下拉框change事件
function handleCourseChange(value) {
  const course = courses.value.find(c => c.id === value);
  if (course) {
    scheduleForm.value.courseName = course.name;
  } else {
    scheduleForm.value.courseName = '';
  }
}

// 班级下拉框change事件
function handleClassChange(value) {
  const classData = classes.value.find(c => c.id === value);
  if (classData) {
    scheduleForm.value.className = classData.name;
  } else {
    scheduleForm.value.className = '';
  }
}

// 教师下拉框change事件
function handleTeacherChange(value) {
  const teacher = teachers.value.find(t => t.id === value);
  if (teacher) {
    scheduleForm.value.teacherName = teacher.name;
  } else {
    scheduleForm.value.teacherName = '';
  }
}

// 批量排课课程下拉框change事件
function handleBatchCourseChange(value) {
  const course = courses.value.find(c => c.id === value);
  if (course) {
    batchScheduleForm.value.courseName = course.name;
  } else {
    batchScheduleForm.value.courseName = '';
  }
}

// 批量排课班级下拉框change事件
function handleBatchClassChange(value) {
  const classData = classes.value.find(c => c.id === value);
  if (classData) {
    batchScheduleForm.value.className = classData.name;
  } else {
    batchScheduleForm.value.className = '';
  }
}

// 批量排课教师下拉框change事件
function handleBatchTeacherChange(value) {
  const teacher = teachers.value.find(t => t.id === value);
  if (teacher) {
    batchScheduleForm.value.teacherName = teacher.name;
  } else {
    batchScheduleForm.value.teacherName = '';
  }
}

// 保存排课
async function saveSchedule() {
  if (!scheduleFormRef.value) return;
  
  await scheduleFormRef.value.validate(async (valid) => {
    if (!valid) return;
    
    try {
      const params = {
        ...scheduleForm.value,
        scheduleDate: scheduleForm.value.scheduleDate,
        startTime: scheduleForm.value.startTime,
        endTime: scheduleForm.value.endTime,
      };
      
      // 使用scheduleStore保存
      const scheduleStore = useScheduleStore();
      
      if (scheduleForm.value.id) {
        // 更新
        await scheduleStore.updateSchedule(scheduleForm.value.id, params);
        ElMessage.success('排课更新成功');
      } else {
        // 新增
        await scheduleStore.addSchedule(params);
        ElMessage.success('排课创建成功');
      }
      
      scheduleDialogVisible.value = false;
      
      // 刷新日历显示
      if (calendar.value) {
      loadEvents(calendar.value.getApi().view);
      }
    } catch (error) {
      ElMessage.error(`保存排课失败: ${error.message || ''}`);
    }
  });
}

// 删除排课
async function deleteSchedule() {
  try {
    await ElMessageBox.confirm('确定要删除这个排课吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    });
    
    // 使用scheduleStore删除
    const scheduleStore = useScheduleStore();
    
    await scheduleStore.deleteSchedule(scheduleForm.value.id);
    ElMessage.success('排课删除成功');
    scheduleDialogVisible.value = false;
    
    // 刷新日历显示
    if (calendar.value) {
    loadEvents(calendar.value.getApi().view);
    }
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error(`删除排课失败: ${error.message || ''}`);
    }
  }
}

// 提交批量排课
async function submitBatchSchedule() {
  if (!batchScheduleFormRef.value) return;
  await batchScheduleFormRef.value.validate(async (valid) => {
    if (valid) {
      const [startDate, endDate] = batchScheduleForm.value.dateRange;
      const [startTime, endTime] = batchScheduleForm.value.timeRange;
      
      console.log('批量排课表单数据:', batchScheduleForm.value);
      
      // 确保所有字段都有值
      const courseData = courses.value.find(c => c.id === batchScheduleForm.value.courseId);
      const classData = classes.value.find(c => c.id === batchScheduleForm.value.classId);
      const teacherData = teachers.value.find(t => t.id === batchScheduleForm.value.teacherId);
      
      console.log('找到的课程数据:', courseData);
      console.log('找到的班级数据:', classData);
      console.log('找到的教师数据:', teacherData);

      const params = {
        ...batchScheduleForm.value,
        startDate: new Date(startDate).toISOString().slice(0, 10),
        endDate: new Date(endDate).toISOString().slice(0, 10),
        startTime: new Date(startTime).toTimeString().slice(0, 8),
        endTime: new Date(endTime).toTimeString().slice(0, 8),
        courseId: batchScheduleForm.value.courseId,
        courseName: courseData ? courseData.name : (batchScheduleForm.value.courseName || '未知课程'),
        classId: batchScheduleForm.value.classId,
        className: classData ? classData.name : (batchScheduleForm.value.className || '未知班级'),
        teacherId: batchScheduleForm.value.teacherId,
        teacherName: teacherData ? teacherData.name : (batchScheduleForm.value.teacherName || '未知教师'),
        classroom: batchScheduleForm.value.location || '未指定教室',
        status: batchScheduleForm.value.status !== undefined ? batchScheduleForm.value.status : 0,
        periods: batchScheduleForm.value.periods || 2
      };
      
      delete params.dateRange;
      delete params.timeRange;
      delete params.location; // 使用classroom代替
      
      console.log('批量排课最终数据:', params);

      try {
        await api.post('/schedules/batch', params);
        ElMessage.success('批量排课成功');
        showBatchScheduleDialog.value = false;
        loadEvents(calendar.value.getApi().view);
      } catch (error) {
        ElMessage.error(error.message || '批量排课失败');
      }
    }
  });
}

// 批量排课
async function batchSchedule() {
  if (!batchFormRef.value) return;
  
  await batchFormRef.value.validate(async (valid) => {
    if (!valid) return;
    
    try {
      const params = {
        ...batchForm.value,
        startDate: batchForm.value.startDate,
        endDate: batchForm.value.endDate,
        startTime: batchForm.value.startTime,
        endTime: batchForm.value.endTime,
        weekdays: batchForm.value.weekdays
      };
      
      // 使用scheduleStore批量创建
      const scheduleStore = useScheduleStore();
      
      await scheduleStore.batchAddSchedules(params);
      ElMessage.success('批量排课成功');
      batchDialogVisible.value = false;
      loadEvents(calendar.value.getApi().view);
    } catch (error) {
      ElMessage.error(`批量排课失败: ${error.message || ''}`);
    }
  });
}

function resetForm() {
  scheduleForm.value = {};
  if (scheduleFormRef.value) {
    scheduleFormRef.value.resetFields();
  }
}

function resetBatchForm() {
  batchScheduleForm.value = {};
  if (batchScheduleFormRef.value) {
    batchScheduleFormRef.value.resetFields();
  }
}



</script>

<style scoped>
/* 🎨 整体容器 */
.schedule-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 0;
  margin: 0;
}

/* 🌟 顶部横幅区域 */
.schedule-header {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #ec4899 100%);
  padding: 40px 32px;
  color: white;
  position: relative;
  overflow: hidden;
}

.schedule-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
  pointer-events: none;
}

.header-banner {
  position: relative;
  z-index: 1;
}

.banner-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
}

.banner-left {
  display: flex;
  align-items: center;
  gap: 24px;
}

.page-icon {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 20px;
  color: white;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.page-info {
  color: white;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 8px 0;
  background: linear-gradient(45deg, #ffffff, #f0f9ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-description {
  font-size: 1.1rem;
  margin: 0 0 20px 0;
  opacity: 0.9;
}

.page-stats {
  display: flex;
  gap: 32px;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 1.8rem;
  font-weight: 700;
  color: #fbbf24;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.banner-right {
  display: flex;
  align-items: center;
}

.quick-actions {
  display: flex;
  gap: 16px;
}

.action-btn {
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  border: none;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.action-btn.primary {
  background: rgba(255, 255, 255, 0.9);
  color: #4f46e5;
  box-shadow: 0 4px 15px rgba(255, 255, 255, 0.2);
}

.action-btn.primary:hover {
  background: white;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 255, 255, 0.3);
}

.action-btn:not(.primary) {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.action-btn:not(.primary):hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

/* 🎮 控制面板 */
.control-panel {
  background: white;
  margin: -20px 32px 32px;
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 40px;
  align-items: center;
  position: relative;
  z-index: 2;
}

.panel-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: #374151;
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.section-title svg {
  color: #6366f1;
}

/* 视图控制 */
.view-radio-group {
  display: flex;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.view-radio {
  border: none !important;
  border-radius: 0 !important;
}

.view-radio .el-radio-button__inner {
  background: #f8fafc;
  border: none;
  padding: 12px 20px;
  font-weight: 500;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.view-radio.is-active .el-radio-button__inner {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

/* 日期导航 */
.date-controls {
  display: flex;
  align-items: center;
  gap: 12px;
}

.nav-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #e5e7eb;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.nav-btn:hover {
  background: #f3f4f6;
  border-color: #6366f1;
  transform: scale(1.05);
}

.current-period {
  font-weight: 600;
  color: #1f2937;
  min-width: 120px;
  text-align: center;
  font-size: 1.1rem;
}

.today-btn {
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 600;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border: none;
}

/* 课程图例 */
.legend-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  background: #f8fafc;
  transition: all 0.3s ease;
}

.legend-item:hover {
  background: #f1f5f9;
  transform: translateY(-1px);
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
}

.legend-text {
  font-size: 0.9rem;
  font-weight: 500;
  color: #374151;
}

/* 课程分类颜色 */
.legend-item.python .legend-color {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
}

.legend-item.java .legend-color {
  background: linear-gradient(135deg, #f59e0b, #d97706);
}

.legend-item.ai .legend-color {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
}

.legend-item.web .legend-color {
  background: linear-gradient(135deg, #10b981, #059669);
}

/* 🎨 排课项目样式 */
.schedule-item {
  border-radius: 6px;
  padding: 6px 8px;
  margin-bottom: 2px;
  border-left: 3px solid;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 12px;
  line-height: 1.2;
}

.schedule-item:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.schedule-item.python {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(29, 78, 216, 0.05));
  border-left-color: #3b82f6;
  color: #1d4ed8;
}

.schedule-item.java {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(217, 119, 6, 0.05));
  border-left-color: #f59e0b;
  color: #d97706;
}

.schedule-item.ai {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(124, 58, 237, 0.05));
  border-left-color: #8b5cf6;
  color: #7c3aed;
}

.schedule-item.web {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.05));
  border-left-color: #10b981;
  color: #059669;
}

.schedule-item.default {
  background: linear-gradient(135deg, rgba(107, 114, 128, 0.1), rgba(75, 85, 99, 0.05));
  border-left-color: #6b7280;
  color: #4b5563;
}

/* 🎯 月视图排课项目结构调整 */
.schedule-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.schedule-item .schedule-content {
  flex: 1;
  min-width: 0; /* 允许内容收缩 */
}

.month-schedule-actions {
  display: flex;
  gap: 2px;
  flex-shrink: 0;
  margin-left: 4px;
}

.month-schedule-actions .el-button {
  padding: 2px 4px;
  min-height: 20px;
  border: none;
  border-radius: 4px;
}

.month-schedule-actions .el-button--primary {
  background: #10b981;
  color: white;
}

.month-schedule-actions .el-button--primary:hover {
  background: #059669;
}

.month-schedule-actions .el-button:not(.el-button--primary) {
  background: #f3f4f6;
  color: #6b7280;
}

.month-schedule-actions .el-button:not(.el-button--primary):hover {
  background: #e5e7eb;
  color: #374151;
}

/* 排课项目内容样式 */
.schedule-time {
  font-size: 11px;
  font-weight: 600;
  opacity: 0.8;
  margin-bottom: 2px;
}

.schedule-title {
  font-weight: 600;
  margin-bottom: 2px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.schedule-meta {
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  opacity: 0.7;
}

.schedule-meta .teacher {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  flex: 1;
}

.schedule-meta .location {
  flex-shrink: 0;
  margin-left: 4px;
}

/* 周视图和日视图的排课项目 */
.week-schedule-item,
.day-schedule-item {
  border-radius: 8px;
  padding: 8px 12px;
  margin: 2px 0;
  border-left: 4px solid;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 13px;
  line-height: 1.3;
}

.week-schedule-item:hover,
.day-schedule-item:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.week-schedule-item.python,
.day-schedule-item.python {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(29, 78, 216, 0.08));
  border-left-color: #3b82f6;
  color: #1d4ed8;
}

.week-schedule-item.java,
.day-schedule-item.java {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(217, 119, 6, 0.08));
  border-left-color: #f59e0b;
  color: #d97706;
}

.week-schedule-item.ai,
.day-schedule-item.ai {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(124, 58, 237, 0.08));
  border-left-color: #8b5cf6;
  color: #7c3aed;
}

.week-schedule-item.web,
.day-schedule-item.web {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(5, 150, 105, 0.08));
  border-left-color: #10b981;
  color: #059669;
}

.week-schedule-item.default,
.day-schedule-item.default {
  background: linear-gradient(135deg, rgba(107, 114, 128, 0.15), rgba(75, 85, 99, 0.08));
  border-left-color: #6b7280;
  color: #4b5563;
}

/* 📅 周视图样式 */
.week-view {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin: 24px;
}

.week-grid-header {
  display: grid;
  grid-template-columns: 100px repeat(7, 1fr);
  background: linear-gradient(135deg, #f8fafc, #e2e8f0);
  border-bottom: 2px solid #e5e7eb;
}

.time-header-cell {
  padding: 16px 12px;
  font-weight: 700;
  color: #374151;
  background: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  border-right: 1px solid #e5e7eb;
}

.day-header-cell {
  padding: 12px;
  text-align: center;
  border-right: 1px solid #e5e7eb;
  background: white;
  transition: all 0.2s ease;
}

.day-header-cell:last-child {
  border-right: none;
}

.day-header-cell.today {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.05));
}

.day-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.day-name {
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
}

.day-date {
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
}

.day-header-cell.today .day-date {
  color: #6366f1;
}

.today-badge {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  font-size: 10px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 10px;
  text-transform: uppercase;
}

.week-grid-body {
  display: flex;
  flex-direction: column;
}

.week-time-row {
  display: grid;
  grid-template-columns: 100px repeat(7, 1fr);
  min-height: 80px;
  border-bottom: 1px solid #f3f4f6;
}

.week-time-row:last-child {
  border-bottom: none;
}

.time-cell {
  padding: 16px 12px;
  background: #f8fafc;
  border-right: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
}

.time-text {
  font-size: 13px;
  font-weight: 600;
  color: #6b7280;
}

.schedule-cell {
  padding: 8px;
  border-right: 1px solid #f3f4f6;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-height: 80px;
}

.schedule-cell:last-child {
  border-right: none;
}

.schedule-cell:hover {
  background: #f9fafb;
}

.week-schedule-card {
  background: white;
  border-radius: 8px;
  padding: 8px 10px;
  border-left: 3px solid #e5e7eb;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  min-height: 60px;
}

.week-schedule-card:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.week-schedule-card.python {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(29, 78, 216, 0.05));
  border-left-color: #3b82f6;
}

.week-schedule-card.java {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(217, 119, 6, 0.05));
  border-left-color: #f59e0b;
}

.week-schedule-card.ai {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(124, 58, 237, 0.05));
  border-left-color: #8b5cf6;
}

.week-schedule-card.web {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.05));
  border-left-color: #10b981;
}

.week-schedule-card.default {
  background: linear-gradient(135deg, rgba(107, 114, 128, 0.1), rgba(75, 85, 99, 0.05));
  border-left-color: #6b7280;
}

/* 🎯 周视图排课卡片按钮样式 */
.week-schedule-actions {
  display: flex;
  gap: 4px;
  margin-top: 6px;
  justify-content: flex-end;
}

.week-schedule-actions .el-button {
  padding: 4px 6px;
  min-height: 24px;
  border: none;
  border-radius: 4px;
}

.week-schedule-actions .el-button--primary {
  background: #10b981;
  color: white;
}

.week-schedule-actions .el-button--primary:hover {
  background: #059669;
}

.week-schedule-actions .el-button:not(.el-button--primary) {
  background: #f3f4f6;
  color: #6b7280;
}

.week-schedule-actions .el-button:not(.el-button--primary):hover {
  background: #e5e7eb;
  color: #374151;
}

.schedule-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.schedule-time {
  font-size: 11px;
  font-weight: 600;
  color: #6b7280;
}

.schedule-duration {
  font-size: 11px;
  color: #9ca3af;
}

.schedule-content {
  flex: 1;
}

.course-name {
  font-size: 13px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.schedule-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.schedule-details .teacher {
  font-size: 11px;
  color: #6b7280;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.schedule-details .location {
  font-size: 11px;
  color: #9ca3af;
  flex-shrink: 0;
  margin-left: 8px;
}

.empty-slot {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  opacity: 0;
  transition: all 0.2s ease;
}

.schedule-cell:hover .empty-slot {
  opacity: 1;
}

.add-hint {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 300;
  cursor: pointer;
  transition: all 0.2s ease;
}

.add-hint:hover {
  transform: scale(1.1);
}

/* 📅 月视图样式 */
.month-view {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin: 24px;
}

.month-header {
  background: linear-gradient(135deg, #f8fafc, #e2e8f0);
  border-bottom: 2px solid #e5e7eb;
}

.weekday-headers {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.weekday-header {
  padding: 16px 12px;
  text-align: center;
  font-weight: 700;
  color: #374151;
  font-size: 14px;
  background: #f1f5f9;
  border-right: 1px solid #e5e7eb;
}

.weekday-header:last-child {
  border-right: none;
}

.month-body {
  display: flex;
  flex-direction: column;
}

.week-row {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border-bottom: 1px solid #f3f4f6;
}

.week-row:last-child {
  border-bottom: none;
}



/* 🗓️ 日历单元格样式 */
.day-cell {
  background: white;
  border-radius: 12px;
  border: 1px solid #f3f4f6;
  padding: 12px;
  min-height: 120px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.day-cell:hover {
  border-color: #e5e7eb;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transform: translateY(-1px);
}

.day-cell.today {
  border-color: #6366f1;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(139, 92, 246, 0.02));
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1);
}

.day-cell.other-month {
  opacity: 0.4;
  background: #fafafa;
}

.day-cell.has-schedules {
  border-color: #d1d5db;
}

.day-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.day-number {
  font-weight: 600;
  font-size: 16px;
  color: #374151;
}

.day-cell.today .day-number {
  color: #6366f1;
  font-weight: 700;
}

.day-cell.other-month .day-number {
  color: #9ca3af;
}

.day-badges {
  display: flex;
  gap: 4px;
  align-items: center;
}

.today-badge {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  font-size: 10px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 10px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.schedule-count-badge {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
  font-size: 10px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 10px;
  min-width: 18px;
  text-align: center;
}

.day-schedules {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.more-schedules {
  font-size: 11px;
  color: #6b7280;
  text-align: center;
  padding: 4px;
  border-radius: 4px;
  background: #f9fafb;
  cursor: pointer;
  transition: all 0.2s ease;
}

.more-schedules:hover {
  background: #f3f4f6;
  color: #374151;
}

/* 暗色主题适配 */
[data-theme='dark'] .schedule-container {
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
}

[data-theme='dark'] .control-panel {
  background: #2d3748;
  color: #f7fafc;
}

[data-theme='dark'] .section-title {
  color: #e2e8f0;
}

[data-theme='dark'] .view-radio .el-radio-button__inner {
  background: #4a5568;
  color: #e2e8f0;
}

[data-theme='dark'] .nav-btn {
  background: #4a5568;
  border-color: #718096;
  color: #e2e8f0;
}

[data-theme='dark'] .nav-btn:hover {
  background: #718096;
}

[data-theme='dark'] .current-period {
  color: #f7fafc;
}

[data-theme='dark'] .legend-item {
  background: #4a5568;
}

[data-theme='dark'] .legend-item:hover {
  background: #718096;
}

[data-theme='dark'] .legend-text {
  color: #e2e8f0;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .control-panel {
    grid-template-columns: 1fr;
    gap: 24px;
    text-align: center;
  }
  
  .banner-content {
    flex-direction: column;
    gap: 24px;
    text-align: center;
  }
  
  .page-stats {
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .schedule-header {
    padding: 24px 16px;
  }
  
  .control-panel {
    margin: -20px 16px 16px;
    padding: 24px;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .page-stats {
    gap: 20px;
  }
  
  .legend-grid {
    grid-template-columns: 1fr;
  }
  
  .quick-actions {
    flex-direction: column;
    width: 100%;
  }
  
  .action-btn {
    justify-content: center;
  }
}

/* 🎨 响应式设计 */
@media (max-width: 768px) {
  .schedule-header {
    padding: 24px 16px;
  }
  
  .banner-content {
    flex-direction: column;
    gap: 24px;
    text-align: center;
  }
  
  .banner-left {
    flex-direction: column;
    gap: 16px;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .page-description {
    font-size: 1rem;
  }
  
  .page-stats {
    justify-content: center;
    gap: 24px;
  }
  
  .quick-actions {
    flex-direction: column;
    width: 100%;
    gap: 12px;
  }
  
  .action-btn {
    width: 100%;
    justify-content: center;
  }
  
  /* 控制面板响应式 */
  .control-panel {
    padding: 16px;
    gap: 16px;
  }
  
  .panel-section {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .view-radio-group {
    width: 100%;
  }
  
  .view-radio .el-radio-button__inner {
    flex: 1;
    justify-content: center;
    padding: 10px 16px;
  }
  
  .date-controls {
    width: 100%;
    justify-content: center;
  }
  
  .current-period {
    min-width: 100px;
    font-size: 1rem;
  }
  
  /* 日历视图响应式 */
  .calendar-view {
    padding: 16px;
  }
  
  .legend-grid {
    grid-template-columns: 1fr;
    gap: 8px;
  }
  
  /* 月视图响应式 */
  .month-view {
    margin: 16px;
  }
  
  .weekday-header {
    padding: 12px 8px;
    font-size: 13px;
  }
  
  .day-cell {
    padding: 8px;
    min-height: 100px;
  }
  
  .day-number {
    font-size: 14px;
  }
  
  .schedule-item {
    padding: 4px 6px;
    margin-bottom: 1px;
  }
  
  .schedule-time {
    font-size: 10px;
  }
  
  .schedule-title {
    font-size: 11px;
  }
  
  .schedule-meta .teacher,
  .schedule-meta .location {
    font-size: 9px;
  }
  
  /* 日视图响应式 */
  .day-view {
    margin: 16px;
  }
  
  .day-header-full {
    padding: 16px 24px;
  }
  
  .day-title {
    font-size: 24px;
  }
  
  .day-stats {
    gap: 24px;
  }
  
  .schedule-count,
  .teacher-count {
    font-size: 14px;
  }
  
  .timeline-hours {
    padding: 0 24px;
  }
  
  .hour-label {
    width: 60px;
    font-size: 12px;
  }
  
  .hour-line {
    left: 60px;
  }
  
  .schedule-container {
    padding: 8px 0 8px 20px;
  }
  
  .day-schedule-item {
    padding: 12px 16px;
  }
  
  .schedule-course {
    font-size: 16px;
  }
  
  /* 周视图响应式 */
  .week-view {
    margin: 16px;
  }
  
  .week-grid-header,
  .week-time-row {
    grid-template-columns: 80px repeat(7, 1fr);
  }
  
  .time-header-cell,
  .time-cell {
    padding: 12px 8px;
  }
  
  .day-header-cell {
    padding: 8px 4px;
  }
  
  .day-name {
    font-size: 11px;
  }
  
  .day-date {
    font-size: 16px;
  }
  
  .week-schedule-card {
    padding: 6px 8px;
    min-height: 50px;
  }
  
  .course-name {
    font-size: 12px;
  }
  
  .schedule-details .teacher,
  .schedule-details .location {
    font-size: 10px;
  }
}

@media (max-width: 480px) {
  .schedule-header {
    padding: 16px 12px;
  }
  
  .page-title {
    font-size: 1.5rem;
  }
  
  .page-stats {
    flex-direction: column;
    gap: 12px;
  }
  
  .stat-number {
    font-size: 1.5rem;
  }
  
  .control-panel {
    padding: 12px;
  }
  
  .view-radio .el-radio-button__inner {
    padding: 8px 12px;
    font-size: 14px;
  }
  
  .nav-btn {
    width: 36px;
    height: 36px;
  }
  
  .current-period {
    font-size: 0.9rem;
    min-width: 80px;
  }
  
  .calendar-view {
    padding: 12px;
  }
  
  /* 表单对话框响应式 */
  .modern-dialog {
    width: 95% !important;
    margin: 0 auto;
  }
  
  .modern-form .el-form-item {
    margin-bottom: 16px;
  }
  
  .modern-form .el-form-item__label {
    font-size: 14px;
  }
  
  /* 超小屏幕周视图优化 */
  .week-view {
    margin: 8px;
  }
  
  .week-grid-header,
  .week-time-row {
    grid-template-columns: 60px repeat(7, 1fr);
  }
  
  .time-header-cell,
  .time-cell {
    padding: 8px 4px;
    font-size: 11px;
  }
  
  .day-header-cell {
    padding: 6px 2px;
  }
  
  .day-name {
    font-size: 9px;
  }
  
  .day-date {
    font-size: 14px;
  }
  
  .today-badge {
    font-size: 8px;
    padding: 1px 4px;
  }
  
  .week-time-row {
    min-height: 60px;
  }
  
  .week-schedule-card {
    padding: 4px 6px;
    min-height: 40px;
  }
  
  .course-name {
    font-size: 11px;
  }
  
  .schedule-time,
  .schedule-duration {
    font-size: 9px;
  }
  
  .schedule-details .teacher,
  .schedule-details .location {
    font-size: 9px;
  }
  
  .add-hint {
    width: 24px;
    height: 24px;
    font-size: 14px;
  }
  
  /* 超小屏幕月视图优化 */
  .month-view {
    margin: 8px;
  }
  
  .weekday-header {
    padding: 8px 4px;
    font-size: 11px;
  }
  
  .day-cell {
    padding: 4px;
    min-height: 80px;
  }
  
  .day-number {
    font-size: 12px;
  }
  
  .today-badge,
  .schedule-count-badge {
    font-size: 8px;
    padding: 1px 4px;
  }
  
  .schedule-item {
    padding: 2px 4px;
    margin-bottom: 1px;
    border-left-width: 2px;
  }
  
  .schedule-time {
    font-size: 9px;
  }
  
  .schedule-title {
    font-size: 10px;
  }
  
  .schedule-meta .teacher,
  .schedule-meta .location {
    font-size: 8px;
  }
  
  .more-schedules {
    font-size: 9px;
    padding: 2px;
  }
  
  /* 超小屏幕日视图优化 */
  .day-view {
    margin: 8px;
  }
  
  .day-header-full {
    padding: 12px 16px;
  }
  
  .day-title {
    font-size: 18px; /* 移动端进一步减小 */
  }
  
  .day-timeline {
    max-height: 400px; /* 移动端减小高度 */
  }
  
  .day-stats {
    flex-direction: column;
    gap: 12px;
  }
  
  .schedule-count,
  .teacher-count {
    font-size: 12px;
  }
  
  .timeline-hours {
    padding: 0 16px;
  }
  
  .hour-label {
    width: 45px;
    font-size: 11px;
    padding: 12px 15px 12px 0;
  }
  
  .hour-line {
    left: 45px;
  }
  
  .schedule-container {
    padding: 6px 0 6px 15px;
  }
  
  .day-schedule-item {
    padding: 10px 12px;
  }
  
  .schedule-time-full {
    font-size: 12px;
  }
  
  .schedule-course {
    font-size: 14px;
  }
  
  .teacher-info,
  .location-info {
    font-size: 12px;
  }
  
  .timeline-hour {
    min-height: 30px; /* 移动端减小时间段高度 */
  }
  
  .timeline-hour:has(.day-schedule-item) {
    min-height: 40px; /* 移动端有课程时的高度 */
  }

/* 🎯 点名弹窗样式 */
.attendance-dialog {
  .el-dialog {
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  }
  
  .el-dialog__body {
    padding: 0;
    border-radius: 20px;
    overflow: hidden;
  }
  
  .el-dialog__header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 24px 32px;
    border-radius: 20px 20px 0 0;
    position: relative;
    overflow: hidden;
  }
  
  .el-dialog__header::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
    pointer-events: none;
  }
  
  .el-dialog__title {
    color: white;
    font-weight: 700;
    font-size: 22px;
    position: relative;
    z-index: 1;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  .el-dialog__close {
    display: none;
  }
}

.attendance-content {
  padding: 32px;
  background: linear-gradient(145deg, #fafbfc 0%, #f1f5f9 50%, #e2e8f0 100%);
  min-height: 650px;
  position: relative;
}

.attendance-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 20%, rgba(102, 126, 234, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(118, 75, 162, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

.class-info-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border-radius: 20px;
  padding: 0;
  margin-bottom: 32px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.8);
  position: relative;
  overflow: hidden;
}

.info-header {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10;
}

.close-button {
  width: 36px;
  height: 36px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #64748b;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.close-button:hover {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  transform: scale(1.1);
}

.class-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
  padding: 28px 32px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
}

.course-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
}

.course-info .course-name {
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 16px 0;
  color: #1f2937;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.class-meta {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.meta-item {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 14px;
  font-size: 14px;
  color: #475569;
  font-weight: 500;
  border: 1px solid rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.meta-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  background: rgba(255, 255, 255, 0.9);
}

.meta-item svg {
  color: #667eea;
}

.attendance-summary {
  display: flex;
  gap: 16px;
}

.summary-item {
  text-align: center;
  background: rgba(255, 255, 255, 0.1);
  padding: 12px 16px;
  border-radius: 12px;
  backdrop-filter: blur(10px);
  min-width: 60px;
}

.summary-item .count {
  display: block;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 4px;
}

.summary-item .label {
  font-size: 12px;
  opacity: 0.9;
}

.summary-item.present .count {
  color: #4ade80;
}

.summary-item.absent .count {
  color: #f87171;
}

.summary-item.late .count {
  color: #fbbf24;
}

.student-list {
  margin-bottom: 32px;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;
  padding: 24px 28px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%);
  border-radius: 18px;
  border: 1px solid rgba(226, 232, 240, 0.6);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(10px);
}

.header-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-icon {
  width: 36px;
  height: 36px;
  border-radius: 12px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.list-header h4 {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: #1f2937;
}

.batch-actions {
  display: flex;
  gap: 12px;
}

.batch-actions .el-button {
  border-radius: 12px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.batch-actions .el-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.student-cards {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.student-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%);
  border: 2px solid rgba(226, 232, 240, 0.6);
  border-radius: 18px;
  padding: 20px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  min-height: 80px;
}

.student-card-main {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
  min-width: 0;
}

.student-card-controls {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.student-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.2);
  border-color: rgba(102, 126, 234, 0.3);
}

.student-card.present {
  border-color: rgba(16, 185, 129, 0.4);
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(5, 150, 105, 0.02));
}

.student-card.absent {
  border-color: rgba(239, 68, 68, 0.4);
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.05), rgba(220, 38, 38, 0.02));
}

.student-card.late {
  border-color: rgba(245, 158, 11, 0.4);
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.05), rgba(217, 119, 6, 0.02));
}

.student-avatar {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.student-info {
  flex: 1;
  min-width: 0;
}

.student-details {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  margin-top: 0;
}

.student-phone,
.remaining-hours {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #64748b;
  white-space: nowrap;
}

.attendance-status {
  display: flex;
  align-items: center;
  margin-right: 12px;
}

.status-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 8px;
}

.status-indicator.present {
  background: #10b981;
  box-shadow: 0 0 8px rgba(16, 185, 129, 0.4);
}

.status-indicator.absent {
  background: #ef4444;
  box-shadow: 0 0 8px rgba(239, 68, 68, 0.4);
}

.status-indicator.late {
  background: #f59e0b;
  box-shadow: 0 0 8px rgba(245, 158, 11, 0.4);
}

.student-card .student-info {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  flex: 1;
  min-width: 0;
}

/* 移除重复的样式定义 */

/* 不需要的样式已移除 */

.student-card-body {
  width: 100%;
}

/* 📝 课程内容区域样式 */
.class-content-section {
  margin-bottom: 32px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 20px;
  padding: 28px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.section-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid rgba(102, 126, 234, 0.1);
}

.section-header svg {
  color: #667eea;
}

.section-header h3 {
  margin: 0;
  font-size: 22px;
  font-weight: 700;
  color: #1f2937;
}

.item-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.item-header svg {
  color: #667eea;
}

.item-header h4 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #374151;
}

.class-content-section h4 {
  margin: 0 0 12px 0;
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  display: flex;
  align-items: center;
  gap: 8px;
}

.class-content-section h4::before {
  content: '';
  width: 4px;
  height: 16px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 2px;
}

.content-row {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.content-item {
  background: rgba(248, 250, 252, 0.8);
  padding: 20px;
  border-radius: 16px;
  border: 1px solid rgba(226, 232, 240, 0.6);
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
}

.content-item:hover {
  border-color: rgba(102, 126, 234, 0.3);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.9);
}

.subject-item {
  flex: 2;
}

.type-item {
  flex: 1;
}

.notes-section,
.homework-section {
  background: rgba(248, 250, 252, 0.8);
  padding: 20px;
  border-radius: 16px;
  border: 1px solid rgba(226, 232, 240, 0.6);
  margin-bottom: 20px;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
}

.notes-section:hover,
.homework-section:hover {
  border-color: rgba(102, 126, 234, 0.3);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.9);
}

.notes-section .el-textarea,
.homework-section .el-textarea,
.content-item .el-input,
.content-item .el-select {
  margin-top: 8px;
}

.notes-section .el-textarea__inner,
.homework-section .el-textarea__inner {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.notes-section .el-textarea__inner:focus,
.homework-section .el-textarea__inner:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.student-name {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0;
  white-space: nowrap;
  min-width: 80px;
  flex-shrink: 0;
}

.student-phone {
  font-size: 13px;
  color: #64748b;
  margin-bottom: 0;
  font-weight: 500;
}

.remaining-hours {
  font-size: 12px;
  color: #059669;
  font-weight: 600;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.05));
  padding: 4px 8px;
  border-radius: 6px;
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
}

.attendance-controls {
  margin-bottom: 0;
  flex-shrink: 0;
}

.attendance-controls .el-radio-group {
  width: auto;
  display: flex;
  gap: 4px;
}

.attendance-controls .el-radio-button {
  flex: 1;
}

.attendance-controls .el-radio-button__inner {
  width: 100%;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.attendance-controls .el-radio-button:first-child .el-radio-button__inner {
  border-radius: 8px 0 0 8px;
}

.attendance-controls .el-radio-button:last-child .el-radio-button__inner {
  border-radius: 0 8px 8px 0;
}

.attendance-controls .el-radio-button__inner:hover {
  transform: translateY(-1px);
}

.student-notes {
  margin-top: 8px;
}

/* 🎯 点名弹窗底部按钮样式 */
.attendance-dialog .dialog-footer {
  padding: 24px 32px;
  background: linear-gradient(135deg, rgba(248, 250, 252, 0.95) 0%, rgba(241, 245, 249, 0.95) 100%);
  border-top: 1px solid rgba(226, 232, 240, 0.6);
  display: flex;
  justify-content: space-between;
  align-items: center;
  backdrop-filter: blur(10px);
}

.footer-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.total-students {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #64748b;
  font-size: 14px;
  font-weight: 500;
}

.footer-actions {
  display: flex;
  gap: 16px;
}

.attendance-dialog .dialog-footer .el-button {
  padding: 14px 28px;
  border-radius: 14px;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;
  border: none;
  display: flex;
  align-items: center;
  gap: 8px;
}

.attendance-dialog .dialog-footer .el-button:not(.el-button--primary) {
  background: rgba(241, 245, 249, 0.8);
  color: #64748b;
  border: 1px solid rgba(203, 213, 225, 0.6);
}

.attendance-dialog .dialog-footer .el-button:not(.el-button--primary):hover {
  background: rgba(226, 232, 240, 0.9);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.attendance-dialog .dialog-footer .el-button--primary {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.attendance-dialog .dialog-footer .el-button--primary:hover {
  background: linear-gradient(135deg, #5a67d8, #6b46c1);
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.5);
}

.class-notes-section h4 {
  margin: 0 0 12px 0;
  font-size: 16px;
  color: #1f2937;
}

}

/* 响应式调整 */
@media (max-width: 768px) {
  .class-header {
    flex-direction: column;
    gap: 16px;
  }
  
  .attendance-summary {
    justify-content: center;
  }
  
  .student-cards {
    grid-template-columns: 1fr;
  }
  
  .class-meta {
    justify-content: center;
  }
  
  .content-row {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}

@media (max-width: 480px) {
  .attendance-content {
    padding: 16px;
  }
  
  .class-info-card {
    padding: 16px;
  }
  
  .course-info .course-name {
    font-size: 20px;
  }
  
  .class-meta span {
    font-size: 12px;
    padding: 2px 8px;
  }
  
  .content-item,
  .notes-section,
  .homework-section {
    padding: 12px;
  }
  
  .class-content-section h4 {
    font-size: 14px;
  }
  
  .summary-item {
    padding: 8px 12px;
    min-width: 50px;
  }
  
  .summary-item .count {
    font-size: 20px;
  }
}

</style>
