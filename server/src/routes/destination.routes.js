import { Router } from "express";
import { jwtVerify } from "../middlewares/auth.middleware.js";
import { addDestination, deleteDestination, getDestinations, updateDestination } from "../controllers/destination.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const destinationRouter = Router()

destinationRouter.route('/add').post(jwtVerify, upload.single('imageUrl'), addDestination);
destinationRouter.route('/get-all-destinations').get(getDestinations);
destinationRouter.route('/update/:id').put(jwtVerify, upload.single('imageUrl'), updateDestination);
destinationRouter.route('/delete/:id').delete(jwtVerify, deleteDestination);

export { destinationRouter };