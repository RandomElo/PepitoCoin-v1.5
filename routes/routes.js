import express from "express";

import utilisateurs from "./utilisateurs.js";
import fichiers from "./fichiers.js";

const router = express.Router();

router.use("/utilisateurs", utilisateurs);

router.use("/", fichiers);

export default router;
