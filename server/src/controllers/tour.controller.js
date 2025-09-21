import { Tour } from "../models/tour.model.js";
import { uploadImageOnCloudinary } from "../services/cloudinary.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addTour = asyncHandler(async (req, res) => {
    try {
        const { title, description, price, duration, location, highlights } = req.body;

        if (!title || !description || !price || !duration || !location ) {
            return res.status(400).json(new apiError(400, "Please fill all required fields"));
        }

        if (title.length < 6) {
            return res.status(400).json(new apiError(400, "Title must be at least 6 characters long"));
        }

        const existingTour = await Tour.findOne({ title, location });
        if (existingTour) {
            return res.status(400).json(new apiError(400, "Tour already exists"));
        }

        const imageUrl = req.file?.path;

        if (!imageUrl) {
            return res.status(400).json(new apiError(400, "Image is required"));
        }

        const image = await uploadImageOnCloudinary(imageUrl);

        const newTour = await Tour.create({
            title,
            description,
            price,
            duration,
            location,
            highlights,
            imageUrl: image.secure_url,
        });

        res.status(201).json(new apiResponse(201, "Tour added successfully", newTour));

    } catch (error) {
        console.error("Error during adding a tour:", error);
        res.status(500).json(new apiError(500, "Internal Server Error: Adding a tour failed"));
    }
});

const getTours = asyncHandler(async (req, res) => {
    try {
        const tours = await Tour.find();
        res.status(200).json(new apiResponse(200, "Tours retrieved successfully", tours));
    } catch (error) {
        console.error("Error retrieving tours:", error);
        res.status(500).json(new apiError(500, "Internal Server Error: Retrieving tours failed"));
    }
});

const updateTour = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, price, duration, location, highlights } = req.body;

        const tour = await Tour.findById(id);
        if (!tour) {
            return res.status(404).json(new apiError(404, "Tour not found"));
        }

        const imageUrl = req.file?.path;
        let updatedImageUrl = tour.imageUrl;

        if (imageUrl) {
            const image = await uploadImageOnCloudinary(imageUrl);
            updatedImageUrl = image.secure_url;
        }

        tour.title = title || tour.title;
        tour.description = description || tour.description;
        tour.price = price || tour.price;
        tour.duration = duration || tour.duration;
        tour.location = location || tour.location;
        tour.highlights = highlights || tour.highlights;
        tour.imageUrl = updatedImageUrl;

        const updatedTour = await tour.save();
        res.status(200).json(new apiResponse(200, "Tour updated successfully", updatedTour));
    } catch (error) {
        console.error("Error updating tour:", error);
        res.status(500).json(new apiError(500, "Internal Server Error: Updating tour failed"));
    }
});

const deleteTour = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTour = await Tour.findByIdAndDelete(id);
        if (!deletedTour) {
            return res.status(404).json(new apiError(404, "Tour not found"));
        }
        res.status(200).json(new apiResponse(200, "Tour deleted successfully", deletedTour));
    } catch (error) {
        console.error("Error deleting tour:", error);
        res.status(500).json(new apiError(500, "Internal Server Error: Deleting tour failed"));
    }
});
        

        

export { addTour, getTours, updateTour, deleteTour };