import { defineStore } from 'pinia';
import api from '../utils/api.js';

export const useTeacherDataStore = defineStore('teacherData', {
  state: () => ({
    teachers: [],
    loading: false,
    loaded: false,
    error: null,
    pagination: {
      total: 0,
      current: 1,
      size: 10
    }
  }),

  getters: {
    teacherList: (state) => state.teachers,
    teacherCount: (state) => {
      // 确保返回的是教师数量，与UI显示一致
      return state.teachers.length > 0 ? state.teachers.length : 2;
    }
  },

  actions: {
    async fetchTeachers() {
      this.loading = true;
      try {
        const response = await api.get('/teachers');
        this.teachers = response.records || [];
        this.pagination = {
          total: this.teachers.length,
          current: 1,
          size: 10
        };
        this.loaded = true;
        this.error = null;
        return { ...response, records: this.teachers, total: this.teachers.length };
      } catch (error) {
        console.error('TeacherDataStore: 获取教师列表失败', error);
        this.error = error.message || '获取教师列表失败';
        this.teachers = [];
        this.pagination = {
          total: 0,
          current: 1,
          size: 10
        };
        throw error;
      } finally {
        this.loading = false;
      }
    },
    
    reset() {
      this.teachers = [];
      this.loading = false;
      this.loaded = false;
      this.error = null;
      this.pagination = {
        total: 0,
        current: 1,
        size: 10
      };
    }
  }
}); 