import { Router } from "express";
import { sendEmail } from "../controllers/Mail/sendEmail";

const router = Router();

router.post("/send-email", sendEmail);

export default router;