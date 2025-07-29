# 青少年编程教务管理系统 - 后端API接口清单

**项目名称**: 青少年编程教务管理系统  
**前端技术栈**: Vue3 + Pinia + Element Plus  
**后端技术栈**: Java 17 + Spring Boot 3.x + MySQL 8.0 + Redis  
**创建日期**: 2025年1月  

---

## 📋 API概述

### 基础信息
- **API Base URL**: `/api`
- **认证方式**: JWT Bearer Token
- **数据格式**: JSON
- **字符编码**: UTF-8

### 统一响应格式
```json
{
  "success": true,
  "data": {},
  "message": "操作成功",
  "code": "200",
  "timestamp": "2025-01-20T10:30:00.000Z"
}
```

### 统一错误格式
```json
{
  "success": false,
  "data": null,
  "message": "错误描述",
  "code": "400",
  "timestamp": "2025-01-20T10:30:00.000Z"
}
```

### 分页响应格式
```json
{
  "success": true,
  "data": {
    "records": [],
    "total": 100,
    "current": 1,
    "size": 10,
    "pages": 10
  }
}
```

---

## 🔐 1. 认证授权模块

### 1.1 用户登录
```
POST /api/auth/login
Content-Type: application/json

{
  "loginType": "admin|teacher|student",
  "username": "admin",          // 管理员登录用用户名
  "name": "张老师",             // 教师登录用姓名
  "password": "password123",
  "captcha": "ABCD",
  "captchaKey": "captcha-key-123"
}

Response:
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiJ9...",
    "refreshToken": "refresh-token-123",
    "user": {
      "id": 1,
      "username": "admin",
      "name": "系统管理员",
      "role": "admin",
      "phone": "13800138000",
      "email": "admin@example.com",
      "avatar": "",
      "permissions": ["manage_users", "manage_courses"],
      "createTime": "2024-01-01T00:00:00",
      "lastLoginTime": "2025-01-20T10:30:00"
    }
  }
}
```

### 1.2 获取验证码
```
GET /api/auth/captcha

Response:
{
  "success": true,
  "data": {
    "captcha": "ABCD",
    "key": "captcha-key-123",
    "image": "data:image/png;base64,..."
  }
}
```

### 1.3 刷新Token
```
POST /api/auth/refresh
Authorization: Bearer {refreshToken}

Response:
{
  "success": true,
  "data": {
    "token": "new-access-token",
    "refreshToken": "new-refresh-token"
  }
}
```

### 1.4 用户登出
```
POST /api/auth/logout
Authorization: Bearer {token}

Response:
{
  "success": true,
  "message": "登出成功"
}
```

---

## 👤 2. 用户管理模块

### 2.1 获取当前用户信息
```
GET /api/users/current
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": {
    "id": 1,
    "username": "admin",
    "name": "系统管理员", 
    "role": "admin",
    "phone": "13800138000",
    "email": "admin@example.com",
    "avatar": "",
    "permissions": ["manage_users"],
    "createTime": "2024-01-01T00:00:00",
    "lastLoginTime": "2025-01-20T10:30:00"
  }
}
```

### 2.2 获取用户列表
```
GET /api/users?page=1&size=10&role=teacher&keyword=张
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": {
    "records": [
      {
        "id": 1,
        "username": "admin",
        "name": "系统管理员",
        "role": "admin",
        "phone": "13800138000",
        "email": "admin@example.com",
        "status": 1,
        "createTime": "2024-01-01T00:00:00",
        "lastLoginTime": "2025-01-20T10:30:00"
      }
    ],
    "total": 10,
    "current": 1,
    "size": 10
  }
}
```

### 2.3 更新用户资料
```
PUT /api/users/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "张三",
  "phone": "13800138001",
  "email": "zhang@example.com",
  "bio": "个人简介"
}

Response:
{
  "success": true,
  "data": {
    "id": 1,
    "name": "张三",
    "phone": "13800138001",
    "email": "zhang@example.com",
    "updateTime": "2025-01-20T10:30:00"
  }
}
```

### 2.4 修改密码
```
PUT /api/users/{id}/change-password
Authorization: Bearer {token}
Content-Type: application/json

{
  "oldPassword": "old123",
  "newPassword": "new123",
  "confirmPassword": "new123"
}

Response:
{
  "success": true,
  "message": "密码修改成功"
}
```

### 2.5 上传头像
```
POST /api/users/avatar
Authorization: Bearer {token}
Content-Type: multipart/form-data

Form Data:
- avatar: (file)

Response:
{
  "success": true,
  "data": {
    "url": "https://example.com/avatars/user-123.jpg"
  }
}
```

---

## 👨‍🏫 3. 教师管理模块

### 3.1 获取教师列表
```
GET /api/teachers?page=1&size=10&name=张&specialty=Python&status=1
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": {
    "records": [
      {
        "id": 1,
        "name": "张老师",
        "gender": 1,
        "age": 35,
        "phone": "13800138001",
        "email": "zhangwei@example.com",
        "specialty": "Python",
        "education": "计算机科学硕士",
        "experience": 5,
        "status": 1,
        "joinDate": "2024-01-15",
        "avatar": "",
        "courseCount": 8,
        "studentCount": 45,
        "createTime": "2024-01-15T00:00:00"
      }
    ],
    "total": 5,
    "current": 1,
    "size": 10
  }
}
```

### 3.2 获取教师详情
```
GET /api/teachers/{id}
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": {
    "id": 1,
    "name": "张老师",
    "gender": 1,
    "age": 35,
    "phone": "13800138001",
    "email": "zhangwei@example.com",
    "specialty": "Python",
    "education": "计算机科学硕士",
    "experience": 5,
    "status": 1,
    "joinDate": "2024-01-15",
    "avatar": "",
    "bio": "专注于Python编程教学",
    "courseCount": 8,
    "studentCount": 45,
    "createTime": "2024-01-15T00:00:00"
  }
}
```

### 3.3 添加教师
```
POST /api/teachers
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "李老师",
  "gender": 0,
  "age": 32,
  "phone": "13800138002",
  "email": "li@example.com",
  "specialty": "Java",
  "education": "软件工程硕士",
  "experience": 7,
  "joinDate": "2024-02-01",
  "bio": "Java企业级开发专家"
}

Response:
{
  "success": true,
  "data": {
    "id": 2,
    "name": "李老师",
    "createTime": "2025-01-20T10:30:00"
  }
}
```

### 3.4 更新教师信息
```
PUT /api/teachers/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "phone": "13800138002",
  "specialty": "Python,Java",
  "experience": 8
}

Response:
{
  "success": true,
  "data": {
    "id": 1,
    "name": "张老师",
    "updateTime": "2025-01-20T10:30:00"
  }
}
```

### 3.5 删除教师
```
DELETE /api/teachers/{id}
Authorization: Bearer {token}

Response:
{
  "success": true,
  "message": "教师删除成功"
}
```

---

## 👨‍🎓 4. 学生管理模块

### 4.1 获取学生列表
```
GET /api/students?page=1&size=10&name=张&grade=高一&level=初级&status=1
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": {
    "records": [
      {
        "id": 1,
        "name": "张三",
        "studentNo": "S2023001",
        "gender": 1,
        "age": 15,
        "phone": "13800138001",
        "email": "zhangsan@example.com",
        "parentName": "张父",
        "parentPhone": "13900139001",
        "address": "北京市朝阳区",
        "school": "北京市第一中学",
        "grade": "高一",
        "level": "初级",
        "status": 1,
        "enrollDate": "2024-01-15",
        "avatar": "",
        "courseCount": 3,
        "totalHours": 48,
        "createTime": "2024-01-15T00:00:00"
      }
    ],
    "total": 20,
    "current": 1,
    "size": 10
  }
}
```

### 4.2 获取学生详情
```
GET /api/students/{id}
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": {
    "id": 1,
    "name": "张三",
    "studentNo": "S2023001",
    "gender": 1,
    "age": 15,
    "phone": "13800138001",
    "email": "zhangsan@example.com",
    "parentName": "张父",
    "parentPhone": "13900139001",
    "parentWechat": "zhang_parent",
    "address": "北京市朝阳区",
    "school": "北京市第一中学",
    "grade": "高一",
    "level": "初级",
    "status": 1,
    "enrollDate": "2024-01-15",
    "avatar": "",
    "emergencyContact": "张母",
    "emergencyPhone": "13900139002",
    "medicalInfo": "无特殊病史",
    "learningGoals": "掌握Python基础编程",
    "notes": "学习积极性高，理解能力强",
    "courseCount": 3,
    "totalHours": 48,
    "createTime": "2024-01-15T00:00:00"
  }
}
```

### 4.3 添加学生
```
POST /api/students
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "李四",
  "gender": 0,
  "age": 14,
  "phone": "13800138002",
  "email": "lisi@example.com",
  "parentName": "李父",
  "parentPhone": "13900139003",
  "address": "北京市海淀区",
  "school": "北京市第二中学",
  "grade": "初三",
  "level": "初级",
  "enrollDate": "2024-02-01",
  "learningGoals": "学习Java编程基础"
}

Response:
{
  "success": true,
  "data": {
    "id": 2,
    "name": "李四",
    "studentNo": "S2024002",
    "createTime": "2025-01-20T10:30:00"
  }
}
```

### 4.4 更新学生信息
```
PUT /api/students/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "phone": "13800138002",
  "level": "中级",
  "notes": "进步明显"
}

Response:
{
  "success": true,
  "data": {
    "id": 1,
    "name": "张三",
    "updateTime": "2025-01-20T10:30:00"
  }
}
```

### 4.5 删除学生
```
DELETE /api/students/{id}
Authorization: Bearer {token}

Response:
{
  "success": true,
  "message": "学生删除成功"
}
```

---

## 📚 5. 课程管理模块

### 5.1 获取课程列表
```
GET /api/courses?page=1&size=10&category=编程基础&difficulty=初级&status=1
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": {
    "records": [
      {
        "id": 1,
        "name": "Python基础入门",
        "code": "PY001",
        "category": "编程基础",
        "price": 3600.00,
        "duration": 16,
        "ageRange": "14-18岁",
        "difficulty": "初级",
        "description": "Python编程语言基础入门课程",
        "cover": "https://example.com/covers/python.jpg",
        "status": 1,
        "maxStudents": 20,
        "currentStudents": 15,
        "tags": ["Python", "编程基础", "入门"],
        "createTime": "2024-01-01T00:00:00",
        "updateTime": "2024-01-15T00:00:00"
      }
    ],
    "total": 10,
    "current": 1,
    "size": 10
  }
}
```

### 5.2 获取课程详情
```
GET /api/courses/{id}
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Python基础入门",
    "code": "PY001",
    "category": "编程基础",
    "price": 3600.00,
    "duration": 16,
    "ageRange": "14-18岁",
    "difficulty": "初级",
    "description": "Python编程语言基础入门课程，适合初学者",
    "syllabus": [
      "Python环境搭建",
      "变量和数据类型",
      "控制流程",
      "函数和模块",
      "面向对象编程",
      "文件操作",
      "异常处理",
      "项目实战"
    ],
    "cover": "https://example.com/covers/python.jpg",
    "status": 1,
    "maxStudents": 20,
    "currentStudents": 15,
    "tags": ["Python", "编程基础", "入门"],
    "createTime": "2024-01-01T00:00:00",
    "updateTime": "2024-01-15T00:00:00"
  }
}
```

### 5.3 添加课程
```
POST /api/courses
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Java程序设计",
  "code": "JA001",
  "category": "编程基础",
  "price": 4200.00,
  "duration": 20,
  "ageRange": "15-18岁",
  "difficulty": "中级",
  "description": "Java编程语言基础课程",
  "syllabus": [
    "Java开发环境",
    "基础语法",
    "面向对象编程"
  ],
  "maxStudents": 18,
  "tags": ["Java", "面向对象"]
}

Response:
{
  "success": true,
  "data": {
    "id": 2,
    "name": "Java程序设计",
    "code": "JA001",
    "createTime": "2025-01-20T10:30:00"
  }
}
```

### 5.4 更新课程信息
```
PUT /api/courses/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "price": 3800.00,
  "description": "Python编程语言基础入门课程，适合初学者",
  "maxStudents": 25
}

Response:
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Python基础入门",
    "updateTime": "2025-01-20T10:30:00"
  }
}
```

### 5.5 删除课程
```
DELETE /api/courses/{id}
Authorization: Bearer {token}

Response:
{
  "success": true,
  "message": "课程删除成功"
}
```

### 5.6 上传课程封面
```
POST /api/courses/{id}/cover
Authorization: Bearer {token}
Content-Type: multipart/form-data

Form Data:
- cover: (file)

Response:
{
  "success": true,
  "data": {
    "url": "https://example.com/covers/course-123.jpg"
  }
}
```

### 5.7 更新课程状态
```
PUT /api/courses/{id}/status
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": 1
}

Response:
{
  "success": true,
  "message": "课程状态更新成功"
}
```

---

## 🏫 6. 班级管理模块

### 6.1 获取班级列表
```
GET /api/classes?page=1&size=10&courseId=1&teacherId=1&status=1
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": {
    "records": [
      {
        "id": 1,
        "name": "Python-A班",
        "courseId": 1,
        "courseName": "Python基础入门",
        "teacherId": 1,
        "teacherName": "张老师",
        "maxStudents": 20,
        "currentStudents": 15,
        "startDate": "2024-03-01",
        "endDate": "2024-05-31",
        "status": 1,
        "createTime": "2024-02-15T00:00:00"
      }
    ],
    "total": 5,
    "current": 1,
    "size": 10
  }
}
```

### 6.2 获取班级详情
```
GET /api/classes/{id}
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Python-A班",
    "courseId": 1,
    "courseName": "Python基础入门",
    "teacherId": 1,
    "teacherName": "张老师",
    "maxStudents": 20,
    "currentStudents": 15,
    "startDate": "2024-03-01",
    "endDate": "2024-05-31",
    "classroom": "A教室",
    "schedule": "周六 09:00-11:00",
    "status": 1,
    "syllabus": "第一周：Python环境安装与基础语法...",
    "createTime": "2024-02-15T00:00:00"
  }
}
```

### 6.3 添加班级
```
POST /api/classes
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Java-A班",
  "courseId": 2,
  "teacherId": 2,
  "maxStudents": 18,
  "startDate": "2024-04-01",
  "endDate": "2024-07-31",
  "classroom": "B教室",
  "schedule": "周日 14:00-16:00"
}

Response:
{
  "success": true,
  "data": {
    "id": 2,
    "name": "Java-A班",
    "createTime": "2025-01-20T10:30:00"
  }
}
```

### 6.4 更新班级信息
```
PUT /api/classes/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "maxStudents": 25,
  "classroom": "C教室"
}

Response:
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Python-A班",
    "updateTime": "2025-01-20T10:30:00"
  }
}
```

### 6.5 删除班级
```
DELETE /api/classes/{id}
Authorization: Bearer {token}

Response:
{
  "success": true,
  "message": "班级删除成功"
}
```

### 6.6 获取班级学生列表
```
GET /api/classes/{id}/students
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "张三",
      "studentNo": "S2023001",
      "gender": 1,
      "age": 15,
      "grade": "高一",
      "parentPhone": "13900139001",
      "enrollDate": "2024-01-15"
    }
  ]
}
```

---

## 📅 7. 排课管理模块

### 7.1 获取排课列表
```
GET /api/schedules?page=1&size=10&classId=1&teacherId=1&scheduleDate=2025-01-20
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": {
    "records": [
      {
        "id": 1,
        "classId": 1,
        "className": "Python-A班",
        "courseId": 1,
        "courseName": "Python基础入门",
        "teacherId": 1,
        "teacherName": "张老师",
        "scheduleDate": "2025-01-20",
        "startTime": "09:00:00",
        "endTime": "11:00:00",
        "classroom": "A教室",
        "status": 0,
        "topic": "Python环境安装与基础语法",
        "periods": 2,
        "currentStudents": 15,
        "maxStudents": 20
      }
    ],
    "total": 10,
    "current": 1,
    "size": 10
  }
}
```

### 7.2 按日期范围获取排课
```
GET /api/schedules/date-range?startDate=2025-01-20&endDate=2025-01-27
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": [
    {
      "id": 1,
      "classId": 1,
      "className": "Python-A班",
      "courseId": 1,
      "courseName": "Python基础入门",
      "teacherId": 1,
      "teacherName": "张老师",
      "scheduleDate": "2025-01-20",
      "startTime": "09:00:00",
      "endTime": "11:00:00",
      "classroom": "A教室",
      "status": 0,
      "topic": "Python环境安装与基础语法",
      "periods": 2
    }
  ]
}
```

### 7.3 添加排课
```
POST /api/schedules
Authorization: Bearer {token}
Content-Type: application/json

{
  "classId": 1,
  "courseId": 1,
  "teacherId": 1,
  "scheduleDate": "2025-01-21",
  "startTime": "09:00:00",
  "endTime": "11:00:00",
  "classroom": "A教室",
  "topic": "变量和数据类型",
  "periods": 2
}

Response:
{
  "success": true,
  "data": {
    "id": 2,
    "classId": 1,
    "scheduleDate": "2025-01-21",
    "createTime": "2025-01-20T10:30:00"
  }
}
```

### 7.4 批量排课
```
POST /api/schedules/batch
Authorization: Bearer {token}
Content-Type: application/json

{
  "classId": 1,
  "courseId": 1,
  "teacherId": 1,
  "startDate": "2025-01-20",
  "endDate": "2025-02-28",
  "startTime": "09:00:00",
  "endTime": "11:00:00",
  "classroom": "A教室",
  "periods": 2,
  "repeatType": 1,
  "repeatDays": [6, 7]
}

Response:
{
  "success": true,
  "data": {
    "count": 12,
    "message": "成功创建12条排课记录"
  }
}
```

### 7.5 更新排课信息
```
PUT /api/schedules/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "startTime": "10:00:00",
  "endTime": "12:00:00",
  "classroom": "B教室",
  "topic": "函数和模块"
}

Response:
{
  "success": true,
  "data": {
    "id": 1,
    "updateTime": "2025-01-20T10:30:00"
  }
}
```

### 7.6 删除排课
```
DELETE /api/schedules/{id}
Authorization: Bearer {token}

Response:
{
  "success": true,
  "message": "排课删除成功"
}
```

### 7.7 检查排课冲突
```
POST /api/schedules/check-conflict
Authorization: Bearer {token}
Content-Type: application/json

{
  "teacherId": 1,
  "scheduleDate": "2025-01-20",
  "startTime": "09:00:00",
  "endTime": "11:00:00",
  "classroom": "A教室"
}

Response:
{
  "success": true,
  "data": {
    "hasConflict": false,
    "conflicts": []
  }
}
```

---

## 💰 8. 财务管理模块

### 8.1 获取财务记录列表
```
GET /api/finance?page=1&size=10&type=income&category=tuition&startDate=2025-01-01&endDate=2025-01-31
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": {
    "records": [
      {
        "id": 1,
        "date": "2025-01-15",
        "type": "income",
        "category": "tuition",
        "categoryName": "学费",
        "amount": 3600.00,
        "relatedId": "class_1",
        "relatedName": "Python-A班",
        "description": "张三学费缴纳",
        "createdBy": "管理员",
        "status": "approved",
        "createTime": "2025-01-15T10:30:00"
      }
    ],
    "total": 20,
    "current": 1,
    "size": 10
  }
}
```

### 8.2 添加财务记录
```
POST /api/finance
Authorization: Bearer {token}
Content-Type: application/json

{
  "date": "2025-01-20",
  "type": "income",
  "category": "tuition",
  "amount": 3600.00,
  "relatedId": "class_1",
  "relatedName": "Python-A班",
  "description": "李四学费缴纳",
  "remark": "现金支付"
}

Response:
{
  "success": true,
  "data": {
    "id": 2,
    "date": "2025-01-20",
    "amount": 3600.00,
    "createTime": "2025-01-20T10:30:00"
  }
}
```

### 8.3 更新财务记录
```
PUT /api/finance/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "approved",
  "remark": "已审核通过"
}

Response:
{
  "success": true,
  "data": {
    "id": 1,
    "status": "approved",
    "updateTime": "2025-01-20T10:30:00"
  }
}
```

### 8.4 删除财务记录
```
DELETE /api/finance/{id}
Authorization: Bearer {token}

Response:
{
  "success": true,
  "message": "财务记录删除成功"
}
```

### 8.5 获取财务统计
```
GET /api/finance/statistics?year=2025&month=1
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": {
    "monthlyIncome": 28800.00,
    "monthlyExpense": 15000.00,
    "monthlyBalance": 13800.00,
    "yearlyIncome": 150000.00,
    "yearlyExpense": 80000.00,
    "yearlyBalance": 70000.00,
    "categoryStats": {
      "income": {
        "tuition": 25000.00,
        "textbook": 3800.00
      },
      "expense": {
        "salary": 12000.00,
        "rent": 3000.00
      }
    }
  }
}
```

---

## 📢 9. 通知公告模块

### 9.1 获取通知列表
```
GET /api/notifications?page=1&size=10&type=system&read=false
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": {
    "records": [
      {
        "id": 1,
        "title": "系统更新通知",
        "content": "系统将于今晚22:00进行维护更新",
        "time": "2025-01-20T10:30:00",
        "read": false,
        "type": "system",
        "important": false,
        "createTime": "2025-01-20T10:30:00"
      }
    ],
    "total": 5,
    "current": 1,
    "size": 10
  }
}
```

### 9.2 标记通知已读
```
PUT /api/notifications/{id}/read
Authorization: Bearer {token}

Response:
{
  "success": true,
  "message": "通知已标记为已读"
}
```

### 9.3 标记所有通知已读
```
PUT /api/notifications/read/all
Authorization: Bearer {token}

Response:
{
  "success": true,
  "message": "所有通知已标记为已读"
}
```

### 9.4 删除通知
```
DELETE /api/notifications/{id}
Authorization: Bearer {token}

Response:
{
  "success": true,
  "message": "通知删除成功"
}
```

### 9.5 获取未读通知数量
```
GET /api/notifications/unread/count
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": {
    "count": 3
  }
}
```

### 9.6 获取系统公告列表
```
GET /api/notices?page=1&size=10&important=true
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": {
    "records": [
      {
        "id": 1,
        "title": "系统维护通知",
        "content": "系统将于本周六凌晨2:00-4:00进行维护升级",
        "author": "系统管理员",
        "important": true,
        "status": "published",
        "createTime": "2025-01-20T10:30:00"
      }
    ],
    "total": 3,
    "current": 1,
    "size": 10
  }
}
```

### 9.7 添加系统公告
```
POST /api/notices
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "新课程上线通知",
  "content": "人工智能入门课程已正式上线",
  "important": false
}

Response:
{
  "success": true,
  "data": {
    "id": 2,
    "title": "新课程上线通知",
    "createTime": "2025-01-20T10:30:00"
  }
}
```

### 9.8 更新系统公告
```
PUT /api/notices/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "新课程上线通知（更新）",
  "content": "人工智能入门课程已正式上线，欢迎报名",
  "important": true
}

Response:
{
  "success": true,
  "data": {
    "id": 1,
    "title": "新课程上线通知（更新）",
    "updateTime": "2025-01-20T10:30:00"
  }
}
```

### 9.9 删除系统公告
```
DELETE /api/notices/{id}
Authorization: Bearer {token}

Response:
{
  "success": true,
  "message": "公告删除成功"
}
```

---

## 📊 10. 统计分析模块

### 10.1 获取仪表板统计数据
```
GET /api/dashboard/stats
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": {
    "newStudents": 8,
    "coursesCount": 5,
    "teachersCount": 5,
    "monthlyIncome": 28800.00,
    "classesCount": 3,
    "schedulesCount": 25,
    "studentTrend": [
      { "month": "1月", "count": 15 },
      { "month": "2月", "count": 18 },
      { "month": "3月", "count": 22 }
    ],
    "incomeTrend": [
      { "month": "1月", "income": 15000 },
      { "month": "2月", "income": 18000 },
      { "month": "3月", "income": 22000 }
    ],
    "teacherCourseData": [
      { "name": "张老师", "courses": 3 },
      { "name": "李老师", "courses": 2 }
    ]
  }
}
```

### 10.2 获取学生统计数据
```
GET /api/statistics/students?startDate=2025-01-01&endDate=2025-01-31
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": {
    "totalStudents": 50,
    "newStudents": 8,
    "activeStudents": 45,
    "gradeDistribution": {
      "小学": 15,
      "初中": 20,
      "高中": 15
    },
    "levelDistribution": {
      "初级": 30,
      "中级": 15,
      "高级": 5
    }
  }
}
```

### 10.3 获取课程统计数据
```
GET /api/statistics/courses
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": {
    "totalCourses": 5,
    "activeCourses": 4,
    "categoryDistribution": {
      "编程基础": 3,
      "前沿技术": 1,
      "前端开发": 1
    },
    "popularCourses": [
      { "id": 1, "name": "Python基础入门", "students": 15 },
      { "id": 2, "name": "Java程序设计", "students": 12 }
    ]
  }
}
```

---

## 🔧 11. 系统管理模块

### 11.1 健康检查
```
GET /api/health

Response:
{
  "status": "ok",
  "timestamp": "2025-01-20T10:30:00.000Z",
  "services": {
    "database": "ok",
    "redis": "ok"
  }
}
```

### 11.2 获取系统设置
```
GET /api/settings
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": {
    "basic": {
      "siteName": "青少年编程管理系统",
      "siteDescription": "专业的编程教育管理平台",
      "enableRegistration": false,
      "maxStudentsPerClass": 30
    },
    "security": {
      "enableTwoFactor": false,
      "sessionTimeout": 30,
      "maxLoginAttempts": 5
    },
    "notification": {
      "enableEmail": true,
      "enableSms": false,
      "enablePush": true
    }
  }
}
```

### 11.3 更新系统设置
```
PUT /api/settings
Authorization: Bearer {token}
Content-Type: application/json

{
  "basic": {
    "maxStudentsPerClass": 25
  },
  "security": {
    "sessionTimeout": 60
  }
}

Response:
{
  "success": true,
  "message": "系统设置更新成功"
}
```

---

## 📁 12. 文件管理模块

### 12.1 文件上传
```
POST /api/files/upload
Authorization: Bearer {token}
Content-Type: multipart/form-data

Form Data:
- file: (file)
- type: avatar|cover|document

Response:
{
  "success": true,
  "data": {
    "url": "https://example.com/files/image-123.jpg",
    "filename": "image-123.jpg",
    "size": 1024576,
    "type": "image/jpeg"
  }
}
```

### 12.2 文件删除
```
DELETE /api/files/{filename}
Authorization: Bearer {token}

Response:
{
  "success": true,
  "message": "文件删除成功"
}
```

---

## 🎯 13. 重要注意事项

### 13.1 认证要求
- 除了登录、验证码、健康检查接口外，所有接口都需要JWT认证
- Token有效期为2小时，需要实现刷新机制
- 需要实现基于角色的权限控制

### 13.2 数据验证
- 所有输入参数都需要进行校验
- 手机号、邮箱等需要格式验证
- 金额字段需要精度控制（2位小数）
- 日期时间需要格式统一

### 13.3 异常处理
- 需要统一的异常处理机制
- 错误信息要友好且有意义
- 需要记录详细的错误日志

### 13.4 性能要求
- 列表查询需要支持分页
- 热点数据需要缓存
- 数据库查询需要优化
- 接口响应时间控制在500ms内

### 13.5 安全要求
- 密码需要加密存储
- 需要防SQL注入
- 需要防XSS攻击
- 需要实现请求频率限制

---

## 📚 附录

### A. 数据字典

#### A.1 用户角色枚举
```
ADMIN - 管理员
TEACHER - 教师  
STUDENT - 学生
```

#### A.2 性别枚举
```
0 - 女
1 - 男
```

#### A.3 状态枚举
```
0 - 禁用/离职/退学/下架
1 - 启用/在职/在读/上架
```

#### A.4 财务类型枚举
```
income - 收入
expense - 支出
```

#### A.5 财务分类枚举
```收入类：
tuition - 学费
textbook - 教材费
activity - 活动费
other_income - 其他收入

支出类：
salary - 工资
rent - 租金
utility - 水电费
equipment - 设备采购
other_expense - 其他支出
```

#### A.6 课程难度枚举
```
初级 - 适合零基础学员
中级 - 需要一定基础
高级 - 需要较强基础
```

### B. 错误码对照表

```
200 - 成功
400 - 请求参数错误
401 - 未授权
403 - 无权限
404 - 资源不存在
500 - 服务器内部错误
1001 - 用户名或密码错误
1002 - 验证码错误
1003 - Token无效
1004 - Token过期
2001 - 手机号格式错误
2002 - 邮箱格式错误
2003 - 数据已存在
2004 - 数据不存在
```

---

**文档版本**: v1.0  
**最后更新**: 2025年1月  
**联系方式**: adilei.shujin@gmail.com 