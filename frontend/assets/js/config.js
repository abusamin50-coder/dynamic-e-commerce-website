const BACKEND_URL = window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost' 
    ? 'http://localhost:5001/api' 
    : '/api'; 

window.API_URL = BACKEND_URL;