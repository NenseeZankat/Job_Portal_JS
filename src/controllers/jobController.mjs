import mongoose from "mongoose";

import path from 'path';
import fs from 'fs';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { Resume } from '../models/resume.mjs';

import { Jobs } from "../models/job.mjs";

import { Applications } from "../models/application.mjs";

// Create a Job
const createJob = async (req, res) => {
    const newJob = new Jobs(req.body);
    try {
        const savedJob = await newJob.save();
        res.send(savedJob);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const getJobsByCategory = async (req, res, next) => {
    try {
      const { categoryId } = req.params;
  
      // Find jobs that match the given category
      const jobs = await Jobs.find({ categoryId })
        .populate('companyId categoryId postedBy')
        .exec();
  
      if (!jobs || jobs.length === 0) {
        return res.status(404).json({ message: 'No jobs found for this category.' });
      }
  
      // Return jobs found
      res.json(jobs);
    } catch (error) {
      next(error);
    }
  };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); 
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.fieldname}${ext}`);  
  }
});

// Enhanced error handling for multer
const upload = multer({ 
  storage, 
  limits: { fileSize: 2 * 1024 * 1024 }, 
}).single('resume');

// Middleware for file upload and application submission
const applyForJob = [
  (req, res, next) => {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        console.error('Multer Error:', err);
        return res.status(500).json({ message: 'File upload error', error: err.message });
      } else if (err) {
        console.error('Unknown Upload Error:', err);
        return res.status(500).json({ message: 'Unknown error during file upload', error: err.message });
      }
      next();
    });
  },
  async (req, res) => {
    const { jobId } = req.params;  
    const { userId } = req.body;  

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({ message: 'Invalid job ID' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Resume is required' });
    }

    try {
      // Save resume to the Resume model
      const resume = new Resume({
        userId: new mongoose.Types.ObjectId(userId), 
        resumeFile: req.file.path,  
      });

      await resume.save();

      // Save application to Applications model
      const application = new Applications({
        userId: new mongoose.Types.ObjectId(userId),  
        jobId: new mongoose.Types.ObjectId(jobId),    
        resumeId: resume._id,  
        status: 'applied',     
      });

      await application.save();

      res.status(200).json({ message: 'Application submitted successfully' });
    } catch (error) {
      console.error('Error in application submission:', error);

      if (error.name === 'ValidationError') {
        return res.status(400).json({ message: 'Invalid data provided', error: error.message });
      }

      res.status(500).json({ message: 'Server error. Please try again later.' });
    }
  }
];

// Get a Job by ID
const getJobById = async (req, res) => {
    try {
        const findJob = await Jobs.findById(req.params.id);
        if (findJob)
            res.send(findJob);
        else
            res.status(404).send("No Data Found");
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Delete a Job by ID
const deleteJob = async (req, res) => {
    try {
        const deletedJob = await Jobs.findByIdAndDelete(req.params.id);
        if (deletedJob) {
            res.status(200).send("Job is deleted");
            await Applications.deleteMany({ jobId: req.params.id });
        } else {
            res.status(404).send("No Data Found");
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
};


// Get All Jobs
const getAllJobs = async (req, res) => {
    try {
        const jobs = await Jobs.find();
        if (jobs.length)
            res.send(jobs);
        else
            res.status(404).send("No Data Found");
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Update a Job
const updateJob = async (req, res) => {
    try {
        const updatedJob = await Jobs.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );

        if (updatedJob) {
            res.status(200).send(updatedJob);
        } else {
            res.status(404).send("No Data Found");
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Search Jobs by Criteria
const searchJobs = async (req, res) => {
    const { title, skills, city, state, country, companyId, categoryId } = req.query;

    try {
        const query = {};

        if (title) query.title = { $regex: title, $options: "i" };
        if (skills) query.skillsRequired = { $in: skills.split(",") };
        if (city || state || country) {
            query.address = {
                ...(city && { city: { $regex: city, $options: "i" } }),
                ...(state && { state: { $regex: state, $options: "i" } }),
                ...(country && { country: { $regex: country, $options: "i" } }),
            };
        }
        if (companyId) query.companyId = companyId;
        if (categoryId) query.categoryId = categoryId;

        const jobs = await Jobs.find(query);

        if (jobs.length) res.send(jobs);
        else res.status(404).send("No Data found");
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Get Paginated Jobs
const getPaginatedJobs = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    try {
        const jobs = await Jobs.find()
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const count = await Jobs.countDocuments();

        res.json({
            jobs,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Soft Delete a Job
const softDeleteJob = async (req, res) => {
    try {
        const updatedJob = await Jobs.findByIdAndUpdate(
            req.params.id,
            { $set: { isActive: false } },
            { new: true }
        );

        if (updatedJob) {
            res.status(200).send("Job is marked as inactive");
        } else {
            res.status(404).send("No Data Found");
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Restore a Soft Deleted Job
const restoreJob = async (req, res) => {
    try {
        const restoredJob = await Jobs.findByIdAndUpdate(
            req.params.id,
            { $set: { isActive: true } },
            { new: true }
        );

        if (restoredJob) {
            res.status(200).send("Job is restored and active again");
        } else {
            res.status(404).send("No Data Found");
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Count Jobs
const countJobs = async (req, res) => {
    try {
        const jobCount = await Jobs.countDocuments(req.query);
        res.json({ jobCount });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Delete Multiple Jobs
const deleteMultipleJobs = async (req, res) => {
    const { companyId, categoryId } = req.body;

    try {
        const query = {};
        if (companyId) query.companyId = companyId;
        if (categoryId) query.categoryId = categoryId;

        const result = await Jobs.deleteMany(query);

        if (result.deletedCount > 0) {
            res.status(200).send(`${result.deletedCount} jobs deleted`);
        } else {
            res.status(404).send("No jobs found for deletion");
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export { createJob, getJobById, deleteJob, getAllJobs, updateJob, searchJobs, applyForJob, getJobsByCategory,
     getPaginatedJobs, softDeleteJob, restoreJob, countJobs, deleteMultipleJobs };
