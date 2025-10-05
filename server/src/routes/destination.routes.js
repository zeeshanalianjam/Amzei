import { Router } from "express";
import { jwtVerify } from "../middlewares/auth.middleware.js";
import { addDestination, deleteDestination, getDestinations, updateDestination } from "../controllers/destination.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const destinationRouter = Router()

destinationRouter.route('/add').post(jwtVerify, upload.fields([
    { name: "imageUrl", maxCount: 1 },
    { name: "thingsToDoImageUrl", maxCount: 10 },
    { name: "accommodationImageUrl", maxCount: 10 },
    { name: "restaurantImageUrl", maxCount: 10 }
]), addDestination);
destinationRouter.route('/get-all-destinations').get(getDestinations);
destinationRouter.route('/update/:id').put(jwtVerify, upload.fields([
    { name: "imageUrl", maxCount: 1 },
    { name: "thingsToDoImageUrl", maxCount: 10 },
    { name: "accommodationImageUrl", maxCount: 10 },
    { name: "restaurantImageUrl", maxCount: 10 }
]), updateDestination);
destinationRouter.route('/delete/:id').delete(jwtVerify, deleteDestination);

export { destinationRouter };