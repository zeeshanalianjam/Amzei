import { Router } from "express";
import { jwtVerify } from "../middlewares/auth.middleware.js";
import { addEvent, deleteEvent, getEvents, updateEvent } from "../controllers/event.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const eventRouter = Router()

eventRouter.route('/add').post(jwtVerify, upload.single('image'), addEvent);
eventRouter.route('/get-all-events').get(getEvents);
eventRouter.route('/update/:id').put(jwtVerify, upload.single('image'), updateEvent);
eventRouter.route('/delete/:id').delete(jwtVerify, deleteEvent);

export { eventRouter };