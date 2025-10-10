
import { Router } from "express";

import { jwtVerify } from "../middlewares/auth.middleware.js";
import { add, getAll, updateTourPackageStatus } from "../controllers/tourPackage.controller.js";

const tourPackageRouter = Router();

tourPackageRouter.route("/book").post(jwtVerify, add);
tourPackageRouter.route("/fetch-all-tour-packages").get(getAll);
tourPackageRouter.route("/update/:bookingId").put(jwtVerify, updateTourPackageStatus);

export { tourPackageRouter };