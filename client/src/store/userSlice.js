import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    _id: "",
    username: "",
    email: "",
    phone: "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            if(!action.payload) return;
            state._id = action.payload._id;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.phone = action.payload.phone;
        },
        logout: (state) => {
            state._id = "";
            state.username = "";
            state.email = "";
            state.phone = "";
        },
    }
});


export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;