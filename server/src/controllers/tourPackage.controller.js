import { TourPackage } from "../models/tourPackage.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const add = asyncHandler(async (req, res) => {
     let body = { ...req.body };

     const requiredFields = [
        "tourId",
        "fullName",
        "email",
        "phone",
        "tourLocation",
        "tourTitle",
        "travelDate",
        "numberOfGuests",
        "numberOfDays",
        "pricingDetails"
    ];

    for (const field of requiredFields) {
        if (!body[field]) {
            return res.status(400).json(new apiError(400, `${field} is required`));
        }
    }

    const existingBooking = await TourPackage.findOne({ tourTitle: body.tourTitle, email: body.email });
    if (existingBooking) {
        return res.status(400).json(new apiError(400, "You have already booked this tour"));
    }

    const newTourBooking = await TourPackage.create(body);
    res.status(201).json(new apiResponse(201, "Tour booked successfully", newTourBooking));


});

const getAll = asyncHandler(async (req, res) => {
    const tourBookings = await TourPackage.find().sort({ createdAt: -1 });
    res.status(200).json(new apiResponse(200, "Tour bookings retrieved successfully", tourBookings));
});

const updateTourPackageStatus = asyncHandler(async (req, res) => {
    try {
        const bookingId = req.params.bookingId;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json(new apiError(400, "Status field is required"));
        }

        if (!["pending", "approved", "cancelled"].includes(status)) {
            return res.status(400).json(new apiError(400, "Invalid status value"));
        }
        const updatedBooking = await TourPackage.findByIdAndUpdate(
            bookingId,
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