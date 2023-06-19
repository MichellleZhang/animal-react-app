import { createAsyncThunk } from "@reduxjs/toolkit"
import * as authService from "./auth-service"
export const loginThunk = createAsyncThunk("user/login", async (credentials) => {
    const currenUser = await authService.login(credentials);
    return currenUser;
}
);
export const logoutThunk = createAsyncThunk("auth/logout", async () => {
    await authService.logout();
}
);
export const profileThunk = createAsyncThunk("auth/profile", async () => {
    const currenUser =  await authService.profile();
    return currenUser;
}
);

export const updateUserThunk = createAsyncThunk("user/updateUser", async (user) => {
    await authService.updateUser(user._id, user);
    return user;
}
);

export const registerThunk = createAsyncThunk("user/register", async (credentials) => {
    const user = await authService.register(credentials);
    return user;
}
);