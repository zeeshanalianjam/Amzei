import { Destination } from "../models/destination.model.js";
import { uploadImageOnCloudinary } from "../services/cloudinary.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";



const addDestination = asyncHandler(async (req, res) => {
    try {
        // ✅ Parse JSON fields if they are strings
        let body = { ...req.body };

        if (typeof body.pricingDetails === "string") {
            try {
                body.pricingDetails = JSON.parse(body.pricingDetails);
            } catch (err) {
                return res.status(400).json(new apiError(400, "Invalid JSON format for pricingDetails"));
            }
        }

        if (typeof body.overview === "string") {
            try {
                body.overview = JSON.parse(body.overview);
            } catch (err) {
                return res.status(400).json(new apiError(400, "Invalid JSON format for overview"));
            }
        }

        if (typeof body.thingsToDo === "string") {
            try {
                body.thingsToDo = JSON.parse(body.thingsToDo);
            } catch (err) {
                return res.status(400).json(new apiError(400, "Invalid JSON format for thingsToDo"));
            }
        }

        if (typeof body.accommodations === "string") {
            try {
                body.accommodations = JSON.parse(body.accommodations);
            } catch (err) {
                return res.status(400).json(new apiError(400, "Invalid JSON format for accommodations"));
            }
        }

        if (typeof body.restaurants === "string") {
            try {
                body.restaurants = JSON.parse(body.restaurants);
            } catch (err) {
                return res.status(400).json(new apiError(400, "Invalid JSON format for restaurants"));
            }
        }

        if (typeof body.travelTips === "string"){
            try {
                body.travelTips = JSON.parse(body.travelTips);
            } catch (err) {
                return res.status(400).json(new apiError(400, "Invalid JSON format for travelTips"));
            }
        }

        // ✅ Required fields validation
        const requiredFields = [
            'name',
            'location',
            'shortDescription',
            'detailedDescription',
            'currency',
            'bestTimeToVisit',
            'pricingDetails',
            'overview'
        ];

        for (const field of requiredFields) {
            if (!body[field]) {
                return res.status(400).json(new apiError(400, `Field '${field}' is required`));
            }
        }

        // ✅ Pricing Details check
        if (
            !Array.isArray(body.pricingDetails) ||
            body.pricingDetails.length === 0 ||
            !body.pricingDetails[0].perPerson ||
            !body.pricingDetails[0].perRoom ||
            !body.pricingDetails[0].perDay ||
            !body.pricingDetails[0].taxFee
        ) {
            return res.status(400).json(
                new apiError(400, "Please provide perPerson, perRoom, perDay, and taxFee in pricing details.")
            );
        }

        // ✅ Overview check
        if (
            !Array.isArray(body.overview) ||
            body.overview.length === 0 ||
            !body.overview[0].title
        ) {
            return res.status(400).json(
                new apiError(400, "Please provide a title in the overview.")
            );
        }

        // ✅ Duplicate check
        const existingDestination = await Destination.findOne({ name: body.name, location: body.location });
        if (existingDestination) {
            return res.status(400).json(new apiError(400, "Destination already exists"));
        }

        // ✅ Image uploads
        let imageUrl = "";
        if (req.files?.imageUrl?.[0]) {
            const uploaded = await uploadImageOnCloudinary(req.files.imageUrl[0].path);
            imageUrl = uploaded.secure_url;
        }

        if (req.files?.thingsToDoImageUrl?.[0]) {
            const uploaded = await uploadImageOnCloudinary(req.files.thingsToDoImageUrl[0].path);
            if (body.thingsToDo && body.thingsToDo[0]) {
                body.thingsToDo[0].imageUrl = uploaded.secure_url;
            }
        }

        if (req.files?.accommodationImageUrl?.[0]) {
            const uploaded = await uploadImageOnCloudinary(req.files.accommodationImageUrl[0].path);
            if (body.accommodations && body.accommodations[0]) {
                body.accommodations[0].imageUrl = uploaded.secure_url;
            }
        }

        if (req.files?.restaurantImageUrl?.[0]) {
            const uploaded = await uploadImageOnCloudinary(req.files.restaurantImageUrl[0].path);
            if (body.restaurants && body.restaurants[0]) {
                body.restaurants[0].imageUrl = uploaded.secure_url;
            }
        }

        const destinationData = {
            ...body,
            imageUrl: imageUrl || body.imageUrl
        };

        const newDestination = await Destination.create(destinationData);

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

