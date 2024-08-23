import mongoose from "mongoose";

import { Categories } from "../models/category.mjs";

import { Jobs } from "../models/job.mjs";

const createCategory = async (req,res)=>{
    const {body} = req;
    const newcategory = new Categories(req.body);
    try{
    
        const savedcategory = await newcategory.save();
        res.send(savedcategory);
    }
    catch(err)
    {
        res.status(500).send(err.message);
    }

};


const getCategoryById = async (req,res)=>{
    try{
        const findcategory = await Categories.findById(req.params.id);
        if(findcategory)
            res.send(findcategory);
        else
            res.status(404).send("NO Data Found");
    }
    catch(err)
    {
        res.status(500).send(err.message);
    }
    
};

const deleteCategory = async (req, res) => {
    try {
        const deletedCategory = await Categories.findByIdAndDelete(req.params.id);
        if (deletedCategory) {
            const deleteJob = await Jobs.deleteMany({categoryId : req.params.id});
            res.status(200).send("Category is deleted");
        } else {
            res.status(404).send("NO Data Found");
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const getAllCategories = async (req,res)=>{
    try
    {
        const findcategory = await Categories.find();
        if(findcategory)
            res.send(findcategory);
        else
            res.status(404).send("NO Data Found");
    }
    catch(err)
    {
        res.status(500).send(err.message);
    }
    
};

const updateCategories = async (req, res) => {
    try {
        const updatedCategory = await Categories.findByIdAndUpdate(
            req.params.id,      
            { $set: req.body },  
            { new: true, runValidators: true }  
        );

        if (updatedCategory) {
            res.status(200).send(updatedCategory);
        } else {
            res.status(404).send("No Data found");
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
};


export { createCategory, getCategoryById , deleteCategory ,getAllCategories, updateCategories};
