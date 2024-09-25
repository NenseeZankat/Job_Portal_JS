import mongoose from "mongoose";

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

export { createJob, getJobById, deleteJob, getAllJobs, updateJob, searchJobs,
     getPaginatedJobs, softDeleteJob, restoreJob, countJobs, deleteMultipleJobs };
