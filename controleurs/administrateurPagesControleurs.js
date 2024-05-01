export const accueil = (req, res) => {
    if (req.cookies.administrateur == process.env.COOKIE_ADMINISTRATEUR) {
        res.redirect("/administrateur/gestion");
    } else if (!req.cookies.administrateur) {
        res.redirect("/administrateur/connexion");
    } else {
        res.clearCookie("administrateur");
        res.redirect("/");
    }
};
export const connexion = (req, res) => {
    if (!req.cookies.administrateur) {
        res.render("connexion.ejs", { titre: "Connexion", css: "identification", script: "connexionAdministrateur", utilisation: "administrateur", cookieUtilisateur: req.cookies.utilisateur  });
    } else {
        res.redirect("/administrateur/gestion");
    }
};
export const gestion = (req, res) => {
    res.render("administrateurGestion.ejs", { titre: "Gestion Administrateur", css: "administrateurGestion", script: "administrateurGestion", cookieUtilisateur: req.cookies.utilisateur  });
};
