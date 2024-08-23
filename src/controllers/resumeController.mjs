import mongoose from "mongoose";

import { Resume } from "../models/resume.mjs";


const createResume = async (req,res)=>{
    // const {body} = req;
    const newresume = new Resume(req.body);
    try{
    
        const savedresume = await newresume.save();
        res.send(savedresume);
    }
    catch(err)
    {
        res.status(500).send(err.message);
    }

}

const getResumeById = async (req,res)=>{
    try
    {
        const findresume = await Resume.findById(req.params.id);
        if(findresume)
            res.send(findresume);
        else
            res.status(404).send("NO Data Found");
    }
    catch(err)
    {
        res.status(500).send(err.message);
    }
    
}

const deleteResume = async (req, res) => {
    try {
        const deletedresume = await Resume.findByIdAndDelete(req.params.id);
        if (deletedresume) {
            res.status(200).send("Resume is deleted");
        } else {
            res.status(404).send("NO Data Found");
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const getAllResumes = async (req,res)=>{
    try
    {
        const findresume = await Resume.find();
        if(findresume)
            res.send(findresume);
        else
            res.status(404).send("NO Data Found");
    }
    catch(err)
    {
        res.status(500).send(err.message);
    }
    
    
}
export { createResume, getResumeById , deleteResume , getAllResumes};
 