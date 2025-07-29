<template>
  <div class="finance-approval">
    <el-card class="approval-card">
      <template #header>
        <div class="card-header">
          <span>财务审批</span>
          <el-tag type="warning" v-if="pendingCount > 0">{{ pendingCount }} 条待审核</el-tag>
        </div>
      </template>
      
      <!-- 审批统计 -->
      <el-row :gutter="16" class="stat-row">
        <el-col :span="8">
          <el-card shadow="hover" class="stat-card pending">
            <div class="stat-title">待审核</div>
            <div class="stat-value">{{ pendingCount }}</div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover" class="stat-card approved">
            <div class="stat-title">已通过</div>
            <div class="stat-value">{{ approvedCount }}</div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover" class="stat-card rejected">
            <div class="stat-title">已拒绝</div>
            <div class="stat-value">{{ rejectedCount }}</div>
          </el-card>
        </el-col>
      </el-row>
      
      <!-- 筛选条件 -->
      <el-form :inline="true" :model="filterForm" class="filter-form">
        <el-form-item label="状态">
          <el-select v-model="filterForm.status" placeholder="全部状态" clearable>
            <el-option label="待审核" value="pending" />
            <el-option label="已通过" value="approved" />
            <el-option label="已拒绝" value="rejected" />
          </el-select>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="filterForm.type" placeholder="全部类型" clearable>
            <el-option label="收入" value="income" />
            <el-option label="支出" value="expense" />
          </el-select>
        </el-form-item>
        <el-form-item label="金额范围">
          <el-input-number v-model="filterForm.minAmount" placeholder="最小金额" style="width: 120px" />
          <span style="margin: 0 8px">-</span>
          <el-input-number v-model="filterForm.maxAmount" placeholder="最大金额" style="width: 120px" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleFilter">筛选</el-button>
          <el-button @click="resetFilter">重置</el-button>
        </el-form-item>
      </el-form>
      
      <!-- 审批列表 -->
      <el-table
        v-loading="loading"
        :data="filteredRecords"
        stripe
        style="width: 100%"
      >
        <el-table-column prop="id" label="ID" width="60" />
        <el-table-column prop="date" label="日期" width="120" />
        <el-table-column prop="type" label="类型" width="80">
          <template #default="{ row }">
            <el-tag :type="row.type === 'income' ? 'success' : 'danger'" size="small">
              {{ row.type === 'income' ? '收入' : '支出' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="categoryName" label="类别" width="100" />
        <el-table-column prop="amount" label="金额" width="120">
          <template #default="{ row }">
            <span :class="row.type === 'income' ? 'income-text' : 'expense-text'">
              {{ row.type === 'income' ? '+' : '-' }} ¥{{ formatPrice(row.amount) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="relatedName" label="关联对象" width="120" />
        <el-table-column prop="description" label="描述" />
        <el-table-column prop="createdBy" label="申请人" width="100" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)" size="small">
              {{ getStatusText(row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button 
              v-if="row.status === 'pending'"
              type="success" 
              size="small" 
              @click="approveRecord(row)"
            >
              通过
            </el-button>
            <el-button 
              v-if="row.status === 'pending'"
              type="danger" 
              size="small" 
              @click="rejectRecord(row)"
            >
              拒绝
            </el-button>
            <el-button 
              type="primary" 
              size="small" 
              @click="viewDetail(row)"
            >
              详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="filteredRecords.length"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
    
    <!-- 拒绝原因对话框 -->
    <el-dialog v-model="rejectDialogVisible" title="拒绝原因" width="500px">
      <el-form :model="rejectForm" label-width="80px">
        <el-form-item label="拒绝原因" required>
          <el-select v-model="rejectForm.reason" placeholder="请选择拒绝原因" style="width: 100%">
            <el-option label="金额不合理" value="amount_unreasonable" />
            <el-option label="类别错误" value="category_error" />
            <el-option label="信息不完整" value="incomplete_info" />
            <el-option label="重复申请" value="duplicate_application" />
            <el-option label="其他原因" value="other" />
          </el-select>
        </el-form-item>
        <el-form-item label="详细说明">
          <el-input 
            v-model="rejectForm.detail" 
            type="textarea" 
            :rows="4" 
            placeholder="请详细说明拒绝原因"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="rejectDialogVisible = false">取消</el-button>
        <el-button type="danger" @click="confirmReject">确认拒绝</el-button>
      </template>
    </el-dialog>
    
    <!-- 详情对话框 -->
    <el-dialog v-model="detailDialogVisible" title="财务记录详情" width="600px">
      <div v-if="selectedRecord" class="detail-content">
        <el-descriptions :column="2" border>
          <el-descriptions-item label="记录ID">{{ selectedRecord.id }}</el-descriptions-item>
          <el-descriptions-item label="申请日期">{{ selectedRecord.date }}</el-descriptions-item>
          <el-descriptions-item label="类型">
            <el-tag :type="selectedRecord.type === 'income' ? 'success' : 'danger'">
              {{ selectedRecord.type === 'income' ? '收入' : '支出' }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="类别">{{ selectedRecord.categoryName }}</el-descriptions-item>
          <el-descriptions-item label="金额">
            <span :class="selectedRecord.type === 'income' ? 'income-text' : 'expense-text'">
              {{ selectedRecord.type === 'income' ? '+' : '-' }} ¥{{ formatPrice(selectedRecord.amount) }}
            </span>
          </el-descriptions-item>
          <el-descriptions-item label="关联对象">{{ selectedRecord.relatedName || '无' }}</el-descriptions-item>
          <el-descriptions-item label="申请人">{{ selectedRecord.createdBy }}</el-descriptions-item>
          <el-descriptions-item label="状态">
            <el-tag :type="getStatusType(selectedRecord.status)" size="small">
              {{ getStatusText(selectedRecord.status) }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="描述" :span="2">{{ selectedRecord.description }}</el-descriptions-item>
          <el-descriptions-item v-if="selectedRecord.remark" label="备注" :span="2">{{ selectedRecord.remark }}</el-descriptions-item>
        </el-descriptions>
      </div>
      <template #footer>
        <el-button @click="detailDialogVisible = false">关闭</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useFinanceDataStore } from '../stores/financeData';

// 获取财务数据存储
const financeStore = useFinanceDataStore();

// 响应式数据
const loading = ref(false);
const currentPage = ref(1);
const pageSize = ref(10);
const rejectDialogVisible = ref(false);
const detailDialogVisible = ref(false);
const selectedRecord = ref(null);
const currentRejectRecord = ref(null);

// 筛选表单
const filterForm = reactive({
  status: '',
  type: '',
  minAmount: null,
  maxAmount: null,
});

// 拒绝表单
const rejectForm = reactive({
  reason: '',
  detail: '',
});

// 计算属性
const pendingCount = computed(() => {
  const records = financeStore.getFinanceRecords || [];
  return records.filter(item => item.status === 'pending').length;
});

const approvedCount = computed(() => {
  const records = financeStore.getFinanceRecords || [];
  return records.filter(item => item.status === 'approved').length;
});

const rejectedCount = computed(() => {
  const records = financeStore.getFinanceRecords || [];
  return records.filter(item => item.status === 'rejected').length;
});

const filteredRecords = computed(() => {
  let records = financeStore.getFinanceRecords || [];
  
  if (filterForm.status) {
    records = records.filter(item => item.status === filterForm.status);
  }
  
  if (filterForm.type) {
    records = records.filter(item => item.type === filterForm.type);
  }
  
  if (filterForm.minAmount !== null) {
    records = records.filter(item => item.amount >= filterForm.minAmount);
  }
  
  if (filterForm.maxAmount !== null) {
    records = records.filter(item => item.amount <= filterForm.maxAmount);
  }
  
  return records;
});

// 格式化金额
const formatPrice = (price) => {
  return parseFloat(price).toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

// 获取状态类型和文本
const getStatusType = (status) => {
  const statusMap = {
    'pending': 'warning',
    'approved': 'success',
    'rejected': 'danger',
  };
  return statusMap[status] || 'info';
};

const getStatusText = (status) => {
  const statusMap = {
    'pending': '待审核',
    'approved': '已通过',
    'rejected': '已拒绝',
  };
  return statusMap[status] || '未知';
};

// 筛选处理
const handleFilter = () => {
  currentPage.value = 1;
};

const resetFilter = () => {
  Object.keys(filterForm).forEach(key => {
    filterForm[key] = null;
  });
  currentPage.value = 1;
};

// 分页处理
const handleSizeChange = (size) => {
  pageSize.value = size;
  currentPage.value = 1;
};

const handleCurrentChange = (page) => {
  currentPage.value = page;
};

// 审批操作
const approveRecord = async (record) => {
  try {
    ElMessageBox.confirm(
      `确认通过该${record.type === 'income' ? '收入' : '支出'}记录吗？\n金额：¥${formatPrice(record.amount)}`,
      '确认审批',
      {
        confirmButtonText: '确认通过',
        cancelButtonText: '取消',
        type: 'success',
      }
    ).then(async () => {
      const success = financeStore.approveRecord(record.id);
      if (success) {
        ElMessage.success('审批通过成功');
      } else {
        ElMessage.error('审批失败');
      }
    }).catch(() => {});
  } catch (error) {
    console.error('审批失败:', error);
    ElMessage.error('审批失败');
  }
};

const rejectRecord = (record) => {
  currentRejectRecord.value = record;
  rejectForm.reason = '';
  rejectForm.detail = '';
  rejectDialogVisible.value = true;
};

const confirmReject = async () => {
  if (!rejectForm.reason) {
    ElMessage.warning('请选择拒绝原因');
    return;
  }
  
  try {
    const reasonText = rejectForm.detail || rejectForm.reason;
    const success = financeStore.rejectRecord(currentRejectRecord.value.id, reasonText);
    
    if (success) {
      ElMessage.success('拒绝成功');
      rejectDialogVisible.value = false;
    } else {
      ElMessage.error('拒绝失败');
    }
  } catch (error) {
    console.error('拒绝失败:', error);
    ElMessage.error('拒绝失败');
  }
};

// 查看详情
const viewDetail = (record) => {
  selectedRecord.value = record;
  detailDialogVisible.value = true;
};

// 页面加载
onMounted(() => {
  // 组件加载时的初始化逻辑
});
</script>

<style scoped>
.finance-approval {
  padding: 20px;
}

.approval-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stat-row {
  margin-bottom: 20px;
}

.stat-card {
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.stat-title {
  font-size: 16px;
  color: #606266;
  margin-bottom: 10px;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
}

.pending {
  background: linear-gradient(135deg, #fdf6ec 0%, #faecd8 100%);
}

.approved {
  background: linear-gradient(135deg, #f0f9eb 0%, #e1f3d8 100%);
}

.rejected {
  background: linear-gradient(135deg, #fef0f0 0%, #fde2e2 100%);
}

.filter-form {
  margin-bottom: 20px;
  padding: 20px;
  background: #f5f7fa;
  border-radius: 8px;
}

.income-text {
  color: #67c23a;
  font-weight: bold;
}

.expense-text {
  color: #f56c6c;
  font-weight: bold;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.detail-content {
  padding: 20px 0;
}
</style> 