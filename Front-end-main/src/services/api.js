import axios from 'axios';

const api = axios.create({
  baseURL: 'https://vercel-deployment-gamma-gules.vercel.app', 
  headers: {
    'Content-Type': 'application/json',
  },
});


const setAuthHeader = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  console.log(response);
  setAuthHeader(response.data.token); 
  return response.data;
};


