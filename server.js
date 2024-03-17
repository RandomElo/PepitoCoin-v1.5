import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import bdd from './bdd/bdd.js'
import router from "./routes/routes.js";

import {accesibiliteBDD} from './middlewares/accesibiliteBDD.js'


dotenv.config(); //Permet d'utiliser les variables d'environnement

const port = 5500;
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
app.use("/public", express.static(path.join(process.cwd(), "public/assets"))); //Permet de servir les fichiers disponible à l'adresse /public/assets à l'adresse /public
app.set("view engine", "ejs"); //Permet de définir le moteur de vue
app.use(accesibiliteBDD(bdd))

app.use("/", router);

app.use(
    session({
        name: process.env.SESSION_NAME, //mettre en variable d'environnement
        resave: false, //Détérmine si la session doit être sauvegarder soi nous modifér pendant la demande
        saveUninitialized: false, //Déteminer si ne session non initalisée doit petre enregistrer
        secret: process.env.SESSION_SECRET, //Détérmine la clé de chiffrement
        cookie: {
            maxAge: 1000 * 60 * 60 * 12, // 12h
            secure: false, //Si on l'envoie que par https
            httpOnly: true, //Si jamais il est accesible dans le front
        },
    })
);

//Route qui est appeller si al requete 'nest pas définis par l'appli
app.all("*", (req, res) => {
    //Utiliser une vue
    res.status(404).send("Ressource inexistante");
});

//Middkeware d'erreur globale
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send("Erreur Serveur");
});

app.listen(port, () => console.log("Serveur démarré => port " + port));
