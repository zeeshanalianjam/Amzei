// src/api/fetchAdminData.js
import { Axios } from '../common/axios';
import { summaryApi } from '../common/summaryApi';
import { toast } from 'react-hot-toast';
import {
    setAllUsers,
    setAllTours,
    setAllDestinations,
    setAllEvents,
    setAllTourBookings,
    setAllTourPackages,
} from '../adminStore/dashboardSlice';

/**
 * Fetch all admin dashboard data
 * @param {function} dispatch - Redux dispatch function
 */
export const fetchAllAdminData = async (dispatch) => {
    try {
        const [
            usersRes,
            toursRes,
            destinationsRes,
            eventsRes,
            bookingsRes,
            packagesRes,
        ] = await Promise.all([
            Axios({ ...summaryApi.fetchAllUsers }),
            Axios({ ...summaryApi.fetchAllTours }),
            Axios({ ...summaryApi.fetchAllDestinations }),
            Axios({ ...summaryApi.fetchAllEvents }),
            Axios({ ...summaryApi.fetchAllTourBookings }),
            Axios({ ...summaryApi.getAllToursPackages }),
        ]);

        if (usersRes?.data?.success) dispatch(setAllUsers(usersRes.data.data));
        else toast.error('Failed to fetch users');

        if (toursRes?.data?.success) dispatch(setAllTours(toursRes.data.data));
        else toast.error('Failed to fetch tours');

        if (destinationsRes?.data?.success)
            dispatch(setAllDestinations(destinationsRes.data.data));
        else toast.error('Failed to fetch destinations');

        if (eventsRes?.data?.success) dispatch(setAllEvents(eventsRes.data.data));
        else toast.error('Failed to fetch events');

        if (bookingsRes?.data?.success)
            dispatch(setAllTourBookings(bookingsRes.data.data?.bookings));
        else toast.error('Failed to fetch bookings');

        if (packagesRes?.data?.success)
            dispatch(setAllTourPackages(packagesRes.data.data));
        else toast.error('Failed to fetch packages');
    } catch (error) {
        console.error('Error fetching admin data:', error);
        toast.error('Error fetching admin data');
    }
};
