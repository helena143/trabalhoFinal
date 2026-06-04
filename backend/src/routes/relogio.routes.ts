import { Router } from "express";

import { createRelogio } from "../controllers/Relogio/createRelogio";
import { getRelogios } from "../controllers/Relogio/getRelogio";
import { getRelogioById } from "../controllers/Relogio/getRelogioById";
import { updateRelogio } from "../controllers/Relogio/updateRelogio";
import { deleteRelogio } from "../controllers/Relogio/deleteRelogio";

import { auth } from "../middlewares/auth";
import { isAdmin } from "../middlewares/isAdmin";
import upload from "../config/multer";

const router = Router();

// PUBLIC
router.get("/", getRelogios);
router.get("/:id", getRelogioById);

// ADMIN
router.post("/", auth, isAdmin, upload.single("image"), createRelogio);
router.put("/:id", auth, isAdmin, upload.single("image"), updateRelogio);
router.delete("/:id", auth, isAdmin, deleteRelogio);

export default router;
