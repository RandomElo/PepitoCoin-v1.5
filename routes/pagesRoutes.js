import express from "express";

const pages = express.Router();

pages.get("/", async (req, res) => {
    const produits = await req.Produit.findAll();
    res.render("accueil.ejs", { titre: "Accueil", css: "accueil", script: "accueil", produits, cookieUtilisateur: req.cookies.utilisateur });
});

pages.get("/inscription", (req, res) => {
    if (!req.cookies.utilisateur) {
        res.render("inscription.ejs", { titre: "Inscription", css: "identification", script: "inscription", cookieUtilisateur: req.cookies.utilisateur });
    } else {
        res.redirect("/");
    }
});

pages.get("/connexion", (req, res) => {
    if (!req.cookies.utilisateur) {
        res.render("connexion.ejs", { titre: "Connexion", css: "identification", script: "connexion", utilisation: "", cookieUtilisateur: req.cookies.utilisateur });
    } else {
        res.redirect("/");
    }
});
pages.get("/ajout-produit", (req, res) => {
    if (!req.cookies.utilisateur) {
        return res.redirect("/connexion");
    } else {
        res.render("ajoutProduit.ejs", { titre: "Ajoutez un produit", css: "formProduit", script: "ajoutProduit", cookieUtilisateur: req.cookies.utilisateur });
    }
});

pages.get("/mes-produits", async (req, res) => {
    if (req.cookies.utilisateur) {
        res.redirect("/");
    } else {
        const mesProduits = await req.Produit.findAll({
            where: { id_utilisateur: req.idUtilisateur },
        });
        res.render("mesProduits.ejs", { titre: "Mes Produits", css: "mesProduits", script: "mesProduits", cookieUtilisateur: req.cookies.utilisateur, mesProduits });
    }
});

pages.get("/mon-panier", async (req, res) => {
    res.render("panier.ejs", { titre: "Mon panier", css: "panier", script: "panier", cookieUtilisateur: req.cookies.utilisateur });
});

export default pages;
