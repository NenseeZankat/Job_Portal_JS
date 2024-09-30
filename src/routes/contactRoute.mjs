import { Router } from "express";

const router = Router();

import { createContact} from "../controllers/contactController.mjs";

// POST route to handle form submission
router.post('/api/contact', createContact);

export default router;
