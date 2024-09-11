import { Router } from "express";

import { Companies } from "../models/company.mjs";

import { createCompany, getCompanyById , deleteCompany ,getAllCompanies , updateCompany ,getCompanyByName , getCompanyByIndustry , getCompanyByWebsite} from "../controllers/companyController.mjs"

const router = Router();

router.post("/api/company", createCompany);

router.delete("/api/company/:id",deleteCompany );

router.get("/api/company/:id",getCompanyById);

router.get("/api/company/name/:name",getCompanyByName);

router.get("/api/company/industry/:industry",getCompanyByIndustry);

router.get("/api/company/website/:website",getCompanyByWebsite);

router.get("/api/company",getAllCompanies);

router.put("/api/company/:id",updateCompany);

export default router;
