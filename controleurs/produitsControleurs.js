import fs from "fs";

export const enregistrement = (req, res) => {
    console.log(req.file.filename);
    if (!req.cookies.utilisateur) {
        const cheminFichier = "public/data/enregistrements/" + req.file.filename;
        fs.unlink(cheminFichier, (erreur) => {
            if (!erreur) {
                res.json({ reponse: false, erreur: "cookie" });
            } else {
                console.error(erreur);
                res.json({ modifier: false, raison: "mise a jour" });
            }
        });
    }
    if (!req.erreurFichier) {
        console.log(req.body);
        //Cela veut dire qu'il y a pas eu de problème avec le MiME type
        req.Produit.create({
            nom_produit: req.body.nom,
            description_produit: req.body.description,
            prix_produit: req.body.prix,
            nom_image_produit: req.file.filename,
            id_utilisateur: req.idUtilisateur,
        })
            .then((element) => {
                res.json({ enregistrement: true, fichier: element.id_produit });
            })
            .catch((error) => {
                console.error(error);
                res.json({ enregistrement: false });
            });
    } else {
        // Cela veut dire qu'il y a eu une erreur avec le MIME type
        res.json({ enregistrement: false, erreur: "MIME" });
    }
};

export const modifier = (req, res) => {
    if (!req.cookies.utilisateur) {
        return res.json({ modifier: false, raison: "cookie" });
    }
    var donneesProduit = {
        nom_produit: req.body.nom,
        description_produit: req.body.description,
        prix_produit: req.body.prix,
    };
    if (req.file) {
        donneesProduit.nom_image_produit = req.file.filename;
    }
    req.Produit.update(donneesProduit, {
        where: { id_produit: req.body.id },
    })
        .then(() => res.json({ modifier: true }))
        .catch((erreur) => {
            console.error(erreur);
            res.json({ modifier: false, raison: "mise a jour" });
        });
};

export const suppression = async (req, res) => {
    if (!req.cookies.utilisateur) {
        return res.json({ suppression: false, raison: "autre" });
    }
    req.Produit.findByPk(req.body.id)
        .then((donnee) => {
            if (donnee) {
                if (donnee.id_utilisateur == req.idUtilisateur) {
                    const cheminFichier = `public/data/enregistrements/${donnee.nom_image_produit}`;
                    fs.unlink(cheminFichier, (erreur) => {
                        if (!erreur) {
                            req.Produit.destroy({
                                where: { id_produit: req.body.id },
                            })
                                .then(() => res.json({ suppression: true }))
                                .catch((erreur) => {
                                    console.error(erreur);
                                    res.json({ suppression: false, raison: "erreur supression" });
                                });
                        } else {
                            console.error(erreur);
                            res.json({ suppression: false, raison: "erreur supression fichier" });
                        }
                    });
                } else {
                    res.json({ suppression: false, raison: "autre" });
                }
            } else {
                res.json({ suppression: false, raison: "autre" });
            }
        })
        .catch((erreur) => {
            console.error(erreur);
            res.json({ suppression: false, raison: "erreur recherche" });
        });
};
export const verification = async (req, res) => {
    const produit = await req.Produit.findByPk(req.body.idProduit);
    if (produit) {
        res.json({ existant: true, id: produit.id_produit, nom: produit.nom_produit, prix: produit.prix_produit });
    } else {
        res.json({ existant: false });
    }
};
