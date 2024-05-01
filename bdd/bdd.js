import { Sequelize } from "sequelize";

import Produit from "../modeles/Produit.js";
import Utilisateur from "../modeles/Utilisateur.js";

//Création de l'instance Sequelize
const sequelize = new Sequelize("bdd", process.env.DB_UTILISATEUR, process.env.DB_MDP, {
    dialect: "sqlite",
    storage: "./bdd.sqlite",
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


export default bdd;