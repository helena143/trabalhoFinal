import { Router } from "express";

import {
  sendSupportTicket,
} from "../controllers/support/sendSupportTicket";

const router = Router();

router.post(
  "/ticket",
  sendSupportTicket
);

export default router;