import * as lovePetService from './lovePet-service';
import { createAsyncThunk } from "@reduxjs/toolkit";

export const checkLovedPetThunk = (userId, petId) => {
    return async (dispatch) => {
        try {
            const response = await lovePetService.checkLovedPet(userId, petId);
            dispatch({ type: 'CHECK_PET_LOVE', payload: response });
        } catch (error) {
            console.error(error);
        }
    };
};

export const lovePetThunk = createAsyncThunk(
    "pets/lovePet",
    async ({ userId, petId }, thunkAPI) => {
        try {
            const isLoved = await lovePetService.lovePet({ userId, petId });
            return isLoved;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
