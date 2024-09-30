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

const getJobByCompany = async (req, res) => {
    try {
      const companyId = req.params.id;
      const company = await Companies.findById(companyId).populate('jobsPosted'); // Populate jobsPosted
  
      if (!company) {
        return res.status(404).json({ message: 'Company not found' });
      }
  
      res.status(200).json(company);
    } catch (error) {
      console.error('Error fetching jobs for company:', error);
      res.status(500).json({ message: 'Server error' });
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

const getCompanyByName = async (req,res) => {
    try
    {
        const findCompany = await Companies.find({name : req.params.name});
        if(findCompany)
            res.send(findCompany);
        else
            res.status(404).send("NO Data Found");
    }
    catch(err)
    {
        res.status(500).send(err.message);
    }
}

const getCompanyByIndustry = async (req,res) => {
    try
    {
        const findCompany = await Companies.find({industry : req.params.industry});
        if(findCompany)
            res.send(findCompany);
        else
            res.status(404).send("NO Data Found");
    }
    catch(err)
    {
        res.status(500).send(err.message);
    }
}

const getCompanyByWebsite = async (req,res) => {
    try
    {
        const findCompany = await Companies.find({website : req.params.website});
        if(findCompany)
            res.send(findCompany);
        else
            res.status(404).send("NO Data Found");
    }
    catch(err)
    {
        res.status(500).send(err.message);
    }
}

export { createCompany, getCompanyById , deleteCompany ,getAllCompanies , updateCompany , getCompanyByName , getCompanyByIndustry , getJobByCompany , getCompanyByWebsite};
