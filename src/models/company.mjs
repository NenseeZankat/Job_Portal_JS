import mongoose, { Types } from "mongoose";

import { Jobs } from "./job.mjs";


const companySchema = new mongoose.Schema({
    name: { type: mongoose.Schema.Types.String, required: true },
    address: [{
        city: {type : mongoose.Schema.Types.String},
        pincode: {type : mongoose.Schema.Types.Number , length: 6},
        state: {type : mongoose.Schema.Types.String},
        country: {type : mongoose.Schema.Types.String}
    }],
    industry: mongoose.Schema.Types.String,
    description: mongoose.Schema.Types.String,
    website: mongoose.Schema.Types.String,
    jobsPosted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Jobs' }],
    createdAt: { type: mongoose.Schema.Types.Date, default: Date.now },
    updatedAt: { type: mongoose.Schema.Types.Date, default: Date.now }
});

export const Companies = mongoose.model('Companies', companySchema);
