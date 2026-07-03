import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const register = (user) => {
    return axios.post(`${BASE_URL}/register`, user);
};

export const login = (user) => {
    return axios.post(`${BASE_URL}/login`, user);
}; 