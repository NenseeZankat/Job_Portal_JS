import { Router } from "express";

import { Jobs } from "../models/job.mjs";

import { createJob, getJobById , deleteJob ,getAllJobs , updateJob} from "../controllers/jobController.mjs";

const router = Router();

router.post("/api/job", createJob );

router.delete("/api/job/:id", deleteJob);

router.get("/api/job/:id", getJobById);

router.get("/api/job", getAllJobs);

router.put("/api/job/:id", updateJob);

export default router;
