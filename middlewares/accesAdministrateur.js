export const verificationAccesAdmin = (req, res, next) => {
    if (req.cookies.administrateur) {
        if (req.cookies.administrateur == process.env.COOKIE_ADMINISTRATEUR) {
            next();
        } else {
            res.clearCookie("administrateur");
            res.redirect("/");
        }
    } else {
        res.redirect("/administrateur/connexion");
    }
};
