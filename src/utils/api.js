/**
 * 模拟API请求工具类
 * 提供前端开发时的模拟数据
 */

import { logger } from './logger.js'
import { errorHandler } from './errorHandler.js'

// 响应延迟（模拟网络请求时间）
const RESPONSE_DELAY = 300;

/**
 * 根据生日计算年龄
 * @param {string} birthday 生日（YYYY-MM-DD格式）
 * @returns {number} 年龄
 */
const calculateAgeFromBirthday = (birthday) => {
  if (!birthday) return 0;
  
  const birthDate = new Date(birthday);
  const today = new Date();
  
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  // 如果今年的生日还没到，或者今天是生日但还没到出生时刻，年龄减1
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

/**
 * 计算新入学学生数量（最近30天）
 * @param {Array} students 学生列表
 * @returns {number} 新入学学生数量
 */
const calculateNewStudents = (students) => {
  // 检查学生是否有enrollDate字段
  const hasEnrollDate = students.some(s => s.enrollDate);
  if (hasEnrollDate) {
    // 如果有enrollDate字段，则按当前月份筛选
    const currentMonth = new Date().getMonth();
    return students.filter(student => {
      if (!student.enrollDate) return false;
      const enrollDate = new Date(student.enrollDate);
      return enrollDate.getMonth() === currentMonth;
    }).length;
  } else {
    // 如果没有enrollDate字段，则按照25%比例估算
    return Math.round(students.length * 0.25);
  }
};

// 系统公告数据
const systemNotices = [
  {
    id: 1,
    title: '6月15日将举办少儿编程夏令营，请各位老师做好准备',
    content: '为促进青少年编程教育发展，提高学生暑期学习兴趣，我们将于6月15日举办为期两周的少儿编程夏令营活动。请各位老师提前准备教材和教案，确保活动顺利进行。',
    createTime: '2023-06-01 10:30:00',
    author: '教务处',
    important: true
  },
  {
    id: 2,
    title: '系统已更新至3.5版本，新增排课冲突检测功能',
    content: '系统已完成升级，新版本增加了教师排课冲突自动检测、学生课程重复提醒等功能，欢迎各位老师使用并提供反馈。',
    createTime: '2023-05-20 14:15:00',
    author: '技术部',
    important: false
  },
  {
    id: 3,
    title: '请各位老师及时提交本月课程总结',
    content: '为了更好地了解教学进度和效果，请各位老师于本月25日前提交课程教学总结报告，包括教学内容、学生表现评估及教学建议等内容。',
    createTime: '2023-05-18 09:20:00',
    author: '教务处',
    important: true
  },
  {
    id: 4,
    title: '周末Python课程因场地原因改至线上进行，请通知学员',
    content: '由于教学楼本周末进行维修，原定于本周六上午的Python基础课程将改为线上授课。请相关老师提前准备线上教学资料，并通知所有学员。',
    createTime: '2023-05-15 16:45:00',
    author: '教务处',
    important: true
  }
];

// 教师数据库 - 用于模拟持久化存储
const teachersDB = [
  {
    id: 1,
    name: '张伟',
    gender: 1,
    age: 35,
    phone: '13800138001',
    email: 'zhangwei@example.com',
    title: '讲师',
    specialty: 'Python',
    education: '计算机科学硕士',
    experience: '5年编程教育经验',
    joinDate: '2024-01-15',
    status: 1,
    bio: '专注于Python编程教学，擅长面向对象编程和Web开发',
    avatar: '',
    courseCount: 8,
    studentCount: 45
  },
  {
    id: 2,
    name: '李娜',
    gender: 0,
    age: 32,
    phone: '13800138002',
    email: 'lina@example.com',
    title: '高级讲师',
    specialty: 'Java',
    education: '软件工程硕士',
    experience: '7年企业级开发经验',
    joinDate: '2024-02-01',
    status: 1,
    bio: 'Java企业级开发专家，擅长Spring框架和微服务架构',
    avatar: '',
    courseCount: 12,
    studentCount: 68
  },
  {
    id: 3,
    name: '王强',
    gender: 1,
    age: 35,
    phone: '13800138003',
    email: 'wangqiang@example.com',
    title: '教学总监',
    specialty: 'Web开发',
    education: '计算机科学博士',
    experience: '10年全栈开发经验',
    joinDate: '2023-12-01',
    status: 1,
    bio: '全栈开发专家，精通前端和后端技术栈',
    avatar: '',
    courseCount: 15,
    studentCount: 89
  },
  {
    id: 4,
    name: '陈思',
    gender: 0,
    age: 29,
    phone: '13800138004',
    email: 'chensi@example.com',
    title: '讲师',
    specialty: '人工智能',
    education: '人工智能硕士',
    experience: '4年AI算法开发经验',
    joinDate: '2024-03-01',
    status: 1,
    bio: 'AI算法专家，专注于机器学习和深度学习教学',
    avatar: '',
    courseCount: 6,
    studentCount: 32
  },
  {
    id: 5,
    name: '刘洋',
    gender: 1,
    age: 31,
    phone: '13800138005',
    email: 'liuyang@example.com',
    title: '讲师',
    specialty: '少儿编程',
    education: '教育学硕士',
    experience: '6年少儿编程教育经验',
    joinDate: '2024-01-20',
    status: 1,
    bio: '少儿编程教育专家，擅长Scratch和Python基础教学',
    avatar: '',
    courseCount: 10,
    studentCount: 56
  }
];

// 学生数据库 - 用于模拟持久化存储
const studentsDB = [
  {
    id: 1,
    name: '张三',
    studentNo: 'S2023001',
    gender: 1,
    age: 15,
    phone: '13800138001',
    email: 'zhangsan@example.com',
    parentName: '张父',
    parentPhone: '13900139001',
    address: '北京市朝阳区',
    school: '北京市第一中学',
    grade: '高一',
    joinDate: '2024-01-15',
    status: 1,
    level: '初级',
    courseCount: 3,
    totalHours: 48,
    avatar: '',
    emergencyContact: '张母',
    emergencyPhone: '13900139002',
    medicalInfo: '无特殊病史',
    learningGoals: '掌握Python基础编程',
    notes: '学习积极性高，理解能力强',
    parentWechat: '',
    remark: '',
    enrollDate: '2024-01-15',
    createTime: '2024-01-15 10:00:00'
  },
  {
    id: 2,
    name: '李四',
    studentNo: 'S2023002',
    gender: 0,
    age: 14,
    phone: '13800138002',
    email: 'lisi@example.com',
    parentName: '李父',
    parentPhone: '13900139003',
    address: '北京市海淀区',
    school: '北京市第二中学',
    grade: '初三',
    joinDate: '2024-02-01',
    status: 1,
    level: '中级',
    courseCount: 2,
    totalHours: 32,
    avatar: '',
    emergencyContact: '李母',
    emergencyPhone: '13900139004',
    medicalInfo: '无特殊病史',
    learningGoals: '学习Java编程基础',
    notes: '逻辑思维能力强，适合编程学习',
    parentWechat: '',
    remark: '',
    enrollDate: '2024-02-01',
    createTime: '2024-02-01 09:00:00'
  },
  {
    id: 3,
    name: '王五',
    studentNo: 'S2023003',
    gender: 1,
    age: 16,
    phone: '13800138003',
    email: 'wangwu@example.com',
    parentName: '王父',
    parentPhone: '13900139005',
    address: '北京市西城区',
    school: '北京市第三中学',
    grade: '高二',
    joinDate: '2024-01-20',
    status: 1,
    level: '高级',
    courseCount: 4,
    totalHours: 64,
    avatar: '',
    emergencyContact: '王母',
    emergencyPhone: '13900139006',
    medicalInfo: '无特殊病史',
    learningGoals: '深入学习人工智能',
    notes: '对AI技术有浓厚兴趣，学习能力强',
    parentWechat: '',
    remark: '',
    enrollDate: '2024-01-20',
    createTime: '2024-01-20 09:00:00'
  },
  {
    id: 4,
    name: '赵六',
    studentNo: 'S2023004',
    gender: 0,
    age: 13,
    phone: '13800138004',
    email: 'zhaoliu@example.com',
    parentName: '赵父',
    parentPhone: '13900139007',
    address: '北京市东城区',
    school: '北京市第四中学',
    grade: '初二',
    joinDate: '2024-03-01',
    status: 1,
    level: '初级',
    courseCount: 1,
    totalHours: 16,
    avatar: '',
    emergencyContact: '赵母',
    emergencyPhone: '13900139008',
    medicalInfo: '无特殊病史',
    learningGoals: '学习Scratch少儿编程',
    notes: '年龄较小，需要更多耐心指导',
    parentWechat: '',
    remark: '',
    enrollDate: '2024-03-01',
    createTime: '2024-03-01 09:00:00'
  },
  {
    id: 5,
    name: '孙七',
    studentNo: 'S2023005',
    gender: 1,
    age: 17,
    phone: '13800138005',
    email: 'sunqi@example.com',
    parentName: '孙父',
    parentPhone: '13900139009',
    address: '北京市丰台区',
    school: '北京市第五中学',
    grade: '高三',
    joinDate: '2024-02-15',
    status: 1,
    level: '高级',
    courseCount: 5,
    totalHours: 80,
    avatar: '',
    emergencyContact: '孙母',
    emergencyPhone: '13900139010',
    medicalInfo: '无特殊病史',
    learningGoals: '准备编程竞赛',
    notes: '目标明确，学习刻苦，有竞赛潜力',
    parentWechat: '',
    remark: '',
    enrollDate: '2024-02-15',
    createTime: '2024-02-15 09:00:00'
  }
];

// 课程数据库 - 用于模拟持久化存储
const coursesDB = [
  {
    id: 1,
    name: 'Python基础入门',
    code: 'PY001',
    category: '编程基础',
    price: 3600,
    duration: 16,
    ageRange: '14-18岁',
    cover: '',
    status: 1,
    description: 'Python编程语言基础入门课程，适合初学者',
    syllabus: [
      'Python环境搭建',
      '变量和数据类型',
      '控制流程',
      '函数和模块',
      '面向对象编程',
      '文件操作',
      '异常处理',
      '项目实战'
    ],
    teacherId: 1,
    teacherName: '张老师',
    maxStudents: 20,
    currentStudents: 15,
    difficulty: '初级',
    tags: ['Python', '编程基础', '入门'],
    createTime: '2024-01-01',
    updateTime: '2024-01-15'
  },
  {
    id: 2,
    name: 'Java程序设计',
    code: 'JA001',
    category: '编程基础',
    price: 4200,
    duration: 20,
    ageRange: '15-18岁',
    cover: '',
    status: 1,
    description: 'Java编程语言基础课程，培养面向对象编程思维',
    syllabus: [
      'Java开发环境',
      '基础语法',
      '面向对象编程',
      '集合框架',
      '异常处理',
      '多线程编程',
      '网络编程',
      '项目开发'
    ],
    teacherId: 2,
    teacherName: '李老师',
    maxStudents: 18,
    currentStudents: 12,
    difficulty: '中级',
    tags: ['Java', '面向对象', '企业级开发'],
    createTime: '2024-01-05',
    updateTime: '2024-01-20'
  },
  {
    id: 3,
    name: '人工智能入门',
    code: 'AI001',
    category: '前沿技术',
    price: 4800,
    duration: 24,
    ageRange: '16-18岁',
    cover: '',
    status: 1,
    description: '人工智能基础课程，介绍机器学习和深度学习',
    syllabus: [
      'AI基础知识',
      '机器学习算法',
      '深度学习框架',
      '神经网络',
      '计算机视觉',
      '自然语言处理',
      'AI项目实战',
      '未来发展趋势'
    ],
    teacherId: 4,
    teacherName: '陈老师',
    maxStudents: 15,
    currentStudents: 8,
    difficulty: '高级',
    tags: ['人工智能', '机器学习', '深度学习'],
    createTime: '2024-01-10',
    updateTime: '2024-01-25'
  },
  {
    id: 4,
    name: '网页设计基础',
    code: 'WEB001',
    category: '前端开发',
    price: 2800,
    duration: 12,
    ageRange: '12-16岁',
    cover: '',
    status: 0,
    description: '网页设计和前端开发基础课程',
    syllabus: [
      'HTML基础',
      'CSS样式',
      'JavaScript基础',
      '响应式设计',
      '网页布局',
      '交互效果',
      '网站发布',
      '项目制作'
    ],
    teacherId: 3,
    teacherName: '王老师',
    maxStudents: 25,
    currentStudents: 0,
    difficulty: '初级',
    tags: ['HTML', 'CSS', 'JavaScript', '前端'],
    createTime: '2024-01-15',
    updateTime: '2024-02-01'
  },
  {
    id: 5,
    name: 'Scratch少儿编程',
    code: 'SC001',
    category: '少儿编程',
    price: 2000,
    duration: 10,
    ageRange: '8-12岁',
    cover: '',
    status: 1,
    description: '适合儿童的图形化编程课程',
    syllabus: [
      'Scratch界面介绍',
      '角色和背景',
      '动作和外观',
      '声音和音乐',
      '事件和控制',
      '变量和列表',
      '自定义积木',
      '创意项目'
    ],
    teacherId: 5,
    teacherName: '刘老师',
    maxStudents: 30,
    currentStudents: 22,
    difficulty: '初级',
    tags: ['Scratch', '少儿编程', '图形化编程'],
    createTime: '2024-01-20',
    updateTime: '2024-02-05'
  }
];

// 班级数据库 - 用于模拟持久化存储
const classesDB = [
  {
    id: 1,
    name: '高一Python班',
    teacherId: 1,
    courseId: 1,
    createTime: '2023-06-01 10:00:00'
  }
];

// 排课数据库 - 用于模拟持久化存储
const schedulesDB = [
  {
    id: 1,
    classId: 1,
    className: 'Python-A班',
    courseId: 1,
    courseName: 'Python基础入门',
    teacherId: 1,
    teacherName: '张老师',
    scheduleDate: new Date().toISOString().slice(0, 10), // 今天
    startTime: '09:00:00',
    endTime: '11:00:00',
    classroom: 'A教室',
    status: 0, // 未开始
    topic: 'Python环境安装与基础语法',
    periods: 2,
    currentStudents: 15,
    maxStudents: 20
  },
  {
    id: 2,
    classId: 2,
    className: 'Java-A班',
    courseId: 2,
    courseName: 'Java程序设计',
    teacherId: 2,
    teacherName: '李老师',
    scheduleDate: new Date().toISOString().slice(0, 10), // 今天
    startTime: '14:00:00',
    endTime: '16:00:00',
    classroom: 'B教室',
    status: 0, // 未开始
    topic: 'Java环境搭建与基础语法',
    periods: 2,
    currentStudents: 12,
    maxStudents: 18
  },
  {
    id: 3,
    classId: 3,
    className: 'AI-A班',
    courseId: 3,
    courseName: '人工智能入门',
    teacherId: 3,
    teacherName: '王老师',
    scheduleDate: new Date().toISOString().slice(0, 10), // 今天
    startTime: '19:00:00',
    endTime: '21:00:00',
    classroom: 'C教室',
    status: 0, // 未开始
    topic: '机器学习基础概念',
    periods: 2,
    currentStudents: 8,
    maxStudents: 15
  },
  {
    id: 4,
    classId: 4,
    className: 'Web-A班',
    courseId: 4,
    courseName: 'Web前端开发',
    teacherId: 4,
    teacherName: '赵老师',
    scheduleDate: new Date().toISOString().slice(0, 10), // 今天
    startTime: '10:30:00',
    endTime: '12:30:00',
    classroom: 'D教室',
    status: 0, // 未开始
    topic: 'HTML与CSS基础',
    periods: 2,
    currentStudents: 10,
    maxStudents: 16
  },
  // 添加今天的课程
  {
    id: 5,
    classId: 1,
    className: 'Python-A班',
    courseId: 1,
    courseName: 'Python基础入门',
    teacherId: 1,
    teacherName: '张老师',
    scheduleDate: new Date().toISOString().slice(0, 10), // 今天
    startTime: '09:00:00',
    endTime: '11:00:00',
    classroom: 'A教室',
    status: 0, // 未开始
    topic: '函数与模块',
    periods: 2,
    currentStudents: 15,
    maxStudents: 20
  },
  {
    id: 6,
    classId: 2,
    className: 'Java-A班',
    courseId: 2,
    courseName: 'Java程序设计',
    teacherId: 2,
    teacherName: '李老师',
    scheduleDate: new Date().toISOString().slice(0, 10), // 今天
    startTime: '14:00:00',
    endTime: '16:00:00',
    classroom: 'B教室',
    status: 0, // 未开始
    topic: '面向对象编程',
    periods: 2,
    currentStudents: 12,
    maxStudents: 18
  },
  {
    id: 7,
    classId: 3,
    className: 'AI-A班',
    courseId: 3,
    courseName: '人工智能基础',
    teacherId: 3,
    teacherName: '王老师',
    scheduleDate: new Date().toISOString().slice(0, 10), // 今天
    startTime: '16:30:00',
    endTime: '18:30:00',
    classroom: 'C教室',
    status: 0, // 未开始
    topic: '机器学习入门',
    periods: 2,
    currentStudents: 8,
    maxStudents: 15
  }
];

// 公告数据库
const noticesDB = [
  {
    id: 1,
    title: '系统维护通知',
    content: '系统将于本周六凌晨2:00-4:00进行维护升级，期间可能影响正常使用，请提前保存重要数据。维护内容包括：数据库优化、安全补丁更新、性能提升等。',
    createTime: '2025-07-01 10:00:00',
    author: '系统管理员',
    important: true
  },
  {
    id: 2,
    title: '新课程上线通知',
    content: '人工智能入门课程已正式上线，课程内容包括：机器学习基础、深度学习入门、Python编程实践等。欢迎各位学员踊跃报名参加！',
    createTime: '2025-07-10 09:00:00',
    author: '教务处',
    important: false
  },
  {
    id: 3,
    title: '暑期班招生开始',
    content: '2025年暑期编程班现已开始招生，开设课程：Python基础、Java入门、Web前端开发、数据结构与算法。报名截止日期：7月15日。',
    createTime: '2025-07-05 14:30:00',
    author: '招生办',
    important: true
  },
  {
    id: 4,
    title: '教师培训通知',
    content: '为提高教学质量，定于7月20日举办教师技能培训，内容包括：教学方法创新、课程设计优化、学生管理技巧等。请各位教师准时参加。',
    createTime: '2025-07-08 16:20:00',
    author: '人事部',
    important: false
  },
  {
    id: 5,
    title: '编程竞赛报名',
    content: '2025年青少年编程竞赛报名现已开始，比赛分为初级组和高级组，获奖者将获得丰厚奖品和证书。报名截止：7月25日。',
    createTime: '2025-07-12 11:15:00',
    author: '竞赛组委会',
    important: true
  },
  {
    id: 6,
    title: '教室设备更新',
    content: '为提供更好的学习环境，本周将对所有教室的投影设备和音响系统进行更新升级，预计工期3天，请各位师生配合。',
    createTime: '2025-07-15 08:45:00',
    author: '后勤部',
    important: false
  },
  {
    id: 7,
    title: '学员作品展示',
    content: '优秀学员作品展示活动将于7月30日举行，展示内容包括：网站开发、小程序制作、游戏编程等。欢迎各位家长和学员参观。',
    createTime: '2025-07-18 13:40:00',
    author: '教学部',
    important: false
  },
  {
    id: 8,
    title: '安全提醒',
    content: '近期天气炎热，请注意防暑降温。同时提醒各位学员和家长，注意交通安全，遵守交通规则，确保人身安全。',
    createTime: '2025-07-20 10:30:00',
    author: '安全办',
    important: true
  }
];

// 模拟数据
const mockData = {
  // 健康检查
  '/health': () => ({ status: 'ok', timestamp: new Date().toISOString() }),
  
  // 通知相关API
  '/notifications': () => ({
    records: [
      {
        id: 1,
        title: '系统更新通知',
        content: '系统已更新至最新版本，新增多项功能',
        time: '2023-06-01 10:30:00',
        read: false,
        type: 1,
        important: false
      },
      {
        id: 2,
        title: '新学员注册',
        content: '张三同学已完成注册，请及时安排课程',
        time: '2023-05-30 14:20:00',
        read: true,
        type: 2,
        important: true
      },
      {
        id: 3,
        title: '课程提醒',
        content: 'Python基础课程将在30分钟后开始',
        time: '2023-05-29 09:15:00',
        read: false,
        type: 2,
        important: false
      },
      {
        id: 4,
        title: '财务通知',
        content: '本月财务报表已生成，请查看',
        time: '2023-05-28 16:45:00',
        read: true,
        type: 4,
        important: false
      }
    ],
    total: 4
  }),
  
  '/notifications/create': (data) => {
    const newNotification = {
      id: Date.now(),
      ...data,
      time: new Date().toISOString(),
      read: false
    };
    return { success: true, data: newNotification };
  },
  
  '/notifications/read/all': () => ({ success: true }),
  
  '/messages/unread/count': () => ({ count: 2 }),
  
  '/messages/read/all': () => ({ success: true }),
  
  '/messages/:id/read': (data, url) => ({ success: true }),
  
  '/users/profile': () => ({
    success: true,
    user: {
    id: 1,
      name: '系统管理员',
    username: 'admin',
      role: 'admin',
    phone: '13800138000',
      email: 'admin@example.com',
      avatar: '',
      bio: '系统管理员账户',
      joinDate: '2024-01-01',
      lastLoginTime: new Date().toISOString()
    }
  }),
  
  '/users/avatar': () => ({ success: true, url: 'https://placekitten.com/200/200' }),
  
  // 认证相关
  '/auth/login': (data) => {
    // 验证登录信息
    if (data.loginType === 'admin') {
      if (data.username !== 'admin' || data.password !== 'admin123') {
        return {
          success: false,
          message: '用户名或密码错误',
          code: 'INVALID_CREDENTIALS'
        }
      }
    } else if (data.loginType === 'teacher') {
      if (data.name !== '张老师' || data.password !== 'teacher123') {
        return {
          success: false,
          message: '教师姓名或密码错误',
          code: 'INVALID_CREDENTIALS'
        }
      }
    } else {
      return {
        success: false,
        message: '登录类型无效',
        code: 'INVALID_LOGIN_TYPE'
      }
    }
    
    return {
      success: true,
      token: 'mock-jwt-token-' + Date.now(),
      user: {
        id: data.loginType === 'admin' ? 1 : 2,
        username: data.loginType === 'admin' ? data.username : data.name,
        name: data.loginType === 'admin' ? '系统管理员' : data.name,
        role: data.loginType === 'admin' ? 'admin' : 'teacher',
        phone: data.phone || '13800138000',
        email: data.email || (data.loginType === 'admin' ? 'admin@example.com' : 'teacher@example.com'),
        avatar: '',
        permissions: data.loginType === 'admin' ? [
          'manage_users', 'manage_courses', 'manage_settings', 'view_reports'
        ] : [
          'view_students', 'manage_classes', 'view_schedule'
        ],
        createTime: '2024-01-01',
        lastLoginTime: new Date().toISOString()
      }
    }
  },
  
  '/auth/captcha': () => ({
    success: true,
    captcha: 'ABCD',
    key: 'mock-captcha-key-' + Date.now(),
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAAoCAIAAAC6iKlyAAAACXBIWXMAAA7EAAAOxAGVKw4bAAADIUlEQVRoge2ZP2gTURzHv7/LS5qmwZIUGqUtCBYHBwdBcHBQXBQEQcFZUKs4OIqzu1MH5wYFF0Vw0KWTm0UQASHIkhbhZZGWpr05t6P4+VyuaYNube9xMD3My3v3nv5fX/3fu/du0hTFMA2HIXb7TlQInQ9DwA2IJQ6EA/4Ut0UbsMAAHYBX6pQjciBKrQfiPMvVaOpQiWpQiWpQiWpQiWpQiWpQiWpQiWpQiUFKqSu+n7YcRScTUVWMaWTUjophPf3xVxvMddbTC9fBUC2bacK9bPpNohYfQaYM5m5eTEzT8dOeJ93APDh4/bTOvRoNvnw3pbj+wdG1m7OrC05rbXO3UXSehS9sB7FvO8rz99GlnZooyAmYRjJWu+EALABWYZhmrDKzs2Fcnk9idk5GI9AQBpmKqZCGqCYIMOw+vvZMACQnrFGLsyfn1i5OT1+6URmexoAmJFaexTfcUvHSzYRmIVj1Z9usbrqbTahvECF9hNrvjQ3jpXWuRLn8gBgLz8qrwwLTwAQ3w+XHn+vVHbS6USxaJ2cs7KZzK2bgYSYkbw7kXnzPl6+lP71s9NsUmpw/pkAQJw/Wjx2tF2fm3j+jJeWnJnZRKkUmMaHCMrV9Y3sjRs0MQEA1mCRuQsAGY/ES+UOAAy0W4nZOe9gKbd4O39zIb5yudtsJkZGhGF0G43uhx37yVP38BBK9WazO8QdATwusjtbmeXKsMzlkCDO5ZL37qKzszk0xMGngXIbpYZfbFLgLgQTAJgr9ljphNecJW9fYJKg45Q9JNLc6JPOqhQmkc1G+PaKh4d3f08GWKOVarWjtRq73r9E6wj7oUYiQenBchxixGbW2f9G0yH6/c3RFEFH6BuZmbHnLeIuJDEBXabECDOjuwsApNQ2Ru5CJhFl04nRUQAoj4wMXrroOM7Wq9ddKUczma2Xl97fDPScJTjCvsGM/OAgnz3DrgvG+tRUs9n0J93v6+h3Ov8ihFUYUCn4mDASgpKe89H8H6kXKlQVoXL0TUuVpAqVpAqVpAqVpAqVpAqVpAqV9BdHOJBYA3EFkAAAAABJRU5ErkJggg=='
  }),
  
  // 用户相关
  '/users/current': () => ({
    id: 1,
    name: '系统管理员',
    username: 'admin',
    role: 'admin',
    phone: '13800138000',
    email: 'admin@example.com',
    avatar: '',
    permissions: ['manage_users', 'manage_courses', 'manage_settings', 'view_reports'],
    createTime: '2024-01-01',
    lastLoginTime: new Date().toISOString()
  }),

  '/users': (params = {}) => {
    // 根据角色筛选用户
    if (params.role === 'teacher') {
      return {
        records: teachersDB.map(teacher => ({
          id: teacher.id,
          name: teacher.name,
          role: 'teacher',
          gender: teacher.gender,
          phone: teacher.phone,
          email: teacher.email,
          status: teacher.status
        })),
        total: teachersDB.length
      };
    }
    
    // 默认返回所有用户
    return {
      records: [
      {
        id: 1,
          username: 'admin',
          name: '管理员',
          role: 'admin',
          email: 'admin@kexiao.com',
          phone: '13800138000',
          avatar: 'https://placekitten.com/200/200',
          status: 1
        },
        ...teachersDB.map(teacher => ({
          id: teacher.id + 100, // 避免ID冲突
          username: teacher.email.split('@')[0],
          name: teacher.name,
          role: 'teacher',
          gender: teacher.gender,
          phone: teacher.phone,
          email: teacher.email,
          status: teacher.status
        }))
      ],
      total: teachersDB.length + 1
    };
  },

  // 教师相关API
  '/teachers': (paramsOrData = {}, url, method = 'GET') => {
    if (method === 'GET') {
      // 在模拟数据模式下，直接返回所有教师数据
      return { 
        records: teachersDB.map(teacher => ({ ...teacher })), 
        total: teachersDB.length,
        pagination: {
          current: 1,
          size: teachersDB.length,
          total: teachersDB.length
        }
      };
    } else if (method === 'POST') {
      const data = paramsOrData;
      if (!data || !data.name || !data.phone) return { success: false, message: '教师姓名和电话必填' };
      const newTeacher = {
        id: teachersDB.length + 1,
        ...data,
        createTime: new Date().toISOString()
      };
      teachersDB.push(newTeacher);
      return { success: true, data: newTeacher };
    }
    return { success: false };
  },
  '/teachers/:id': (data, url, method = 'GET') => {
    const id = parseInt(url.split('/')[2]);
    const idx = teachersDB.findIndex(t => t.id === id);
    if (method === 'GET') {
      return teachersDB[idx] || null;
    } else if (method === 'PUT') {
      if (idx !== -1) {
        teachersDB[idx] = { ...teachersDB[idx], ...data };
        return { success: true, data: teachersDB[idx] };
      }
      return { success: false, message: '教师不存在' };
    } else if (method === 'DELETE') {
      if (idx !== -1) {
        teachersDB.splice(idx, 1);
        return { success: true, message: '教师删除成功' };
      }
      return { success: false, message: '教师不存在' };
    }
    return { success: false };
  },
  
  // 学生相关API
  '/students': (paramsOrData = {}, url, method = 'GET') => {
    if (method === 'GET') {
      return { records: studentsDB.map(s => ({ ...s })), total: studentsDB.length };
    } else if (method === 'POST') {
      const data = paramsOrData;
      if (!data || !data.name || !data.phone) return { success: false, message: '学员姓名和电话必填' };
      const newStudent = {
        id: studentsDB.length + 1,
    ...data,
        studentNo: `S2023${String(studentsDB.length + 1).padStart(3, '0')}`,
        enrollDate: new Date().toISOString().slice(0, 10),
        createTime: new Date().toISOString()
      };
      studentsDB.push(newStudent);
      return { success: true, data: newStudent };
    }
    return { success: false };
  },
  '/students/:id': (data, url, method = 'GET') => {
    const id = parseInt(url.split('/')[2]);
    const idx = studentsDB.findIndex(s => s.id === id);
    if (method === 'GET') {
      return studentsDB[idx] || null;
    } else if (method === 'PUT') {
      if (idx !== -1) {
        studentsDB[idx] = { ...studentsDB[idx], ...data };
        return { success: true, data: studentsDB[idx] };
      }
      return { success: false, message: '学员不存在' };
    } else if (method === 'DELETE') {
      if (idx !== -1) {
        studentsDB.splice(idx, 1);
        return { success: true, message: '学员删除成功' };
      }
      return { success: false, message: '学员不存在' };
    }
    return { success: false };
  },

  // 课程相关API
  '/courses': (paramsOrData = {}, url, method = 'GET') => {
    if (method === 'GET') {
      return { records: coursesDB.map(c => ({ ...c })), total: coursesDB.length };
    } else if (method === 'POST') {
      const data = paramsOrData;
      if (!data || !data.name || !data.type) return { success: false, message: '课程名称和类型必填' };
      const newCourse = {
        id: coursesDB.length + 1,
        ...data,
        code: `COURSE${String(coursesDB.length + 1).padStart(3, '0')}`,
        createTime: new Date().toISOString()
      };
      coursesDB.push(newCourse);
      return { success: true, data: newCourse };
    }
    return { success: false };
  },
  '/courses/:id': (data, url, method = 'GET') => {
    const id = parseInt(url.split('/')[2]);
    const idx = coursesDB.findIndex(c => c.id === id);
    if (method === 'GET') {
      return coursesDB[idx] || null;
    } else if (method === 'PUT') {
      if (idx !== -1) {
        coursesDB[idx] = { ...coursesDB[idx], ...data };
        return { success: true, data: coursesDB[idx] };
      }
      return { success: false, message: '课程不存在' };
    } else if (method === 'DELETE') {
      if (idx !== -1) {
        coursesDB.splice(idx, 1);
        return { success: true, message: '课程删除成功' };
      }
      return { success: false, message: '课程不存在' };
    }
    return { success: false };
  },
  
  // 班级相关API
  '/classes': (paramsOrData = {}, url, method = 'GET') => {
    if (method === 'GET') {
      return { records: classesDB.map(c => ({ ...c })), total: classesDB.length };
    } else if (method === 'POST') {
      const data = paramsOrData;
      if (!data.name || !data.teacherId || !data.courseId) return { success: false, message: '班级名称、教师ID、课程ID必填' };
      const newClass = {
        id: classesDB.length + 1,
        ...data,
        createTime: new Date().toISOString()
      };
      classesDB.push(newClass);
      return { success: true, data: newClass };
    }
    return { success: false };
  },
  '/classes/:id': (data, url, method = 'GET') => {
    const id = parseInt(url.split('/')[2]);
    const idx = classesDB.findIndex(c => c.id === id);
    if (method === 'GET') {
      return classesDB[idx] || null;
    } else if (method === 'PUT') {
      if (idx !== -1) {
        classesDB[idx] = { ...classesDB[idx], ...data };
        return { success: true, data: classesDB[idx] };
      }
      return { success: false, message: '班级不存在' };
    } else if (method === 'DELETE') {
      if (idx !== -1) {
        classesDB.splice(idx, 1);
        return { success: true, message: '班级删除成功' };
      }
      return { success: false, message: '班级不存在' };
    }
    return { success: false };
  },

  // 课程相关API
  '/courses/student/1': () => [
    {
      id: 1,
      name: 'Python基础入门',
      teacherName: '张老师',
      weekday: '周六',
      timeSlot: '09:00-11:00',
      status: 1
    },
    {
      id: 3,
      name: '人工智能入门',
      teacherName: '张老师',
      weekday: '周三',
      timeSlot: '19:00-21:00',
      status: 1
    }
  ],
  
  // 课程详情
  '/courses/1': () => coursesDB.find(c => c.id === 1) || null,
  '/courses/2': () => coursesDB.find(c => c.id === 2) || null,
  
  // 通用课程详情API
  '/courses/\\d+': (params, url) => {
    const id = parseInt(url.split('/')[2]);
    const course = coursesDB.find(c => c.id === id);
    if (course) {
      return course;
    }
    throw new Error(`找不到ID为 ${id} 的课程`);
  },
  
  '/courses/1/cancel': () => ({ success: true }),
  '/courses/1/enroll/1': () => ({ success: true }),
  '/courses/1/drop/1': () => ({ success: true }),
  
  // 课程学生列表
  '/courses/1/students': () => [
    {
      id: 1,
      name: '张三',
      studentNo: 'S2023001',
      gender: 1,
      age: 15,
      grade: '高一',
      enrollDate: '2024-01-15'
    },
    {
      id: 2,
      name: '李四',
      studentNo: 'S2023002',
      gender: 0,
      age: 14,
      grade: '初三',
      enrollDate: '2024-02-01'
    }
  ],
  
  // 课程状态更新API
  '/courses/\\d+/status': (data, url) => {
    const id = parseInt(url.split('/')[2]);
    console.log(`更新课程 ${id} 状态为 ${data.status}`);
    
    // 查找课程并更新状态
    const courseIndex = coursesDB.findIndex(course => course.id === id);
    if (courseIndex !== -1) {
      coursesDB[courseIndex].status = data.status;
      console.log(`课程 ${id} 状态已更新为 ${data.status}`);
      return { success: true };
    }
    
    console.error(`找不到ID为 ${id} 的课程`);
    return { success: false, message: '找不到该课程' };
  },
  
  // 课程创建API
  '/courses/create': (data) => {
    // 生成新ID（取当前最大ID + 1）
    const maxId = Math.max(...coursesDB.map(c => c.id), 0);
    const newId = maxId + 1;
    
    // 创建新课程对象
    const newCourse = {
      id: newId,
      name: data.name,
      code: data.code || `COURSE${String(newId).padStart(3, '0')}`,
      description: data.description || '',
      teacherId: data.teacherId || 1,
      teacherName: data.teacherName || '待定',
      type: data.type || '其他',
      startDate: data.startDate || new Date().toISOString().slice(0, 10),
      endDate: data.endDate || '',
      weekday: data.weekday || '',
      timeSlot: data.timeSlot || '',
      totalSessions: data.totalSessions || 0,
      periods: data.periods || 0,
      price: data.price || 0,
      maxStudents: data.maxStudents || 20,
      currentStudents: data.currentStudents || 0,
      suitableAge: data.suitableAge || '',
      suitableGrade: data.suitableGrade || '',
      status: data.status !== undefined ? data.status : 1,
      cover: data.cover || '',
      createTime: new Date().toISOString().replace('T', ' ').slice(0, 19)
    };
    
    // 添加到数据库
    coursesDB.push(newCourse);
    
    return {
      success: true,
      message: '创建成功',
      data: newCourse
    };
  },
  
  // 课程更新API
  '/courses/\\d+': (data, url) => {
    const id = parseInt(url.split('/')[2]);
    console.log(`更新课程 ${id} 信息:`, data);
    
    // 查找课程并更新
    const courseIndex = coursesDB.findIndex(course => course.id === id);
    if (courseIndex !== -1) {
      // 保留id和一些不应该被覆盖的字段
      const oldCourse = coursesDB[courseIndex];
      const updatedCourse = {
        ...oldCourse,
        ...data,
        id: oldCourse.id // 确保ID不变
      };
      
      coursesDB[courseIndex] = updatedCourse;
      console.log(`课程 ${id} 信息已更新`);
      return { success: true, message: '更新成功' };
    }
    
    console.error(`找不到ID为 ${id} 的课程`);
    return { success: false, message: '找不到该课程' };
  },
  
  // 课程删除API
  '/courses/delete/\\d+': (data, url) => {
    const id = parseInt(url.split('/')[3]);
    console.log(`删除课程 ${id}`);
    
    // 查找课程并删除
    const courseIndex = coursesDB.findIndex(course => course.id === id);
    if (courseIndex !== -1) {
      coursesDB.splice(courseIndex, 1);
      console.log(`课程 ${id} 已删除`);
      return { success: true, message: '删除成功' };
    }
    
    console.error(`找不到ID为 ${id} 的课程`);
    return { success: false, message: '找不到该课程' };
  },
  
  // 班级相关
  '/classes/1': () => ({
    id: 1,
    name: 'Python-A班',
    courseId: 1,
    courseName: 'Python基础入门',
    teacherId: 1,
    teacherName: '张老师',
    schedule: '周六 09:00-11:00',
    startDate: '2023-06-01',
    endDate: '2023-07-30',
    classroom: 'A教室',
    currentStudents: 15,
    maxStudents: 20,
    status: 1,
    syllabus: '第一周：Python环境安装与基础语法\n第二周：变量与数据类型\n第三周：控制流语句\n第四周：函数定义与使用\n第五周：列表与字典\n第六周：文件操作\n第七周：简单项目实践\n第八周：综合项目与总结',
    sessions: [
      {
        id: 1,
        date: '2023-06-03',
        timeSlot: '09:00-11:00',
        status: 2,
        topic: 'Python环境安装与基础语法',
        attendance: 14
      },
      {
        id: 2,
        date: '2023-06-10',
        timeSlot: '09:00-11:00',
        status: 2,
        topic: '变量与数据类型',
        attendance: 15
      },
      {
        id: 3,
        date: '2023-06-17',
        timeSlot: '09:00-11:00',
        status: 1,
        topic: '控制流语句',
        attendance: null
      },
      {
        id: 4,
        date: '2023-06-24',
        timeSlot: '09:00-11:00',
        status: 0,
        topic: '函数定义与使用',
        attendance: null
      }
    ]
  }),
  
  '/classes/1/students': () => [
    {
      id: 1,
      name: '张三',
      studentNo: 'S2023001',
      gender: 1,
      age: 15,
      grade: '高一',
      parentPhone: '13900139001'
    },
    {
      id: 2,
      name: '李四',
      studentNo: 'S2023002',
      gender: 0,
      age: 14,
      grade: '初三',
      parentPhone: '13900139003'
    }
  ],
  
  '/classes/1/attendance': () => [
    {
      sessionId: 1,
      date: '2023-06-03',
      students: [
        { id: 1, name: '张三', status: 1 },
        { id: 2, name: '李四', status: 1 },
        { id: 3, name: '王五', status: 0 }
      ]
    },
    {
      sessionId: 2,
      date: '2023-06-10',
      students: [
        { id: 1, name: '张三', status: 1 },
        { id: 2, name: '李四', status: 1 },
        { id: 3, name: '王五', status: 1 }
      ]
    }
  ],
  
  // 排课相关
  '/schedules': () => {
    const schedules = schedulesDB;
    return {
      records: schedules,
      total: schedules.length,
    size: 10,
    current: 1,
      pages: Math.ceil(schedules.length / 10)
    };
  },

  '/schedules/date-range': (params) => {
    // 根据日期范围过滤排课数据
    const { startDate, endDate } = params;
    
    console.log('API接收到日期范围查询:', startDate, endDate);
    
    // 如果没有提供日期范围，返回当前月份的排课
    if (!startDate && !endDate) {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
      const firstDay = new Date(currentYear, currentMonth, 1);
      const lastDay = new Date(currentYear, currentMonth + 1, 0);
      
      const filteredSchedules = schedulesDB.filter(schedule => {
        const scheduleDate = new Date(schedule.scheduleDate);
        return scheduleDate >= firstDay && scheduleDate <= lastDay;
      });
      
      console.log(`返回当前月份(${firstDay.toISOString().slice(0, 10)} - ${lastDay.toISOString().slice(0, 10)})的排课:`, filteredSchedules.length);
      return filteredSchedules;
    }
    
    // 如果提供了日期范围，按范围过滤
    const filteredSchedules = schedulesDB.filter(schedule => {
      // 如果没有提供开始日期，只检查结束日期
      if (!startDate && endDate) {
        return schedule.scheduleDate <= endDate;
      }
      
      // 如果没有提供结束日期，只检查开始日期
      if (startDate && !endDate) {
        return schedule.scheduleDate >= startDate;
      }
      
      // 如果都提供了，检查范围
      return schedule.scheduleDate >= startDate && schedule.scheduleDate <= endDate;
    });
    
    console.log(`返回日期范围(${startDate || '无'} - ${endDate || '无'})的排课:`, filteredSchedules.length);
    return filteredSchedules;
  },
  
  '/schedules/check-conflict': () => false,  // 返回false表示无冲突
  
  // 创建排课
  '/schedules/create': (data) => {
    // 生成新ID（取当前最大ID + 1）
    const maxId = Math.max(...schedulesDB.map(s => s.id), 0);
    const newId = maxId + 1;
    
    // 确保所有字段都有值
    const courseName = data.courseName || '未知课程';
    const className = data.className || '未知班级';
    const teacherName = data.teacherName || '未知教师';
    const classroom = data.classroom || '未指定教室';
    
    console.log('创建排课数据:', data);
    
    // 创建新排课对象
    const newSchedule = {
      id: newId,
      classId: data.classId || 0,
      className: className,
      courseId: data.courseId || 0,
      courseName: courseName,
      teacherId: data.teacherId || 0,
      teacherName: teacherName,
      scheduleDate: data.scheduleDate || new Date().toISOString().slice(0, 10),
      startTime: data.startTime || '00:00:00',
      endTime: data.endTime || '00:00:00',
      classroom: classroom,
      status: data.status !== undefined ? data.status : 0, // 默认为未开始
      topic: data.topic || '',
      periods: data.periods || 2
    };
    
    console.log('新创建的排课:', newSchedule);
    
    // 添加到数据库
    schedulesDB.push(newSchedule);
    
    return {
      success: true,
      message: '创建成功',
      data: newSchedule
    };
  },
  
  // 更新排课
  '/schedules/\\d+': (data, url) => {
    const id = parseInt(url.split('/')[2]);
    console.log(`更新排课 ${id} 信息:`, data);
    
    // 查找排课并更新
    const scheduleIndex = schedulesDB.findIndex(schedule => schedule.id === id);
    if (scheduleIndex !== -1) {
      // 保留id和一些不应该被覆盖的字段
      const oldSchedule = schedulesDB[scheduleIndex];
      
      // 确保所有字段都有值
      const courseName = data.courseName || oldSchedule.courseName || '未知课程';
      const className = data.className || oldSchedule.className || '未知班级';
      const teacherName = data.teacherName || oldSchedule.teacherName || '未知教师';
      const classroom = data.classroom || oldSchedule.classroom || '未指定教室';
      
      const updatedSchedule = {
        ...oldSchedule,
        ...data,
        id: oldSchedule.id, // 确保ID不变
        courseName: courseName,
        className: className,
        teacherName: teacherName,
        classroom: classroom,
        // 确保这些字段有值
        scheduleDate: data.scheduleDate || oldSchedule.scheduleDate,
        startTime: data.startTime || oldSchedule.startTime,
        endTime: data.endTime || oldSchedule.endTime,
        status: data.status !== undefined ? data.status : oldSchedule.status,
        topic: data.topic || oldSchedule.topic || '',
        periods: data.periods || oldSchedule.periods || 2
      };
      
      console.log(`排课 ${id} 更新后数据:`, updatedSchedule);
      
      schedulesDB[scheduleIndex] = updatedSchedule;
      console.log(`排课 ${id} 信息已更新`);
      return { success: true, message: '更新成功' };
    }
    
    console.error(`找不到ID为 ${id} 的排课`);
    return { success: false, message: '找不到该排课' };
  },
  
  // 删除排课
  '/schedules/delete/\\d+': (data, url) => {
    const id = parseInt(url.split('/')[3]);
    console.log(`删除排课 ${id}`);
    
    // 查找排课并删除
    const scheduleIndex = schedulesDB.findIndex(schedule => schedule.id === id);
    if (scheduleIndex !== -1) {
      schedulesDB.splice(scheduleIndex, 1);
      console.log(`排课 ${id} 已删除`);
      return { success: true, message: '删除成功' };
    }
    
    console.error(`找不到ID为 ${id} 的排课`);
    return { success: false, message: '找不到该排课' };
  },
  
  '/schedules/batch': (data) => {
    // 批量排课逻辑
    const { startDate, endDate, repeatType, repeatDays, ...scheduleData } = data;
    
    // 查找对应的班级名称
    let className = '';
    if (scheduleData.classId) {
      // 从班级数据中查找
      const classData = mockData['/classes']().records.find(c => c.id === scheduleData.classId);
      if (classData) {
        className = classData.name;
      }
    }
    
    // 生成日期序列
    const dates = [];
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // 每天排课
    if (repeatType === 0) {
      for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
        dates.push(new Date(date));
      }
    } 
    // 按周排课
    else if (repeatType === 1 && repeatDays && repeatDays.length > 0) {
      for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
        // 检查当天是否在选中的星期中
        // getDay(): 0是周日，1-6是周一至周六
        // repeatDays: 1-7代表周一至周日
        const day = date.getDay();
        const repeatDay = day === 0 ? 7 : day; // 转换为1-7表示
        
        if (repeatDays.includes(repeatDay)) {
          dates.push(new Date(date));
        }
      }
    }
    
    // 生成排课记录
    let maxId = Math.max(...schedulesDB.map(s => s.id), 0);
    const newSchedules = dates.map((date, index) => {
      const newId = maxId + index + 1;
      return {
        id: newId,
        ...scheduleData,
        className: className || `${scheduleData.courseName || ''}班级`, // 确保有班级名称
        scheduleDate: date.toISOString().slice(0, 10),
          status: 0, // 未开始
        topic: `第${index + 1}课: ${scheduleData.courseName || ''}` // 默认主题
      };
    });
    
    // 添加到数据库
    schedulesDB.push(...newSchedules);
    
    return {
      success: true,
      message: `成功创建${newSchedules.length}条排课记录`,
      count: newSchedules.length
    };
  },
  
  '/schedules/teacher/1': () => [
    {
      id: 1,
      classId: 1,
      className: 'Python-A班',
      date: '2023-06-03',
      startTime: '09:00',
      endTime: '11:00',
      classroom: 'A教室',
      status: 2
    },
    {
      id: 3,
      classId: 1,
      className: 'Python-A班',
      date: '2023-06-17',
      startTime: '09:00',
      endTime: '11:00',
      classroom: 'A教室',
      status: 1
    }
  ],
  
  '/schedules/1/attendance': () => [
    { id: 1, name: '张三', status: 1 },
    { id: 2, name: '李四', status: 1 },
    { id: 3, name: '王五', status: 0 }
  ],
  
  // 系统设置
  '/settings': () => ({
    success: true,
    settings: {
      basic: {
        siteName: '青少年编程管理系统',
        siteDescription: '专业的编程教育管理平台',
        enableRegistration: false,
        defaultUserRole: 'student',
        maxStudentsPerClass: 30
      },
      database: {
        host: 'localhost',
        port: 3306,
        database: 'class_management',
        username: 'root',
        maxConnections: 100
      },
      security: {
        enableTwoFactor: false,
        sessionTimeout: 30,
        maxLoginAttempts: 5,
        requireStrongPassword: true
      },
      notification: {
        enableEmail: true,
        enableSms: false,
        enablePush: true
      }
    }
  }),

  // 仪表盘统计数据
  '/dashboard/stats': () => {
    // 不再从这里获取系统公告，而是从Pinia存储获取
    const notices = [];
    
    // 使用统一的学生数据计算方法
    const studentsResponse = mockData['/students']({ forDashboard: 'true' });
    const students = studentsResponse.records || [];
    // 使用一致的新学生计算方法
    const newStudents = calculateNewStudents(students);
    
    // 从课程API获取真实课程数据
    const coursesResponse = mockData['/courses']();
    const courses = coursesResponse.records || [];
    const coursesCount = courses.length;
    
    // 从教师API获取真实教师数据，而不是从课程中提取
    console.log('获取仪表盘教师数据');
    const teachersResponse = mockData['/teachers']({});
    console.log('仪表盘教师API响应:', teachersResponse);
    const teachers = teachersResponse.records || [];
    console.log('仪表盘教师数量:', teachers.length);
    
    // 计算本月收入 - 从财务数据中获取实际数据
    // 获取财务记录
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth(); // 0-11
    
    // 获取所有财务记录
    const financeRecords = [
      {
        id: 1,
        date: '2025-07-01',
        type: 'income',
        category: 'tuition',
        categoryName: '学费',
        amount: 2400,
        relatedId: 'class_1',
        relatedName: 'Python-A班',
        description: '张三学费缴纳',
        createdBy: '管理员',
        status: 'approved'
      },
      {
        id: 2,
        date: '2025-07-02',
        type: 'income',
        category: 'tuition',
        categoryName: '学费',
        amount: 3200,
        relatedId: 'class_2',
        relatedName: 'Java-A班',
        description: '李四学费缴纳',
        createdBy: '管理员',
        status: 'approved'
      },
      {
        id: 3,
        date: '2025-07-15',
        type: 'expense',
        category: 'salary',
        categoryName: '工资',
        amount: 8000,
        relatedId: 'teacher_1',
        relatedName: '张老师',
        description: '教师工资发放',
        createdBy: '管理员',
        status: 'approved'
      },
      {
        id: 4,
        date: '2025-07-20',
        type: 'expense',
        category: 'utility',
        categoryName: '水电费',
        amount: 2500,
        relatedId: '',
        relatedName: '',
        description: '本月水电费',
        createdBy: '管理员',
        status: 'approved'
      },
      {
        id: 5,
        date: '2025-07-25',
        type: 'income',
        category: 'tuition',
        categoryName: '学费',
        amount: 3600,
        relatedId: 'class_3',
        relatedName: 'AI-A班',
        description: '王五学费缴纳',
        createdBy: '管理员',
        status: 'approved'
      },
      {
        id: 6,
        date: '2025-07-28',
        type: 'income',
        category: 'textbook',
        categoryName: '教材费',
        amount: 1000,
        relatedId: '',
        relatedName: '',
        description: '教材费收入',
        createdBy: '管理员',
        status: 'approved'
      },
      {
        id: 7,
        date: '2025-06-01',
        type: 'income',
        category: 'tuition',
        categoryName: '学费',
        amount: 2800,
        relatedId: 'class_1',
        relatedName: 'Python-B班',
        description: '赵六学费缴纳',
        createdBy: '管理员',
        status: 'approved'
      },
      {
        id: 8,
        date: '2025-06-05',
        type: 'expense',
        category: 'rent',
        categoryName: '租金',
        amount: 5000,
        relatedId: '',
        relatedName: '',
        description: '场地租金',
        createdBy: '管理员',
        status: 'approved'
      }
    ]; // 使用与financeData.js中相同的数据
    
    // 计算本月收入
    const monthlyIncome = financeRecords
      .filter(item => {
        const date = new Date(item.date);
        return item.type === 'income' && 
               date.getFullYear() === currentYear && 
               date.getMonth() === currentMonth;
      })
      .reduce((sum, item) => sum + item.amount, 0);
    
    // 获取班级数据
    const classesResponse = mockData['/classes']();
    const classes = classesResponse.records || [];
    const classesCount = classes.length;
    
    // 获取排课数据
    const schedulesResponse = mockData['/schedules']();
    const schedules = schedulesResponse.records || [];
    const schedulesCount = schedules.length;
    
    // 统计每个月的财务数据和学生增长趋势
    const monthlyMultipliers = {
      1: 0.55, 2: 0.64, 3: 0.75, 4: 0.69, 5: 0.79, 6: 1
    };
    
    const studentMonthlyRatios = {
      1: 0.71, 2: 0.74, 3: 0.81, 4: 0.85, 5: 0.93, 6: 1
    };
    
    const incomeTrend = Object.entries(monthlyMultipliers).map(([month, multiplier]) => ({
      month: `${month}月`, 
      income: Math.round(monthlyIncome * multiplier)
    }));
    
    const studentTrend = Object.entries(studentMonthlyRatios).map(([month, ratio]) => ({
      month: `${month}月`, 
      count: Math.round(students.length * ratio)
    }));
    
    // 创建教师与课程分析数据
    const teacherCourseData = teachers.map(teacher => ({
      name: teacher.name,
      courses: Math.floor(Math.random() * 3) + 1 // 1-3门课程
    }));
    
    return {
      newStudents: newStudents,
      coursesCount: coursesCount,
      teachersCount: teachers.length, // 使用实际教师数量
      monthlyIncome: monthlyIncome,
      classesCount: classesCount,
      schedulesCount: schedulesCount,
      incomeTrend: incomeTrend,
      studentTrend: studentTrend,
      teacherCourseData: teacherCourseData,
      notices: notices
    }
  },
  // 课程封面上传API
  '/courses/\\d+/cover': (data, url) => {
    const id = parseInt(url.split('/')[2]);
    console.log(`上传课程 ${id} 封面`);
    
    // 查找课程并更新封面
    const courseIndex = coursesDB.findIndex(course => course.id === id);
    if (courseIndex !== -1) {
      // 模拟生成随机图片URL
      const randomImageId = Math.floor(Math.random() * 1000);
      const coverUrl = `https://picsum.photos/400/300?random=${randomImageId}`;
      
      // 更新课程封面
      coursesDB[courseIndex].cover = coverUrl;
      
      console.log(`课程 ${id} 封面已更新为 ${coverUrl}`);
      return { success: true, data: coverUrl };
    }
    
    console.error(`找不到ID为 ${id} 的课程`);
    return { success: false, message: '找不到该课程' };
  },
  // 特殊处理教师创建API
  '/teachers': (data) => {
    console.log('创建教师:', data);
    
    // 为新教师生成username（如果没有提供）
    if (!data.username) {
      data.username = data.name ? data.name.toLowerCase().replace(/\s+/g, '') : `teacher${Date.now()}`;
    }
    
    const newTeacher = {
      id: teachersDB.length + 1,
      ...data,
      createTime: new Date().toISOString()
    };
    
    teachersDB.push(newTeacher);
    console.log('教师创建成功:', newTeacher);
    return { success: true, data: newTeacher };
  },
  // 财务相关API
  '/finance': () => ({
    records: globalThis.financeDB || [
      {
        id: 1,
        date: '2025-07-01',
        type: 'income',
        category: 'tuition',
        categoryName: '学费',
        amount: 2400,
        relatedId: 'class_1',
        relatedName: 'Python-A班',
        description: '张三学费缴纳',
        createdBy: '管理员',
        status: 'approved'
      },
      {
        id: 2,
        date: '2025-07-02',
        type: 'income',
        category: 'tuition',
        categoryName: '学费',
        amount: 3200,
        relatedId: 'class_2',
        relatedName: 'Java-A班',
        description: '李四学费缴纳',
        createdBy: '管理员',
        status: 'approved'
      },
      {
        id: 3,
        date: '2025-07-03',
        type: 'expense',
        category: 'salary',
        categoryName: '工资',
        amount: 5000,
        relatedId: 'teacher_1',
        relatedName: '张老师',
        description: '教师工资发放',
        createdBy: '管理员',
        status: 'approved'
      },
      {
        id: 4,
        date: '2025-07-04',
        type: 'income',
        category: 'material',
        categoryName: '教材费',
        amount: 1500,
        relatedId: 'class_1',
        relatedName: 'Python-A班',
        description: '教材费用',
        createdBy: '管理员',
        status: 'approved'
      },
      {
        id: 5,
        date: '2025-07-05',
        type: 'expense',
        category: 'rent',
        categoryName: '租金',
        amount: 3000,
        relatedId: 'venue_1',
        relatedName: '教室租金',
        description: '场地租金',
        createdBy: '管理员',
        status: 'approved'
      },
      {
        id: 6,
        date: '2025-07-06',
        type: 'income',
        category: 'tuition',
        categoryName: '学费',
        amount: 2800,
        relatedId: 'class_3',
        relatedName: 'AI-A班',
        description: '王五学费缴纳',
        createdBy: '管理员',
        status: 'approved'
      },
      {
        id: 7,
        date: '2025-07-07',
        type: 'expense',
        category: 'equipment',
        categoryName: '设备采购',
        amount: 4500,
        relatedId: 'equipment_1',
        relatedName: '电脑设备',
        description: '采购教学设备',
        createdBy: '管理员',
        status: 'approved'
      },
      {
        id: 8,
        date: '2025-07-08',
        type: 'income',
        category: 'activity',
        categoryName: '活动费',
        amount: 800,
        relatedId: 'activity_1',
        relatedName: '编程比赛',
        description: '编程比赛报名费',
        createdBy: '管理员',
        status: 'approved'
      }
    ],
    total: 8
  }),

  // 教师更新API
  '/teachers/:id': (data, url) => {
    const id = parseInt(url.split('/')[2])
    const teacherIndex = teachersDB.findIndex(t => t.id === id)
    if (teacherIndex !== -1) {
      teachersDB[teacherIndex] = { ...teachersDB[teacherIndex], ...data }
      return { success: true, data: teachersDB[teacherIndex] }
    }
    return { success: false, message: '教师不存在' }
  },
  // 系统公告数据
  '/notices': () => ({ records: noticesDB, total: noticesDB.length }),
  '/notices/:id': (data, url, method = 'DELETE') => {
    const id = parseInt(url.split('/')[2]);
    const idx = noticesDB.findIndex(n => n.id === id);
    if (method === 'DELETE') {
      if (idx !== -1) {
        noticesDB.splice(idx, 1);
        console.log(`✅ API删除公告成功，ID: ${id}，剩余公告数量: ${noticesDB.length}`);
        return { success: true, message: '公告删除成功' };
      }
      console.log(`❌ API删除公告失败，未找到ID: ${id}`);
      return { success: false, message: '公告不存在' };
    }
    return { success: false };
  },
  // 财务相关API
  '/finance/:id': (data, url, method = 'PUT') => {
    const id = parseInt(url.split('/')[2]);
    if (!globalThis.financeDB) {
      globalThis.financeDB = [
        {
          id: 1,
          date: '2025-07-01',
          type: 'income',
          category: 'tuition',
          categoryName: '学费',
          amount: 2400,
          relatedId: 'class_1',
          relatedName: 'Python-A班',
          description: '张三学费缴纳',
          createdBy: '管理员',
          status: 'approved'
        },
        {
          id: 2,
          date: '2025-07-02',
          type: 'income',
          category: 'tuition',
          categoryName: '学费',
          amount: 3200,
          relatedId: 'class_2',
          relatedName: 'Java-A班',
          description: '李四学费缴纳',
          createdBy: '管理员',
          status: 'approved'
        },
        {
          id: 3,
          date: '2025-07-03',
          type: 'expense',
          category: 'salary',
          categoryName: '工资',
          amount: 5000,
          relatedId: 'teacher_1',
          relatedName: '张老师',
          description: '教师工资发放',
          createdBy: '管理员',
          status: 'approved'
        },
        {
          id: 4,
          date: '2025-07-04',
          type: 'income',
          category: 'material',
          categoryName: '教材费',
          amount: 1500,
          relatedId: 'class_1',
          relatedName: 'Python-A班',
          description: '教材费用',
          createdBy: '管理员',
          status: 'approved'
        },
        {
          id: 5,
          date: '2025-07-05',
          type: 'expense',
          category: 'rent',
          categoryName: '租金',
          amount: 3000,
          relatedId: 'venue_1',
          relatedName: '教室租金',
          description: '场地租金',
          createdBy: '管理员',
          status: 'approved'
        },
        {
          id: 6,
          date: '2025-07-06',
          type: 'income',
          category: 'tuition',
          categoryName: '学费',
          amount: 2800,
          relatedId: 'class_3',
          relatedName: 'AI-A班',
          description: '王五学费缴纳',
          createdBy: '管理员',
          status: 'approved'
        },
        {
          id: 7,
          date: '2025-07-07',
          type: 'expense',
          category: 'equipment',
          categoryName: '设备采购',
          amount: 4500,
          relatedId: 'equipment_1',
          relatedName: '电脑设备',
          description: '采购教学设备',
          createdBy: '管理员',
          status: 'approved'
        },
        {
          id: 8,
          date: '2025-07-08',
          type: 'income',
          category: 'activity',
          categoryName: '活动费',
          amount: 800,
          relatedId: 'activity_1',
          relatedName: '编程比赛',
          description: '编程比赛报名费',
          createdBy: '管理员',
          status: 'approved'
        }
      ];
    }
    const db = globalThis.financeDB;
    const idx = db.findIndex(r => r.id === id);
    if (method === 'PUT') {
      if (idx !== -1) {
        // 更新记录，确保状态字段被正确更新
        db[idx] = { ...db[idx], ...data };
        return { success: true, data: db[idx] };
      }
      return { success: false, message: '记录不存在' };
    }
    return { success: false };
  },

  // 用户密码修改 (支持通配符匹配)
  '/users/1/change-password': (data) => ({
    success: true,
    message: '密码修改成功'
  }),

  // 用户资料更新
  'PUT /users/profile': (data) => ({
    success: true,
    message: '用户资料更新成功',
    user: {
      ...data,
      id: 1,
      updateTime: new Date().toISOString()
    }
  }),

  // 头像上传
  'POST /users/avatar': () => ({
    success: true,
    url: 'https://avatars.githubusercontent.com/u/1?v=4',
    message: '头像上传成功'
  }),

  // 用户列表API
  '/users': (params = {}) => ({
    success: true,
    data: {
      records: [
        {
          id: 1,
          username: 'admin',
          name: '系统管理员',
          role: 'admin',
          phone: '13800138000',
          email: 'admin@example.com',
          status: 1,
          createTime: '2024-01-01',
          lastLoginTime: new Date().toISOString()
        },
        {
          id: 2,
          username: 'teacher1',
          name: '张老师',
          role: 'teacher',
          phone: '13800138001',
          email: 'teacher@example.com',
          status: 1,
          createTime: '2024-01-01',
          lastLoginTime: new Date().toISOString()
        }
      ],
      total: 2,
      current: params.current || 1,
      size: params.size || 10
    }
  }),
};

/**
 * 模拟延迟
 * @param {number} ms 延迟毫秒数
 * @returns {Promise} 延迟Promise
 */
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * 模拟请求
 * @param {string} url 请求URL
 * @param {Object} options 请求选项
 * @returns {Promise} 响应Promise
 */
async function mockRequest(url, options = {}) {
  try {
    await delay(RESPONSE_DELAY);
    const { method = 'GET', data } = options;
    const urlPath = url.split('?')[0];
    // 直接匹配
    if (mockData[urlPath]) {
      if (method === 'GET') return mockData[urlPath](options.params || {}, urlPath, method);
      if (method === 'POST') return mockData[urlPath](data, urlPath, method);
      if (method === 'PUT') return mockData[urlPath](data, urlPath, method);
      if (method === 'DELETE') return mockData[urlPath](null, urlPath, method);
      }
    // :id匹配
    const idMatch = urlPath.match(/^\/(students|teachers|courses|classes|notices)\/(\d+)$/);
    if (idMatch) {
      const resource = idMatch[1];
      const idUrl = `/${resource}/:id`;
      if (mockData[idUrl]) {
        if (method === 'GET') return mockData[idUrl](null, urlPath, method);
        if (method === 'PUT') return mockData[idUrl](data, urlPath, method);
        if (method === 'DELETE') return mockData[idUrl](null, urlPath, method);
      }
    }
    throw new Error('接口不存在: ' + urlPath);
  } catch (error) {
    console.error('Mock请求处理错误:', error);
    throw error;
  }
}

/**
 * GET请求
 * @param {string} url 请求URL
 * @param {Object} params 请求参数
 * @returns {Promise} 响应Promise
 */
function get(url, params = {}) {
  return mockRequest(url, { method: 'GET', params });
}

/**
 * POST请求
 * @param {string} url 请求URL
 * @param {Object} data 请求数据
 * @returns {Promise} 响应Promise
 */
function post(url, data = {}) {
  return mockRequest(url, { method: 'POST', data });
}

/**
 * PUT请求
 * @param {string} url 请求URL
 * @param {Object} data 请求数据
 * @returns {Promise} 响应Promise
 */
function put(url, data = {}) {
  return mockRequest(url, { method: 'PUT', data });
}

/**
 * DELETE请求
 * @param {string} url 请求URL
 * @param {Object} params 请求参数
 * @returns {Promise} 响应Promise
 */
function del(url, params = {}) {
  return mockRequest(url, { method: 'DELETE', params });
}

/**
 * 文件上传
 * @param {string} url 上传URL
 * @param {FormData} formData 表单数据
 * @returns {Promise} 响应Promise
 */
function upload(url, formData) {
  return mockRequest(url, { method: 'POST', data: formData });
}

/**
 * 文件下载
 * @param {string} url 下载URL
 * @param {Object} params 请求参数
 * @param {string} filename 文件名
 * @returns {Promise} 响应Promise
 */
async function download(url, params = {}, filename) {
  const response = await mockRequest(url, { method: 'GET', params });
  // 实际下载逻辑...
  return response;
}

// 导出API方法和工具函数
export default {
  get,
  post,
  put,
  del,
  delete: del,
  upload,
  download,
  calculateNewStudents
}; 