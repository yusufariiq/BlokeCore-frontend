export const token = localStorage.getItem('token')
export const userData = localStorage.getItem('user') 
  ? JSON.parse(localStorage.getItem('user')) 
  : null;