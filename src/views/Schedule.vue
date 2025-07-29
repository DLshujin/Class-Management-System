<template>
  <div class="schedule-page-container">
    <!-- 现代化页面头部 -->
    <div class="page-header modern-card">
      <div class="header-content">
        <div class="header-left">
          <div class="page-title">
            <div class="title-icon">
              <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
                <path d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,4.11 20.1,3 19,3H18V1M17,12H12V17H17V12Z"/>
              </svg>
          </div>
            <div class="title-text">
              <h1>智能排课</h1>
              <p class="page-subtitle">高效管理课程安排，优化教学资源</p>
            </div>
          </div>
        </div>
        <div class="header-right">
          <div class="course-legend">
            <div class="legend-title">课程分类</div>
            <div class="legend-items">
              <span class="legend-item python">
                <span class="legend-color"></span>
                <span class="legend-text">Python</span>
            </span>
              <span class="legend-item java">
                <span class="legend-color"></span>
                <span class="legend-text">Java</span>
            </span>
              <span class="legend-item ai">
                <span class="legend-color"></span>
                <span class="legend-text">人工智能</span>
            </span>
              <span class="legend-item web">
                <span class="legend-color"></span>
                <span class="legend-text">Web开发</span>
            </span>
          </div>
          </div>
          <div class="header-actions">
            <el-button type="info" class="modern-btn info" @click="exportSchedule">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
              </svg>
              导出排课表
            </el-button>
            <el-button type="primary" class="modern-btn primary" @click="showBatchScheduleDialog = true">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,4.11 20.1,3 19,3H18V1M17,12H12V17H17V12Z"/>
              </svg>
            批量排课
          </el-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 现代化视图控制栏 -->
    <div class="view-controls modern-card">
      <div class="controls-left">
        <div class="view-switcher">
          <div class="switcher-label">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M9,10V12H7V10H9M13,10V12H11V10H13M17,10V12H15V10H17M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5A2,2 0 0,1 5,3H6V1H8V3H16V1H18V3H19M19,19V8H5V19H19M9,10V12H7V10H9M13,10V12H11V10H13M17,10V12H15V10H17M9,14V16H7V14H9M13,14V16H11V14H13M17,14V16H15V14H17Z"/>
            </svg>
            视图模式
          </div>
          <el-button-group class="view-buttons">
            <el-button 
              :type="viewType === 'month' ? 'primary' : ''" 
              @click="switchView('month')"
              class="view-btn"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5A2,2 0 0,1 5,3H6V1H8V3H16V1H18V3H19M19,19V8H5V19H19M9,10V12H7V10H9M13,10V12H11V10H13M17,10V12H15V10H17M9,14V16H7V14H9M13,14V16H11V14H13M17,14V16H15V14H17Z"/>
              </svg>
              月视图
            </el-button>
            <el-button 
              :type="viewType === 'week' ? 'primary' : ''" 
              @click="switchView('week')"
              class="view-btn"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M6,1V3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3H18V1H16V3H8V1H6M5,8H19V19H5V8M7,10V12H9V10H7M11,10V12H13V10H11M15,10V12H17V10H15Z"/>
              </svg>
              周视图
            </el-button>
            <el-button 
              :type="viewType === 'day' ? 'primary' : ''" 
              @click="switchView('day')"
              class="view-btn"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5A2,2 0 0,1 5,3H6V1H8V3H16V1H18V3H19M19,19V8H5V19H19Z"/>
              </svg>
              日视图
            </el-button>
        </el-button-group>
        </div>
        <el-button @click="goToToday" class="today-btn modern-btn info">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5A2,2 0 0,1 5,3H6V1H8V3H16V1H18V3H19M19,19V8H5V19H19M9,10V12H7V10H9M13,10V12H11V10H13M17,10V12H15V10H17M9,14V16H7V14H9M13,14V16H11V14H13M17,14V16H15V14H17Z"/>
          </svg>
          回到今天
        </el-button>
      </div>
      <div class="controls-center">
        <div class="period-navigation">
          <el-button circle @click="previousPeriod" class="nav-btn">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"/>
            </svg>
        </el-button>
          <div class="current-period">
            <h2 class="period-text">{{ currentPeriodText }}</h2>
            <div class="period-subtitle">{{ getPeriodSubtitle() }}</div>
          </div>
          <el-button circle @click="nextPeriod" class="nav-btn">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/>
            </svg>
        </el-button>
        </div>
      </div>
      <div class="controls-right">
        <div class="schedule-stats">
          <div class="stat-item">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z"/>
            </svg>
            <span>{{ getTotalSchedulesForPeriod() }} 节课</span>
          </div>
        </div>
        <el-button type="success" class="modern-btn success" @click="showAddDialog">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"/>
          </svg>
          新增课程
        </el-button>
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
                  :class="getScheduleItemClass(schedule)"
                  @click.stop="editSchedule(schedule)"
                >
                <div class="schedule-time">{{ formatTime(schedule.startTime) }}</div>
                <div class="schedule-title">{{ schedule.courseName }}</div>
                  <div class="schedule-meta">
                    <span class="teacher">{{ schedule.teacherName }}</span>
                    <span class="location">{{ schedule.location }}</span>
                  </div>
                </div>
                <div v-if="day.schedules.length > 3" class="more-schedules" @click.stop="showDayDetail(day)">
                  +{{ day.schedules.length - 3 }} 更多
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 周视图 -->
      <div v-else-if="viewType === 'week'" class="week-view">
        <div class="week-header">
          <div class="time-column-header">时间</div>
          <div 
            v-for="day in weekDays" 
            :key="day.date" 
            class="week-day-header"
            :class="{ 'today': day.isToday }"
          >
            <div class="day-name">{{ day.dayName }}</div>
            <div class="day-date">{{ day.dayNumber }}</div>
            <div v-if="day.isToday" class="today-indicator">今天</div>
          </div>
        </div>
        <div class="week-body">
          <div class="time-slots">
            <div v-for="hour in timeSlots" :key="hour" class="time-slot">
              <div class="time-label">{{ formatHour(hour) }}</div>
              <div class="hour-schedules">
                <div 
                  v-for="day in weekDays" 
                  :key="day.date" 
                  class="day-schedule-slot"
                  @click="addScheduleAtTime(day, hour)"
                >
                  <div 
                    v-for="schedule in getSchedulesForDayHour(day, hour)" 
                    :key="schedule.id"
                    class="week-schedule-item"
                    :class="getScheduleItemClass(schedule)"
                    @click.stop="editSchedule(schedule)"
                  >
                    <div class="schedule-time-range">
                      {{ formatTime(schedule.startTime) }}-{{ formatTime(schedule.endTime) }}
                    </div>
                    <div class="schedule-title">{{ schedule.courseName }}</div>
                    <div class="schedule-teacher">{{ schedule.teacherName }}</div>
                    <div class="schedule-location">{{ schedule.location }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 日视图 -->
      <div v-else-if="viewType === 'day'" class="day-view">
        <div class="day-header-full">
          <div class="selected-day-info">
            <h3 class="day-title">{{ formatSelectedDay() }}</h3>
            <div class="day-stats">
              <span class="schedule-count">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z"/>
                </svg>
                {{ selectedDaySchedules.length }} 节课
              </span>
              <span class="teacher-count">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                {{ getUniqueTeachers().length }} 位教师
              </span>
            </div>
          </div>
        </div>
        <div class="day-timeline">
          <div class="timeline-hours">
            <div v-for="hour in extendedTimeSlots" :key="hour" class="timeline-hour">
              <div class="hour-label">{{ formatHour(hour) }}</div>
              <div class="hour-line"></div>
              <div class="schedule-container">
                <div 
                  v-for="schedule in getSchedulesForHour(hour)" 
                  :key="schedule.id"
                  class="day-schedule-item"
                  :class="getScheduleItemClass(schedule)"
                  :style="getScheduleStyle(schedule)"
                  @click="editSchedule(schedule)"
                >
                  <div class="schedule-time-full">
                    {{ formatTime(schedule.startTime) }} - {{ formatTime(schedule.endTime) }}
              </div>
                  <div class="schedule-course">{{ schedule.courseName }}</div>
                  <div class="schedule-details">
                    <div class="teacher-info">
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      {{ schedule.teacherName }}
            </div>
                    <div class="location-info">
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                        <path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z"/>
                      </svg>
                      {{ schedule.location }}
                    </div>
                  </div>
                  <div class="schedule-actions">
                    <el-button size="small" circle @click.stop="quickEditSchedule(schedule)">
                      <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                        <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"/>
                      </svg>
                    </el-button>
                  </div>
                </div>
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
  const date = new Date(time);
  return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
};

const getSchedulesForDate = (date) => {
  if (!scheduleStore.getSchedules) return [];
  return scheduleStore.getSchedules.filter(schedule => {
    const scheduleDate = new Date(schedule.scheduleDate);
    return isSameDay(scheduleDate, date);
  });
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
  if (!scheduleStore.getSchedules) return 0;
  
  const now = new Date();
  const hour = now.getHours();
  
  return scheduleStore.getSchedules.filter(schedule => {
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

// 格式化选中的日期
const formatSelectedDay = () => {
  if (!selectedDay.value) {
    return new Date().toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  }
  
  return selectedDay.value.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  });
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

const getSchedulesForHour = (hour) => {
  if (!scheduleStore.getSchedules) return [];
  const today = new Date();
  return scheduleStore.getSchedules.filter(schedule => {
    const scheduleDate = new Date(schedule.scheduleDate);
    const startHour = new Date(schedule.startTime).getHours();
    return isSameDay(scheduleDate, today) && startHour === hour;
  });
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
  const course = courses.value.find(c => c.id === schedule.courseId);
  if (!course) return 'default';
  
  const category = course.category || '';
  if (category.includes('Python')) return 'python';
  if (category.includes('Java')) return 'java';
  if (category.includes('AI') || category.includes('人工智能')) return 'ai';
  if (category.includes('Web') || category.includes('前端')) return 'web';
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
const extendedTimeSlots = Array.from({ length: 16 }, (_, i) => i + 7); // 7点到22点

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
  return `${hour.toString().padStart(2, '0')}:00`;
};

// 获取某天某小时的课程
const getSchedulesForDayHour = (day, hour) => {
  if (!scheduleStore.getSchedules) return [];
  return scheduleStore.getSchedules.filter(schedule => {
    const scheduleDate = new Date(schedule.scheduleDate);
    const startHour = new Date(schedule.startTime).getHours();
    return isSameDay(scheduleDate, day.date) && startHour === hour;
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
  const startTime = new Date(schedule.startTime);
  const endTime = new Date(schedule.endTime);
  const duration = (endTime - startTime) / (1000 * 60 * 60); // 小时数
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
    await Promise.all([
      scheduleStore.fetchSchedules(),
      courseStore.fetchCourses(),
      classStore.fetchClasses(),
      teacherStore.fetchTeachers()
    ]);
  } catch (error) {
    errorHandler.handleApiError(error, {
      module: 'SCHEDULE',
      operation: '数据加载'
    });
  }
};

// 页面初始化
onMounted(async () => {
  await loadData();
});

const calendar = ref(null);
const scheduleDialogVisible = ref(false);
const showBatchScheduleDialog = ref(false);
const dialogTitle = ref('新增排课');

// 卡片视图相关数据
const viewType = ref('month'); // 'month', 'week', 'day'
const currentDate = ref(new Date());
const currentPeriodText = ref('');
const selectedDay = ref(new Date());

// 选中日期的课程计算属性
const selectedDaySchedules = computed(() => {
  if (!scheduleStore.getSchedules) return [];
  return getSchedulesForDate(selectedDay.value);
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
    const dayData = {
      date: new Date(tempDate),
      dayNumber: tempDate.getDate(),
      isCurrentMonth: tempDate.getMonth() === month,
      isToday: isSameDay(tempDate, new Date()),
      schedules: getSchedulesForDate(tempDate)
    };
    
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

onMounted(() => {
  loadInitialData();
  
  // 延迟一下以确保日历组件已经挂载
  setTimeout(() => {
    if (calendar.value) {
      const calendarApi = calendar.value.getApi();
      
      // 初始加载所有排课数据，不限制日期范围
      loadEvents({
        startStr: '', // 不限制开始日期
        endStr: ''    // 不限制结束日期
      });
      
      // 强制刷新视图
      calendarApi.refetchEvents();
      calendarApi.render();
    }
  }, 300); // 增加延迟时间，确保组件完全挂载
});

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
        startDate: startDate.toISOString().slice(0, 10),
        endDate: endDate.toISOString().slice(0, 10),
        startTime: startTime.toTimeString().slice(0, 8),
        endTime: endTime.toTimeString().slice(0, 8),
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
/* 排课管理页面样式 */
.schedule-page-container {
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

.header-right {
  display: flex;
  align-items: center;
  gap: 24px;
}

/* 课程图例 */
.course-legend {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.legend-title {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--text-secondary);
}

.legend-items {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: var(--radius-lg);
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid var(--border-light);
  font-size: var(--font-size-xs);
  font-weight: 500;
}

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

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-actions {
  display: flex;
  gap: 12px;
}

/* 视图控制栏 */
.view-controls {
  margin-bottom: 24px;
  padding: 20px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.controls-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.view-switcher {
  display: flex;
  align-items: center;
  gap: 16px;
}

.switcher-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--text-secondary);
}

.view-buttons :deep(.el-button-group .el-button) {
  border-radius: 0;
  border-color: var(--border-color);
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: var(--font-size-sm);
}

.view-buttons :deep(.el-button-group .el-button:first-child) {
  border-top-left-radius: var(--radius-lg);
  border-bottom-left-radius: var(--radius-lg);
}

.view-buttons :deep(.el-button-group .el-button:last-child) {
  border-top-right-radius: var(--radius-lg);
  border-bottom-right-radius: var(--radius-lg);
}

.today-btn {
  display: flex;
  align-items: center;
  gap: 6px;
}

/* 期间导航 */
.controls-center {
  flex: 1;
  display: flex;
  justify-content: center;
}

.period-navigation {
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-btn {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-lg);
  background: var(--bg-secondary);
  border: 1px solid var(--border-light);
  color: var(--text-secondary);
  transition: var(--transition-fast);
}

.nav-btn:hover {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.current-period {
  text-align: center;
  min-width: 200px;
}

.period-text {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 4px 0;
}

.period-subtitle {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

/* 右侧控制 */
.controls-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.schedule-stats {
  display: flex;
  gap: 12px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: var(--radius-lg);
  color: var(--success-color);
  font-size: var(--font-size-sm);
  font-weight: 500;
}

/* 日历容器 */
.calendar-container {
  background: white;
  padding: 0;
  overflow: hidden;
}

/* 月视图 */
.month-view {
  width: 100%;
}

.month-header {
  background: var(--bg-tertiary);
  border-bottom: 1px solid var(--border-light);
  padding: 16px 24px;
}

.weekday-headers {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
}

.weekday-header {
  text-align: center;
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--text-secondary);
  padding: 12px 8px;
}

.month-body {
  padding: 24px;
}

.week-row {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 16px;
  margin-bottom: 16px;
}

.day-cell {
  min-height: 120px;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  background: white;
  padding: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.day-cell:hover {
  border-color: var(--primary-color);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.day-cell.today {
  border-color: var(--primary-color);
  background: rgba(99, 102, 241, 0.05);
}

.day-cell.other-month {
  opacity: 0.4;
  background: var(--bg-secondary);
}

.day-cell.selected {
  border-color: var(--primary-color);
  background: rgba(99, 102, 241, 0.1);
}

.day-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.day-number {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-primary);
}

.day-badges {
  display: flex;
  gap: 4px;
}

.today-badge {
  background: var(--primary-color);
  color: white;
  padding: 2px 6px;
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
  font-weight: 600;
}

.schedule-count-badge {
  background: var(--success-color);
  color: white;
  padding: 2px 6px;
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
  font-weight: 600;
  min-width: 18px;
  text-align: center;
}

.day-schedules {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.schedule-item {
  padding: 6px 8px;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: var(--transition-fast);
  border-left: 3px solid;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
}

.schedule-item.python {
  border-left-color: #3b82f6;
  background: rgba(59, 130, 246, 0.1);
}

.schedule-item.java {
  border-left-color: #f59e0b;
  background: rgba(245, 158, 11, 0.1);
}

.schedule-item.ai {
  border-left-color: #8b5cf6;
  background: rgba(139, 92, 246, 0.1);
}

.schedule-item.web {
  border-left-color: #10b981;
  background: rgba(16, 185, 129, 0.1);
}

.schedule-item:hover {
  transform: translateX(2px);
  box-shadow: var(--shadow-sm);
}

.schedule-time {
  font-size: var(--font-size-xs);
  color: var(--text-light);
  font-weight: 500;
}

.schedule-title {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--text-primary);
  margin: 2px 0;
  line-height: 1.2;
}

.schedule-meta {
  display: flex;
  justify-content: space-between;
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
}

.more-schedules {
  padding: 4px 8px;
  text-align: center;
  background: var(--bg-tertiary);
  border-radius: var(--radius-md);
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
  cursor: pointer;
  transition: var(--transition-fast);
}

.more-schedules:hover {
  background: var(--primary-color);
  color: white;
}

/* 周视图 */
.week-view {
  width: 100%;
  overflow-x: auto;
}

.week-header {
  display: grid;
  grid-template-columns: 80px repeat(7, 1fr);
  gap: 1px;
  background: var(--bg-tertiary);
  border-bottom: 1px solid var(--border-light);
}

.time-column-header {
  padding: 16px 12px;
  text-align: center;
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--text-secondary);
  background: var(--bg-tertiary);
}

.week-day-header {
  padding: 16px 12px;
  text-align: center;
  background: white;
  transition: var(--transition-fast);
  position: relative;
}

.week-day-header.today {
  background: rgba(99, 102, 241, 0.1);
}

.day-name {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin-bottom: 4px;
}

.day-date {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-primary);
}

.today-indicator {
  position: absolute;
  top: 8px;
  right: 8px;
  background: var(--primary-color);
  color: white;
  padding: 2px 6px;
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
  font-weight: 600;
}

.week-body {
  padding: 24px;
}

.time-slots {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.time-slot {
  display: grid;
  grid-template-columns: 80px repeat(7, 1fr);
  gap: 16px;
  min-height: 80px;
  border-bottom: 1px solid var(--border-light);
  padding: 8px 0;
}

.time-label {
  text-align: center;
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  font-weight: 500;
  padding: 8px;
}

.hour-schedules {
  display: contents;
}

.day-schedule-slot {
  border: 1px dashed var(--border-light);
  border-radius: var(--radius-md);
  padding: 4px;
  cursor: pointer;
  transition: var(--transition-fast);
  position: relative;
}

.day-schedule-slot:hover {
  border-color: var(--primary-color);
  background: rgba(99, 102, 241, 0.05);
}

.week-schedule-item {
  padding: 8px;
  border-radius: var(--radius-md);
  border-left: 3px solid;
  background: white;
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: var(--transition-fast);
  height: 100%;
}

.week-schedule-item:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
}

.schedule-time-range {
  font-size: var(--font-size-xs);
  color: var(--text-light);
  font-weight: 500;
  margin-bottom: 4px;
}

.schedule-teacher,
.schedule-location {
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
}

/* 日视图 */
.day-view {
  width: 100%;
}

.day-header-full {
  padding: 24px;
  background: var(--bg-tertiary);
  border-bottom: 1px solid var(--border-light);
}

.selected-day-info {
    text-align: center;
  }
  
.day-title {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 12px 0;
  }
  
.day-stats {
  display: flex;
    justify-content: center;
  gap: 24px;
  }
  
.schedule-count,
.teacher-count {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  }
  
.day-timeline {
  padding: 24px;
  max-height: 600px;
  overflow-y: auto;
  }
  
.timeline-hours {
  position: relative;
}

.timeline-hour {
  display: flex;
  align-items: flex-start;
  min-height: 80px;
  border-bottom: 1px solid var(--border-light);
  position: relative;
  }

.hour-label {
  width: 80px;
  text-align: center;
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  font-weight: 500;
  padding: 8px;
  position: sticky;
  top: 0;
  background: white;
  z-index: 2;
  }

.hour-line {
  flex: 1;
  height: 1px;
  background: var(--border-light);
  margin-top: 12px;
}

.schedule-container {
  position: absolute;
  left: 90px;
  right: 24px;
  top: 0;
  bottom: 0;
  pointer-events: none;
}

.day-schedule-item {
  position: absolute;
  left: 0;
  right: 0;
  background: white;
  border-radius: var(--radius-lg);
  border-left: 4px solid;
  box-shadow: var(--shadow-md);
  padding: 12px 16px;
  cursor: pointer;
  transition: var(--transition-fast);
  pointer-events: all;
  z-index: 1;
}

.day-schedule-item:hover {
  box-shadow: var(--shadow-lg);
  transform: translateX(4px);
}

.schedule-time-full {
  font-size: var(--font-size-sm);
  color: var(--text-light);
  font-weight: 600;
  margin-bottom: 6px;
}

.schedule-course {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.schedule-details {
  display: flex;
  gap: 16px;
  margin-bottom: 8px;
}

.teacher-info,
.location-info {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.schedule-actions {
  display: flex;
  gap: 6px;
}

.schedule-actions .el-button {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid var(--border-light);
  transition: var(--transition-fast);
}

.schedule-actions .el-button:hover {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

/* 对话框现代化 */
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

/* 响应式设计 */
@media (max-width: 1200px) {
  .header-content {
    flex-direction: column;
    gap: 20px;
    text-align: center;
}

  .legend-items {
    justify-content: center;
}

  .week-row {
    gap: 12px;
}

  .day-cell {
    min-height: 100px;
    padding: 8px;
}
}

@media (max-width: 768px) {
  .schedule-page-container {
    padding: 16px;
}

  .view-controls {
    flex-direction: column;
    gap: 16px;
    padding: 16px;
  }
  
  .controls-left,
  .controls-right {
    width: 100%;
    justify-content: center;
}

  .view-switcher {
    flex-direction: column;
    gap: 12px;
    text-align: center;
  }
  
  .period-navigation {
    gap: 12px;
}

  .current-period {
    min-width: 150px;
}

  .week-row {
    grid-template-columns: repeat(7, 1fr);
    gap: 8px;
}

  .day-cell {
    min-height: 80px;
    padding: 6px;
}

  .day-number {
    font-size: var(--font-size-md);
}

  .schedule-item {
    padding: 4px 6px;
}

  .schedule-title {
    font-size: var(--font-size-xs);
}

  .time-slot {
    grid-template-columns: 60px repeat(7, 1fr);
    gap: 8px;
    min-height: 60px;
}

  .week-header {
    grid-template-columns: 60px repeat(7, 1fr);
}

  .time-column-header {
    padding: 12px 8px;
  }
  
  .week-day-header {
    padding: 12px 8px;
  }
  
  .day-stats {
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

.header-actions {
    flex-direction: column;
    gap: 8px;
}

  .legend-items {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
}

  .week-row {
    grid-template-columns: repeat(7, minmax(40px, 1fr));
  gap: 4px;
}

  .day-cell {
    min-height: 60px;
    padding: 4px;
}

  .day-number {
    font-size: var(--font-size-sm);
}

  .schedule-meta {
    flex-direction: column;
    gap: 2px;
  }
}
</style>
