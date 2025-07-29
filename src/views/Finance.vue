<template>
  <div class="finance-page-container">
    <!-- 现代化页面头部 -->
    <div class="page-header modern-card">
      <div class="header-content">
        <div class="header-left">
          <div class="page-title">
            <div class="title-icon">
              <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
                <path d="M11.8,10.9C9.53,10.31 8.8,9.7 8.8,8.75C8.8,7.66 9.81,6.9 11.5,6.9C13.28,6.9 13.94,7.75 14,9H16.21C16.14,7.28 15.09,5.7 13,5.19V3H10V5.16C8.06,5.58 6.5,6.84 6.5,8.77C6.5,11.08 8.41,12.23 11.2,12.9C13.7,13.5 14.2,14.38 14.2,15.31C14.2,16 13.71,17.1 11.5,17.1C9.44,17.1 8.63,16.18 8.5,15H6.32C6.44,17.19 8.08,18.42 10,18.83V21H13V18.85C14.95,18.5 16.5,17.35 16.5,15.3C16.5,12.46 14.07,11.5 11.8,10.9Z"/>
              </svg>
            </div>
            <div class="title-text">
              <h1>财务管理</h1>
              <p class="page-subtitle">实时监控财务状况，智能分析收支数据</p>
            </div>
          </div>
        </div>
        <div class="header-actions">
          <el-button type="info" class="modern-btn info" @click="exportFinanceData">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
            </svg>
            导出报表
          </el-button>
          <el-button type="warning" class="modern-btn warning" @click="showBudgetDialog = true">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z"/>
            </svg>
            预算设置
          </el-button>
          <el-button type="primary" class="modern-btn primary" @click="dialogVisible = true">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"/>
            </svg>
            新增记录
          </el-button>
        </div>
      </div>
    </div>

    <!-- 现代化统计概览 -->
    <div class="stats-overview">
      <div class="stats-grid">
        <div class="stat-card income-card fade-in-up">
          <div class="stat-header">
            <div class="stat-icon income-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M16,6L18.29,8.29L13.41,13.17L9.41,9.17L2,16.59L3.41,18L9.41,12L13.41,16L19.71,9.71L22,12V6H16Z"/>
              </svg>
            </div>
            <div class="trend-badge positive">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
              </svg>
              +{{ formatPrice(monthlyIncomeGrowth) }}
            </div>
          </div>
          <div class="stat-body">
            <div class="stat-title">本月收入</div>
            <div class="stat-value">¥{{ formatPrice(monthlyIncome) }}</div>
            <div class="stat-description">较上月增长</div>
          </div>
        </div>

        <div class="stat-card expense-card fade-in-up" style="animation-delay: 0.1s">
          <div class="stat-header">
            <div class="stat-icon expense-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M16,18L18.29,15.71L13.41,10.83L9.41,14.83L2,7.41L3.41,6L9.41,12L13.41,8L19.71,14.29L22,12V18H16Z"/>
              </svg>
            </div>
            <div class="trend-badge negative">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <path d="M16 18l2.29-2.29-4.88-4.88-4 4L2 7.41 3.41 6l6 6 4-4 6.3 6.29L22 12v6z"/>
              </svg>
              -{{ formatPrice(monthlyExpenseGrowth) }}
            </div>
          </div>
          <div class="stat-body">
            <div class="stat-title">本月支出</div>
            <div class="stat-value">¥{{ formatPrice(monthlyExpense) }}</div>
            <div class="stat-description">较上月变化</div>
          </div>
        </div>

        <div class="stat-card balance-card fade-in-up" style="animation-delay: 0.2s">
          <div class="stat-header">
            <div class="stat-icon balance-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M15.5,8A0.5,0.5 0 0,1 16,8.5V9.5A0.5,0.5 0 0,1 15.5,10H14.5A0.5,0.5 0 0,1 14,9.5V8.5A0.5,0.5 0 0,1 14.5,8H15.5M9.5,8A0.5,0.5 0 0,1 10,8.5V9.5A0.5,0.5 0 0,1 9.5,10H8.5A0.5,0.5 0 0,1 8,9.5V8.5A0.5,0.5 0 0,1 8.5,8H9.5M12,14C13.11,14 14,14.89 14,16V17C14,18.11 13.11,19 12,19C10.89,19 10,18.11 10,17V16C10,14.89 10.89,14 12,14Z"/>
              </svg>
            </div>
            <div class="trend-badge" :class="monthlyBalance >= 0 ? 'positive' : 'negative'">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <path v-if="monthlyBalance >= 0" d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
                <path v-else d="M16 18l2.29-2.29-4.88-4.88-4 4L2 7.41 3.41 6l6 6 4-4 6.3 6.29L22 12v6z"/>
              </svg>
              {{ monthlyBalance >= 0 ? '+' : '' }}{{ formatPrice(Math.abs(monthlyBalance)) }}
            </div>
          </div>
          <div class="stat-body">
            <div class="stat-title">本月结余</div>
            <div class="stat-value" :class="monthlyBalance >= 0 ? 'positive-value' : 'negative-value'">
              ¥{{ formatPrice(Math.abs(monthlyBalance)) }}
            </div>
            <div class="stat-description">净收入</div>
          </div>
        </div>

        <div class="stat-card profit-card fade-in-up" style="animation-delay: 0.3s">
          <div class="stat-header">
            <div class="stat-icon profit-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M12,2C13.1,2 14,2.9 14,4C14,5.1 13.1,6 12,6C10.9,6 10,5.1 10,4C10,2.9 10.9,2 12,2M21,9V7L15,1H5A2,2 0 0,0 3,3V21A2,2 0 0,0 5,23H19A2,2 0 0,0 21,21V9M19,9H14V4H19V9Z"/>
              </svg>
            </div>
            <div class="trend-badge" :class="profitMargin >= 0 ? 'positive' : 'negative'">
              {{ profitMargin >= 0 ? '+' : '' }}{{ profitMargin }}%
            </div>
          </div>
          <div class="stat-body">
            <div class="stat-title">利润率</div>
            <div class="stat-value">{{ profitMargin }}%</div>
            <div class="stat-description">收入占比</div>
          </div>
        </div>

        <div class="stat-card pending-card fade-in-up" style="animation-delay: 0.4s">
          <div class="stat-header">
            <div class="stat-icon pending-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z"/>
              </svg>
            </div>
            <div class="pending-count">{{ pendingCount }}</div>
          </div>
          <div class="stat-body">
            <div class="stat-title">待审核</div>
            <div class="stat-value">{{ pendingCount }}笔</div>
            <div class="stat-description">待处理记录</div>
          </div>
        </div>

        <div class="stat-card total-card fade-in-up" style="animation-delay: 0.5s">
          <div class="stat-header">
            <div class="stat-icon total-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M9,7V9H7V7H9M11,15H13V17H11V15M11,11H13V13H11V11M11,7H13V9H11V7M15,15H17V17H15V15M15,11H17V13H15V11M15,7H17V9H15V7M7,15H9V17H7V15M7,11H9V13H7V11Z"/>
              </svg>
            </div>
            <div class="trend-badge positive">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
              </svg>
              +{{ formatPrice(yearlyGrowth) }}
            </div>
          </div>
          <div class="stat-body">
            <div class="stat-title">年度总收入</div>
            <div class="stat-value">¥{{ formatPrice(yearlyIncome) }}</div>
            <div class="stat-description">较去年增长</div>
          </div>
        </div>
      </div>
    </div>

        <!-- 财务图表可视化 -->
    <div class="charts-section">
      <div class="charts-grid">
        <!-- 收支趋势图 -->
        <div class="chart-card modern-card fade-in-up">
          <div class="chart-header">
            <div class="chart-title">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M16,6L18.29,8.29L13.41,13.17L9.41,9.17L2,16.59L3.41,18L9.41,12L13.41,16L19.71,9.71L22,12V6H16Z"/>
              </svg>
              <span>收支趋势分析</span>
            </div>
            <div class="chart-controls">
              <el-select v-model="chartPeriod" size="small" style="width: 120px">
                <el-option label="最近7天" value="week" />
                <el-option label="最近30天" value="month" />
                <el-option label="最近90天" value="quarter" />
                <el-option label="最近一年" value="year" />
              </el-select>
            </div>
          </div>
          <div class="chart-container">
            <v-chart 
              :option="trendChartOption" 
              :style="{ height: '300px' }" 
              autoresize
            />
          </div>
        </div>

        <!-- 收支分类饼图 -->
        <div class="chart-card modern-card fade-in-up" style="animation-delay: 0.1s">
          <div class="chart-header">
            <div class="chart-title">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M11,2V22C5.9,21.5 2,17.2 2,12C2,6.8 5.9,2.5 11,2M13,2V11H22C22,6.8 18.1,2.5 13,2M13,13V22C18.1,21.5 22,17.2 22,12H13Z"/>
              </svg>
              <span>支出分类分析</span>
            </div>
            <div class="chart-controls">
              <el-radio-group v-model="pieChartType" size="small">
                <el-radio-button label="expense">支出</el-radio-button>
                <el-radio-button label="income">收入</el-radio-button>
              </el-radio-group>
            </div>
          </div>
          <div class="chart-container">
            <v-chart 
              :option="pieChartOption" 
              :style="{ height: '300px' }" 
              autoresize
            />
          </div>
        </div>

        <!-- 月度对比分析 -->
        <div class="chart-card modern-card fade-in-up" style="animation-delay: 0.2s">
          <div class="chart-header">
            <div class="chart-title">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M22,21H2V3H4V19H6V10H10V19H12V6H16V19H18V14H22V21Z"/>
              </svg>
              <span>月度收支对比</span>
            </div>
            <div class="chart-info">
              <span class="chart-metric">
                本月净收入: <strong>¥{{ formatPrice(monthlyBalance) }}</strong>
              </span>
            </div>
          </div>
          <div class="chart-container">
            <v-chart 
              :option="barChartOption" 
              :style="{ height: '300px' }" 
              autoresize
            />
          </div>
        </div>

        <!-- 预算完成度 -->
        <div class="chart-card modern-card fade-in-up" style="animation-delay: 0.3s">
          <div class="chart-header">
            <div class="chart-title">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z"/>
              </svg>
              <span>预算执行情况</span>
            </div>
            <div class="chart-info">
              <span class="chart-metric">
                预算剩余: <strong>{{ getBudgetRemaining() }}%</strong>
              </span>
            </div>
          </div>
          <div class="chart-container">
            <div class="budget-progress-container">
              <div class="budget-item">
                <div class="budget-header">
                  <span class="budget-label">收入预算</span>
                  <span class="budget-value">{{ getBudgetProgress('income') }}%</span>
                </div>
                <el-progress 
                  :percentage="getBudgetProgress('income')" 
                  :color="getBudgetProgressColor('income')"
                  :stroke-width="12"
                />
                <div class="budget-detail">
                  ¥{{ formatPrice(monthlyIncome) }} / ¥{{ formatPrice(budgetForm.monthlyIncomeBudget || 50000) }}
                </div>
              </div>
              <div class="budget-item">
                <div class="budget-header">
                  <span class="budget-label">支出预算</span>
                  <span class="budget-value">{{ getBudgetProgress('expense') }}%</span>
                </div>
                <el-progress 
                  :percentage="getBudgetProgress('expense')" 
                  :color="getBudgetProgressColor('expense')"
                  :stroke-width="12"
                />
                <div class="budget-detail">
                  ¥{{ formatPrice(monthlyExpense) }} / ¥{{ formatPrice(budgetForm.monthlyExpenseBudget || 30000) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>





    <!-- 操作按钮区域 -->
    <el-card class="action-card">
      <div class="action-header">
        <h2>费用管理</h2>
        <div class="action-buttons">
          <el-button type="primary" @click="dialogVisible = true">
            <el-icon><Plus /></el-icon> 添加收支记录
          </el-button>
          <el-button type="success" @click="exportFinanceData">
            <el-icon><Download /></el-icon> 导出报表
          </el-button>
          <el-button type="warning" @click="showBudgetDialog = true">
            <el-icon><Setting /></el-icon> 预算设置
          </el-button>
        </div>
      </div>

      <!-- 标签页 -->
      <el-tabs v-model="activeTab" class="finance-tabs">
        <el-tab-pane label="财务记录" name="records">
          <div class="tab-content">
      
      <!-- 筛选表单 -->
      <el-form :inline="true" :model="queryParams" class="search-form">
            <el-form-item label="日期范围">
              <el-date-picker
                v-model="dateRange"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
              />
            </el-form-item>
            <el-form-item label="类型">
          <el-select v-model="queryParams.type" placeholder="全部类型" clearable>
                <el-option label="全部" value="" />
                <el-option label="收入" value="income" />
                <el-option label="支出" value="expense" />
              </el-select>
            </el-form-item>
            <el-form-item label="类别">
          <el-select v-model="queryParams.category" placeholder="全部类别" clearable>
                <el-option label="全部" value="" />
                <el-option v-for="category in categoryOptions" :key="category.value" :label="category.label" :value="category.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="金额范围">
          <el-input-number v-model="queryParams.minAmount" placeholder="最小金额" style="width: 120px" />
          <span style="margin: 0 8px">-</span>
          <el-input-number v-model="queryParams.maxAmount" placeholder="最大金额" style="width: 120px" />
            </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchRecords">查询</el-button>
          <el-button @click="resetQuery">重置</el-button>
        </el-form-item>
        </el-form>

      <!-- 数据表格 -->
        <el-table
          v-loading="loading"
          :data="paginatedFinanceList"
        stripe
          style="width: 100%"
      >
        <el-table-column prop="id" label="ID" width="60" />
        <el-table-column prop="date" label="日期" width="120" />
        <el-table-column prop="type" label="类型" width="90">
            <template #default="{ row }">
            <el-tag :type="row.type === 'income' ? 'success' : 'danger'">
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
        <el-table-column prop="createdBy" label="创建人" width="100" />
        <el-table-column prop="status" label="状态" width="80">
            <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)" size="small">
                {{ getStatusText(row.status) }}
              </el-tag>
            </template>
          </el-table-column>
        <el-table-column label="操作" width="180" fixed="right">
            <template #default="{ row }">
            <el-button link type="primary" size="small" @click="editRecord(row)">编辑</el-button>
            <el-button link type="success" size="small" @click="viewDetail(row)">详情</el-button>
            <el-button link type="danger" size="small" @click="confirmDelete(row)">删除</el-button>
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
          :total="filteredFinanceList.length"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
        </el-tab-pane>
        
        <el-tab-pane label="财务审批" name="approval">
          <div class="tab-content">
            <FinanceApproval />
  </div>
        </el-tab-pane>
        
        <el-tab-pane label="财务报表" name="reports">
          <div class="tab-content">
            <div class="report-section">
              <h3>财务报表</h3>
              <p>财务报表功能正在开发中...</p>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    
    <!-- 添加/编辑对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="formType === 'add' ? '添加收支记录' : '编辑收支记录'"
      width="700px"
    >
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="100px"
      >
        <el-row :gutter="16">
          <el-col :span="12">
        <el-form-item label="日期" prop="date">
          <el-date-picker
            v-model="form.date"
            type="date"
            placeholder="选择日期"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            style="width: 100%"
          />
        </el-form-item>
          </el-col>
          <el-col :span="12">
        <el-form-item label="类型" prop="type">
          <el-radio-group v-model="form.type">
            <el-radio label="income">收入</el-radio>
            <el-radio label="expense">支出</el-radio>
          </el-radio-group>
        </el-form-item>
          </el-col>
        </el-row>
        
        <el-row :gutter="16">
          <el-col :span="12">
        <el-form-item label="类别" prop="category">
          <el-select v-model="form.category" placeholder="请选择类别" style="width: 100%">
            <el-option-group label="收入类别" v-if="form.type === 'income'">
                  <el-option v-for="category in incomeCategories" :key="category.value" :label="category.label" :value="category.value" />
            </el-option-group>
            <el-option-group label="支出类别" v-else>
                  <el-option v-for="category in expenseCategories" :key="category.value" :label="category.label" :value="category.value" />
            </el-option-group>
          </el-select>
        </el-form-item>
          </el-col>
          <el-col :span="12">
        <el-form-item label="金额" prop="amount">
          <el-input-number v-model="form.amount" :min="0" :precision="2" :step="100" style="width: 100%" />
        </el-form-item>
          </el-col>
        </el-row>
        
        <el-row :gutter="16">
          <el-col :span="12">
        <el-form-item label="关联对象" prop="relatedId">
          <el-select 
            v-model="form.relatedId" 
            placeholder="请选择关联对象" 
            filterable
            clearable
            style="width: 100%"
          >
            <el-option-group label="班级" v-if="form.type === 'income'">
                  <el-option v-for="classItem in classOptions" :key="classItem.value" :label="classItem.label" :value="classItem.value" />
            </el-option-group>
            <el-option-group label="教师" v-else>
                  <el-option v-for="teacher in teacherOptions" :key="teacher.value" :label="teacher.label" :value="teacher.value" />
            </el-option-group>
          </el-select>
        </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" prop="status">
              <el-select v-model="form.status" placeholder="请选择状态" style="width: 100%">
                <el-option label="待审核" value="pending" />
                <el-option label="已通过" value="approved" />
                <el-option label="已拒绝" value="rejected" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-form-item label="描述" prop="description">
          <el-input v-model="form.description" type="textarea" :rows="3" />
        </el-form-item>
        
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" :rows="2" placeholder="可选备注信息" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm">确定</el-button>
      </template>
    </el-dialog>

    <!-- 预算设置对话框 -->
    <el-dialog v-model="showBudgetDialog" title="预算设置" width="600px">
      <el-form :model="budgetForm" label-width="120px">
        <el-form-item label="月度收入预算">
          <el-input-number v-model="budgetForm.monthlyIncomeBudget" :min="0" :precision="2" style="width: 100%" />
        </el-form-item>
        <el-form-item label="月度支出预算">
          <el-input-number v-model="budgetForm.monthlyExpenseBudget" :min="0" :precision="2" style="width: 100%" />
        </el-form-item>
        <el-form-item label="年度收入预算">
          <el-input-number v-model="budgetForm.yearlyIncomeBudget" :min="0" :precision="2" style="width: 100%" />
        </el-form-item>
        <el-form-item label="年度支出预算">
          <el-input-number v-model="budgetForm.yearlyExpenseBudget" :min="0" :precision="2" style="width: 100%" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showBudgetDialog = false">取消</el-button>
        <el-button type="primary" @click="saveBudget">保存</el-button>
      </template>
    </el-dialog>

    <!-- 详情查看对话框 -->
    <el-dialog v-model="detailDialogVisible" title="财务记录详情" width="500px">
      <div v-if="selectedRecord" class="detail-content">
        <div class="detail-item">
          <span class="detail-label">记录ID:</span>
          <span class="detail-value">{{ selectedRecord.id }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">日期:</span>
          <span class="detail-value">{{ selectedRecord.date }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">类型:</span>
          <el-tag :type="selectedRecord.type === 'income' ? 'success' : 'danger'">
            {{ selectedRecord.type === 'income' ? '收入' : '支出' }}
          </el-tag>
        </div>
        <div class="detail-item">
          <span class="detail-label">类别:</span>
          <span class="detail-value">{{ selectedRecord.categoryName }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">金额:</span>
          <span class="detail-value" :class="selectedRecord.type === 'income' ? 'income-text' : 'expense-text'">
            {{ selectedRecord.type === 'income' ? '+' : '-' }} ¥{{ formatPrice(selectedRecord.amount) }}
          </span>
        </div>
        <div class="detail-item">
          <span class="detail-label">关联对象:</span>
          <span class="detail-value">{{ selectedRecord.relatedName || '无' }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">描述:</span>
          <span class="detail-value">{{ selectedRecord.description }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">创建人:</span>
          <span class="detail-value">{{ selectedRecord.createdBy }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">状态:</span>
          <el-tag :type="getStatusType(selectedRecord.status)" size="small">
            {{ getStatusText(selectedRecord.status) }}
          </el-tag>
        </div>
      </div>
      <template #footer>
        <el-button @click="detailDialogVisible = false">关闭</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Plus, Download, Setting, TrendCharts, Money, Wallet, DataAnalysis, Clock, Histogram } from '@element-plus/icons-vue';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart, PieChart, BarChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, LegendComponent, TitleComponent } from 'echarts/components';
import VChart from 'vue-echarts';
import api from '../utils/api';
import { useFinanceDataStore } from '../stores/financeData';
import { useClassStore } from '../stores/class';
import { useTeacherStore } from '../stores/teacher';
import FinanceApproval from '../components/FinanceApproval.vue';

// 注册 ECharts 组件
use([CanvasRenderer, LineChart, PieChart, BarChart, GridComponent, TooltipComponent, LegendComponent, TitleComponent]);

// 获取财务数据存储
const financeStore = useFinanceDataStore();
const classStore = useClassStore();
const teacherStore = useTeacherStore();

// 数据加载状态
const loading = computed(() => financeStore.loading);

// 响应式数据
const activeTab = ref('records')
const dialogVisible = ref(false)
const detailDialogVisible = ref(false)
const showBudgetDialog = ref(false)
const formType = ref('add')
const formRef = ref()
const selectedRecord = ref(null)
const currentPage = ref(1)
const pageSize = ref(10)


// 查询参数
const dateRange = ref([])
const queryParams = reactive({
  type: null,
  category: null,
  startDate: '',
  endDate: '',
  minAmount: null,
  maxAmount: null
})

// 表单数据
const form = reactive({
  id: null,
  date: '',
  type: 'income',
  category: '',
  amount: 0,
  relatedId: '',
  relatedName: '',
  description: '',
  remark: '',
  status: 'pending'
})

// 预算表单
const budgetForm = reactive({
  monthlyIncomeBudget: 50000,
  monthlyExpenseBudget: 30000,
  yearlyIncomeBudget: 600000,
  yearlyExpenseBudget: 360000
})

// 表单验证规则
const rules = {
  date: [{ required: true, message: '请选择日期', trigger: 'change' }],
  type: [{ required: true, message: '请选择类型', trigger: 'change' }],
  category: [{ required: true, message: '请选择类别', trigger: 'change' }],
  amount: [{ required: true, message: '请输入金额', trigger: 'blur' }],
  status: [{ required: true, message: '请选择状态', trigger: 'change' }]
}

// 类别选项
const incomeCategories = [
  { label: '学费', value: 'tuition' },
  { label: '教材费', value: 'textbook' },
  { label: '活动费', value: 'activity' },
  { label: '其他收入', value: 'other_income' }
]

const expenseCategories = [
  { label: '工资', value: 'salary' },
  { label: '水电费', value: 'utility' },
  { label: '租金', value: 'rent' },
  { label: '教材采购', value: 'textbook_purchase' },
  { label: '设备维护', value: 'equipment' },
  { label: '其他支出', value: 'other_expense' }
]

// 班级和教师选项 - 使用真实数据
const classOptions = computed(() => {
  return (classStore.getClasses || []).map(cls => ({
    label: cls.name,
    value: cls.id
  }));
});

const teacherOptions = computed(() => {
  return (teacherStore.getTeachers || []).map(teacher => ({
    label: teacher.name,
    value: teacher.id
  }));
});

// 计算属性
const filteredFinanceList = computed(() => {
  let filteredList = financeStore.getFinanceRecords || [];
  
  if (queryParams.type) {
    filteredList = filteredList.filter(item => item.type === queryParams.type);
  }
  
  if (queryParams.category) {
    filteredList = filteredList.filter(item => item.category === queryParams.category);
  }
  
  if (queryParams.startDate && queryParams.endDate) {
    filteredList = filteredList.filter(item => {
      const date = new Date(item.date);
      const start = new Date(queryParams.startDate);
      const end = new Date(queryParams.endDate);
      return date >= start && date <= end;
    });
  }
  
  if (queryParams.minAmount !== null) {
    filteredList = filteredList.filter(item => item.amount >= queryParams.minAmount);
  }
  
  if (queryParams.maxAmount !== null) {
    filteredList = filteredList.filter(item => item.amount <= queryParams.maxAmount);
  }
  
  return filteredList;
});

const paginatedFinanceList = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filteredFinanceList.value.slice(start, end);
});

// 统计数据
const totalIncome = computed(() => {
  const records = financeStore.getFinanceRecords || [];
  const incomeRecords = records.filter(item => item.type === 'income');
  return incomeRecords.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
});

const totalExpense = computed(() => {
  const records = financeStore.getFinanceRecords || [];
  const expenseRecords = records.filter(item => item.type === 'expense');
  return expenseRecords.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
});

const monthlyIncome = computed(() => {
  const records = financeStore.getFinanceRecords || [];
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const monthlyRecords = records.filter(item => {
    const itemDate = new Date(item.date);
    const isCurrentMonth = item.type === 'income' && 
           itemDate.getMonth() === currentMonth && 
           itemDate.getFullYear() === currentYear;
    return isCurrentMonth;
  });
  
  return monthlyRecords.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
});

const monthlyExpense = computed(() => {
  const records = financeStore.getFinanceRecords || [];
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const monthlyRecords = records.filter(item => {
    const itemDate = new Date(item.date);
    const isCurrentMonth = item.type === 'expense' && 
           itemDate.getMonth() === currentMonth && 
           itemDate.getFullYear() === currentYear;
    return isCurrentMonth;
  });
  
  return monthlyRecords.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
});

const yearlyIncome = computed(() => {
  const records = financeStore.getFinanceRecords || [];
  const currentYear = new Date().getFullYear();
  
  const yearlyRecords = records.filter(item => {
    const itemDate = new Date(item.date);
    const isCurrentYear = item.type === 'income' && itemDate.getFullYear() === currentYear;
    return isCurrentYear;
  });
  
  return yearlyRecords.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
});

const yearlyExpense = computed(() => {
  const records = financeStore.getFinanceRecords || [];
  const currentYear = new Date().getFullYear();
  
  const yearlyRecords = records.filter(item => {
    const itemDate = new Date(item.date);
    const isCurrentYear = item.type === 'expense' && itemDate.getFullYear() === currentYear;
    return isCurrentYear;
  });
  
  return yearlyRecords.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
});

// 新增计算属性
const monthlyIncomeGrowth = computed(() => {
  // 模拟上月数据，实际应从历史数据获取
  const lastMonthIncome = monthlyIncome.value * 0.9; // 假设上月收入为当月的90%
  return monthlyIncome.value - lastMonthIncome;
});

const monthlyExpenseGrowth = computed(() => {
  // 模拟上月数据，实际应从历史数据获取
  const lastMonthExpense = monthlyExpense.value * 0.95; // 假设上月支出为当月的95%
  return monthlyExpense.value - lastMonthExpense;
});

const monthlyBalance = computed(() => {
  return monthlyIncome.value - monthlyExpense.value;
});

const profitMargin = computed(() => {
  const totalIncome = yearlyIncome.value;
  const totalExpense = yearlyExpense.value;
  if (totalIncome === 0) return 0;
  return Math.round(((totalIncome - totalExpense) / totalIncome) * 100);
});

const pendingCount = computed(() => {
  const records = financeStore.getFinanceRecords || [];
  return records.filter(item => item.status === 'pending').length;
});

const yearlyGrowth = computed(() => {
  // 模拟去年数据，实际应从历史数据获取
  const lastYearIncome = yearlyIncome.value * 0.8; // 假设去年收入为今年的80%
  return yearlyIncome.value - lastYearIncome;
});

// 获取预算剩余百分比
const getBudgetRemaining = () => {
  const currentMonthExpense = monthlyExpense.value;
  const monthlyBudget = budgetForm.monthlyExpenseBudget;
  
  if (monthlyBudget <= 0) return 100;
  
  const usedPercentage = (currentMonthExpense / monthlyBudget) * 100;
  const remainingPercentage = Math.max(0, 100 - usedPercentage);
  
  return Math.round(remainingPercentage * 10) / 10; // 保留一位小数
};

// 获取预算进度百分比
const getBudgetProgress = (type) => {
  if (type === 'income') {
    const currentMonthIncome = monthlyIncome.value;
    const monthlyIncomeTarget = budgetForm.monthlyIncomeBudget;
    
    if (monthlyIncomeTarget <= 0) return 0;
    
    const progressPercentage = (currentMonthIncome / monthlyIncomeTarget) * 100;
    return Math.min(100, Math.round(progressPercentage * 10) / 10);
  }
  
  if (type === 'expense') {
    const currentMonthExpense = monthlyExpense.value;
    const monthlyExpenseBudget = budgetForm.monthlyExpenseBudget;
    
    if (monthlyExpenseBudget <= 0) return 0;
    
    const progressPercentage = (currentMonthExpense / monthlyExpenseBudget) * 100;
    return Math.min(100, Math.round(progressPercentage * 10) / 10);
  }
  
  return 0;
};

// 获取预算进度颜色
const getBudgetProgressColor = (type) => {
  const progress = getBudgetProgress(type);
  
  if (type === 'income') {
    // 收入：越高越好（绿色）
    if (progress >= 90) return '#10b981'; // 绿色
    if (progress >= 70) return '#3b82f6'; // 蓝色
    if (progress >= 50) return '#f59e0b'; // 橙色
    return '#ef4444'; // 红色
  }
  
  if (type === 'expense') {
    // 支出：适中最好
    if (progress >= 90) return '#ef4444'; // 红色（超预算）
    if (progress >= 70) return '#f59e0b'; // 橙色（接近预算）
    if (progress >= 30) return '#10b981'; // 绿色（正常范围）
    return '#3b82f6'; // 蓝色（支出较少）
  }
  
  return '#6b7280'; // 默认灰色
};

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















// 获取财务记录列表
const getFinanceList = async () => {
  try {
    await financeStore.fetchFinanceRecords();
    
    // 确保其他相关数据也已加载
    if (!classStore.loaded) {
      await classStore.fetchClasses();
    }
    if (!teacherStore.loaded) {
      await teacherStore.fetchTeachers();
    }
  } catch (error) {
    ElMessage.error('获取财务记录列表失败');
  }
};

// 搜索记录
const searchRecords = () => {
  if (dateRange.value && dateRange.value.length === 2) {
    queryParams.startDate = dateRange.value[0];
    queryParams.endDate = dateRange.value[1];
  } else {
    queryParams.startDate = '';
    queryParams.endDate = '';
  }
  
  currentPage.value = 1;
  getFinanceList();
};

// 重置查询
const resetQuery = () => {
  dateRange.value = [];
  Object.keys(queryParams).forEach(key => {
    queryParams[key] = null;
  });
  
  currentPage.value = 1;
  getFinanceList();
};

// 处理分页变化
const handleSizeChange = (size) => {
  pageSize.value = size;
  currentPage.value = 1;
};

const handleCurrentChange = (page) => {
  currentPage.value = page;
};

// 编辑记录
const editRecord = (row) => {
  formType.value = 'edit';
  Object.keys(form).forEach(key => {
    form[key] = row[key] || '';
  });
  
  dialogVisible.value = true;
};

// 查看详情
const viewDetail = (row) => {
  selectedRecord.value = row;
  detailDialogVisible.value = true;
};

// 删除记录
const confirmDelete = (row) => {
  ElMessageBox.confirm('确认删除该记录吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    deleteRecord(row.id);
  }).catch(() => {});
};

const deleteRecord = async (id) => {
  try {
    await financeStore.deleteFinanceRecord(id);
      ElMessage.success('删除成功');
  } catch (error) {
    ElMessage.error('删除失败');
  }
};

// 提交表单
const submitForm = async () => {
  if (!formRef.value) return;
  
  await formRef.value.validate(async (valid) => {
    if (!valid) return;
    
    try {
      const recordData = {
        ...form,
        createdBy: '管理员',
        categoryName: getCategoryName(form.category),
        relatedName: getRelatedName(form.relatedId),
      };
      
      if (formType.value === 'add') {
        await financeStore.addFinanceRecord(recordData);
        ElMessage.success('添加成功');
        // 重新获取数据以确保列表更新
        await getFinanceList();
      } else {
        await financeStore.updateFinanceRecord(form.id, { ...recordData, status: recordData.status });
        ElMessage.success('更新成功');
        // 重新获取数据以确保列表更新
        await getFinanceList();
      }
      
      dialogVisible.value = false;
      resetForm();
    } catch (error) {
      ElMessage.error('保存失败');
    }
  });
};

// 获取类别名称
const getCategoryName = (category) => {
  const allCategories = [...incomeCategories, ...expenseCategories];
  const found = allCategories.find(c => c.value === category);
  return found ? found.label : '其他';
};

// 获取关联对象名称
const getRelatedName = (relatedId) => {
  const allOptions = [...classOptions.value, ...teacherOptions.value];
  const found = allOptions.find(o => o.value === relatedId);
  return found ? found.label : '';
};

// 重置表单
const resetForm = () => {
  form.id = null;
  form.date = '';
  form.type = 'income';
  form.category = '';
  form.amount = 0;
  form.relatedId = '';
  form.relatedName = '';
  form.description = '';
  form.status = 'pending';
  form.remark = '';
};

// 导出财务数据
const exportFinanceData = () => {
  // 这里应该实现实际的导出逻辑
  ElMessage.success('财务数据导出功能开发中...');
};

// 保存预算设置
const saveBudget = () => {
  // 这里应该实现实际的预算保存逻辑
  ElMessage.success('预算设置已保存');
  showBudgetDialog.value = false;
};

// 图表控制变量
const chartPeriod = ref('month')
const pieChartType = ref('expense')

// 收支趋势图表配置
const trendChartOption = computed(() => ({
  title: {
    text: '收支趋势分析',
    textStyle: {
      fontSize: 16,
      fontWeight: 'normal',
      color: '#333'
    }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  },
  legend: {
    data: ['收入', '支出', '净收益'],
    bottom: 0
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '15%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: '¥{value}'
    }
  },
  series: [
    {
      name: '收入',
      type: 'line',
      smooth: true,
      data: [8200, 9320, 9010, 11340, 12900, 15330, 17200, 16200, 14100, 13600, 12800, 14500],
      itemStyle: {
        color: '#10b981'
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [{
            offset: 0, color: 'rgba(16, 185, 129, 0.3)'
          }, {
            offset: 1, color: 'rgba(16, 185, 129, 0.05)'
          }]
        }
      }
    },
    {
      name: '支出',
      type: 'line',
      smooth: true,
      data: [6200, 7100, 6800, 8400, 9200, 10100, 11800, 10200, 9600, 9100, 8500, 9800],
      itemStyle: {
        color: '#ef4444'
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [{
            offset: 0, color: 'rgba(239, 68, 68, 0.3)'
          }, {
            offset: 1, color: 'rgba(239, 68, 68, 0.05)'
          }]
        }
      }
    },
    {
      name: '净收益',
      type: 'line',
      smooth: true,
      data: [2000, 2220, 2210, 2940, 3700, 5230, 5400, 6000, 4500, 4500, 4300, 4700],
      itemStyle: {
        color: '#3b82f6'
      }
    }
  ]
}))

// 饼图配置
const pieChartOption = computed(() => {
  const expenseData = [
    { value: 8500, name: '工资支出', itemStyle: { color: '#3b82f6' } },
    { value: 3200, name: '教材成本', itemStyle: { color: '#10b981' } },
    { value: 2800, name: '房租水电', itemStyle: { color: '#f59e0b' } },
    { value: 1500, name: '设备维护', itemStyle: { color: '#ef4444' } },
    { value: 2200, name: '营销推广', itemStyle: { color: '#8b5cf6' } },
    { value: 1800, name: '其他支出', itemStyle: { color: '#6b7280' } }
  ]
  
  const incomeData = [
    { value: 12000, name: '学费收入', itemStyle: { color: '#10b981' } },
    { value: 2800, name: '教材费', itemStyle: { color: '#3b82f6' } },
    { value: 1500, name: '活动费', itemStyle: { color: '#f59e0b' } },
    { value: 800, name: '其他收入', itemStyle: { color: '#8b5cf6' } }
  ]
  
  return {
    title: {
      text: pieChartType.value === 'expense' ? '支出分类分析' : '收入分类分析',
      textStyle: {
        fontSize: 16,
        fontWeight: 'normal',
        color: '#333'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: ¥{c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      bottom: 20
    },
    series: [
      {
        name: pieChartType.value === 'expense' ? '支出分布' : '收入分布',
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
        data: pieChartType.value === 'expense' ? expenseData : incomeData
      }
    ]
  }
})

// 柱状图配置  
const barChartOption = computed(() => ({
  title: {
    text: '月度收支对比',
    textStyle: {
      fontSize: 16,
      fontWeight: 'normal',
      color: '#333'
    }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {
    data: ['收入', '支出'],
    bottom: 0
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '15%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: ['1月', '2月', '3月', '4月', '5月', '6月']
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: '¥{value}'
    }
  },
  series: [
    {
      name: '收入',
      type: 'bar',
      data: [8200, 9320, 9010, 11340, 12900, 15330],
      itemStyle: {
        color: '#10b981'
      }
    },
    {
      name: '支出',
      type: 'bar',
      data: [6200, 7100, 6800, 8400, 9200, 10100],
      itemStyle: {
        color: '#ef4444'
      }
    }
  ]
}))

// 页面加载时获取数据
onMounted(async () => {
  try {
    await Promise.all([
      getFinanceList(),
      classStore.fetchClasses(),
      teacherStore.fetchTeachers()
    ]);
  } catch (error) {
    ElMessage.error('初始化数据失败');
  }
});
</script>

<style scoped>
/* 财务管理页面样式 */
.finance-page-container {
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
  background: linear-gradient(135deg, #10b981, #059669);
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

.header-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

/* 统计概览样式 */
.stats-overview {
  margin-bottom: 32px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.stat-card {
  background: white;
  border-radius: var(--radius-xl);
  padding: 24px;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-light);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
}

.stat-card.income-card::before {
  background: linear-gradient(90deg, #10b981, #059669);
}

.stat-card.expense-card::before {
  background: linear-gradient(90deg, #f59e0b, #d97706);
}

.stat-card.balance-card::before {
  background: linear-gradient(90deg, #6366f1, #4f46e5);
}

.stat-card.profit-card::before {
  background: linear-gradient(90deg, #8b5cf6, #7c3aed);
}

.stat-card.pending-card::before {
  background: linear-gradient(90deg, #ef4444, #dc2626);
}

.stat-card.total-card::before {
  background: linear-gradient(90deg, #06b6d4, #0891b2);
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.stat-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
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

.income-icon {
  background: linear-gradient(135deg, #10b981, #059669);
}

.expense-icon {
  background: linear-gradient(135deg, #f59e0b, #d97706);
}

.balance-icon {
  background: linear-gradient(135deg, #6366f1, #4f46e5);
}

.profit-icon {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
}

.pending-icon {
  background: linear-gradient(135deg, #ef4444, #dc2626);
}

.total-icon {
  background: linear-gradient(135deg, #06b6d4, #0891b2);
}

.trend-badge {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: var(--radius-md);
  font-size: var(--font-size-xs);
  font-weight: 600;
}

.trend-badge.positive {
  background: rgba(16, 185, 129, 0.1);
  color: var(--success-color);
}

.trend-badge.negative {
  background: rgba(239, 68, 68, 0.1);
  color: var(--error-color);
}

.pending-count {
  background: rgba(239, 68, 68, 0.1);
  color: var(--error-color);
  padding: 4px 8px;
  border-radius: var(--radius-md);
  font-size: var(--font-size-xs);
  font-weight: 600;
  min-width: 24px;
  text-align: center;
}

.stat-body {
  text-align: left;
}

.stat-title {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin-bottom: 8px;
  font-weight: 500;
}

.stat-value {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 4px;
  line-height: 1.2;
}

.stat-value.positive-value {
  color: var(--success-color);
}

.stat-value.negative-value {
  color: var(--error-color);
}

.stat-description {
  font-size: var(--font-size-xs);
  color: var(--text-light);
}

/* 图表区域样式 */
.charts-section {
  margin-bottom: 32px;
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 24px;
}

.chart-card {
  background: white;
  padding: 0;
  overflow: hidden;
}

.chart-header {
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-light);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--bg-tertiary);
}

.chart-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-primary);
}

.chart-controls {
  display: flex;
  gap: 8px;
}

.chart-info {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.chart-metric strong {
  color: var(--text-primary);
  font-weight: 600;
}

.chart-container {
  padding: 24px;
  background: white;
}

/* 预算进度条容器 */
.budget-progress-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.budget-item {
  padding: 20px;
  background: var(--bg-tertiary);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-light);
}

.budget-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.budget-label {
  font-size: var(--font-size-md);
  font-weight: 600;
  color: var(--text-primary);
}

.budget-value {
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: var(--primary-color);
}

.budget-detail {
  margin-top: 8px;
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  text-align: center;
}

/* 数据管理区域 */
.data-management-section {
  background: white;
  padding: 0;
  overflow: hidden;
}

.section-header {
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-light);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--bg-tertiary);
}

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-primary);
}

.section-actions .filter-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  padding: 8px 12px;
  border-radius: var(--radius-md);
  transition: var(--transition-fast);
}

.section-actions .filter-btn:hover {
  background: rgba(99, 102, 241, 0.1);
  color: var(--primary-color);
}

/* 高级筛选区域 */
.advanced-filter {
  padding: 24px;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-light);
}

.filter-form .filter-row {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.filter-form :deep(.el-form-item) {
  margin-bottom: 0;
}

.amount-range {
  display: flex;
  align-items: center;
  gap: 8px;
}

.range-separator {
  color: var(--text-secondary);
  font-weight: 500;
}

.filter-actions {
  display: flex;
  gap: 12px;
}

/* 表格容器样式 */
.table-container {
  background: white;
  border-radius: 0;
  overflow: hidden;
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

.type-tag {
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: var(--radius-md);
}

.amount-display {
  font-weight: 600;
  font-size: var(--font-size-md);
}

.amount-display.income-amount {
  color: var(--success-color);
}

.amount-display.expense-amount {
  color: var(--error-color);
}

.status-tag {
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: var(--radius-md);
}

.table-action-buttons {
  display: flex;
  gap: 6px;
  justify-content: center;
}

.action-btn {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-light);
  transition: var(--transition-fast);
}

.action-btn:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}

/* 分页器样式 */
.pagination-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: var(--bg-tertiary);
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

/* 进度条美化 */
.budget-item :deep(.el-progress-bar__outer) {
  border-radius: var(--radius-lg);
  background: rgba(0, 0, 0, 0.1);
}

.budget-item :deep(.el-progress-bar__inner) {
  border-radius: var(--radius-lg);
  transition: var(--transition-fast);
}

/* 图表控件美化 */
.chart-controls :deep(.el-radio-group) {
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.chart-controls :deep(.el-radio-button__inner) {
  border-radius: 0;
  border-color: var(--border-color);
  transition: var(--transition-fast);
}

.chart-controls :deep(.el-radio-button__original-radio:checked + .el-radio-button__inner) {
  background: var(--primary-color);
  border-color: var(--primary-color);
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
  .header-content {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  
  .charts-grid {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .finance-page-container {
    padding: 16px;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .charts-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .chart-header {
    flex-direction: column;
    gap: 12px;
    text-align: center;
  }
  
  .filter-form .filter-row {
    flex-direction: column;
    gap: 16px;
  }
  
  .amount-range {
    flex-direction: column;
    gap: 8px;
  }
  
  .pagination-wrapper {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }
  
  .table-action-buttons {
    flex-direction: column;
    gap: 4px;
  }
  
  .budget-progress-container {
    gap: 16px;
  }
  
  .budget-item {
    padding: 16px;
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
  
  .stat-header {
    flex-direction: column;
    gap: 8px;
    text-align: center;
  }
  
  .stat-value {
    font-size: var(--font-size-xl);
  }
  
  .chart-container {
    padding: 16px;
  }
  
  .section-header {
    flex-direction: column;
    gap: 12px;
    text-align: center;
  }
  
  .filter-actions {
    flex-direction: column;
    gap: 8px;
  }
}
</style> 