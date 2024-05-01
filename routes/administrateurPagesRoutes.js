import express from "express";

import { verificationAccesAdmin } from "../middlewares/accesAdministrateur.js";

import { accueil, connexion, gestion } from "../controleurs/administrateurPagesControleurs.js";

const administrateurPages = express.Router();

administrateurPages.get("/", accueil);

administrateurPages.get("/connexion", connexion);

administrateurPages.get("/gestion", verificationAccesAdmin, gestion);

export default administrateurPages;
