import { Destination } from "../models/destination.model.js";
import { uploadImageOnCloudinary } from "../services/cloudinary.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";



const addDestination = asyncHandler(async (req, res) => {
    try {
        let body = { ...req.body };

        if (typeof body.pricingDetails === "string") {
            try {
                body.pricingDetails = JSON.parse(body.pricingDetails);
            } catch (err) {
                return res.status(400).json(new apiError(400, "Invalid JSON format for pricingDetails"));
            }
        }

        if(typeof body.tripTypePricing === "string") {
            try {
                body.tripTypePricing = JSON.parse(body.tripTypePricing);
            } catch (err) {
                return res.status(400).json(new apiError(400, "Invalid JSON format for tripTypePricing"));
            }
        }

        if(typeof body.tourTypePricing === "string") {
            try {
                body.tourTypePricing = JSON.parse(body.tourTypePricing);
            } catch (err) {
                return res.status(400).json(new apiError(400, "Invalid JSON format for tourTypePricing"));
            }
        }

        const requiredFields = [
            'name',
            'location',
            'shortDescription',
            'detailedDescription',
            'currency',
            'bestTimeToVisit',
            'pricingDetails',
            'tripTypePricing',
            'tourTypePricing',
            'language',
            'highlights'
        ];

        for (const field of requiredFields) {
            if (!body[field]) {
                return res.status(400).json(new apiError(400, `Field '${field}' is required`));
            }
        }

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

        if (
            !Array.isArray(body.tripTypePricing) ||
            body.tripTypePricing.length === 0 ||
            !body.tripTypePricing[0].solo ||
            !body.tripTypePricing[0].couple ||
            !body.tripTypePricing[0].family ||
            !body.tripTypePricing[0].group
        ) {
            return res.status(400).json(
                new apiError(400, "Please provide solo, couple, family, and group in tripTypePricing.")
            );
        }

        if (
            !Array.isArray(body.tourTypePricing) ||
            body.tourTypePricing.length === 0 ||
            !body.tourTypePricing[0].adventure ||
            !body.tourTypePricing[0].cultural ||
            !body.tourTypePricing[0].relaxation ||
            !body.tourTypePricing[0].wildlife ||
            !body.tourTypePricing[0].historical
        ) {
            return res.status(400).json(
                new apiError(400, "Please provide adventure, cultural, relaxation, wildlife, and historical in tourTypePricing.")
            );
        }

      
        const existingDestination = await Destination.findOne({ name: body.name, location: body.location });
        if (existingDestination) {
            return res.status(400).json(new apiError(400, "Destination already exists"));
        }


        let imageUrl = "";
        if (req.file?.path) {
            const uploaded = await uploadImageOnCloudinary(req.file.path);
            imageUrl = uploaded.secure_url;
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
    let body = { ...req.body };

    // ✅ Parse JSON field (only if exists and is string)
    if (typeof body.pricingDetails === "string") {
      try {
        body.pricingDetails = JSON.parse(body.pricingDetails);
      } catch (err) {
        return res.status(400).json(new apiError(400, "Invalid JSON format for pricingDetails"));
      }
    }

    if(typeof body.tripTypePricing === "string") {
        try {
            body.tripTypePricing = JSON.parse(body.tripTypePricing);
        } catch (err) {
            return res.status(400).json(new apiError(400, "Invalid JSON format for tripTypePricing"));
        }
    }

    if(typeof body.tourTypePricing === "string") {
        try {
            body.tourTypePricing = JSON.parse(body.tourTypePricing);
        } catch (err) {
            return res.status(400).json(new apiError(400, "Invalid JSON format for tourTypePricing"));
        }
    }

    // ✅ Find existing destination
    const destination = await Destination.findById(id);
    if (!destination) {
      return res.status(404).json(new apiError(404, "Destination not found"));
    }

    // ✅ Handle single image upload (same as addDestination)
    let imageUrl = destination.imageUrl;
    if (req.file?.path) {
      const uploaded = await uploadImageOnCloudinary(req.file.path);
      imageUrl = uploaded.secure_url;
    }

    // ✅ Construct updated data
    const updatedData = {
      ...body,
      imageUrl: imageUrl || body.imageUrl,
    };

    // ✅ Update destination in DB
    Object.assign(destination, updatedData);
    const updatedDestination = await destination.save();

    res.status(200).json(new apiResponse(200, "Destination updated successfully", updatedDestination));
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

