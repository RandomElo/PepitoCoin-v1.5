import express from "express";

import utilisateur from "./utilisateur.js";

const router = express.Router();

router.get("/", async (req, res) => {
    let produits = await req.Produit.findAll();
    console.log(produits)
    res.render("accueil.ejs", { titre: "Accueil", produits });
});

router.use("/compte", utilisateur);

export default router;

// fichiers.get("/", (req, res) => {
//     res.redirect("/accueil");
// });

// fichiers.get("/accueil", (req, res) => {
//     res.render("accueil.ejs", { titre: "Accueil" }); //
// });

// fichiers.get("/inscription", (req, res) => {
//     res.render("inscription.ejs", { titre: "Inscription" });
// });

// fichiers.get("/connexion", (req, res) => {
//     res.render("connexion.ejs", { titre: "Connexion" });
// });
