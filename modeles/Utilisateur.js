import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";

export default function (bdd) {
    const Utilisateur = bdd.define(
        "Utilisateurs",
        {
            id_utilisateur: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            pseudo_utilisateur: {
                type: DataTypes.STRING(255),
                allowNull: false,
                unique: true,
            },
            mdp_utilisateur: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
        },
        {
            tableName: "Utilisateurs",
        }
    );

    return Utilisateur;
}
