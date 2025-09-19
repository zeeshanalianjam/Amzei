import { Router } from "express";
import { bookATour, getAllTourBookings, getTourBookingById, getTourBookingByUserId, updateTourBookingStatus } from "../controllers/tourBooking.controller.js";
import { jwtVerify } from "../middlewares/auth.middleware.js";

const tourBookingRouter = Router();

tourBookingRouter.route("/book").post(jwtVerify, bookATour);
tourBookingRouter.route("/fetch-all-tour-bookings").get(jwtVerify, getAllTourBookings);
tourBookingRouter.route("/fetch-tour-booking-by-user").get(jwtVerify, getTourBookingByUserId);
tourBookingRouter.route("/fetch-tour-booking/:bookingId").get(jwtVerify, getTourBookingById);
tourBookingRouter.route("/update/:bookingId").put(jwtVerify, updateTourBookingStatus);

export { tourBookingRouter };