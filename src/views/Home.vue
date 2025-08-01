<template>
  <!-- 现代化仪表板首页 -->
  <div class="dashboard-container">
  <!-- 欢迎横幅 -->
    <div class="welcome-section">
      <div class="welcome-card modern-card glass">
    <div class="welcome-content">
          <div class="welcome-left">
            <div class="greeting-header">
              <div class="avatar-section">
                <el-avatar :size="60" class="user-avatar" :src="userAvatar">
                  {{ getCurrentUser()?.name?.charAt(0) || 'A' }}
                </el-avatar>
                <div class="online-indicator"></div>
              </div>
              <div class="greeting-text">
                <h1 class="welcome-title">
                  {{ getGreeting() }}，{{ getCurrentUser()?.name || '管理员' }}！
        </h1>
                <p class="welcome-subtitle">{{ getWelcomeMessage() }}</p>
              </div>
            </div>
            
            <div class="date-time-info">
        <div class="date-info">
                <div class="current-date">{{ currentDate }}</div>
                <div class="current-time">{{ currentTime }}</div>
        </div>
              <div class="weather-widget">
                <div class="weather-icon">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
      </div>
        <span>天气晴朗，适合学习编程！</span>
      </div>
    </div>
        </div>

          <div class="welcome-right">
            <div class="inspiration-card" @click="changeCurrentQuote">
              <div class="quote-icon">
                <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
                  <path d="M14,17H17L19,13V7H13V13H16M6,17H9L11,13V7H5V13H8L6,17Z"/>
                </svg>
        </div>
              <div class="quote-content">
                <div class="quote-text">{{ currentQuote.text }}</div>
                <div class="quote-author">— {{ currentQuote.author }}</div>
      </div>
              <div class="refresh-hint">点击更换</div>
    </div>
    </div>
  </div>

        <!-- 数据源指示器 -->
        <div class="data-source-badge">
          <div :class="['source-indicator', dataSourceType]">
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
        </div>
          </div>

    <!-- 统计卡片区域 -->
    <div class="stats-section">
      <div class="section-header">
        <h2 class="section-title">数据概览</h2>
        <p class="section-subtitle">实时查看各项关键指标</p>
            </div>
      
      <div class="stats-grid">
        <div class="stat-card student-stat fade-in-up">
          <div class="stat-header">
            <div class="stat-icon student-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.009 1.009 0 0018.97 8H17c-.55 0-1 .45-1 1s.45 1 1 1h1.22l2.1 6.3c.12.36.46.62.85.65L20 22z"/>
              </svg>
          </div>
            <div class="trend-indicator positive">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
              </svg>
        </div>
          </div>
          <div class="stat-body">
            <div class="stat-number">{{ studentStore.getStudents ? studentStore.getStudents.length : 0 }}</div>
            <div class="stat-label">学员总数</div>
            <div class="stat-change">
              <span class="change-text">+{{ newStudentsCount }} 本月新增</span>
            </div>
          </div>
        </div>

        <div class="stat-card course-stat fade-in-up" style="animation-delay: 0.1s">
          <div class="stat-header">
            <div class="stat-icon course-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
              </svg>
          </div>
            <div class="trend-indicator positive">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
              </svg>
            </div>
          </div>
          <div class="stat-body">
            <div class="stat-number">{{ courseStore.getCourses ? courseStore.getCourses.length : 0 }}</div>
            <div class="stat-label">课程总数</div>
            <div class="stat-change">
              <span class="change-text">+{{ newCoursesCount }} 本月新增</span>
        </div>
          </div>
  </div>

        <div class="stat-card teacher-stat fade-in-up" style="animation-delay: 0.2s">
          <div class="stat-header">
            <div class="stat-icon teacher-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <div class="trend-indicator positive">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
              </svg>
          </div>
              </div>
          <div class="stat-body">
            <div class="stat-number">{{ teacherStore.getTeachers ? teacherStore.getTeachers.length : 0 }}</div>
            <div class="stat-label">教师总数</div>
            <div class="stat-change">
              <span class="change-text">+{{ newTeachersCount }} 本月新增</span>
              </div>
              </div>
            </div>

        <div class="stat-card revenue-stat fade-in-up" style="animation-delay: 0.3s">
          <div class="stat-header">
            <div class="stat-icon revenue-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
              </svg>
            </div>
            <div class="trend-indicator positive">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
              </svg>
              </div>
              </div>
          <div class="stat-body">
            <div class="stat-number">¥{{ getTotalRevenue() }}</div>
            <div class="stat-label">本月收入</div>
            <div class="stat-change">
              <span class="change-text">较上月 +12.5%</span>
            </div>
          </div>
              </div>
                </div>
              </div>

    <!-- 图表和快速操作区域 -->
    <div class="dashboard-content">
      <div class="content-grid">
        <!-- 收入趋势图表 -->
        <div class="chart-card modern-card">
          <div class="card-header">
            <h3 class="card-title">收入趋势</h3>
            <div class="card-actions">
              <el-button size="small" text>查看详情</el-button>
            </div>
          </div>
          <div class="chart-container">
            <v-chart class="chart" :option="revenueChartOption" autoresize />
          </div>
        </div>

        <!-- 课程分布图表 -->
        <div class="chart-card modern-card">
          <div class="card-header">
            <h3 class="card-title">课程分布</h3>
            <div class="card-actions">
              <el-button size="small" text>管理课程</el-button>
            </div>
          </div>
          <div class="chart-container">
            <v-chart class="chart" :option="courseChartOption" autoresize />
          </div>
        </div>

        <!-- 最近动态 -->
        <div class="activity-card modern-card">
          <div class="card-header">
            <h3 class="card-title">最近动态</h3>
            <div class="card-actions">
              <el-button size="small" text>查看全部</el-button>
            </div>
                </div>
          <div class="activity-list">
            <div class="activity-item" v-for="activity in recentActivities" :key="activity.id">
              <div class="activity-icon" :class="activity.type">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path v-if="activity.type === 'student'" d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2z"/>
                  <path v-else-if="activity.type === 'course'" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
                  <path v-else d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <div class="activity-content">
                <div class="activity-text">{{ activity.text }}</div>
                <div class="activity-time">{{ activity.time }}</div>
            </div>
              </div>
                </div>
              </div>

        <!-- 快速操作 -->
        <div class="quick-actions-card modern-card">
          <div class="card-header">
            <h3 class="card-title">快速操作</h3>
                </div>
          <div class="quick-actions">
            <router-link to="/student" class="quick-action-item">
              <div class="action-icon student-action">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2z"/>
                </svg>
              </div>
              <div class="action-text">
                <div class="action-title">学员管理</div>
                <div class="action-desc">添加、编辑学员信息</div>
                </div>
            </router-link>

            <router-link to="/course" class="quick-action-item">
              <div class="action-icon course-action">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
                </svg>
              </div>
              <div class="action-text">
                <div class="action-title">课程管理</div>
                <div class="action-desc">创建、管理课程内容</div>
                </div>
            </router-link>

            <router-link to="/schedule" class="quick-action-item">
              <div class="action-icon schedule-action">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.1 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
                </svg>
              </div>
              <div class="action-text">
                <div class="action-title">排课管理</div>
                <div class="action-desc">安排课程时间表</div>
            </div>
            </router-link>

            <router-link to="/finance" class="quick-action-item">
              <div class="action-icon finance-action">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
                </svg>
        </div>
              <div class="action-text">
                <div class="action-title">财务管理</div>
                <div class="action-desc">查看收支明细</div>
              </div>
            </router-link>
              </div>
            </div>
            </div>
      </div>
  </div>
</template>

<script setup>
import { 
  UserFilled, 
  Notebook, 
  Avatar, 
  School, 
  Calendar,
  Sunny,
  TrendCharts,
  DataBoard,
  Operation,
  Bell,
  ArrowRight,
  Money,
  Wallet
} from '@element-plus/icons-vue'
import { ref, onMounted, computed, watch } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart, BarChart, PieChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent, TitleComponent } from 'echarts/components'
import api from '../utils/api'
import { ElMessage } from 'element-plus'

import { useTeacherStore } from '../stores/teacher';
import { useStudentStore } from '../stores/student';
import { useCourseStore } from '../stores/course';
import { useScheduleStore } from '../stores/schedule';
import { useFinanceDataStore } from '../stores/financeData';
import { useTeacherDataStore } from '../stores/teacherData';
import { useClassStore } from '../stores/class';
import { useDataSourceStore } from '../stores/dataSource'
import { getDataSource } from '../utils/dataManager';
import { storeToRefs } from 'pinia'
import { useNotificationStore } from '../stores/notification'

use([CanvasRenderer, LineChart, BarChart, PieChart, GridComponent, TooltipComponent, LegendComponent, TitleComponent])

// 获取各个store
const teacherStore = useTeacherStore()
const studentStore = useStudentStore()
const courseStore = useCourseStore()
const scheduleStore = useScheduleStore()
const financeStore = useFinanceDataStore()
const teacherDataStore = useTeacherDataStore()
const classStore = useClassStore()
const dataSourceStore = useDataSourceStore()
const notificationStore = useNotificationStore()

// 计算属性
const dataSourceType = computed(() => dataSourceStore.getDataSourceType)

// 新增计算属性
const newStudentsCount = computed(() => {
  const students = studentStore.getStudents || []
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()
  
  return students.filter(student => {
    const joinDate = new Date(student.joinDate)
    return joinDate.getMonth() === currentMonth && joinDate.getFullYear() === currentYear
  }).length
})

const newCoursesCount = computed(() => {
  const courses = courseStore.getCourses || []
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()
  
  return courses.filter(course => {
    const createTime = new Date(course.createTime)
    return createTime.getMonth() === currentMonth && createTime.getFullYear() === currentYear
  }).length
})

const newTeachersCount = computed(() => {
  const teachers = teacherStore.getTeachers || []
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()
  
  return teachers.filter(teacher => {
    const joinDate = new Date(teacher.joinDate)
    return joinDate.getMonth() === currentMonth && joinDate.getFullYear() === currentYear
  }).length
})

const newClassesCount = computed(() => {
  const classes = classStore.getClasses || []
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()
  
  return classes.filter(cls => {
    const createTime = new Date(cls.createTime)
    return createTime.getMonth() === currentMonth && createTime.getFullYear() === currentYear
  }).length
})

// 今日课程
const todaySchedules = computed(() => {
  const schedules = scheduleStore.getSchedules || []
  const today = new Date().toISOString().split('T')[0]
  
  console.log('🔍 排课数据调试:')
  console.log('所有排课:', schedules)
  console.log('今天日期:', today)
  
  const todaySchedules = schedules.filter(schedule => {
    console.log(`排课日期: ${schedule.scheduleDate}, 今天: ${today}, 匹配: ${schedule.scheduleDate === today}`)
    return schedule.scheduleDate === today
  }).sort((a, b) => a.startTime.localeCompare(b.startTime))
  
  console.log('今日排课:', todaySchedules)
  return todaySchedules
})

// 财务数据
const monthlyIncome = computed(() => {
  const records = financeStore.getFinanceRecords || []
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()
  
  return records.filter(item => {
    const itemDate = new Date(item.date)
    return item.type === 'income' && 
           itemDate.getMonth() === currentMonth && 
           itemDate.getFullYear() === currentYear
  }).reduce((sum, item) => sum + parseFloat(item.amount || 0), 0)
})

const monthlyExpense = computed(() => {
  const records = financeStore.getFinanceRecords || []
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()
  
  return records.filter(item => {
    const itemDate = new Date(item.date)
    return item.type === 'expense' && 
           itemDate.getMonth() === currentMonth && 
           itemDate.getFullYear() === currentYear
  }).reduce((sum, item) => sum + parseFloat(item.amount || 0), 0)
})

const monthlyBalance = computed(() => {
  return monthlyIncome.value - monthlyExpense.value
})

const monthlyIncomeGrowth = computed(() => {
  const lastMonthIncome = monthlyIncome.value * 0.9
  return monthlyIncome.value - lastMonthIncome
})

const monthlyExpenseGrowth = computed(() => {
  const lastMonthExpense = monthlyExpense.value * 0.95
  return monthlyExpense.value - lastMonthExpense
})

// 日期和时间相关
const currentDate = ref('')
const currentTime = ref('')
const currentWeekday = ref('')

// 用户头像
const userAvatar = ref('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face')

// 最近活动数据
const recentActivities = ref([
  {
    id: 1,
    type: 'student',
    text: '新学员张小明已成功注册',
    time: '5分钟前'
  },
  {
    id: 2,
    type: 'course',
    text: 'Python基础课程已开班',
    time: '15分钟前'
  },
  {
    id: 3,
    type: 'achievement',
    text: '李老师获得优秀教师奖',
    time: '30分钟前'
  },
  {
    id: 4,
    type: 'student',
    text: '王同学完成了第一个项目',
    time: '1小时前'
  },
  {
    id: 5,
    type: 'course',
    text: 'JavaScript进阶课程报名开始',
    time: '2小时前'
  }
])

// 更新日期和时间
const updateDateTime = () => {
  const now = new Date()
  currentDate.value = now.toLocaleDateString('zh-CN', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
  currentTime.value = now.toLocaleTimeString('zh-CN', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
  currentWeekday.value = now.toLocaleDateString('zh-CN', { weekday: 'long' })
}

// 教育名言数据
const educationQuotes = [
  {
    text: "教育不是灌输，而是点燃火焰。",
    author: "苏格拉底"
  },
  {
    text: "学习编程不是为了成为程序员，而是为了拥有程序员的思维方式。",
    author: "编程教育理念"
  },
  {
    text: "代码改变世界，教育改变未来。",
    author: "编程教育"
  },
  {
    text: "每一个孩子都是天生的创造者，我们只需要给他们工具和机会。",
    author: "少儿编程教育"
  },
  {
    text: "编程思维是21世纪最重要的思维方式之一。",
    author: "现代教育理念"
  },
  {
    text: "学习编程，就是学习如何与机器对话，与未来对话。",
    author: "编程教育专家"
  },
  {
    text: "代码是写给人类看的，只是恰好机器也能执行。",
    author: "编程哲学"
  },
  {
    text: "编程教育不仅仅是教授技术，更是培养逻辑思维和创造力。",
    author: "教育专家"
  }
]

// 热门台词数据
const popularQuotes = [
  {
    text: "人生没有白走的路，每一步都算数。",
    author: "网络流行语"
  },
  {
    text: "生活不止眼前的苟且，还有诗和远方。",
    author: "高晓松"
  },
  {
    text: "种一棵树最好的时间是十年前，其次是现在。",
    author: "网络名言"
  },
  {
    text: "你现在的努力，是为了遇见更好的自己。",
    author: "励志语录"
  },
  {
    text: "没有人能随随便便成功，每一个成功背后都有无数次的失败。",
    author: "成功学"
  },
  {
    text: "与其用泪水悔恨昨天，不如用汗水拼搏今天。",
    author: "励志名言"
  },
  {
    text: "当你足够努力的时候，幸运就会眷顾你。",
    author: "网络流行语"
  },
  {
    text: "不要等待机会，而要创造机会。",
    author: "励志语录"
  }
]

// 励志名言数据
const motivationQuotes = [
  {
    text: "成功不是偶然的，而是必然的。",
    author: "励志语录"
  },
  {
    text: "今天的努力，是为了明天的收获。",
    author: "时间管理"
  },
  {
    text: "每一个优秀的人，都有一段沉默的时光。",
    author: "成长感悟"
  },
  {
    text: "学习是一个永无止境的过程。",
    author: "终身学习"
  },
  {
    text: "知识改变命运，学习成就未来。",
    author: "教育理念"
  },
  {
    text: "坚持做正确的事情，时间会给你答案。",
    author: "人生哲学"
  },
  {
    text: "不要害怕失败，害怕的是从未尝试。",
    author: "勇气语录"
  },
  {
    text: "成功路上并不拥挤，因为坚持的人不多。",
    author: "坚持的力量"
  }
]

// 合并所有名言
const allQuotes = [
  ...educationQuotes.map(q => ({ ...q, type: 'education', icon: '🎓' })),
  ...popularQuotes.map(q => ({ ...q, type: 'popular', icon: '🔥' })),
  ...motivationQuotes.map(q => ({ ...q, type: 'motivation', icon: '💪' }))
]

// 当前显示的名言
const currentQuote = ref(allQuotes[0])
const currentQuoteIcon = computed(() => currentQuote.value.icon)

// 更新名言
const updateQuotes = () => {
  const now = new Date()
  const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24))
  
  currentQuote.value = allQuotes[dayOfYear % allQuotes.length]
}

// 切换名言方法
const changeCurrentQuote = () => {
  const currentIndex = allQuotes.findIndex(q => q.text === currentQuote.value.text)
  const nextIndex = (currentIndex + 1) % allQuotes.length
  currentQuote.value = allQuotes[nextIndex]
  ElMessage.success('切换名言成功！')
}

// 公告数据
const notices = computed(() => notificationStore.notices || [])

// 方法
const formatPrice = (price) => {
  return parseFloat(price).toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const formatTime = (time) => {
  if (!time) return ''
  return time.substring(0, 5) // 只显示时:分
}

const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('zh-CN')
}

const getScheduleStatusType = (status) => {
  const statusMap = {
    'scheduled': 'primary',
    'in_progress': 'success',
    'completed': 'info',
    'cancelled': 'danger'
  }
  return statusMap[status] || 'info'
}

const getScheduleStatusText = (status) => {
  const statusMap = {
    'scheduled': '已安排',
    'in_progress': '进行中',
    'completed': '已完成',
    'cancelled': '已取消'
  }
  return statusMap[status] || '未知'
}

// 初始化数据
const initializeData = async () => {
  try {
    await Promise.all([
      teacherStore.fetchTeachers(),
      studentStore.fetchStudents(),
      courseStore.fetchCourses(),
      scheduleStore.fetchSchedules(),
      financeStore.fetchFinanceRecords(),
      classStore.fetchClasses(),
      notificationStore.fetchNotices()
    ])
  } catch (error) {
    console.error('初始化数据失败:', error)
  }
}

// 用户相关函数
const getCurrentUser = () => {
  // 从localStorage或store获取当前用户信息
  const userInfo = localStorage.getItem('userInfo')
  if (userInfo) {
    try {
      return JSON.parse(userInfo)
    } catch (error) {
      console.error('解析用户信息失败:', error)
    }
  }
  // 返回默认用户信息
  return {
    id: 1,
    name: '管理员',
    role: 'admin',
    avatar: ''
  }
}

// 获取问候语函数
const getGreeting = () => {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 11) {
    return '早上好'
  } else if (hour >= 11 && hour < 14) {
    return '中午好'
  } else if (hour >= 14 && hour < 18) {
    return '下午好'
  } else if (hour >= 18 && hour < 22) {
    return '晚上好'
  } else {
    return '夜深了'
  }
}

// 获取欢迎消息函数
const getWelcomeMessage = () => {
  const messages = [
    '欢迎使用青少年编程教育管理系统！',
    '今天也要加油哦～',
    '让我们一起为孩子们的编程教育努力！',
    '教育改变未来，编程点亮梦想！',
    '每一个孩子都是未来的程序员！'
  ]
  
  const hour = new Date().getHours()
  if (hour >= 6 && hour < 12) {
    return '新的一天开始了，让我们为孩子们带来精彩的编程课程！'
  } else if (hour >= 12 && hour < 18) {
    return '下午好！希望今天的教学工作进展顺利～'
  } else if (hour >= 18 && hour < 22) {
    return '忙碌的一天即将结束，感谢您的辛勤付出！'
  } else {
    return '夜深了，请注意休息，明天继续为教育事业奋斗！'
  }
}

// 获取总收入函数
const getTotalRevenue = () => {
  // 使用monthlyIncome计算属性的值，如果没有则返回模拟数据
  if (monthlyIncome.value) {
    return monthlyIncome.value.toLocaleString('zh-CN', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    })
  }
  
  // 返回模拟数据
  const baseRevenue = 45000
  const randomVariation = Math.random() * 10000 - 5000 // -5000 到 +5000 的随机变化
  const totalRevenue = baseRevenue + randomVariation
  
  return totalRevenue.toLocaleString('zh-CN', { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  })
}

// 图表配置
const revenueChartOption = computed(() => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark'
  return {
    backgroundColor: 'transparent',
    title: {
      text: '最近7天收入趋势',
      textStyle: {
        fontSize: 14,
        fontWeight: 'normal',
        color: isDark ? '#ffffff' : '#666'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      },
      backgroundColor: isDark ? '#2d3748' : 'rgba(255,255,255,0.9)',
      borderColor: isDark ? '#4a5568' : '#e5e7eb',
      textStyle: {
        color: isDark ? '#ffffff' : '#333333'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      axisLine: {
        lineStyle: {
          color: isDark ? '#4a5568' : '#e5e7eb'
        }
      },
      axisLabel: {
        color: isDark ? '#e2e8f0' : '#6b7280'
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: isDark ? '#4a5568' : '#e5e7eb'
        }
      },
      axisLabel: {
        color: isDark ? '#e2e8f0' : '#6b7280',
        formatter: '¥{value}'
      },
      splitLine: {
        lineStyle: {
          color: isDark ? '#4a5568' : '#f3f4f6'
        }
      }
    },
    series: [
      {
        name: '收入',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 3,
          color: '#3b82f6'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(59, 130, 246, 0.3)'
            }, {
              offset: 1, color: 'rgba(59, 130, 246, 0.05)'
            }]
          }
        },
        data: [1200, 1320, 980, 1350, 1400, 1600, 1800]
      }
    ]
  }
});

const courseChartOption = computed(() => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark'
  return {
      backgroundColor: 'transparent',
    title: {
    text: '课程分布统计',
    textStyle: {
      fontSize: 14,
      fontWeight: 'normal',
      color: isDark ? '#ffffff' : '#666'
    }
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)',
    backgroundColor: isDark ? '#2d3748' : 'rgba(255,255,255,0.9)',
    borderColor: isDark ? '#4a5568' : '#e5e7eb',
    textStyle: {
      color: isDark ? '#ffffff' : '#333333'
    }
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    bottom: 20,
    textStyle: {
      color: isDark ? '#e2e8f0' : '#6b7280'
    }
  },
  series: [
    {
      name: '课程分布',
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['60%', '50%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 16,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 35, name: 'Python基础', itemStyle: { color: '#3b82f6' } },
        { value: 28, name: 'JavaScript进阶', itemStyle: { color: '#10b981' } },
        { value: 22, name: 'Java程序设计', itemStyle: { color: '#f59e0b' } },
        { value: 15, name: '人工智能入门', itemStyle: { color: '#ef4444' } }
      ]
    }
  ]
  }
});

// 页面加载时初始化
onMounted(() => {
  updateDateTime()
  updateQuotes()
  initializeData()
  
  // 每秒更新时间
  setInterval(updateDateTime, 1000)
  
  // 每天更新名言
  setInterval(updateQuotes, 24 * 60 * 60 * 1000)
})
</script>

<style scoped>
/* CSS变量系统 */
:root {
  --color-primary: #3b82f6;
  --color-primary-light: #dbeafe;
  --color-success: #10b981;
  --color-success-light: #d1fae5;
  --color-warning: #f59e0b;
  --color-warning-light: #fef3c7;
  --color-danger: #ef4444;
  --color-danger-light: #fee2e2;
  --color-info: #6366f1;
  --color-info-light: #e0e7ff;
  
  --color-textPrimary: #1f2937;
  --color-textSecondary: #6b7280;
  --color-textDisabled: #9ca3af;
  
  --color-bgPrimary: #ffffff;
  --color-bgSecondary: #f9fafb;
  --color-bgTertiary: #f3f4f6;
  
  --border-radius-sm: 6px;
  --border-radius-md: 8px;
  --border-radius-lg: 12px;
  --border-radius-xl: 16px;
  --border-radius-2xl: 20px;
  
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  
  --font-size-xs: 12px;
  --font-size-sm: 14px;
  --font-size-base: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 20px;
  --font-size-2xl: 24px;
  --font-size-3xl: 30px;
  --font-size-4xl: 36px;
}

/* 现代化仪表板样式 */
.dashboard-container {
  padding: 24px;
  background: var(--bg-secondary);
  min-height: 100vh;
}

/* 欢迎区域 */
.welcome-section {
  margin-bottom: 32px;
}

.welcome-card {
  padding: 32px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  position: relative;
  overflow: hidden;
}

.welcome-card::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  border-radius: 50%;
  transform: translate(50px, -50px);
}

.welcome-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  z-index: 2;
}

.welcome-left {
  flex: 1;
}

.greeting-header {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 24px;
}

.avatar-section {
  position: relative;
}

.user-avatar {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: var(--font-size-2xl);
  font-weight: 600;
  border: 3px solid rgba(255, 255, 255, 0.3);
}

.online-indicator {
  position: absolute;
  bottom: 4px;
  right: 4px;
  width: 16px;
  height: 16px;
  background: #10b981;
  border: 3px solid white;
  border-radius: 50%;
}

.greeting-text {
  flex: 1;
}

.welcome-title {
  font-size: var(--font-size-3xl);
  font-weight: 700;
  margin-bottom: 8px;
  background: linear-gradient(45deg, #ffffff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.welcome-subtitle {
  font-size: var(--font-size-base);
  opacity: 0.9;
}

.date-time-info {
  display: flex;
  gap: 32px;
  align-items: center;
}

.date-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.current-date {
  font-size: var(--font-size-lg);
  font-weight: 600;
}

.current-time {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  font-family: 'Courier New', monospace;
}

.weather-widget {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.1);
  padding: 12px 16px;
  border-radius: 12px;
  backdrop-filter: blur(10px);
}

.weather-icon {
  color: #fbbf24;
}

.welcome-right {
  width: 300px;
  margin-left: 32px;
}

.inspiration-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
}

.inspiration-card:hover {
  transform: translateY(-4px);
  background: rgba(255, 255, 255, 0.15);
}

.quote-icon {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 16px;
}

.quote-text {
  font-size: var(--font-size-base);
  line-height: 1.6;
  margin-bottom: 12px;
  font-style: italic;
}

.quote-author {
  font-size: var(--font-size-sm);
  opacity: 0.8;
  text-align: right;
}

.refresh-hint {
  position: absolute;
  bottom: 8px;
  right: 12px;
  font-size: 11px;
  opacity: 0.6;
  background: rgba(0, 0, 0, 0.2);
  padding: 2px 6px;
  border-radius: 4px;
}

/* 数据源指示器 */
.data-source-badge {
  position: absolute;
  top: 24px;
  right: 24px;
  z-index: 3;
}

.source-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: var(--font-size-xs);
  font-weight: 600;
  backdrop-filter: blur(10px);
}

.source-indicator.mock {
  background: rgba(245, 158, 11, 0.2);
  color: #f59e0b;
  border: 1px solid rgba(245, 158, 11, 0.3);
}

.source-indicator.api {
  background: rgba(16, 185, 129, 0.2);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.3);
}

/* 统计区域 */
.stats-section {
  margin-bottom: 32px;
}

.section-header {
  margin-bottom: 24px;
}

.section-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.section-subtitle {
  color: var(--text-secondary);
  font-size: 16px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.stat-card {
  background: white;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--border-light);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  height: 120px; /* 设置合理的统计卡片高度 */
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
}

.stat-card.student-stat::before {
  background: linear-gradient(90deg, #3b82f6, #1d4ed8);
}

.stat-card.course-stat::before {
  background: linear-gradient(90deg, #10b981, #059669);
}

.stat-card.teacher-stat::before {
  background: linear-gradient(90deg, #8b5cf6, #7c3aed);
}

.stat-card.revenue-stat::before {
  background: linear-gradient(90deg, #f59e0b, #d97706);
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
}

.stat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.stat-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.student-icon {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
}

.course-icon {
  background: linear-gradient(135deg, #10b981, #059669);
}

.teacher-icon {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
}

.revenue-icon {
  background: linear-gradient(135deg, #f59e0b, #d97706);
}

.trend-indicator {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.trend-indicator.positive {
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
}

.stat-body {
  text-align: left;
}

.stat-number {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 6px;
  line-height: 1;
}

.stat-label {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin-bottom: 8px;
}

.stat-change {
  display: flex;
  align-items: center;
  gap: 8px;
}

.change-text {
  font-size: var(--font-size-sm);
  color: #10b981;
  font-weight: 600;
}

/* 仪表板内容区域 */
.dashboard-content {
  margin-top: 32px;
}

.content-grid {
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 1fr;
  gap: 24px;
}

.chart-card {
  background: white;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--border-light);
}

.chart-card:nth-child(1) {
  grid-column: span 2;
}

.chart-card:nth-child(2) {
  grid-column: span 2;
}

.activity-card {
  grid-column: span 2;
  background: white;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--border-light);
}

.quick-actions-card {
  grid-column: span 2;
  background: white;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--border-light);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border-light);
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
}

.card-actions :deep(.el-button) {
  padding: 8px 16px;
  font-size: var(--font-size-sm);
}

.chart-container {
  height: 300px;
}

.chart {
  width: 100%;
  height: 100%;
}

/* 活动列表 */
.activity-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: var(--bg-secondary);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.activity-item:hover {
  background: var(--bg-tertiary);
  transform: translateX(4px);
}

.activity-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.activity-icon.student {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
}

.activity-icon.course {
  background: linear-gradient(135deg, #10b981, #059669);
}

.activity-icon.teacher {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
}

.activity-content {
  flex: 1;
}

.activity-text {
  font-size: var(--font-size-sm);
  color: var(--text-primary);
  margin-bottom: 4px;
}

.activity-time {
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
}

/* 快速操作 */
.quick-actions {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.quick-action-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: var(--bg-secondary);
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  border: 1px solid var(--border-light);
}

.quick-action-item:hover {
  background: white;
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  border-color: var(--primary-color);
}

.action-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.student-action {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
}

.course-action {
  background: linear-gradient(135deg, #10b981, #059669);
}

.schedule-action {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
}

.finance-action {
  background: linear-gradient(135deg, #f59e0b, #d97706);
}

.action-text {
  flex: 1;
}

.action-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.action-desc {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .content-grid {
    grid-template-columns: 1fr 1fr;
  }
  
  .chart-card:nth-child(1),
  .chart-card:nth-child(2),
  .activity-card,
  .quick-actions-card {
    grid-column: span 2;
  }
}

@media (max-width: 768px) {
  .dashboard-container {
    padding: 16px;
  }
  
  .welcome-content {
    flex-direction: column;
    gap: 24px;
  }
  
  .welcome-right {
    width: 100%;
    margin-left: 0;
  }
  
  .greeting-header {
    flex-direction: column;
    text-align: center;
    gap: 16px;
  }
  
  .date-time-info {
    flex-direction: column;
    gap: 16px;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  
  .content-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .chart-card:nth-child(1),
  .chart-card:nth-child(2),
  .activity-card,
  .quick-actions-card {
    grid-column: span 1;
  }
  
  .quick-actions {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .welcome-title {
    font-size: 24px;
  }
  
  .stat-number {
    font-size: 28px;
  }
}

/* 动画效果 */
.fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
  }

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 🌙 暗色主题首页优化 - 增强对比度 */
[data-theme='dark'] .home-container {
  background: transparent;
}

[data-theme='dark'] .welcome-section {
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  border: 1px solid #64748b;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}

[data-theme='dark'] .welcome-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, 
    rgba(99, 102, 241, 0.1) 0%, 
    transparent 50%, 
    rgba(139, 92, 246, 0.1) 100%);
  border-radius: inherit;
  pointer-events: none;
}

[data-theme='dark'] .welcome-content {
  position: relative;
  z-index: 1;
}

[data-theme='dark'] .greeting {
  background: linear-gradient(45deg, #f8fafc, #e2e8f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

[data-theme='dark'] .subtitle {
  color: #cbd5e0;
}

[data-theme='dark'] .stats-overview {
  background: transparent;
}

[data-theme='dark'] .stats-card {
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%) !important;
  border: 1px solid #64748b;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
  transition: all 0.3s ease;
}

[data-theme='dark'] .stats-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
  border-color: #a855f7;
  background: linear-gradient(135deg, #334155 0%, #475569 100%) !important;
}

[data-theme='dark'] .stats-card .icon {
  background: var(--primary-gradient);
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
}

[data-theme='dark'] .stats-card .number {
  color: #f8fafc !important;
  text-shadow: 0 2px 10px rgba(99, 102, 241, 0.3);
}

[data-theme='dark'] .stats-card .label {
  color: #cbd5e0 !important;
}

[data-theme='dark'] .stats-card .trend {
  color: #34d399 !important;
}

/* 图表区域优化 */
[data-theme='dark'] .chart-section {
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  border: 1px solid #475569;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

[data-theme='dark'] .section-title {
  color: #f8fafc;
  text-shadow: 0 2px 10px rgba(99, 102, 241, 0.2);
}

[data-theme='dark'] .section-subtitle {
  color: #94a3b8;
}

/* 活动列表优化 */
[data-theme='dark'] .activity-item {
  background: linear-gradient(135deg, #334155, #475569);
  border: 1px solid #64748b;
  transition: all 0.3s ease;
}

[data-theme='dark'] .activity-item:hover {
  background: linear-gradient(135deg, #475569, #64748b);
  transform: translateX(5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

[data-theme='dark'] .activity-icon {
  background: var(--primary-gradient);
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
}

[data-theme='dark'] .activity-text {
  color: #e2e8f0;
}

[data-theme='dark'] .activity-time {
  color: #94a3b8;
}

/* 快捷操作区域 */
[data-theme='dark'] .quick-actions-grid .action-card {
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  border: 1px solid #475569;
  transition: all 0.3s ease;
}

[data-theme='dark'] .quick-actions-grid .action-card:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
  border-color: #6366f1;
}

[data-theme='dark'] .action-card .action-icon {
  background: var(--primary-gradient);
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
}

[data-theme='dark'] .action-card .action-title {
  color: #f8fafc;
}

[data-theme='dark'] .action-card .action-desc {
  color: #94a3b8;
}

/* 通知公告区域 */
[data-theme='dark'] .notice-card {
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  border: 1px solid #475569;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

[data-theme='dark'] .notice-item {
  border-bottom: 1px solid #475569;
  transition: all 0.3s ease;
}

[data-theme='dark'] .notice-item:hover {
  background: rgba(99, 102, 241, 0.1);
  transform: translateX(3px);
}

[data-theme='dark'] .notice-title {
  color: #f8fafc;
}

[data-theme='dark'] .notice-time {
  color: #94a3b8;
}

/* 响应式优化 */
@media (max-width: 1200px) {
  [data-theme='dark'] .stats-overview {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  [data-theme='dark'] .stats-overview {
    grid-template-columns: 1fr;
  }
  
  [data-theme='dark'] .welcome-section {
    padding: 24px 20px;
  }
}
</style> 