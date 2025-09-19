import mongoose from "mongoose";

const tourBookingSchema = new mongoose.Schema({
    FullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        enum: [
            "Dubai",
            "Abu Dhabi",
            "Sharjah",
            "Ajman",
            "Fujairah",
            "Ras Al Khaimah",
            "Umm Al Quwain",
            "Paris",
            "New York",
            "Tokyo",
            "Sydney",
            "Rome",
            "Cairo",
            "Bangkok",
            "London"
        ],
        default: "Dubai",
        required: true,
    },

    preferredTravelDate: {
        type: Date,
        required: true,
    },
    checkIn: {
        type: Date,
    },
    checkOut: {
        type: Date,
    },
    numberOfGuests: {
        type: Number,
        default: 1,
    },
    specialRequests: {
        type: String,
        trim: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "cancelled"],
        default: "pending",
    },
    tripType: {
        type: String,
        enum: ["solo", "couple", "family", "group"],
        default: "solo",
    },
    kindOfTour: {
        type: String,
        enum: ["adventure", "cultural", "relaxation", "wildlife", "historical"],
        default: "adventure",
    },
    numberOfDays: {
        type: Number,
        default: 1,
    },
    numberOfRooms: {
        type: Number,
        default: 1,
    },
    nationality: {
        type: String,
        trim: true,
        default: "Not specified",
    },
}, { timestamps: true });

export const TourBooking = mongoose.model("TourBooking", tourBookingSchema);


