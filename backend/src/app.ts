import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";

import categoryRoute from "./routes/categoryRoute";
import productsRoute from "./routes/productsRoute";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import cartRoutes from "./routes/cartRoutes";
import orderRoutes from "./routes/orderRoutes";
import joiasRoutes from "./routes/joias.routes";
import perfumeRoutes from "./routes/perfume.routes";
import pingentesRoutes from "./routes/pingentes.routes";
import relogioRoutes from "./routes/relogio.routes";
import saleRoutes from "./routes/sale.routes";
import mailRoutes from "./routes/mail.routes";
import supportRoutes from "./routes/support.routes";
import casamentoRoutes from "./routes/casamento.routes";
import adminRoutes from './routes/admin.routes';

// NOVO
import couponRoutes from "./routes/coupon.routes";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

/*
|--------------------------------------------------------------------------
| LIBERAR ARQUIVOS DA PASTA UPLOADS
|--------------------------------------------------------------------------
*/

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "..", "uploads")
  )
);

/*
|--------------------------------------------------------------------------
| LIBERAR ARQUIVOS DA PASTA PUBLIC
|--------------------------------------------------------------------------
*/

app.use(
  "/public",
  express.static(
    path.join(__dirname, "..", "public")
  )
);

/*
|--------------------------------------------------------------------------
| SUPPORT
|--------------------------------------------------------------------------
*/

app.use("/api/support", supportRoutes);

/*
|--------------------------------------------------------------------------
| ROUTES
|--------------------------------------------------------------------------
*/

app.use("/api/categories", categoryRoute);

app.use("/api/products", productsRoute);

app.use("/api/users", userRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/cart", cartRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/joias", joiasRoutes);

app.use("/api/perfumes", perfumeRoutes);

app.use("/api/pingentes", pingentesRoutes);

app.use("/api/relogios", relogioRoutes);

app.use("/api/casamentos", casamentoRoutes);

app.use("/api/sales", saleRoutes);

app.use("/mail", mailRoutes);

app.use('/api/admin', adminRoutes)

// NOVO
app.use("/api", couponRoutes);


export default app;