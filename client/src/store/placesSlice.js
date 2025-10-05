import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    allDestinations: [],

}

const placesSlice = createSlice({
    name: "places",
    initialState,
    reducers: {
        setAllDestinations: (state, action) => {
            state.allDestinations = action.payload;
        },
    },
});


export const {  setAllDestinations} = placesSlice.actions;
export default placesSlice.reducer;