import { Sequelize } from "sequelize";
import { fakerFR as faker } from "@faker-js/faker";

import Produit from "../models/Produit.js";
import Utilisateur from "../models/Utilisateur.js";

//Création de l'instance Sequelize
const sequelize = new Sequelize("bdd", process.env.DB_UTILISATEUR, process.env.DB_MDP, {
    dialect: "sqlite",
    storage: "./dev.sqlite",
    logging: false, //Permet d'afficher les requetes sql dasn la console
    define: {
        freezeTableName: true, //les noms des tables ne seront pas modif pour correspondre au nom de modele
        timestamps: false, //permet de désavtiver l'ajout d'horodataeg des data
    },
});
//Création de l'objet de la base de données
const bdd = {
    sequelize,
    Produit: Produit(sequelize),
    Utilisateur: Utilisateur(sequelize),
};
//Permet de déclarer des relations
bdd.Utilisateur.hasMany(bdd.Produit, { foreignKey: "id_utilisateur" });
bdd.Produit.belongsTo(bdd.Utilisateur, { foreignKey: "id_utilisateur" });

//Ajout de fausse données dans la bdd
await sequelize.sync({ force: true }); //Permet de remettre à neuf la bdd à chaque démarrage

//Création de faux utilisateurs
await bdd.Utilisateur.create({
    pseudo_utilisateur: "Random",
    mdp_utilisateur: "random",
    role_utilisateur: 2,
    sexe_utilisateur: "M",
});

await bdd.Utilisateur.create({
    pseudo_utilisateur: "Pépita",
    mdp_utilisateur: "pepita",
    role_utilisateur: 2,
    sexe_utilisateur: "F",
});
//Création de 5 faux produits
for (let i = 0; i < 5; i++) {
    await bdd.Produit.create({
        nom_produit: faker.commerce.product(),
        description_produit: faker.commerce.productDescription(),
        nom_image_produit: "illlustration.jpg",
        prix_produit: faker.number.float({ multipleOf: 0.01, min: 5, max: 45 }), // Mise à jour
        id_utilisateur: faker.number.int({ min: 1, max: 2 }), // Mise à jour
    });
}

export default bdd;
