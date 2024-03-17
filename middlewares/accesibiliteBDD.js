//Middleware qui permet d'accèder à partir des requêtes à la bdd

export const accesibiliteBDD = (Bdd) => {
    return (req, res, next) => {
        const { sequelize, Utilisateur, Produit } = Bdd;

        req.Sequelize = sequelize;
        req.Utilisateur = Utilisateur;
        req.Produit = Produit;

        next();
    };
};
