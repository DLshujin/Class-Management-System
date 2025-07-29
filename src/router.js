import { createRouter, createWebHistory } from 'vue-router'

// 使用懒加载方式导入组件
const Login = () => import('./views/Login.vue')
const Home = () => import('./views/Home.vue')
const Profile = () => import('./views/Profile.vue')
const Notifications = () => import('./views/Notifications.vue')
const Student = () => import('./views/Student.vue')
const Course = () => import('./views/Course.vue')
const Class = () => import('./views/Class.vue')
const Schedule = () => import('./views/Schedule.vue')
const Settings = () => import('./views/Settings.vue')
const Finance = () => import('./views/Finance.vue')
const Teacher = () => import('./views/Teacher.vue')

const routes = [
  { 
    path: '/login', 
    name: 'Login',
    component: Login,
    meta: { title: '登录' }
  },
  { 
    path: '/', 
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true, title: '首页' }
  },
  { 
    path: '/profile', 
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true, title: '个人中心' }
  },
  { 
    path: '/notifications', 
    name: 'Notifications',
    component: Notifications,
    meta: { requiresAuth: true, title: '消息中心' }
  },
  { 
    path: '/student', 
    name: 'Student',
    component: Student,
    meta: { requiresAuth: true, title: '学员管理', permission: 'view_students' }
  },
  { 
    path: '/teacher',
    name: 'Teacher',
    component: Teacher,
    meta: { requiresAuth: true, title: '教师管理', permission: 'view_teachers' }
  },
  { 
    path: '/course', 
    name: 'Course',
    component: Course,
    meta: { requiresAuth: true, title: '课程管理', permission: 'view_courses' }
  },
  {
    path: '/class',
    name: 'Class',
    component: Class,
    meta: { requiresAuth: true, title: '班级管理', permission: 'view_classes' }
  },
  {
    path: '/schedule',
    name: 'Schedule',
    component: Schedule,
    meta: { requiresAuth: true, title: '排课管理', permission: 'view_schedules' }
  },
  {
    path: '/finance',
    name: 'Finance',
    component: Finance,  // 使用新的Finance组件
    meta: { requiresAuth: true, title: '费用管理', permission: 'manage_finance' }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    meta: { requiresAuth: true, title: '系统设置', permission: 'manage_settings' }
  },
  // 404路由
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('./views/NotFound.vue'),
    meta: { title: '页面未找到' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = to.meta.title ? `${to.meta.title} - 青少年编程后台管理系统` : '青少年编程后台管理系统'
  
  // 开发环境直接通过
  if (import.meta.env.DEV) {
    return next();
  }
  
  // 权限检查
  const isAuthenticated = localStorage.getItem('userRole')
  
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      // 检查权限
      const permission = to.meta.permission
      const permissions = JSON.parse(localStorage.getItem('permissions') || '[]')
      
      if (permission && !permissions.includes(permission)) {
        next({ path: '/' })
      } else {
        next()
      }
    }
  } else {
    next()
  }
})

export default router 