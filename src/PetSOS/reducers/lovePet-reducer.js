// lovePet-reducer.js

import { createSlice } from "@reduxjs/toolkit";
import { checkLovedPetThunk, lovePetThunk } from "../services/lovePet-thunk";

const lovePetSlice = createSlice({
    name: "lovePet",
    initialState: { petLoves: [], error: null, loading: false },
    reducers: {},
    extraReducers: {
        [checkLovedPetThunk.fulfilled]: (state, { payload }) => {
            state.petLoves = payload;
            state.loading = false;
            state.error = null;
        },
        [lovePetThunk.fulfilled]: (state, { payload }) => {
            state.petLoves = [...state.petLoves, payload];
            state.loading = false;
            state.error = null;
        },
        [checkLovedPetThunk.rejected]: (state, { payload }) => {
            state.error = payload.error;
            state.loading = false;
        },
        [lovePetThunk.rejected]: (state, { payload }) => {
            state.error = payload.error;
            state.loading = false;
        },
        [checkLovedPetThunk.pending]: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        [lovePetThunk.pending]: (state, action) => {
            state.loading = true;
            state.error = null;
        }
    }
})

export default lovePetSlice.reducer;
