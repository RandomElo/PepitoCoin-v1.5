import express from "express";
import utilisateur from "./utilisateursRoutes.js";
import pages from "./pagesRoutes.js";
import produits from "./produitsRoutes.js";
import produitsPages from "./produitsPagesRoutes.js";
import administrateur from "./administrateurRoutes.js";
import administrateurPages from "./administrateurPagesRoutes.js";

const routeur = express.Router();

routeur.use("/", pages);
routeur.use("/produit", produits);
routeur.use("/produit", produitsPages);
routeur.use("/utilisateur", utilisateur);
routeur.use("/administrateur", administrateur);
routeur.use("/administrateur", administrateurPages);
export default routeur;
