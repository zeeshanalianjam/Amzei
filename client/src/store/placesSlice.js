import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    allDestinations: [],
    allTours: [],

}

const placesSlice = createSlice({
    name: "places",
    initialState,
    reducers: {
        setAllDestinations: (state, action) => {
            state.allDestinations = action.payload;
        },
        setAllTours: (state, action) => {
            state.allTours = action.payload;
        },
    },
});


export const {  setAllDestinations, setAllTours} = placesSlice.actions;
export default placesSlice.reducer;