import multer from "multer";

// Configuration du stockage des fichiers téléchargés
const storage = multer.diskStorage({
    // L'endroit où seront stockés les fichiers téléchargés
    destination: (req, file, callback) => {
        callback(null, "./public/data/enregistrements");
    },
    // Le nom du fichier enregistré sur le serveur
    filename: (req, file, callback) => {
        // Générer un nom de fichier unique en utilisant la date actuelle et le nom d'origine du fichier
        req.fileNameSave = Date.now() + "_" + file.originalname;
        callback(null, req.fileNameSave);
    },
});

// Middleware de chargement unique pour gérer les requêtes de téléchargement de fichiers
export const enregistrementFichier = multer({
    storage,
    // Filtrer les types de fichiers acceptés
    fileFilter: (req, file, callback) => {
        // Vérifier le type MIME du fichier et autoriser seulement certains types
        if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
            callback(null, true); // Accepter le fichier si le type est autorisé
        } else {
            // Si le type n'est pas autorisé, ajouter un message d'erreur à req.errorFile
            req.erreurFichier = true;
            callback(null, false); // Refuser le fichier
        }
    },
}).single("image"); // Le champ 'fileToUpload' contient le fichier à télécharger
