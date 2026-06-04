import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// TYPES

interface ProdutoData {
  name?: string;
  price?: number;
  stock?: number;
  image?: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

// PRODUTOS

export const getProdutos = (params: object = {}) =>
  api.get("/products", { params }).then((r) => r.data);

export const getProdutoPorId = (id: string) =>
  api.get(`/products/${id}`).then((r) => r.data);

export const criarProduto = (data: ProdutoData) =>
  api.post("/products", data).then((r) => r.data);

export const atualizarProduto = (
  id: string,
  data: ProdutoData
) =>
  api.put(`/products/${id}`, data).then((r) => r.data);

export const deletarProduto = (id: string) =>
  api.delete(`/products/${id}`).then((r) => r.data);

export const uploadImagemProduto = (file: File) => {
  const form = new FormData();

  form.append("image", file);

  return api
    .post("/products/upload/image", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((r) => r.data);
};

// CATEGORIAS

export const getCategorias = () =>
  api.get("/categories").then((r) => r.data);

export const getCatPorId = (id: string) =>
  api.get(`/categories/${id}`).then((r) => r.data);

// AUTH

export const login = (data: LoginData) =>
  api.post("/auth/login", data).then((r) => r.data);

export const register = (data: RegisterData) =>
  api.post("/auth/register", data).then((r) => r.data);

// CARRINHO

export const getCarrinho = () =>
  api.get("/cart").then((r) => r.data);

export const adicionarAoCarrinho = (
  productId: string,
  quantity: number = 1
) =>
  api
    .post("/cart", { productId, quantity })
    .then((r) => r.data);

// PEDIDOS

export const criarPedido = () =>
  api.post("/orders").then((r) => r.data);

export const getMeusPedidos = () =>
  api.get("/orders").then((r) => r.data);

// HELPERS

export const imagemUrl = (path: string) => {
  if (!path) return "";

  if (path.startsWith("http")) {
    return path;
  }

  return `http://localhost:3000${path}`;
};

export default api;