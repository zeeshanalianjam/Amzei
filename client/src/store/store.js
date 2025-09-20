import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import tourBookingReducer from './tourBookingSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        tourBooking: tourBookingReducer,
    }
})

export {store}