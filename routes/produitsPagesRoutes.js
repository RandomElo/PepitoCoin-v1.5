import express from "express";
import { detailsProduit, modificationProduit } from "../controleurs/produitsPagesControleurs.js";

const produitsPages = express.Router()
//Renvoie de pages
produitsPages.get("/:id", detailsProduit);
produitsPages.get("/:id/modifier", modificationProduit);
export default produitsPages