import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ssm-backend-three.vercel.app/', 
  withCredentials: true,            
});

export default api;