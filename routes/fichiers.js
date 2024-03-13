import express from "express";

const fichiers = express.Router();

fichiers.get("/", (req, res) => {
    res.redirect("/accueil");
});

fichiers.get("/accueil", (req, res) => {
    res.render("accueil.ejs", { titre: "Accueil" }); //
});

fichiers.get("/inscription", (req, res) => {
    res.render("inscription.ejs", { titre: "Inscription" });
});

fichiers.get("/connexion", (req, res) => {
    res.render("connexion.ejs", { titre: "Connexion" });
});

export default fichiers;
