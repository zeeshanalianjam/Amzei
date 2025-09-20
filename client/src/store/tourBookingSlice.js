import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    destination: "",
    checkIn: "",
    checkOut: "",
}

const tourBookingSlice = createSlice({
    name: "tourBooking",
    initialState,
    reducers: {
        setTourBooking: (state, action) => {
            if(!action.payload) return;
            state.destination = action.payload.destination;
            state.checkIn = action.payload.checkIn;
            state.checkOut = action.payload.checkOut;
        },
        clearTourBooking: (state) => {
            state.destination = "";
            state.checkIn = "";
            state.checkOut = "";
        },

    }
});

export const { setTourBooking, clearTourBooking } = tourBookingSlice.actions;
export default tourBookingSlice.reducer;