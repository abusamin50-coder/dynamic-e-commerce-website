const BACKEND_URL = window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost' 
    ? 'http://localhost:5050/api' 
    : 'https://dynamic-e-commerce-website.onrender.com/api'; // Replace this with your Render URL later

window.API_URL = BACKEND_URL;