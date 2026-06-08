import mongoose from "mongoose";
import Category from "../models/Category";
import Product from "../models/Product";
import Casamento from "../models/Casamento";
import Coupon from "../models/Coupon";
import Perfume from "../models/Perfume";
import Pingente from "../models/Pingente";
import Relogio from "../models/Relogio";
import Sale from "../models/Sale";

const MONGO_URL = "mongodb://127.0.0.1:27017/ivyStore";

const seed = async () => {
  await mongoose.connect(MONGO_URL);
  console.log("Conectado ao MongoDB");

  await Category.deleteMany({});
  await Product.deleteMany({});
  await Casamento.deleteMany({});
  await Coupon.deleteMany({});
  await Perfume.deleteMany({});
  await Pingente.deleteMany({});
  await Relogio.deleteMany({});
  await Sale.deleteMany({});

  const categorias = await Category.insertMany([
    { name: "Joias", descricao: "Aneis, colares, brincos e pulseiras" },
    { name: "Perfumes", descricao: "Fragrancias exclusivas" },
    { name: "Relogios", descricao: "Relogios elegantes" },
    { name: "Pingentes", descricao: "Pingentes variados" },
    { name: "Casamento", descricao: "Colecao especial para noivas" },
  ]);

  const [joias, perfumes, relogios, pingentes, casamento] = categorias;

  await Product.insertMany([
    { name: "Anel de Ouro", description: "Anel banhado a ouro 18k", price: 299.90, stock: 10, image: "anel1.png", category: joias._id },
    { name: "Anel Prata", description: "Anel de prata 925", price: 199.90, stock: 15, image: "anel2.png", category: joias._id },
    { name: "Anel Rose", description: "Anel banhado a ouro rose", price: 249.90, stock: 8, image: "anel3.png", category: joias._id },
    { name: "Anel Solitario", description: "Anel solitario com zirconia", price: 349.90, stock: 6, image: "anel5.png", category: joias._id },
    { name: "Anel Duplo", description: "Anel duplo banhado a ouro", price: 279.90, stock: 9, image: "anel6.png", category: joias._id },
    { name: "Brinco Argola", description: "Brinco argola dourado", price: 149.90, stock: 20, image: "argola1.png", category: joias._id },
    { name: "Brinco Delicado", description: "Brinco pequeno cravejado", price: 179.90, stock: 12, image: "brinco1.png", category: joias._id },
    { name: "Brinco Elegante", description: "Brinco gota banhado a ouro", price: 199.90, stock: 10, image: "brinco2.png", category: joias._id },
    { name: "Colar Delicado", description: "Colar fino banhado a ouro", price: 189.90, stock: 18, image: "colar4.png", category: joias._id },
    { name: "Pulseira Dourada", description: "Pulseira banhada a ouro", price: 219.90, stock: 10, image: "pulseira1.png", category: joias._id },
    { name: "Pulseira Elegante", description: "Pulseira com zirconia", price: 259.90, stock: 8, image: "pulseira5.png", category: joias._id },
  ]);

  await Casamento.insertMany([
    { name: "Alianca Classic", description: "Alianca de ouro 18k tradicional", price: 899.90, stock: 10, image: "anel1.png" },
    { name: "Alianca Rose", description: "Alianca de ouro rose com diamante", price: 1299.90, stock: 6, image: "anel3.png" },
    { name: "Conjunto Noiva", description: "Conjunto colar e brinco para noiva", price: 799.90, stock: 5, image: "colar4.png" },
    { name: "Tiara Noiva", description: "Tiara delicada com perolas", price: 399.90, stock: 8, image: "argola1.png" },
    { name: "Pulseira Noiva", description: "Pulseira de perolas para noiva", price: 349.90, stock: 10, image: "pulseira1.png" },
  ]);

  await Perfume.insertMany([
    { name: "Ivy Rose", description: "Fragancia floral com notas de rosa e jasmin", price: 349.90, stock: 15, image: "rubi.png", brand: "Ivy Store" },
    { name: "Ivy Gold", description: "Fragancia amadeirada com notas de baunilha", price: 399.90, stock: 10, image: "chome.png", brand: "Ivy Store" },
    { name: "Ivy Night", description: "Fragancia intensa para a noite", price: 449.90, stock: 8, image: "rubi.png", brand: "Ivy Store" },
    { name: "Ivy Fresh", description: "Fragancia leve e refrescante", price: 299.90, stock: 12, image: "chome.png", brand: "Ivy Store" },
  ]);

  await Pingente.insertMany([
    { name: "Pingente Estrela", description: "Pingente estrela banhado a ouro", price: 99.90, stock: 25, image: "brinco1.png", material: "Ouro" },
    { name: "Pingente Coracao", description: "Pingente coracao com zirconia", price: 129.90, stock: 20, image: "coracao1.png", material: "Prata" },
    { name: "Pingente Infinito", description: "Pingente simbolo do infinito", price: 89.90, stock: 30, image: "brinco2.png", material: "Ouro Rose" },
    { name: "Pingente Letra", description: "Pingente letra personalizado", price: 79.90, stock: 50, image: "brinco1.png", material: "Prata" },
  ]);

  await Relogio.insertMany([
    { name: "Relogio Classico", description: "Relogio elegante com pulseira de couro", price: 599.90, stock: 5, image: "chome.png", brand: "Ivy Time" },
    { name: "Relogio Rose", description: "Relogio feminino rose gold", price: 699.90, stock: 4, image: "chome.png", brand: "Ivy Time" },
    { name: "Relogio Prata", description: "Relogio prata com pulseira de metal", price: 549.90, stock: 6, image: "chome.png", brand: "Ivy Time" },
  ]);

  await Coupon.insertMany([
    { code: "IVY10", discount: 10, active: true, expiresAt: new Date("2025-12-31") },
    { code: "IVY20", discount: 20, active: true, expiresAt: new Date("2025-12-31") },
    { code: "BEMVINDO", discount: 15, active: true, expiresAt: new Date("2025-12-31") },
    { code: "NOIVA30", discount: 30, active: true, expiresAt: new Date("2025-12-31") },
  ]);

  await Sale.insertMany([
    { name: "Anel Promocional", description: "Anel banhado a ouro em promocao", originalPrice: 299.90, salePrice: 199.90, discount: 33, image: "anel1.png", stock: 10 },
    { name: "Brinco Promocional", description: "Brinco argola em promocao", originalPrice: 149.90, salePrice: 99.90, discount: 33, image: "argola1.png", stock: 15 },
    { name: "Colar Promocional", description: "Colar delicado em promocao", originalPrice: 189.90, salePrice: 129.90, discount: 31, image: "colar4.png", stock: 8 },
    { name: "Perfume Promocional", description: "Ivy Rose em promocao", originalPrice: 349.90, salePrice: 249.90, discount: 28, image: "rubi.png", stock: 5 },
  ]);

  console.log("Banco populado com sucesso!");
  await mongoose.disconnect();
};

seed().catch(console.error);
