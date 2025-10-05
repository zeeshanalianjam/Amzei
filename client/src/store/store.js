import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import tourBookingReducer from './tourBookingSlice';
import placesReducer from './placesSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        tourBooking: tourBookingReducer,
        places: placesReducer
    }
})

export {store}