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
    
        const companyToDelete = await Companies.findById(req.params.id).populate('jobsPosted');

        if (!companyToDelete) {
            return res.status(404).send("No Data found");
        }

        for (const job of companyToDelete.jobsPosted) {
            await Jobs.findByIdAndDelete(job._id);
            await Applications.deleteMany({ jobId: job._id }); 
        }

        await Companies.findByIdAndDelete(req.params.id);

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

const updateCompany = async (req, res) => {
    try {
        const updatedCompany = await Companies.findByIdAndUpdate(
            req.params.id,      
            { $set: req.body },  
            { new: true, runValidators: true }  
        );

        if (updatedCompany) {
            res.status(200).send(updatedCompany);
        } else {
            res.status(404).send("No Data found");
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export { createCompany, getCompanyById , deleteCompany ,getAllCompanies , updateCompany};
