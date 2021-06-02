import axios from 'axios';

const api = axios.create({
  baseURL:'http://187.62.153.135:3002',
});

export default api;
