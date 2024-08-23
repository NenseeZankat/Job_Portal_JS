import mongoose from "mongoose";

import { Jobs } from "../models/job.mjs";

import { Applications } from "../models/application.mjs";

const createJob = async (req,res)=>{
    // const {body} = req;
    const newjob = new Jobs(req.body);
    try{
    
        const savedjob = await newjob.save();
        res.send(savedjob);
    }
    catch(err)
    {
        res.status(500).send(err.message);
    }

};

const getJobById = async (req,res)=>{
    try
    {
        const findjob = await Jobs.findById(req.params.id);
        if(findjob)
            res.send(findjob);
        else
            res.status(404).send("NO Data Found");
    }
    catch(err)
    {
        res.status(500).send(err.message);
    }
    
};

const deleteJob = async (req, res) => {
    try {
        const deletedjob = await Jobs.findByIdAndDelete(req.params.id);
        if (deletedjob) {
            res.status(200).send("Job is deleted");
            const deletedapplication = await Applications.deleteMany({jobId : req.params.id});
        } else {
            res.status(404).send("NO Data Found");
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const getAllJobs = async (req,res)=>{
    try
    {
        const findjob = await Jobs.find();
        if(findjob)
            res.send(findjob);
        else
            res.status(404).send("NO Data Found");
    }
    catch(err)
    {
        res.status(500).send(err.message);
    }
    
};

export { createJob, getJobById , deleteJob ,getAllJobs};
