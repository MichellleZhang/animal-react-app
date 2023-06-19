import axios from "axios";
const SERVER_API_URL = "http://localhost:4000/api";
const USERS_URL = `${SERVER_API_URL}/users`;
const api = axios.create({ baseURL: USERS_URL,withCredentials: true });

export const login = async ({ account, password }) => {
    const response = await api.post(`${USERS_URL}/login`, { account, password });
    const user = response.data;
    return user;
};

export const logout = async () => {
    const response = await api.post(`${USERS_URL}/logout`);
    return response.data;
};

export const profile = async () => {
    const response = await api.post(`${USERS_URL}/profile`);
    return response.data;
};

export const updateUser = async (uid,user) => {
    const response = await api.put(`${USERS_URL}/${uid}`,user);
    return response.data;
};

export const register = async ({ username, lastName, firstName, state, zipCode, phoneNumber, email, password, role }) => {
    const response = await api.post(`${USERS_URL}/register`, { username, lastName, firstName, state, zipCode, phoneNumber, email, password, role });
    const user = response.data;
    return user;
};