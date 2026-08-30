import { create } from 'zustand';
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

export const useStore = create((set) => ({
  // Auth state
  user: null,
  token: localStorage.getItem('token'),
  isLoading: false,
  error: null,

  // Jobs state
  jobs: [],
  selectedJob: null,
  jobsLoading: false,

  // Applications state
  applications: [],
  applicationStats: null,

  // Resume state
  resumes: [],
  selectedResume: null,

  // Auth actions
  register: async (username, email, password, fullName) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(`${API_BASE}/auth/register`, {
        username,
        email,
        password,
        fullName
      });
      localStorage.setItem('token', response.data.token);
      set({ user: response.data.user, token: response.data.token, isLoading: false });
      return true;
    } catch (error) {
      set({ error: error.response?.data?.error, isLoading: false });
      return false;
    }
  },

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(`${API_BASE}/auth/login`, { email, password });
      localStorage.setItem('token', response.data.token);
      set({ user: response.data.user, token: response.data.token, isLoading: false });
      return true;
    } catch (error) {
      set({ error: error.response?.data?.error, isLoading: false });
      return false;
    }
  },

  checkAuth: async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.get(`${API_BASE}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        set({ user: response.data, token });
      } catch (error) {
        localStorage.removeItem('token');
        set({ user: null, token: null });
      }
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null, applications: [], jobs: [], resumes: [] });
  },

  // Job actions
  searchJobs: async (keyword, location, jobType, remoteStatus, page = 1) => {
    set({ jobsLoading: true });
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE}/jobs/search`, {
        params: { keyword, location, jobType, remoteStatus, page },
        headers: { Authorization: `Bearer ${token}` }
      });
      set({ jobs: response.data.jobs, jobsLoading: false });
      return response.data;
    } catch (error) {
      set({ error: error.message, jobsLoading: false });
    }
  },

  getRecommendedJobs: async () => {
    set({ jobsLoading: true });
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE}/jobs/recommended`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      set({ jobs: response.data.jobs, jobsLoading: false });
      return response.data;
    } catch (error) {
      set({ error: error.message, jobsLoading: false });
    }
  },

  saveJob: async (jobId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_BASE}/jobs/${jobId}/save`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return true;
    } catch (error) {
      set({ error: error.message });
      return false;
    }
  },

  // Resume actions
  uploadResume: async (file) => {
    const formData = new FormData();
    formData.append('resume', file);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_BASE}/resume/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      const getResumes = useStore.getState().getResumes;
      await getResumes();
      return response.data;
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },

  getResumes: async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE}/resume`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      set({ resumes: response.data });
      return response.data;
    } catch (error) {
      set({ error: error.message });
    }
  },

  // Application actions
  createApplication: async (jobId, resumeId, coverLetter, status = 'draft') => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_BASE}/applications`, {
        jobId,
        resumeId,
        coverLetter,
        status
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const getApplications = useStore.getState().getApplications;
      await getApplications();
      return response.data;
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },

  getApplications: async (status = null, page = 1) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE}/applications`, {
        params: { status, page },
        headers: { Authorization: `Bearer ${token}` }
      });
      set({ applications: response.data.applications });
      return response.data;
    } catch (error) {
      set({ error: error.message });
    }
  },

  updateApplicationStatus: async (applicationId, status) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        `${API_BASE}/applications/${applicationId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const getApplications = useStore.getState().getApplications;
      await getApplications();
      return response.data;
    } catch (error) {
      set({ error: error.message });
    }
  },

  getApplicationStats: async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE}/applications/stats/summary`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      set({ applicationStats: response.data });
      return response.data;
    } catch (error) {
      set({ error: error.message });
    }
  }
}));
