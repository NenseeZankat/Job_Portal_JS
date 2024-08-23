import { Router } from "express";

import { Users } from "../models/user.mjs";

// const userController = require('../controllers/userController');

import { createUser , getUserById , deleteUser , getAllUsers} from "../controllers/userController.mjs"


const router = Router();



router.post("/api/user",createUser);

router.get("/api/user/:id",getUserById);

router.delete("/api/user/:id", deleteUser );

router.get("/api/user", getAllUsers);

export default router;
