import { Sequelize } from "sequelize";
import Produits from "../models/Produit";


const sequelize = new Sequelize("bdd",process.env.DB_UTILISATEUR,process.env.DB_MDP,{
    dialect: "sqlite",
    storage: "./dev.sqlite",
    logging: true, //Permet d'afficher les requetes sql dasn la console
    define: {
        freezeTableName: true, //les noms des tables ne seront pas modif pour correspondre au nom de modele
        timestamps: false //permet de désavtiver l'ajout d'horodataeg des data
    }
});

module.exports = sequelize;
