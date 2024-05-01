import express from "express";

import { verificationDisponibilite, enregistrement, connexion, deconnexion } from "../controleurs/utilisateursControleurs.js";

const utilisateur = express.Router();
utilisateur.post("/disponibilite", verificationDisponibilite);
utilisateur.post("/enregistrement", enregistrement);
utilisateur.post("/connexion", connexion);
utilisateur.get("/deconnexion", deconnexion);

export default utilisateur;
