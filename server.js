import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import bdd from "./bdd/bdd.js";
import router from "./routes/routes.js";

import { accesibiliteBDD } from "./middlewares/accesibiliteBDD.js";
import { tokenJWT } from "./middlewares/tokenJWT.js";
dotenv.config(); //Permet d'utiliser les variables d'environnement

const port = 8100;
const app = express();

//Définition du CORS
app.use(
    cors({
        origin: "*", //Toutes les origines sont au
        options: "GET,POST,PATCH,PUT,DELETE", //Les méthodes autorisées
        allowedHeaders: "Content-type,Autorization", //Les en-têtes autorisé
        credentials: true, //Les informations d'authorisation doivent être envoyées lors de la demande de cross origini
    })
);
app.use(express.json()); //Permet d'analyser le corps des requetes entrantes au format JSON
app.use("/", express.static(path.join(process.cwd(), "public")));
app.use("/public", express.static(path.join(process.cwd(), "public/elements")));
app.use("/data", express.static(path.join(process.cwd(), "public/data")));
app.set("view engine", "ejs"); //Permet de définir le moteur de vue
app.use(cookieParser());
app.use(accesibiliteBDD(bdd));
app.use(tokenJWT);


app.use("/", router);

//Route qui est appeller si al requete 'nest pas définis par l'appli
app.all("*", (req, res) => {
    res.render("erreur.ejs", { titre: "Erreur 404", nomErreur: "404", texteErreur: "La ressource est inexistante", detailErreur: "", css: "erreur", script: "", cookieUtilisateur: req.cookies.utilisateur  });
    //Crée iune vue rreru 404
});

//Middkeware d'erreur globale
app.use((err, req, res, next) => {
    console.error(err);
    res.render("erreur.ejs", { titre: "Erreur 500", nomErreur: "500", texteErreur: "Le serveur à dysfonctionner", detailErreur: err, css: "erreur", script: "", cookieUtilisateur: req.cookies.utilisateur  });
});

app.listen(port, () => console.log("Serveur démarré => port " + port));
