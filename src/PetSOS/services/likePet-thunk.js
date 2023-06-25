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
        dispatch({ type: 'FETCH_LIKED_PETS_START' });
        console.log(`Fetching liked pets for user with ID: ${userId}`);
        const { data } = await getLikedPets(userId);
        console.log(`Received data: ${JSON.stringify(data, null, 2)}`);
        dispatch({ type: 'FETCH_LIKED_PETS', payload: data });
    } catch (error) {
        console.log(`Failed to fetch liked pets for user with ID: ${userId}`, error);
        dispatch({ type: 'FETCH_LIKED_PETS_ERROR', payload: error });  // Set loading to false
    }
};
