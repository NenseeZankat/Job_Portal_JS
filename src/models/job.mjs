import mongoose, { Types } from "mongoose";

import { Users } from './user.mjs';

import { Companies } from "./company.mjs";

import { Categories } from "./category.mjs";

const jobSchema = new mongoose.Schema({
    title: { type: mongoose.Schema.Types.String, required: true },
    description: { type: mongoose.Schema.Types.String, required: true },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Companies', required: true },
    address: [{
        city: {type : mongoose.Schema.Types.String},
        pincode: {type : mongoose.Schema.Types.Number , length: 6},
        state: {type : mongoose.Schema.Types.String},
        country: {type : mongoose.Schema.Types.String}
    }],
    salary: mongoose.Schema.Types.Number,
    experienceRequired: mongoose.Schema.Types.Number,
    skillsRequired: [mongoose.Schema.Types.String],
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Categories', required: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
    createdAt: { type: mongoose.Schema.Types.Date, default: Date.now },
    updatedAt: { type: mongoose.Schema.Types.Date, default: Date.now }
});


export const Jobs = mongoose.model("Jobs",jobSchema);