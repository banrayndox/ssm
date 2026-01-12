import axios from 'axios';

const api = axios.create({
  baseURL: 'https://diussm.vercel.app/api', 
  withCredentials: true,            
});

export default api;