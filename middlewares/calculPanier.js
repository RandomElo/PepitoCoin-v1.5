export const calculPanier = async (req, res, next, objectif) => {
    if (req.cookies.utilisateur) {
        const utlisateurBdd = await req.Utilisateur.findByPk(req.idUtilisateur);
        if (utlisateurBdd.panier_utilisateur == null) {
            req.prixPanier = 0;
        } else {
            var panier = utlisateurBdd.panier_utilisateur.split("_");
            let compteurPanier = 0;
            for (let i = 0; i < panier.length - 1; i++) {
                const elementPanier = panier[i];
                const idProduit = elementPanier.split("-")[0];
                const quantiteProduit = Number(elementPanier.split("-")[1]);

                await req.Produit.findByPk(idProduit).then((produit) => {
                    if (produit) {
                        const valeurAjouter = Number(produit.prix_produit) * quantiteProduit;
                        compteurPanier = Number(compteurPanier) + Number(valeurAjouter);
                    } else {
                        panier.splice(i, 1); //Suppression du produit dans le tableau du panier
                        const panier_utilisateur = panier.join("_"); //On transforme le panier en chanie de caractère
                        req.Utilisateur.update({ panier_utilisateur }, { where: { id_utilisateur: req.idUtilisateur } })
                            .catch((erreur) => console.error(erreur));
                    }
                });
            }
            compteurPanier = compteurPanier.toFixed(2);
            if (objectif == "controleur") {
                return compteurPanier;
            } else {
                req.prixPanier = compteurPanier;
            }
        }
    }
    next();
};
