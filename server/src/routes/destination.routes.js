import { Router } from "express";
import { jwtVerify } from "../middlewares/auth.middleware.js";
import { addDestination, deleteDestination, getDestinations, updateDestination } from "../controllers/destination.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const destinationRouter = Router()

destinationRouter.route('/add').post(jwtVerify,upload.single('image'), addDestination);
destinationRouter.route('/get-all-destinations').get(jwtVerify, getDestinations);
destinationRouter.route('/update/:id').put(jwtVerify,upload.single('image'), updateDestination);
destinationRouter.route('/delete/:id').delete(jwtVerify, deleteDestination);

export { destinationRouter };