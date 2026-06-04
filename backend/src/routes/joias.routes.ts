import { Router } from "express";

import { createJoia } from "../controllers/Joias/createJoia";
import { getJoias } from "../controllers/Joias/getJoias";
import { getJoiaById } from "../controllers/Joias/getJoiaById";
import { updateJoia } from "../controllers/Joias/updateJoia";
import { deleteJoia } from "../controllers/Joias/deleteJoia";

import { auth } from "../middlewares/auth";
import { isAdmin } from "../middlewares/isAdmin";
import upload from "../config/multer";

const router = Router();

// PUBLIC
router.get("/", getJoias);
router.get("/:id", getJoiaById);

// ADMIN
router.post("/", auth, isAdmin, upload.single("image"), createJoia);
router.put("/:id", auth, isAdmin, upload.single("image"), updateJoia);
router.delete("/:id", auth, isAdmin, deleteJoia);

export default router;
