import { Router } from "express";
import { createJob,  getJobById, deleteJob, getAllJobs, getJobsByCategory,
    updateJob,  searchJobs, getPaginatedJobs, softDeleteJob, 
    restoreJob, countJobs, deleteMultipleJobs , applyForJob } from "../controllers/jobController.mjs";

const router = Router();

// Create a Job
router.post("/api/job", createJob);

// Get a Job by ID
router.get("/api/job/:id", getJobById);

router.post('/api/jobs/:jobId/apply', applyForJob);

router.get('/api/jobs/category/:categoryId', getJobsByCategory);

// router.get('/api/jobs', async (req, res) => {
//     try {
//       const jobs = await Jobs.find()
//         .populate('companyId') // Populating company details
//         .populate('categoryId') // Populating category details if needed
//         .populate('postedBy') // Optionally, populate user details who posted the job
//         .exec();
//       res.status(200).json(jobs);
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: 'Server error while fetching jobs' });
//     }
//   });

// router.get('/jobs', async (req, res) => {
//     try {
//       // Fetch jobs without populating related fields
//       const jobs = await Jobs.find().exec();
//       res.status(200).json(jobs);
//     } catch (error) {
//       console.error('Error fetching jobs:', error);
//       res.status(500).json({ message: 'Server error while fetching jobs' });
//     }
//   });

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
