import { Destination } from "../models/destination.model.js";
import { uploadImageOnCloudinary } from "../services/cloudinary.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const addDestination = asyncHandler(async (req, res) => {
    try {
        const { name, shortDescription, detailedDescription, location } = req.body;

        if (!name || !shortDescription || !detailedDescription || !location) {
            return res.status(400).json(new apiError(400, "Please fill all required fields"));
        }

        const existingDestination = await Destination.findOne({ name, location });
        if (existingDestination) {
            return res.status(400).json(new apiError(400, "Destination already exists"));
        }

        const imageUrl = req.file?.path;

        const image = await uploadImageOnCloudinary(imageUrl);

        const newDestination = await Destination.create({
            name,
            location,
            imageUrl: image.secure_url,
            shortDescription,
            detailedDescription,
        });

        res.status(201).json(new apiResponse(201, "Destination added successfully", newDestination));
        
    } catch (error) {
        console.error("Error during adding a destination:", error);
        res.status(500).json(new apiError(500, "Internal Server Error: Adding a destination failed"));
    }
});

const getDestinations = asyncHandler(async (req, res) => {
    try {
        const destinations = await Destination.find().sort({ createdAt: -1 });
        res.status(200).json(new apiResponse(200, "Destinations retrieved successfully", destinations));
    } catch (error) {
        console.error("Error retrieving destinations:", error);
        res.status(500).json(new apiError(500, "Internal Server Error: Retrieving destinations failed"));
    }
});

const updateDestination = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { name, shortDescription, detailedDescription, location } = req.body;
        let destination = await Destination.findById(id);

        if (!destination) {
            return res.status(404).json(new apiError(404, "Destination not found"));
        }

        if (req.file) {
            const imageUrl = req.file?.path;
            const image = await uploadImageOnCloudinary(imageUrl);
            destination.imageUrl = image.secure_url;
        }

        destination.name = name || destination.name;
        destination.location = location || destination.location;
        destination.shortDescription = shortDescription || destination.shortDescription;
        destination.detailedDescription = detailedDescription || destination.detailedDescription;

      const updateDestination = await destination.save();
        res.status(200).json(new apiResponse(200, "Destination updated successfully", updateDestination));
    } catch (error) {
        console.error("Error updating destination:", error);
        res.status(500).json(new apiError(500, "Internal Server Error: Updating destination failed"));
    }
});

const deleteDestination = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const destination = await Destination.findById(id);
        if (!destination) {
            return res.status(404).json(new apiError(404, "Destination not found"));
        }
        await Destination.findByIdAndDelete(id);
        res.status(200).json(new apiResponse(200, "Destination deleted successfully", null));
    }
    catch (error) {
        console.error("Error deleting destination:", error);
        res.status(500).json(new apiError(500, "Internal Server Error: Deleting destination failed"));
    }
});

export { addDestination, getDestinations, updateDestination, deleteDestination };

