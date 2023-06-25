import { createSlice } from '@reduxjs/toolkit';
import { likePet, unlikePet, getLikedPetsByUser } from '../services/likePet-thunk.js';

const likePetSlice = createSlice({
    name: 'likePet',
    initialState: { petLiked: [], error: null, loading: false },
    reducers: {},
    extraReducers: {
        [likePet.pending]: (state) => {
            state.loading = true;
        },
        [likePet.fulfilled]: (state, action) => {
            console.log('FETCH_LIKED_PETS action:', action);
            state.loading = false;
            state.error = null;
            // Extract the pet from the like object
            state.petLiked.push(action.payload);
        },
        [likePet.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        },
        [unlikePet.fulfilled]: (state, action) => {
            state.loading = false;
            state.error = null;
            // Remove the unliked pet from the state array
            state.petLiked = state.petLiked.filter(like => like.petId._id !== action.payload._id);
        },
        [getLikedPetsByUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.error = null;
            // Replace the existing state array with the fetched liked pets
            state.petLiked = action.payload;
            console.log('Updated liked pets:', state.petLiked);
        },
        [getLikedPetsByUser.pending]: (state) => {
            state.loading = true;
        },
        [getLikedPetsByUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        },
    },
});

export default likePetSlice.reducer;
