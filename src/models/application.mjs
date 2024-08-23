import mongoose from "mongoose";

import { Jobs } from "./job.mjs";

import { Users } from "./user.mjs";

const applicationSchema = new mongoose.Schema({
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Jobs', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    resumeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Resumes', required: true },
    coverLetter: mongoose.Schema.Types.String,
    status: { type: mongoose.Schema.Types.String, enum: ['applied', 'under_review', 'interviewed', 'rejected', 'hired'], default: 'applied' },
    appliedAt: { type: mongoose.Schema.Types.Date, default: Date.now },
    updatedAt: { type: mongoose.Schema.Types.Date, default: Date.now }
});

export const Applications = mongoose.model('Applications', applicationSchema);
