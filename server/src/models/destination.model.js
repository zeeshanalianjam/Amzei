import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    imageUrl: { type: String, required: true },
    shortDescription: { type: String, required: true },
    detailedDescription: { type: String, required: true },
    reviews: { type: [String], default: [] },
    rating: { type: Number, default: 0 },
    currency: { type: String, required: true, default: "AED" },
    highlights: { type: [String], default: [] },
    bestTimeToVisit: { type: String, required: true },
    pricingDetails: [
        {
            perPerson: { type: Number, required: true },
            perRoom: { type: Number, required: true },
            perDay: { type: Number, required: true },
            taxFee: { type: Number, required: true },
        }
    ],
    overview: [
        {
            title: { type: String, required: true },
        }
    ],
    thingsToDo: [
        {
            title: { type: String, default: "" },
            description: { type: String, default: "" },
            imageUrl: { type: String, default: "" },
            duration: { type: String, default: "" },
            price: { type: Number, default: 0 },
        }
    ],
    accommodations: [
        {
            title: { type: String, default: "" },
            description: { type: String, default: "" },
            imageUrl: { type: String, default: "" },
            price: { type: Number, default: 0 },
            priceType: { type: String, default: "night" },
        }
    ],
    restaurants: [
        {
            title: { type: String, default: "" },
            description: { type: String, default: "" },
            imageUrl: { type: String, default: "" },
            price: { type: Number, default: 0 },
            priceType: { type: String, default: "person" },
        }
    ],
    travelTips: [
        {
            title: { type: String, default: "" },
            options: { type: [String], default: [] },
        }
    ]


}, { timestamps: true });

export const Destination = mongoose.model("Destination", destinationSchema);