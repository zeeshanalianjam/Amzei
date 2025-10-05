import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ToursPage from "./pages/ToursPage";
import DestinationPage from "./pages/DestinationPage";
import BookingPage from "./pages/BookingPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import toast, { Toaster } from "react-hot-toast";
import { Axios } from "./common/axios";
import { summaryApi } from "./common/summaryApi";
import { useDispatch } from "react-redux";
import { setAllDestinations } from "./store/placesSlice";
import { useCallback, useEffect } from "react";
import AllDestinations from "./pages/AllDestinations";
import AllToursPage from "./pages/AllToursPage";
import TourDetailPage from "./pages/TourDetailPage";
import BookingSuccess from "./pages/BookingSuccess";

export default function App() {
  const dispatch = useDispatch();

 const fetchAllDestinations = useCallback(async () => {
  try {
    const res = await Axios({
      ...summaryApi.fetchAllDestinations
    });

    if (res?.data?.success) {
      dispatch(setAllDestinations(res?.data?.data));
    }
  } catch (error) {
    console.log("error in fetching all destinations", error);
    toast.error(error?.response?.data?.message || 'Failed to fetching destinations. Please try again.');
  }
}, []);

  useEffect(() => {
    fetchAllDestinations();
  }, [fetchAllDestinations])

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        {/* <Route path="/tours" element={<ToursPage />} /> */}
        <Route path="/destination/:id" element={<DestinationPage />} />
        <Route path="/booking/:id" element={<BookingPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
         <Route path="/destinations" element={<AllDestinations />} /> 
          <Route path="/tours" element={<AllToursPage />} />
      <Route path="/tour/:id" element={<TourDetailPage />} />
       <Route path="/booking-success" element={<BookingSuccess />} />
      </Routes>
      <Toaster />
    </>
  )
}