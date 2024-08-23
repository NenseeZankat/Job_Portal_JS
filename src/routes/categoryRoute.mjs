import e, { Router } from "express";

import { Categories } from "../models/category.mjs";

import { createCategory, getCategoryById , deleteCategory ,getAllCategories} from "../controllers/categoryController.mjs";

const router = Router();


router.post("/api/category",createCategory);

router.get("/api/category/:id",getCategoryById);

router.get("/api/category",getAllCategories);

router.delete("/api/category/:id", deleteCategory);

router.put("/api/category/:id",async (req,res)=>{
    const findcategory = await Categories.findById(req.params.id);
    res.send(findcategory);
});

export default router;
