import mongoose from "mongoose";
import { Users } from "../models/user.mjs";
import { Applications } from "../models/application.mjs";
import { Resume } from "../models/resume.mjs";
import { Jobs } from "../models/job.mjs";

// Create a User
const createUser = async (req, res) => {
    const newUser = new Users(req.body);
    try {
        const savedUser = await newUser.save();
        res.send(savedUser);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Get User by ID
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

// Delete User by ID and related data (applications, resumes, jobs)
const deleteUser = async (req, res) => {
    try {
        const deletedUser = await Users.findByIdAndDelete(req.params.id);
        if (deletedUser) {
            const userId = req.params.id;
            await Applications.deleteMany({ userId });
            await Resume.deleteMany({ userId });
            await Jobs.deleteMany({ postedBy: userId });
            await Jobs.updateMany({ applicants: userId }, { $pull: { applicants: userId } });
            res.status(200).send("User and related data deleted");
        } else {
            res.status(404).send("No Data Found");
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Soft Delete User
const softDeleteUser = async (req, res) => {
    try {
        const updatedUser = await Users.findByIdAndUpdate(
            req.params.id,
            { $set: { isActive: false } },  // Mark as inactive
            { new: true }
        );

        if (updatedUser) {
            res.status(200).send("User soft deleted");
        } else {
            res.status(404).send("No Data Found");
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Restore Soft Deleted User
const restoreUser = async (req, res) => {
    try {
        const restoredUser = await Users.findByIdAndUpdate(
            req.params.id,
            { $set: { isActive: true } },  // Restore user
            { new: true }
        );

        if (restoredUser) {
            res.status(200).send("User restored");
        } else {
            res.status(404).send("No Data Found");
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Get All Users
const getAllUsers = async (req, res) => {
    try {
        const users = await Users.find();
        if (users.length) {
            res.send(users);
        } else {
            res.status(404).send("No Data Found");
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Update User by ID
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
            res.status(404).send("No Data Found");
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Get Paginated Users
const getPaginatedUsers = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    try {
        const users = await Users.find()
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const count = await Users.countDocuments();

        res.json({
            users,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Search Users by Criteria
const searchUsers = async (req, res) => {
    const { name, email, userType } = req.query;
    try {
        const query = {};
        if (name) query.name = { $regex: name, $options: "i" };
        if (email) query.email = { $regex: email, $options: "i" };
        if (userType) query.userType = userType;

        const users = await Users.find(query);

        if (users.length) res.send(users);
        else res.status(404).send("No matching users found");
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Count Users
const countUsers = async (req, res) => {
    try {
        const userCount = await Users.countDocuments(req.query);
        res.json({ userCount });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Delete Multiple Users based on Criteria
const deleteMultipleUsers = async (req, res) => {
    const { userType } = req.body;
    try {
        const query = {};
        if (userType) query.userType = userType;

        const result = await Users.deleteMany(query);

        if (result.deletedCount > 0) {
            res.status(200).send(`${result.deletedCount} users deleted`);
        } else {
            res.status(404).send("No users found for deletion");
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export { createUser, getUserById, deleteUser, softDeleteUser, restoreUser, getAllUsers, 
    updateUser, getPaginatedUsers, searchUsers, countUsers, deleteMultipleUsers };
