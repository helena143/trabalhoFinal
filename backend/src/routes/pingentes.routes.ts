import { Router } from "express";

import { createPingente } from "../controllers/Pingentes/createPingentes";
import { getPingentes } from "../controllers/Pingentes/getPingentes";
import { getPingenteById } from "../controllers/Pingentes/getPingentesById";
import { updatePingente } from "../controllers/Pingentes/updatePingentes";
import { deletePingente } from "../controllers/Pingentes/deletePingentes";

import { auth } from "../middlewares/auth";
import { isAdmin } from "../middlewares/isAdmin";
import upload from "../config/multer";

const router = Router();

// PUBLIC
router.get("/", getPingentes);
router.get("/:id", getPingenteById);

// ADMIN
router.post("/", auth, isAdmin, upload.single("image"), createPingente);
router.put("/:id", auth, isAdmin, upload.single("image"), updatePingente);
router.delete("/:id", auth, isAdmin, deletePingente);

export default router;
