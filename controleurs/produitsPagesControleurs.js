export const detailsProduit = (req, res) => {
    req.Produit.findByPk(req.params.id)
        .then((produit) => {
            if (produit) {
                if (produit.id_utilisateur == req.idUtilisateur) {
                    res.render("produit.ejs", { titre: produit.nom_produit, css: "produit", script: "produit", mode: "proprietaire", produit, cookieUtilisateur: req.cookies.utilisateur  });
                } else {
                    res.render("produit.ejs", { titre: produit.nom_produit, css: "produit", script: "produit", mode: "nonProprietaire", produit, cookieUtilisateur: req.cookies.utilisateur  });
                }
            } else {
                res.render("erreur.ejs", { titre: "Erreur 404", nomErreur: "produit inexistant", texteErreur: "Le produit n'existe pas dans la base de données", detailErreur: "", css: "erreur", script: "", cookieUtilisateur: req.cookies.utilisateur  });
            }
        })
        .catch((error) => {
            console.error(error);
            res.render("erreur.ejs", { titre: "Erreur 500", nomErreur: "dans la recherche du produit", texteErreur: "Une erreur est survenue dans la recherche du produit", detailErreur: error, css: "erreur", script: "", cookieUtilisateur: req.cookies.utilisateur  });
        });
};
export const modificationProduit = async (req, res) => {
    if (!req.cookies.utilisateur) {
        res.redirect(`/produit/${req.params.id}`);
    }

    req.Produit.findByPk(req.params.id).then((produit) => {
        if (produit) {
            res.render("modifierProduit.ejs", { titre: "Modifier produit", css: "formProduit", script: "modifierProduit", cookieUtilisateur: req.cookies.utilisateur, produit  });
        } else {
            res.render("erreur.ejs", { titre: "Erreur 404", nomErreur: "produit inexistant", texteErreur: "Le produit n'existe pas dans la base de données", detailErreur: "", css: "erreur", script: "", cookieUtilisateur: req.cookies.utilisateur  });
        }
    });
};
