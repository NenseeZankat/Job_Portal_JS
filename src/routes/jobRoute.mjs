import { Router } from "express";
import { createJob,  getJobById, deleteJob, getAllJobs, 
    updateJob,  searchJobs, getPaginatedJobs, softDeleteJob, 
    restoreJob, countJobs, deleteMultipleJobs } from "../controllers/jobController.mjs";

const router = Router();

// Create a Job
router.post("/api/job", createJob);

// Get a Job by ID
router.get("/api/job/:id", getJobById);

// Delete a Job by ID
router.delete("/api/job/:id", deleteJob);

// Get All Jobs
router.get("/api/jobs", getAllJobs);

// Update a Job by ID
router.put("/api/job/:id", updateJob);

// Search Jobs by Criteria
router.get("/api/job/searchByCriteria", searchJobs);

// Get Paginated Jobs
router.get("/api/job/paginated", getPaginatedJobs);

// Soft Delete a Job
router.put("/api/job/softdelete/:id", softDeleteJob);

// Restore a Soft Deleted Job
router.put("/api/job/restore/:id", restoreJob);

// Count Jobs
router.get("/api/job/count", countJobs);

// Delete Multiple Jobs
router.delete("/api/jobs/multiple", deleteMultipleJobs);

export default router;
