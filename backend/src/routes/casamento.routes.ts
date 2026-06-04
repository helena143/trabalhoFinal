import express from "express";
import Casamento from "../models/Casamento";

const router = express.Router();

router.get("/", async (req, res) => {
  const produtos = await Casamento.find();
  res.json(produtos);
});

router.post("/", async (req, res) => {
  const produto = await Casamento.create(req.body);
  res.status(201).json(produto);
});

export default router;