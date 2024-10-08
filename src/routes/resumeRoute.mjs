import { Router } from "express";

import { Resume } from "../models/resume.mjs";

import {createResume , getResumeById , deleteResume , getAllResumes , updateResume} from "../controllers/resumeController.mjs"

const router = Router();



router.post("/api/resume",createResume);

router.get("/api/resume/:id", getResumeById);

router.delete("/api/resume/:id", deleteResume );

router.get("/api/resume", getAllResumes);

router.put("/api/resume/:id", updateResume);

export default router;
