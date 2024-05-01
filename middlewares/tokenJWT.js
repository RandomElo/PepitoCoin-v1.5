import jwt from "jsonwebtoken";

export const tokenJWT = (req, res, next) => {
    if (req.cookies.utilisateur != undefined) {
        jwt.verify(req.cookies.utilisateur, process.env.CHAINE_JWT, (error, decoder) => {
            if (error) {
                res.clearCookie("utilisateur");
                res.redirect("/");
            } else {
                req.idUtilisateur = decoder.idUtilisateur;
            }
            next();
        });
    } else {
        next();
    }
};
