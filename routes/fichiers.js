import express from "express";


const fichiers = express.Router();

fichiers.get("/test", (req, res) => {
    console.log("accueil");
    res.render("accueil.ejs", { titre: "Accueil" });
});


fichiers.get("/", (req, res) => {
    console.log("accueil");
    res.render("accueil.ejs", { titre: "Accueil" });
});
export default fichiers;
