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
        min: 1,
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
        enum: ["pending", "approved", "cancelled"],
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
        min: 1,
    },
    numberOfRooms: {
        type: Number,
        default: 0,
        min: 0,
    },
    nationality: {
        type: String,
        trim: true,
        default: "Not specified",
    },
    pricingDetails: [
        {
            personCost: {
                type: Number,
                required: true,
            },
            roomCost: {
                type: Number,
                required: true,
            },
            dayCost: {
                type: Number,
                required: true,
            },
            tripTypeCost: {
                type: Number,
                required: true,
            },
            tourTypeCost: {
                type: Number,
                required: true,
            },
            subtotal: {
                type: Number,
                required: true,
            },
            tax: {
                type: Number,
                required: true,
            },
            total: {
                type: Number,
                required: true,
            },
        }
    ]
}, { timestamps: true });

export const TourBooking = mongoose.model("TourBooking", tourBookingSchema);


