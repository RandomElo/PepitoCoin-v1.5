export const enregistrement = (req, res) => {
    res.send("En cour de dev");
};
export const connexion = (req, res) => {
    // let produitsBDD = req.Produit.findAll();
    res.render("connexion.ejs", { titre: "Connexion" });
};
export const deconnexion = (req, res) => {
    res.send("En cour de dev");
};