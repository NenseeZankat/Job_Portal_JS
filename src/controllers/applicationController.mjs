import mongoose from "mongoose";

import { Applications } from "../models/application.mjs";

const createApplication = async (req,res)=>{
    // const {body} = req;
    const newuser = new Applications(req.body);
    try{
    
        const saveduser = await newuser.save();
        res.send(saveduser);
    }
    catch(err)
    {
        res.status(500).send(err.message);
    }

};

const getApplicationById = async (req,res)=>{
    try
    {
        const findapplication = await Applications.findById(req.params.id);
        if(findapplication)
            res.send(findapplication);
        else
            res.status(404).send("NO Data Found");
    }
    catch
    {
        res.status(500).send(err.message);
    }

};

const deleteApplication = async (req, res) => {
    try {
        const deletedapplication = await Applications.findByIdAndDelete(req.params.id);
        if (deletedapplication) {
            res.status(200).send("Application is deleted");
        } else {
            res.status(404).send("NO Data Found");
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const getAllApplications = async (req,res)=>{
    try{
        const findapplication = await Applications.find();
        if(findapplication)
            res.send(findapplication);
        else
            res.status(404).send("NO Data Found");
    }
    catch
    {
        res.status(500).send(err.message);
    }
    
};

const updateApplication = async (req, res) => {
    try {
        const updatedApplication = await Applications.findByIdAndUpdate(
            req.params.id,      
            { $set: req.body },  
            { new: true, runValidators: true }  
        );

        if (updatedApplication) {
            res.status(200).send(updatedApplication);
        } else {
            res.status(404).send("No Data found");
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export { createApplication, getApplicationById , deleteApplication ,getAllApplications , updateApplication};
