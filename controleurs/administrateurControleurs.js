import fs from "fs";
export const connexion = (req, res) => {
    if (req.body.nom_admin == process.env.ADMINISTRATEUR_PSEUDO && req.body.mdp_admin == process.env.ADMINISTRATEUR_MDP) {
        res.clearCookie("utilisateur");
        res.cookie("administrateur", process.env.COOKIE_ADMINISTRATEUR, {
            maxAge: 1000 * 60 * 60 * 24 * 2, //Deux jours
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });
        res.json({ connexion: true });
    } else {
        res.json({ connexion: false });
    }
};
// Zone produit
export const recuperationTousProduits = async (req, res) => {
    const produits = await req.Produit.findAll();
    res.json({ produits });
};
export const suppressionProduit = (req, res) => {
    //Suppression du produit
    req.Produit.findByPk(req.body.id_produit)
        .then((donnee) => {
            const cheminFichier = `public/data/enregistrements/${donnee.nom_image_produit}`;
            fs.unlink(cheminFichier, (erreur) => {
                if (!erreur) {
                    req.Produit.destroy({
                        where: { id_produit: req.body.id_produit },
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
        })
        .catch((erreur) => {
            console.error(erreur);
            res.json({ suppression: false, raison: "erreur recherche" });
        });
};
export const modificationProduit = (req, res) => {
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

// Zone compte
export const recuperationTousUtilisateurs = async (req, res) => {
    const utilisateurs = await req.Utilisateur.findAll();
    res.json({ utilisateurs });
};
export const suppressionUtilisateur = async (req, res) => {
    const requeteProduit = await req.Produit.findAll({ where: { id_utilisateur: req.body.id_utilisateur } });
    requeteProduit.forEach((produit) => {
        const cheminImage = "public/data/enregistrements/" + produit.nom_image_produit;
        fs.unlink(cheminImage, (erreur) => {
            if (!erreur) {
                req.Produit.destroy({ where: { id_produit: produit.id_produit } });
            } else {
                console.error(erreur);
                return res.json({ suppression: false });
            }
        });
    });
    req.Utilisateur.destroy({ where: { id_utilisateur: req.body.id_utilisateur } });
    res.json({ suppression: true });
};
