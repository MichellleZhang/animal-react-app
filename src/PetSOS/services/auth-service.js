import axios from "axios";
const SERVER_API_URL = "http://localhost:4000/api";
const USERS_URL = `${SERVER_API_URL}/users`;
const api = axios.create({ baseURL: USERS_URL, withCredentials: true });

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

export const updateUser = async (uid, user) => {
    const response = await api.put(`${USERS_URL}/${uid}`, user);
    return response.data;
};

export const modifyUser = async (uid, user) => {
    const response = await api.put(`${USERS_URL}/modify/${uid}`, user);
    return response.data;
};

export const register = async ({ username, lastName, firstName, state, zipCode, phoneNumber, email, password, role }) => {
    const response = await api.post(`${USERS_URL}/register`, { username, lastName, firstName, state, zipCode, phoneNumber, email, password, role });
    const user = response.data;
    return user;
};

export const getUsers = async () => {
    const response = await axios.get(USERS_URL);
    return response.data;
};

export const filterUsers = async ({condition, value}) => {
    const response = await axios.get(`${USERS_URL}/searchUsers`,{params:{condition, value}});
    console.log("users2",response.data)
    return response.data;
};

export const deleteUser = async (id) => {
    const response = await axios.delete(`${USERS_URL}/${id}`);
    console.log("response",response)
    return response.data;
};

export const accessUser = async (id) => {
    const response = await axios.get(`${USERS_URL}/${id}`);
    console.log("response",response)
    return response.data;
};

