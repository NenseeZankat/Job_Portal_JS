import { Router } from "express";

import { Applications } from "../models/application.mjs";

import { createApplication, getApplicationById , deleteApplication ,getAllApplications} from "../controllers/applicationController.mjs";

const router = Router();

router.post("/api/application",createApplication);

router.get("/api/application/:id",getApplicationById);

router.delete("/api/application/:id", deleteApplication);

router.get("/api/application",getAllApplications);

export default router;
