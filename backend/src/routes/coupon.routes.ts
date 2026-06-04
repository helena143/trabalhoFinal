import { Router } from "express";
import { validateCoupon } from "../controllers/Coupon/validateCoupon";

const router = Router();

router.post("/coupon/validate", validateCoupon);

export default router;