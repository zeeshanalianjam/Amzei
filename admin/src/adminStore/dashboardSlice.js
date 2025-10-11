import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    allUsers: [],
    allTours: [],
    allDestinations: [],
    allEvents: [],
    allTourBookings: [],
    allTourPackages: [],

}

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        setAllUsers: (state, action) => {
            state.allUsers = action.payload;
        },
        setAllTours: (state, action) => {
            state.allTours = action.payload;
        },
        setAllDestinations: (state, action) => {
            state.allDestinations = action.payload;
        },
        setAllEvents: (state, action) => {
            state.allEvents = action.payload;
        },
        setAllTourBookings: (state, action) => {
            state.allTourBookings = action.payload;
        },
        setAllTourPackages: (state, action) => {
            state.allTourPackages = action.payload;
        }
    },
});


export const { setAllUsers, setAllTours, setAllDestinations, setAllEvents, setAllTourBookings, setAllTourPackages } = dashboardSlice.actions;
export default dashboardSlice.reducer;