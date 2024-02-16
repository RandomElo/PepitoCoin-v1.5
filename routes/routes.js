import express from "express";

import utilisateurs from "./utilisateurs.js";
import fichiers from "./fichiers.js";

const router = express.Router();

router.get("/utilisateurs", utilisateurs);


router.get("/", fichiers);

export default router;
