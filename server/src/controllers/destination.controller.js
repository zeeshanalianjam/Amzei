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

        const requiredFields = [
            'name',
            'location',
            'shortDescription',
            'detailedDescription',
            'currency',
            'bestTimeToVisit',
            'pricingDetails',
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

      
        const existingDestination = await Destination.findOne({ name: body.name, location: body.location });
        if (existingDestination) {
            return res.status(400).json(new apiError(400, "Destination already exists"));
        }

        
        let imageUrl = "";
        if (req.files?.imageUrl?.[0]) {
            const uploaded = await uploadImageOnCloudinary(req.files.imageUrl[0].path);
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

    // ✅ Parse JSON fields (same as addDestination)
    const jsonFields = ["pricingDetails", "overview", "thingsToDo", "accommodations", "restaurants", "travelTips"];
    for (const field of jsonFields) {
      if (typeof body[field] === "string") {
        try {
          body[field] = JSON.parse(body[field]);
        } catch (err) {
          return res.status(400).json(new apiError(400, `Invalid JSON format for ${field}`));
        }
      }
    }

    let destination = await Destination.findById(id);
    if (!destination) {
      return res.status(404).json(new apiError(404, "Destination not found"));
    }

    // ✅ Update Main Image
    if (req.files?.imageUrl?.[0]) {
      const uploaded = await uploadImageOnCloudinary(req.files.imageUrl[0].path);
      body.imageUrl = uploaded.secure_url;
    }

    // ✅ Update Things To Do Images
    if (req.files?.thingsToDoImageUrl) {
      body.thingsToDo = await Promise.all(
        body.thingsToDo.map(async (item, index) => {
          const file = req.files.thingsToDoImageUrl[index];
          if (file) {
            const uploaded = await uploadImageOnCloudinary(file.path);
            return { ...item, imageUrl: uploaded.secure_url };
          }
          return item;
        })
      );
    }

    // ✅ Update Accommodations Images
    if (req.files?.accommodationImageUrl) {
      body.accommodations = await Promise.all(
        body.accommodations.map(async (item, index) => {
          const file = req.files.accommodationImageUrl[index];
          if (file) {
            const uploaded = await uploadImageOnCloudinary(file.path);
            return { ...item, imageUrl: uploaded.secure_url };
          }
          return item;
        })
      );
    }

    // ✅ Update Restaurants Images
    if (req.files?.restaurantImageUrl) {
      body.restaurants = await Promise.all(
        body.restaurants.map(async (item, index) => {
          const file = req.files.restaurantImageUrl[index];
          if (file) {
            const uploaded = await uploadImageOnCloudinary(file.path);
            return { ...item, imageUrl: uploaded.secure_url };
          }
          return item;
        })
      );
    }

    // ✅ Update document in DB
    Object.assign(destination, body);

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

