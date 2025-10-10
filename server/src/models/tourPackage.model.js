import mongoose from "mongoose";

const tourPackageSchema = new mongoose.Schema({
    fullName: {
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
    tourLocation: {
        type: String,
        default: "Dubai",
        required: true,
    },
    tourTitle: {
        type: String,
        required: true,
    },
    travelDate: {
        type: Date,
        required: true,
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
    status: {
        type: String,
        enum: ["pending", "approved", "cancelled"],
        default: "pending",
    },
    numberOfDays: {
        type: Number,
        default: 1,
        min: 1,
    },
    pricingDetails: [
        {
            additionalCost: {
                type: Number,
            },
            basePrice: {
                type: Number,
            },
            perPersonPrice: {
                type: Number,
            },
            totalPrice: {
                type: Number,
            },
        }
    ]
}, { timestamps: true });

export const TourPackage = mongoose.model("TourPackage", tourPackageSchema);


