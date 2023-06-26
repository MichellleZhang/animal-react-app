import axios from 'axios';
const request = axios.create({
  withCredentials: true
})

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

//create Mypets
export const createMyPets = async ({ name, type, image, sex, description }) => {
  const response = await request.post(`${PETS_API}/create`, { name, type, image, sex, description });
  const mypet = response.data;
  return mypet;
};

export const findIAllMyPets = async () => {
  const response = await request.get(`${API_BASE}/petss/myallMypets`);
  return response.data;
}

export const deleteMypets = async(id) => {
  const response = await axios.delete(`${API_BASE}/petss/${id}`);
  return response.data;
}

export const visitMypets = async(id) => {
  console.log("id input",id)
  const response = await axios.get(`${API_BASE}/petss/${id}`);
  return response.data;
}

