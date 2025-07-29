/**
 * 通用工具函数集合
 */

/**
 * 格式化日期时间
 * @param {Date|string|number} date - 日期对象、时间戳或日期字符串
 * @param {string} format - 格式化模板，例如 'YYYY-MM-DD HH:mm:ss'
 * @returns {string} - 格式化后的日期字符串
 */
export const formatDate = (date, format = 'YYYY-MM-DD HH:mm:ss') => {
  if (!date) return '';
  
  const d = date instanceof Date ? date : new Date(date);
  
  if (isNaN(d.getTime())) return '';
  
  const padZero = (num) => String(num).padStart(2, '0');
  
  const formatMap = {
    YYYY: d.getFullYear(),
    MM: padZero(d.getMonth() + 1),
    DD: padZero(d.getDate()),
    HH: padZero(d.getHours()),
    mm: padZero(d.getMinutes()),
    ss: padZero(d.getSeconds()),
  };
  
  return format.replace(/YYYY|MM|DD|HH|mm|ss/g, (match) => formatMap[match]);
};

/**
 * 格式化金额
 * @param {number} amount - 金额
 * @param {number} decimals - 小数位数
 * @param {string} currency - 货币符号
 * @returns {string} - 格式化后的金额字符串
 */
export const formatCurrency = (amount, decimals = 2, currency = '¥') => {
  if (amount === null || amount === undefined) return '';
  
  const formatter = new Intl.NumberFormat('zh-CN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  
  return `${currency}${formatter.format(amount)}`;
};

/**
 * 防抖函数
 * @param {Function} fn - 需要防抖的函数
 * @param {number} delay - 延迟时间（毫秒）
 * @returns {Function} - 防抖后的函数
 */
export const debounce = (fn, delay = 300) => {
  let timer = null;
  
  return function(...args) {
    const context = this;
    
    if (timer) {
      clearTimeout(timer);
    }
    
    timer = setTimeout(() => {
      fn.apply(context, args);
      timer = null;
    }, delay);
  };
};

/**
 * 节流函数
 * @param {Function} fn - 需要节流的函数
 * @param {number} interval - 间隔时间（毫秒）
 * @returns {Function} - 节流后的函数
 */
export const throttle = (fn, interval = 300) => {
  let lastTime = 0;
  
  return function(...args) {
    const context = this;
    const now = Date.now();
    
    if (now - lastTime >= interval) {
      fn.apply(context, args);
      lastTime = now;
    }
  };
};

/**
 * 深拷贝对象
 * @param {Object} obj - 需要深拷贝的对象
 * @returns {Object} - 拷贝后的新对象
 */
export const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  if (obj instanceof Date) {
    return new Date(obj);
  }
  
  if (obj instanceof Array) {
    return obj.map(item => deepClone(item));
  }
  
  if (obj instanceof Object) {
    const copy = {};
    Object.keys(obj).forEach(key => {
      copy[key] = deepClone(obj[key]);
    });
    return copy;
  }
  
  return obj;
};

/**
 * 将对象转换为查询字符串
 * @param {Object} params - 参数对象
 * @returns {string} - 查询字符串
 */
export const objectToQueryString = (params) => {
  if (!params || typeof params !== 'object') {
    return '';
  }
  
  return Object.keys(params)
    .filter(key => params[key] !== undefined && params[key] !== null)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');
};

/**
 * 从查询字符串解析参数
 * @param {string} queryString - 查询字符串
 * @returns {Object} - 参数对象
 */
export const queryStringToObject = (queryString) => {
  if (!queryString) {
    return {};
  }
  
  const query = queryString.startsWith('?') ? queryString.substring(1) : queryString;
  const pairs = query.split('&');
  const result = {};
  
  pairs.forEach(pair => {
    const [key, value] = pair.split('=');
    if (key) {
      result[decodeURIComponent(key)] = decodeURIComponent(value || '');
    }
  });
  
  return result;
};

/**
 * 生成随机ID
 * @param {number} length - ID长度
 * @returns {string} - 随机ID
 */
export const generateRandomId = (length = 8) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return result;
};

/**
 * 检查对象是否为空
 * @param {Object} obj - 要检查的对象
 * @returns {boolean} - 是否为空
 */
export const isEmptyObject = (obj) => {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
};

/**
 * 检查是否为移动设备
 * @returns {boolean} - 是否为移动设备
 */
export const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

/**
 * 将字符串首字母大写
 * @param {string} str - 输入字符串
 * @returns {string} - 首字母大写的字符串
 */
export const capitalizeFirstLetter = (str) => {
  if (!str || typeof str !== 'string') return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * 将驼峰命名转换为短横线命名
 * @param {string} str - 驼峰命名字符串
 * @returns {string} - 短横线命名字符串
 */
export const camelToKebab = (str) => {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
};

/**
 * 将短横线命名转换为驼峰命名
 * @param {string} str - 短横线命名字符串
 * @returns {string} - 驼峰命名字符串
 */
export const kebabToCamel = (str) => {
  return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
};

/**
 * 将文件大小格式化为可读字符串
 * @param {number} bytes - 文件大小（字节）
 * @param {number} decimals - 小数位数
 * @returns {string} - 格式化后的文件大小
 */
export const formatFileSize = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
};

export default {
  formatDate,
  formatCurrency,
  debounce,
  throttle,
  deepClone,
  objectToQueryString,
  queryStringToObject,
  generateRandomId,
  isEmptyObject,
  isMobileDevice,
  capitalizeFirstLetter,
  camelToKebab,
  kebabToCamel,
  formatFileSize
}; 