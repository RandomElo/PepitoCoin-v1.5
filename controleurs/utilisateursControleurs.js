import bcrypt from "bcrypt";

import { creationToken } from "../middlewares/creationToken.js";

export const verificationDisponibilite = (req, res) => {
    req.Utilisateur.findOne({
        where: { pseudo_utilisateur: req.body.pseudo_utilisateur },
    }).then((utilisateur) => {
        if (utilisateur) {
            res.json({ disponibilite: false });
        } else {
            res.json({ disponibilite: true });
        }
    });
};

export const enregistrement = (req, res, next) => {
    bcrypt
        .hash(req.body.mdp_utilisateur, 12)
        .then((hash) => {
            req.Utilisateur.create({
                pseudo_utilisateur: req.body.pseudo_utilisateur,
                mdp_utilisateur: hash,
            })
                .then((utilisateur) => {
                    creationToken(req, res, next, utilisateur.id_utilisateur);
                })
                .catch((error) => {
                    console.error(error);
                    res.json({ enregistrement: false });
                });
        })
        .catch((error) => {
            console.error(error);
            res.json({ enregistrement: false });
        });
};

export const connexion = (req, res, next) => {
    req.Utilisateur.findOne({
        where: { pseudo_utilisateur: req.body.pseudo_utilisateur },
    }).then((utilisateur) => {
        if (utilisateur) {
            bcrypt
                .compare(req.body.mdp_utilisateur, utilisateur.mdp_utilisateur)
                .then((valide) => {
                    if (valide) {
                        creationToken(req, res, next, utilisateur.id_utilisateur);
                    } else {
                        res.json({ mdpValide: false, mdpIncorrect: true });
                    }
                })
                .catch((error) => {
                    console.error(error);
                    res.json({ mdpValide: false });
                });
        } else {
            res.json({ mdpValide: false });
        }
    });
};

export const deconnexion = (req, res) => {
    res.clearCookie("utilisateur");
    res.json({ suppression: true });
};
