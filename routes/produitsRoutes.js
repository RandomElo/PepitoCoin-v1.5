import express from "express";

import { enregistrement, modifier, suppression, verification } from "../controleurs/produitsControleurs.js";
import { enregistrementFichier } from "../middlewares/multer.js";

const produits = express.Router();

produits.post("/ajout-produit", enregistrementFichier, enregistrement);
produits.put("/modification-produit", enregistrementFichier, modifier);
produits.delete("/suppression-produit", suppression);
produits.post("/verification-produit",verification)

export default produits;
