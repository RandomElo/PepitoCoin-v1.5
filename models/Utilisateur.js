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
            role_utilisateur: {
                type: DataTypes.TINYINT, //1: Admin, 2: Utilisateur
                allowNull: false,
            },
            sexe_utilisateur: {
                type: DataTypes.STRING(1),
                allowNull: false,
            },
        },
        {
            tableName: "Utilisateurs",
        }
    );
    Utilisateur.beforeCreate(async (utilisateur, options) => {
        let hash = await bcrypt.hash(utilisateur.mdp_utilisateur, 10);
        utilisateur.user_password = hash;
    });
    Utilisateur.verifMDP = async (mdp, original) => await bcrypt.compare(mdp, original);

    return Utilisateur;
}
