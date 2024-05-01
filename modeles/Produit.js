import { DataTypes } from "sequelize";

export default function (bdd) {
    const Produit = bdd.define(
        "Produits",
        {
            id_produit: {
                type: DataTypes.INTEGER(),
                autoIncrement: true,
                primaryKey: true,
            },
            nom_produit: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            description_produit: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            nom_image_produit: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            prix_produit: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
        },
        {
            tableName: "Produits",
        }
    );

    return Produit;
}
