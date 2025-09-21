import mongoose from "mongoose";

const tourSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: Number, required: true }, 
    location: { type: String, required: true },
    imageUrl: { type: String, required: true },
    highlights: { type: [String], default: [] },
}, { timestamps: true });

export const Tour = mongoose.model("Tour", tourSchema);