import mongoose from "mongoose";

import { Companies } from "../models/company.mjs";

import { Jobs } from "../models/job.mjs";

import { Applications } from "../models/application.mjs";

const createCompany = async (req,res)=>{
    // const {body} = req;
    const newcompany = new Companies(req.body);
    try{
    
        const savecompany = await newcompany.save();
        res.send(savecompany);
    }
    catch(err)
    {
        res.status(500).send(err.message);
    }

};

const getCompanyById = async (req,res)=>{
    try
    {
        const findcompany = await Companies.findById(req.params.id);
        if(findcompany)
            res.send(findcompany);
        else
            res.status(404).send("NO Data Found");
    }
    catch(err)
    {
        res.status(500).send(err.message);
    }
    
};

const deleteCompany = async (req, res) => {
    try {
        // const jobsId = await Companies.findById({_id :req.params.id},{_id:0,jobsPosted:1}).populate();
        const deletedCompany = await Companies.findByIdAndDelete(req.params.id);
        if (deletedCompany) {

            // const deleteJob = await Jobs.deleteMany({companyId : req.params.id})
            console.log(jobsId);
            // for (const jobid in jobsId.jobsPosted) {
            //     const deletedjob = await Jobs.deleteOne(jobid);
            //     // const deletedapplication = await Applications.deleteMany({jobId : jobid});
            // }
            
            res.status(200).send("Company is deleted");
        } else {
            res.status(404).send("NO Data Found");
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const getAllCompanies = async (req,res)=>{
    try
    {
        const findcompany = await Companies.find();
        if(findcompany)
            res.send(findcompany);
        else
            res.status(404).send("NO Data Found");
    }
    catch(err)
    {
        res.status(500).send(err.message);
    }
    
};

export { createCompany, getCompanyById , deleteCompany ,getAllCompanies};
