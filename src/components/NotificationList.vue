<template>
  <div class="notification-container">
    <el-empty v-if="!notifications || notifications.length === 0" description="暂无消息" />
    <div v-else class="notification-list">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        class="notification-item"
        :class="{ 'notification-unread': !notification.isRead }"
        @click="$emit('view', notification)"
      >
        <div class="list-notice-title-flex">
          <span class="notice-title-text">{{ notification.title }}</span>
          <span class="notice-right">
            <el-tag v-if="notification.important" type="danger" size="small" class="important-tag">重要</el-tag>
            <el-tooltip content="编辑消息" v-if="isAdmin">
              <el-button circle size="small" type="primary" class="notice-btn" @click.stop="handleEdit($event, notification)">
                <el-icon><Edit /></el-icon>
              </el-button>
            </el-tooltip>
            <el-tooltip content="删除消息" v-if="isAdmin">
              <el-button circle size="small" type="danger" class="notice-btn" @click.stop="handleDelete($event, notification)">
                <el-icon><Delete /></el-icon>
              </el-button>
            </el-tooltip>
          </span>
        </div>
        <div class="notification-content">{{ notification.content }}</div>
        <div class="notification-time">{{ notification.createTime }}</div>
      </div>
    </div>
    
    <div class="pagination-container" v-if="notifications && notifications.length > 0">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
        :current-page="currentPage"
        @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { Edit, Delete } from '@element-plus/icons-vue'

const props = defineProps({
  notifications: {
    type: Array,
    default: () => []
  },
  total: {
    type: Number,
    default: 0
  },
  currentPage: {
    type: Number,
    default: 1
  },
  pageSize: {
    type: Number,
    default: 10
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['view', 'page-change', 'edit', 'delete']);

const handlePageChange = (page) => {
  emit('page-change', page);
};

const handleEdit = (e, notification) => {
  e.stopPropagation();
  emit('edit', notification);
}
const handleDelete = (e, notification) => {
  e.stopPropagation();
  emit('delete', notification.id);
}
</script>

<style scoped>
.notification-container {
  padding: 10px 0;
}

.notification-list {
  margin-bottom: 20px;
}

.notification-item {
  padding: 15px;
  border-bottom: 1px solid #ebeef5;
  cursor: pointer;
  transition: background-color 0.3s;
}

.notification-item:hover {
  background-color: #f5f7fa;
}

.notification-title {
  font-weight: bold;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.notification-content {
  color: #606266;
  margin-bottom: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.notification-time {
  color: #909399;
  font-size: 12px;
}

.notification-unread {
  background-color: #ecf5ff;
}

.notification-unread:hover {
  background-color: #e6f1ff;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.list-notice-title-flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.notice-title-text {
  flex: 1;
  font-size: 16px;
  color: #303133;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 4px;
}
.notice-right {
  display: flex;
  align-items: center;
  gap: 4px;
}
.important-tag {
  margin-right: 2px;
}
.notice-btn {
  transition: background 0.2s, color 0.2s;
  padding: 0 2px;
}
.notice-btn :deep(.el-icon) {
  font-size: 16px;
}
.notice-btn:hover {
  filter: brightness(1.2);
}
</style> 