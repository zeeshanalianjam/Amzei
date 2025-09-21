import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    imageUrl: { type: String, required: true },
    shortDescription: { type: String, required: true },
    detailedDescription: { type: String, required: true },
}, { timestamps: true });

export const Destination = mongoose.model("Destination", destinationSchema);