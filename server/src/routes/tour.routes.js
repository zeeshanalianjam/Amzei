import { Router } from "express";
import { jwtVerify } from "../middlewares/auth.middleware.js";
import { addTour, deleteTour, getTours, updateTour } from "../controllers/tour.controller.js";
import { upload } from "../middlewares/multer.middleware.js";


const tourRouter = Router()

tourRouter.route('/add').post(jwtVerify, upload.single('image'), addTour);
tourRouter.route('/get-all-tours').get(jwtVerify, getTours);
tourRouter.route('/update/:id').put(jwtVerify, upload.single('image'), updateTour);
tourRouter.route('/delete/:id').delete(jwtVerify, deleteTour);

export { tourRouter };