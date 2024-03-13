import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";
import utilisateurs from "../routes/utilisateurs";

export default function (d) {
    const User = db.define(
        "User",
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
                type: DataTypes.TINYINT,
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
    utilisateurs.beforeCreate(async (user, options) => {
        let hash = await bcrypt.hash(user.user_password, 10);
        user.user_password = hash;
    });
    utilisateurs.verifMDP = async (mdp, original) => await bcrypt.compare(mdp, original);
    return utilisateurs;
}
