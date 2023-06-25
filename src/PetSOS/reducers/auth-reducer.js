import { createSlice } from "@reduxjs/toolkit";
import { getUsersThunk, loginThunk, registerThunk, logoutThunk, profileThunk, updateUserThunk } from "../services/auth-thunk";
const authSlice = createSlice({
    name: "auth",
    initialState: { user: [], newUser: [], error: null, loading: false, currentUser: null },
    reducers: {},
    extraReducers: {
        [logoutThunk.fulfilled]: (state, { payload }) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        [profileThunk.fulfilled]: (state, { payload }) => {
            state.currentUser = payload;
            state.loading = false;
            state.error = null;
        },
        [loginThunk.fulfilled]: (state, { payload }) => {
            console.log("xieru"+payload.message)
            state.currentUser = payload;
            state.user = payload;
            state.loading = false;
            state.error = null;
        },
        [updateUserThunk.fulfilled]: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        [loginThunk.rejected]: (state, action) => {
            debugger
            console.log("ac"+action)
            console.log("sta"+state)

            state.error = action.error;
            state.currentUser = null;
        },
        [registerThunk.fulfilled]: (state, { payload }) => {
            state.currentUser = payload;
            state.newUser = payload;
        },
        [getUsersThunk.fulfilled]: (state, action) => {
            state.users = action.payload;
            state.loading = false;
            state.error = null;
        },
        [getUsersThunk.rejected]: (state, action) => {
            state.error = action.error;
            state.users = [];
            state.loading = false;
        },
        [getUsersThunk.pending]: (state, action) => {
            state.users = [];
            state.loading = true;
            state.error = null;
        },
        "": (state) => state,
    }
})
export default authSlice.reducer;