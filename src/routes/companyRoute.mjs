import { Router } from "express";

import { Companies } from "../models/company.mjs";

import { createCompany, getCompanyById , deleteCompany ,getAllCompanies , updateCompany} from "../controllers/companyController.mjs"

const router = Router();

router.post("/api/company", createCompany);

router.delete("/api/company/:id",deleteCompany );

router.get("/api/company/:id",getCompanyById);

router.get("/api/company",getAllCompanies);

router.put("/api/company/:id",updateCompany);

export default router;
