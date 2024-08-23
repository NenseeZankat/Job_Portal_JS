import mongoose from "mongoose";

import { Users } from "../models/user.mjs";

// import { deleteApplicationByUserId } from "../controllers/applicationController.mjs";

import { Applications } from "../models/application.mjs";

import { Resume } from "../models/resume.mjs";

import { Jobs } from "../models/job.mjs";

const createUser = async (req, res) => {
    const { body } = req;
    const newUser = new Users(body);
    try {
        const savedUser = await newUser.save();
        res.send(savedUser);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const getUserById = async (req, res) => {
    try {
        const foundUser = await Users.findById(req.params.id);
        if (foundUser) {
            res.send(foundUser);
        } else {
            res.status(404).send("No Data Found");
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const deleteUser = async (req, res) => {
    try {
        const deleteduser = await Users.findByIdAndDelete(req.params.id);
        if (deleteduser) {
            const userid = req.params.id;
            const deletedapplication = await Applications.deleteMany({userId : userid});
            const deleteResume =  await Resume.deleteMany({userId : userid});
            const deleteJob = await Jobs.deleteMany({postedBy : userid});
            const updatejob = await Jobs.updateMany({applicants : userid},{$pull : {applicants: userid}});
            res.status(200).send("User is deleted");
        } else {
            res.status(404).send("NO Data Found");
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const getAllUsers = async (req,res)=>{
    try
    {
        const finduser = await Users.find();
        if(finduser)
            res.send(finduser);
        else
            res.status(404).send("NO Data Found");
    }
    catch(err)
    {
        res.status(500).send(err.message);
    }
    
};


const updateUser = async (req, res) => {
    try {
        const updatedUser = await Users.findByIdAndUpdate(
            req.params.id,      
            { $set: req.body },  
            { new: true, runValidators: true }  
        );

        if (updatedUser) {
            res.status(200).send(updatedUser);
        } else {
            res.status(404).send("No Data found");
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export { createUser, getUserById , deleteUser ,getAllUsers , updateUser};
