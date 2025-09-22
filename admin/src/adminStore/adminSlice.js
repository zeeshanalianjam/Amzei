import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    _id: "",
    username: "",
    email: "",
};

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setAdmin: (state, action) => {
            if(!action.payload) return;
            state._id = action.payload._id;
            state.username = action.payload.username;
            state.email = action.payload.email;
        },
        logout: (state) => {
            state._id = "";
            state.username = "";
            state.email = "";
        },
    }
});


export const { setAdmin, logout } = adminSlice.actions;
export default adminSlice.reducer;