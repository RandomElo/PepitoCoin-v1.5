import express from "express";

import { verificationAccesAdmin } from "../middlewares/accesAdministrateur.js";
import { enregistrementFichier } from "../middlewares/multer.js";

import { connexion, recuperationTousProduits, suppressionProduit, modificationProduit, recuperationTousUtilisateurs, suppressionUtilisateur } from "../controleurs/administrateurControleurs.js";

const administrateur = express.Router();

administrateur.post("/connexion-administrateur", connexion);

// Gestion routes pour produits
administrateur.get("/tous-produits", verificationAccesAdmin, recuperationTousProduits);
administrateur.delete("/suppression-produit", verificationAccesAdmin, suppressionProduit);
administrateur.put("/modifier-produit", verificationAccesAdmin, enregistrementFichier, modificationProduit);

// Gestion routes pour comptes
administrateur.get("/tous-utilsateurs", verificationAccesAdmin, recuperationTousUtilisateurs);
administrateur.delete("/suppression-utilisateur", verificationAccesAdmin, suppressionUtilisateur);

export default administrateur;
