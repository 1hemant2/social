import axios from 'axios';

//create a function to get current token 
function getToken() {
    return localStorage.getItem("token");
}

export const axiosInstances = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        authorization: `Bearer ${getToken()}`
    }
})

//update the header before each request 
axiosInstances.interceptors.request.use((config) => {
    config.headers.authorization = `Bearer ${getToken()}`;
    return config;
});


