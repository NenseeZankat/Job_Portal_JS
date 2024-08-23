import mongoose, { Types } from "mongoose";

import { Jobs } from "./job.mjs";

import { Resume } from "./resume.mjs";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: mongoose.Schema.Types.String, required: true, unique: true },
    password: { type: mongoose.Schema.Types.String, required: true },
    userType: { type: mongoose.Schema.Types.String, enum: ['job_seeker', 'employer'], required: true },
    profile: {
        contact: mongoose.Schema.Types.String,
        address: [{
            city: {type : mongoose.Schema.Types.String},
            pincode: {type : mongoose.Schema.Types.Number , length: 6},
            state: {type : mongoose.Schema.Types.String},
            country: {type : mongoose.Schema.Types.String}
        }],
        experience: mongoose.Schema.Types.Number,
        skills: [mongoose.Schema.Types.String],
        resumeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Resume' }
    },
    appliedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Jobs' }],
    postedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Jobs' }],
    createdAt: { type: mongoose.Schema.Types.Date, default: Date.now },
    updatedAt: { type: mongoose.Schema.Types.Date, default: Date.now }
});

export const Users = mongoose.model("Users",userSchema);
