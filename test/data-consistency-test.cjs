const fs = require('fs');
const path = require('path');

console.log('🔍 数据一致性检查脚本');
console.log('=====================================');

const checkFile = (filePath, pageName) => {
  const content = fs.readFileSync(filePath, 'utf8');
  
  console.log(`\n📄 检查 ${pageName}:`);
  
  // 检查是否使用了计算属性
  const hasComputedList = content.includes('computed(() =>') && content.includes('Store.get');
  
  // 检查是否有问题的ref赋值模式
  const hasProblematicRef = content.includes('const ') && content.includes('List = ref([])');
  const hasManualAssignment = content.includes('.value = ') && content.includes('Store.get');
  
  // 检查是否使用store方法获取数据
  const usesStoreFetch = content.includes('Store.fetch') && content.includes('await');
  
  console.log(`   ✅ 使用计算属性: ${hasComputedList ? '是' : '否'}`);
  console.log(`   ⚠️ 问题的ref模式: ${hasProblematicRef ? '是' : '否'}`);
  console.log(`   ⚠️ 手动赋值模式: ${hasManualAssignment ? '是' : '否'}`);
  console.log(`   ✅ 使用store获取: ${usesStoreFetch ? '是' : '否'}`);
  
  const status = hasComputedList && !hasProblematicRef && !hasManualAssignment && usesStoreFetch ? '✅' : '❌';
  console.log(`   📊 综合状态: ${status}`);
  
  return status === '✅';
};

const filesToCheck = [
  { path: './src/views/Student.vue', name: '学员管理' },
  { path: './src/views/Teacher.vue', name: '教师管理' },
  { path: './src/views/Course.vue', name: '课程管理' },
  { path: './src/views/Finance.vue', name: '财务管理' },
  { path: './src/views/Schedule.vue', name: '课程表管理' }
];

let allPassed = true;

filesToCheck.forEach(file => {
  const fullPath = path.join(__dirname, '..', file.path);
  if (fs.existsSync(fullPath)) {
    const passed = checkFile(fullPath, file.name);
    if (!passed) allPassed = false;
  } else {
    console.log(`\n❌ 文件不存在: ${file.path}`);
    allPassed = false;
  }
});

console.log('\n=====================================');
console.log(`🎯 总体检查结果: ${allPassed ? '✅ 全部通过' : '❌ 存在问题'}`);

if (allPassed) {
  console.log('🎉 恭喜！所有页面的数据一致性问题已修复！');
  console.log('💡 现在统计数据和表格数据将保持同步。');
} else {
  console.log('⚠️ 仍有部分页面需要修复数据一致性问题。');
}

console.log('\n🔧 修复要点:');
console.log('1. 使用 computed(() => store.getData) 替代 ref([])');
console.log('2. 通过 await store.fetchData() 获取数据');
console.log('3. 避免手动赋值 .value = store.getData');
console.log('4. 确保统计和表格使用相同数据源'); 