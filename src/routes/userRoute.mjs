import { Router } from "express";
import { createUser, getUserById, deleteUser, getAllUsers, updateUser, softDeleteUser, restoreUser, 
    getPaginatedUsers, searchUsers, countUsers, deleteMultipleUsers ,getUserByEmail} from "../controllers/userController.mjs";

const router = Router();

// Create a User
router.post("/api/user", createUser);

router.post("/api/login", getUserByEmail);

// Get a User by ID
router.get("/api/user/:id", getUserById);

// Delete a User by ID (hard delete)
router.delete("/api/user/:id", deleteUser);

// Get All Users
router.get("/api/user", getAllUsers);

// Update a User by ID
router.put("/api/user/:id", updateUser);

// Soft Delete a User by ID
router.put("/api/user/:id/soft-delete", softDeleteUser);

// Restore a Soft Deleted User by ID
router.put("/api/user/:id/restore", restoreUser);

// Get Paginated Users
router.get("/api/users/paginate", getPaginatedUsers);

// Search Users by Criteria
router.get("/api/users/search", searchUsers);

// Count Users (based on query)
router.get("/api/users/count", countUsers);

// Delete Multiple Users (based on criteria)
router.delete("/api/users", deleteMultipleUsers);

export default router;
 

