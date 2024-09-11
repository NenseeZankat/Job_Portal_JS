import e, { Router } from "express";

import { Categories } from "../models/category.mjs";

import { createCategory, getCategoryById , deleteCategory ,getAllCategories , updateCategories , getCategoryByName} from "../controllers/categoryController.mjs";

const router = Router();


router.post("/api/category",createCategory);

router.get("/api/category/:id",getCategoryById);

router.get("/api/category/name/:name",getCategoryByName);

router.get("/api/category",getAllCategories);

router.delete("/api/category/:id", deleteCategory);

router.put("/api/category/:id",updateCategories);

export default router;
