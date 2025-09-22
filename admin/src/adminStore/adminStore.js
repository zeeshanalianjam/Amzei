import {configureStore} from '@reduxjs/toolkit';
import adminReducer from './adminSlice';
import dashboardReducer from './dashboardSlice';

const store = configureStore({
    reducer: {
        admin: adminReducer,
        dashboard: dashboardReducer
    }
})

export {store}