import { Router } from "express";

import { createSale } from "../controllers/Sale/createSale";
import { getSales } from "../controllers/Sale/getSale";
import { getSaleById } from "../controllers/Sale/getSaleById";
import { updateSale } from "../controllers/Sale/updateSale";
import { deleteSale } from "../controllers/Sale/deleteSale";

import { auth } from "../middlewares/auth";
import { isAdmin } from "../middlewares/isAdmin";
import upload from "../config/multer";

const router = Router();

// PUBLIC
router.get("/", getSales);
router.get("/:id", getSaleById);

// ADMIN
router.post("/", auth, isAdmin, upload.single("image"), createSale);
router.put("/:id", auth, isAdmin, upload.single("image"), updateSale);
router.delete("/:id", auth, isAdmin, deleteSale);

export default router;
