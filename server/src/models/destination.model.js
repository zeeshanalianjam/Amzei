import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    imageUrl: { type: String, required: true },
    shortDescription: { type: String, required: true },
    detailedDescription: { type: String, required: true },
    reviews: { type: [String], default: [], set: v => Array.isArray(v) ? v : String(v).split(',').map(s => s.trim())},
    rating: { type: Number, default: 0 },
    currency: { type: String, required: true, default: "AED" },
    highlights: { type: [String], required: true, set: v => Array.isArray(v) ? v : String(v).split(',').map(s => s.trim())},
    bestTimeToVisit: { type: String, required: true },
    pricingDetails: [
        {
            perPerson: { type: Number, required: true },
            perRoom: { type: Number, required: true },
            perDay: { type: Number, required: true },
            taxFee: { type: Number, required: true },
        }
    ],


}, { timestamps: true });

export const Destination = mongoose.model("Destination", destinationSchema);