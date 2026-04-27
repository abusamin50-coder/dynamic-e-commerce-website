// When you deploy the backend to Render, replace the URL below with your actual Render URL
const BACKEND_URL = window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost' 
    ? 'http://localhost:5000/api' 
    : 'https://your-backend-app-name.onrender.com/api';

window.API_URL = BACKEND_URL;