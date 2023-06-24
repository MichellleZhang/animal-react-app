import axios from 'axios';
<<<<<<< HEAD
const request = axios.create({
  withCredentials: true
})
=======
>>>>>>> 77eaf83 (adding search page)

const API_BASE = "http://localhost:4000/api";
const PETS_API = `${API_BASE}/pets`;

export const findPets = async () => {
<<<<<<< HEAD
  const response = await axios.get(PETS_API);
  return response.data;
=======
    const response = await axios.get(PETS_API);
    return response.data;
>>>>>>> 77eaf83 (adding search page)
}

//find all the pets
export const findAllPets = async () => {
<<<<<<< HEAD
  console.log("hello ,,,,,,,")
=======
    console.log("hello ,,,,,,,")
>>>>>>> 77eaf83 (adding search page)
  try {
    const response = await axios.get(PETS_API);
    return response.data;
  } catch (error) {
    console.error("Error fetching pets:", error);
    return [];
  }
};
<<<<<<< HEAD

//create Mypets
export const createMyPets = async ({ name, type, image, sex, description }) => {
  const response = await request.post(`${PETS_API}/create`, { name, type, image, sex, description });
  const mypet = response.data;
  return mypet;
};

export const findIAllMyPets = async () => {
  console.log("执行到了这里")
  const response = await request.get(`${PETS_API}/myallMypets`);
  return response.data;
}
=======
>>>>>>> 77eaf83 (adding search page)
