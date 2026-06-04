import { Router } from "express";

import { createPerfume } from "../controllers/Perfume/createPerfume";
import { getPerfumes } from "../controllers/Perfume/getPerfume";
import { getPerfumeById } from "../controllers/Perfume/getPerfumeById";
import { updatePerfume } from "../controllers/Perfume/updatePerfume";
import { deletePerfume } from "../controllers/Perfume/deletePerfume";

import { auth } from "../middlewares/auth";
import { isAdmin } from "../middlewares/isAdmin";
import upload from "../config/multer";

const router = Router();

// PUBLIC
router.get("/", getPerfumes);
router.get("/:id", getPerfumeById);

// ADMIN
router.post("/", auth, isAdmin, upload.single("image"), createPerfume);
router.put("/:id", auth, isAdmin, upload.single("image"), updatePerfume);
router.delete("/:id", auth, isAdmin, deletePerfume);

export default router;
