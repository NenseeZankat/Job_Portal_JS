import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Users } from "../models/user.mjs";
import { Applications } from "../models/application.mjs";
import { Resume } from "../models/resume.mjs";
import { Jobs } from "../models/job.mjs";

// Create a User
const createUser = async (req, res) => {
    const { name, email, password, userType, contact, city, pincode, state, country, experience, skills } = req.body;
  
    try {
      // Check if the user already exists
      const existingUser = await Users.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User with this email already exists.' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create the new user
      const newUser = new Users({
        name,
        email,
        password: hashedPassword,
        userType,
        profile: {
          contact,
          address: [{ city, pincode, state, country }],
          experience,
          skills: skills.split(',').map(skill => skill.trim()),  // Convert skills into an array
        },
      });
  
      // Save the user to the database
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error. Please try again later.' });
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

const getUserByEmail = async (req, res) => {
    const { email, password } = req.body;
   
    try {
      // Check if user exists
      const user = await Users.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Check if password matches
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id, userType: user.userType }, // Include userType in the token payload
        'yourSecretKey',
        { expiresIn: '1h' }
      );
  
      // Send back the token and userType in the response
      res.status(200).json({
        token,
        userType: user.userType // Include userType in the response
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
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
    updateUser, getPaginatedUsers, searchUsers, countUsers, deleteMultipleUsers , getUserByEmail };
