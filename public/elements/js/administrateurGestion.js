document.querySelector("#produitsBouton").addEventListener("click", async () => {
    const requete = await fetch("/administrateur/tous-produits", {
        method: "GET",
    });
    if (requete.ok) {
        const reponse = await requete.json();

        let conteneurProduits = "";
        reponse.produits.forEach((produit) => {
            const element = /*html*/ `
            <div class="produit mx-auto text-center mb-4" data-id=${produit.id_produit}>
                <img src=/data/enregistrements/${produit.nom_image_produit} alt="Image de ${produit.nom_produit}" class="imageProduit">
                <div class="detailProduit mt-2">
                <p class="titreProduit"><span class="gras">Nom : </span>${produit.nom_produit}</p>
                <p class="prixProduit"><span class="gras">Prix : </span>${produit.prix_produit} €</p>
                </div>
                <div class="actionsProduit mb-3">
                    <a class="bouton boutonModifier">Modifier</a>
                    <a class="bouton boutonSupprimer">Supprimer</a>
                </div>                
            </div>
            `;
            conteneurProduits += element;
        });
        document.querySelector("#divResultat").innerHTML = conteneurProduits;
        reponse.produits.forEach((produit) => {
            document.querySelector(`[data-id='${produit.id_produit}'] .boutonModifier`).addEventListener("click", () => {
                document.querySelector("#divResultat").innerHTML = /*html*/ `
                <form id="form" data-id=${produit.id_produit}>
                    <div class="divFormInput">
                        <label for="nomForm">Nom du produit :</label>
                        <input name="nom" id="nomForm" type="text" value=${produit.nom_produit} required />
                    </div>
                    <div id="divDesc">
                        <label for="descForm">Description du produit  :</label>
                        <textarea name="description" id="descForm" cols="30" rows="4">${produit.description_produit}</textarea>
                    </div>
                    <div class="divFormInput">
                        <label for="prixForm">Prix du produit (en €)  :</label>
                        <input name="prix" id="prixForm" type="number" value=${produit.prix_produit} min="1" step="0.01" required />
                    </div>
                    <div id="divImg">
                        <label for="imgForm">Image du produit  :</label>
                        <input name="image" id="imgForm" type="file" accept="image/png, image/jpeg, image/jpg"  />
                    </div>
                    <div id="divErreur" class="mt-2"></div>
                    <button id="envoiBouton" class="bouton" type="submit">Publier</button>
                </form>`;
                document.querySelector("form").addEventListener("submit", async (e) => {
                    e.preventDefault();
                    const formData = new FormData(document.querySelector("form"));
                    formData.append("id", e.target.dataset.id);
                    const requete = await fetch("/administrateur/modifier-produit", {
                        method: "PUT",
                        body: formData,
                    });
                    if (requete.ok) {
                        const reponse = await requete.json();
                        if (reponse.modifier) {
                            location.reload(true);
                        } else {
                            alert("Une erreur est survenue");
                        }
                    } else {
                        console.error("Une erreur est survenue");
                    }
                });
            });
        });
        document.querySelectorAll(".boutonSupprimer").forEach((bouton) => {
            bouton.addEventListener("click", async (e) => {
                if (confirm("Êtes vous sur de le supprimer ?")) {
                    const donnee = {
                        id_produit: e.target.parentNode.parentNode.dataset.id,
                    };
                    const requete = await fetch("/administrateur/suppression-produit", {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(donnee),
                    });
                    if (requete.ok) {
                        const reponse = await requete.json();
                        if (reponse.suppression) {
                            location.reload(true);
                        } else {
                            alert("Une erreur est survenue");
                        }
                    } else {
                        alert("Une erreur est survenue");
                    }
                }
            });
        });
    } else {
        console.error("Une erreur est survenu lors de la requete");
    }
});
document.querySelector("#comptesBouton").addEventListener("click", async () => {
    const requete = await fetch("/administrateur/tous-utilsateurs", {
        method: "GET",
    });
    if (requete.ok) {
        const reponse = await requete.json();
        let conteneurCompte = "";
        reponse.utilisateurs.forEach((utilisateur) => {
            const element = /*html*/ `
            <div class="utilisateurs" data-id=${utilisateur.id_utilisateur}>
                <p><span class="gras">Pseudo : </span>${utilisateur.pseudo_utilisateur}</p>
                <a class="bouton boutonSupprimer">Supprimer</a>
            </div>`;
            conteneurCompte += element;
        });
        document.querySelector("#divResultat").innerHTML = conteneurCompte;
        // For Each qui me permet d'ajouter mes éléments
        reponse.utilisateurs.forEach((utilisateur) => {
            document.querySelector(`[data-id="${utilisateur.id_utilisateur}"] .boutonSupprimer`).addEventListener("click", async () => {
                if (confirm("Êtes vous sur ?")) {
                    const donnee = {
                        id_utilisateur: utilisateur.id_utilisateur,
                    };
                    const requete = await fetch("/administrateur/suppression-utilisateur", {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(donnee),
                    });
                    if (requete.ok) {
                        const reponse = await requete.json();
                        if (reponse.suppression) {
                            location.reload(true);
                        } else {
                            alert("Une erreur est survenue");
                        }
                    } else {
                        alert("Une erreur est survenue");
                    }
                }
            });
        });
    } else {
        console.error("Une erreur est survenue");
    }
});