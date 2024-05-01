import jwt from "jsonwebtoken";
export const creationToken = (req, res, next, idUtilisateur) => {
    const tokenJWT = jwt.sign({ idUtilisateur: idUtilisateur }, process.env.CHAINE_JWT, { expiresIn: "72h" });
    return res
        .cookie("utilisateur", tokenJWT, {
            maxAge: 100 * 60 * 60 * 60 * 24 * 3,
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        })
        .json({ connecte: true });
};
