import axios from "axios";

const API_BASE = "http://localhost:4000/api";
const LIKE_URL = `${API_BASE}/like`
const api = axios.create({ baseURL: LIKE_URL, withCredentials: true });

export const likePets = async(userId, pet, role) => {
    return await api.post(`${LIKE_URL}/likePet`, {
        userId,
        pet,
        role,
    });
};

export const unlikePets = async(userId, petId, role) => {
    return await api.delete(`${LIKE_URL}/unlikePet`, {
        data: {
            userId,
            petId,
            role,
        },
    });
};

export const getLikedPets = async(userId) => {
    return await api.get(`${LIKE_URL}/${userId}`);
};

