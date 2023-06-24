import axios from "axios";

const SERVER_API_URL = "http://localhost:4000/api";
const PETS_URL = `${SERVER_API_URL}/pets`;
const api = axios.create({ baseURL: PETS_URL, withCredentials: true });

export const checkLovedPet = async (userId, petId) => {
    const response = await api.get(`/checkLove/${userId}/${petId}`);
    return response.data;
};

export const lovePet = async (userId, petId) => {
    const response = await api.post(`${PETS_URL}/love`, { userId, petId });
    const { isLoved } = response.data;
    return isLoved;
};
