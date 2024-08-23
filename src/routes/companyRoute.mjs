import { Router } from "express";

import { Companies } from "../models/company.mjs";

import { createCompany, getCompanyById , deleteCompany ,getAllCompanies} from "../controllers/companyController.mjs"

const router = Router();

router.post("/api/company", createCompany);

router.delete("/api/company/:id",deleteCompany );

router.get("/api/company/:id",getCompanyById);

router.get("/api/company",getAllCompanies);

export default router;
