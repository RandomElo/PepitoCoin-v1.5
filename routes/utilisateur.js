import express from "express";

import {enregistrement, connexion, deconnexion} from "../controllers/utilisateurs.js"

const utilisateur = express.Router();

utilisateur.get('/connexion', connexion)


export default utilisateur;