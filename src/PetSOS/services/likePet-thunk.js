import { likePets, unlikePets, getLikedPets } from './likePet-service';

export const likePet = (userId, pet, role) => async (dispatch) => {
    try {
        const { data } = await likePets(userId, pet, role);
        dispatch({ type: 'LIKE_PET', payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const unlikePet = (userId, petId, role) => async (dispatch) => {
    try {
        await unlikePets(userId, petId, role);
        dispatch({ type: 'UNLIKE_PET', payload: petId });
    } catch (error) {
        console.log(error);
    }
};

export const getLikedPetsByUser = (userId) => async (dispatch) => {
    try {
        const { data } = await getLikedPets(userId);
        return data;
    } catch (error) {
        console.log(error);
    }
};
