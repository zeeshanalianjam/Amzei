import { Event } from "../models/event.model.js";
import { uploadImageOnCloudinary } from "../services/cloudinary.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addEvent = asyncHandler (async (req, res) => {
    try {
        const { title, date, location, description } = req.body;

        if (!title || !date || !location || !description ) {
            return res.status(400).json(new apiError(400, "Please fill all required fields"));
        }

        const existingEvent = await Event.findOne({ title, location });
        if (existingEvent) {
            return res.status(400).json(new apiError(400, "Event already exists"));
        }

        const imageUrl = req.file?.path;

        if (!imageUrl) {
            return res.status(400).json(new apiError(400, "Image is required"));
        }

        const image = await uploadImageOnCloudinary(imageUrl);

        const newEvent = await Event.create({
            title,
            date,
            location,
            imageUrl: image.secure_url,
            description
        });

        res.status(201).json(new apiResponse(201, "Event added successfully", newEvent));
    } catch (error) {
        console.error("Error adding event:", error);
        return res.status(500).json(new apiError(500, "Internal Server Error: Adding event failed"));
    }
});

const getEvents = asyncHandler(async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(new apiResponse(200, "Events retrieved successfully", events));
    } catch (error) {
        console.error("Error retrieving events:", error);
        res.status(500).json(new apiError(500, "Internal Server Error: Retrieving events failed"));
    }
});

const updateEvent = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { title, date, location, description } = req.body;
        const event = await Event.findById(id);

        if (!event) {
            return res.status(404).json(new apiError(404, "Event not found"));
        }

        if (req.files?.image) {
            const imageUrl = req.file?.path;
            const image = await uploadImageOnCloudinary(imageUrl);
            event.imageUrl = image.secure_url;
        }

        event.title = title || event.title;
        event.date = date || event.date;
        event.location = location || event.location;
        event.description = description || event.description;

        const updatedEvent = await event.save();
        res.status(200).json(new apiResponse(200, "Event updated successfully", updatedEvent));
    } catch (error) {
        console.error("Error updating event:", error);
        res.status(500).json(new apiError(500, "Internal Server Error: Updating event failed"));
    }
});

const deleteEvent = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json(new apiError(404, "Event not found"));
        }
        await Event.findByIdAndDelete(id);
        res.status(200).json(new apiResponse(200, "Event deleted successfully"));
    } catch (error) {
        console.error("Error deleting event:", error);
        res.status(500).json(new apiError(500, "Internal Server Error: Deleting event failed"));
    }
});

export { addEvent, getEvents, updateEvent, deleteEvent };