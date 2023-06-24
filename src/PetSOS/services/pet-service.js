import axios from 'axios';

const API_BASE = "http://localhost:4000/api";
const PETS_API = `${API_BASE}/pets`;

export const findPets = async () => {
    const response = await axios.get(PETS_API);
    return response.data;
}

//find all the pets
export const findAllPets = async () => {
    console.log("hello ,,,,,,,")
  try {
    const response = await axios.get(PETS_API);
    return response.data;
  } catch (error) {
    console.error("Error fetching pets:", error);
    return [];
  }
};
