import { TourBooking } from "../models/tourBooking.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const bookATour = asyncHandler(async (req, res) => {
    try {
        const {FullName, email, phone, destination, preferredTravelDate, checkIn, checkOut, numberOfGuests, specialRequests, tripType,  kindOfTour, numberOfDays, numberOfRooms, nationality} = req.body;

        if (!FullName || !email || !phone || !destination || !preferredTravelDate  || !numberOfGuests || !tripType || !kindOfTour || !numberOfDays || !numberOfRooms || !nationality) {
            return res.status(400).json(new apiError(400, "Please fill all required fields"));
        }

        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return res.status(400).json(new apiError(400, 'Please enter a valid email address'));
        }

        if (!/^(?:\+971|0)(?:2|3|4|6|7|9|5[024568])\d{7}$/.test(phone)) {
            return res.status(400).json(new apiError(400, "Please enter a valid UAE phone number"));
        }

        if (FullName.length < 3) {
            return res.status(400).json(new apiError(400, "Full Name must be at least 3 characters long"));
        }

        const existingBooking = await TourBooking.findOne({ email, destination, preferredTravelDate });
        if (existingBooking) {
            return res.status(400).json(new apiError(400, "You have already booked a tour for this destination on the selected date"));
        }

        const newTourBooking = await TourBooking.create({
            FullName,
            email,
            phone,
            destination,
            preferredTravelDate,
            checkIn,
            checkOut,
            numberOfGuests,
            specialRequests,
            tripType,
            kindOfTour,
            numberOfDays,
            numberOfRooms,
            nationality,
            user: req.user._id
        });

        res.status(201).json(new apiResponse(201, "Tour booked successfully", newTourBooking));

    } catch (error) {
         console.error("Error during booking a tour:", error);
        res.status(500).json(new apiError(500, "Internal Server Error: Booking a tour failed"));
    }
});

const getAllTourBookings = asyncHandler(async (req, res) => {
    try {
        const tourBookings = await TourBooking.find().sort({ createdAt: -1 });
        const totalBookings = await TourBooking.countDocuments(); 

        res.status(200).json(new apiResponse(
            200,
            "All tour bookings retrieved successfully",
            {
                total: totalBookings,
                bookings: tourBookings
            }
        ));
    } catch (error) {
        console.error("Error retrieving tour bookings:", error);
        res.status(500).json(new apiError(500, "Internal Server Error: Retrieving tour bookings failed"));
    }
});

const getTourBookingByUserId = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id;
        const tourBookings = await TourBooking.find({ user: userId }).sort({ createdAt: -1 }).populate('user', 'FullName email');

        if (!tourBookings || tourBookings.length === 0) {
            return res.status(404).json(new apiError(404, "No bookings found for this user"));
        }

        res.status(200).json(new apiResponse(200, "User's tour bookings retrieved successfully", tourBookings));
    } catch (error) {
        console.error("Error retrieving user's tour bookings:", error);
        res.status(500).json(new apiError(500, "Internal Server Error: Retrieving user's tour bookings failed"));
    }
});

const getTourBookingById = asyncHandler(async (req, res) => {
    try {
        const bookingId = req.params.bookingId; 
        const tourBooking = await TourBooking.findById(bookingId);

        if (!tourBooking) {
            return res.status(404).json(new apiError(404, "Tour booking not found"));
        }

        res.status(200).json(new apiResponse(200, "Tour booking retrieved successfully", tourBooking));
    } catch (error) {
        console.error("Error retrieving tour booking by id:", error);
        res.status(500).json(new apiError(500, "Internal Server Error: Retrieving tour booking failed"));
    }
});

const updateTourBookingStatus = asyncHandler(async (req, res) => {
    try {
        const bookingId = req.params.bookingId;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json(new apiError(400, "Status field is required"));
        }

        if (!["pending", "approved", "cancelled"].includes(status)) {
            return res.status(400).json(new apiError(400, "Invalid status value"));
        }
        const updatedBooking = await TourBooking.findByIdAndUpdate(
            bookingId ,
            { status },
            { new: true }
        );
        if (!updatedBooking) {
            return res.status(404).json(new apiError(404, "Your booking ID not found"));
        }
        res.status(200).json(new apiResponse(200, "Tour booking status updated successfully", updatedBooking));
    } catch (error) {
        console.error("Error updating tour booking status:", error);
        res.status(500).json(new apiError(500, "Internal Server Error: Updating tour booking status failed"));
    }
});


export { bookATour, getAllTourBookings, getTourBookingByUserId, getTourBookingById, updateTourBookingStatus };