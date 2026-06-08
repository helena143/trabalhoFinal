import { Router } from "express";
import { upload } from "../middlewares/upload";

import { createProduct } from "../controllers/Products/createProduct";
import { getProducts } from "../controllers/Products/getProducts";
import { getProductById } from "../controllers/Products/getProductById";
import { updateProduct } from "../controllers/Products/updateProducts";
import { deleteProduct } from "../controllers/Products/deleteProducts";

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProductById);

// 👇 AQUI É O MAIS IMPORTANTE
router.post("/", upload.single("image"), createProduct);

router.put("/:id", upload.single("image"), updateProduct);
router.delete("/:id", deleteProduct);

export default router;