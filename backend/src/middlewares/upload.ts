import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/products");
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.random().toString(36).substring(2);
    cb(null, unique + path.extname(file.originalname));
  }
});

// 👇 ISSO É O IMPORTANTE
export const upload = multer({ storage });