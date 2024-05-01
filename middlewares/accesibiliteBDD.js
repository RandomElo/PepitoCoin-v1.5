//Middleware qui permet d'accèder à partir des requêtes à la bdd

export const accesibiliteBDD = (bdd) => {
    return (req, res, next) => {
        const { sequelize, Utilisateur, Produit } = bdd;

        req.Sequelize = sequelize;
        req.Utilisateur = Utilisateur;
        req.Produit = Produit;

        next();
    };
};
