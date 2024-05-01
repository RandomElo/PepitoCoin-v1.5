if (document.querySelector("#inputPanier")) {
    // Cela veut dire que je suis pas propriétaire
    document.addEventListener("DOMContentLoaded", () => {
        document.querySelector("#inputPanier").value = 1;
    });
    // Permet de changer le tital selon la quantité
    document.querySelector("#inputPanier").addEventListener("input", (e) => {
        document.querySelector("#montantTotal").textContent = (e.target.value * e.target.dataset.prixunite).toFixed(2);
    });
    // Permet d'ajouter au panier
    document.querySelector("#ajouterPanier").addEventListener("click", async () => {
        // Appel de la fonction pour ajouter un élément au paneir
        ajouterProduitPanier(document.querySelector("#divProduit").dataset.id, document.querySelector("#inputPanier").value, "ajout");
        compteurPanier("navbar");
    });
} else {
    // Cela veut dire que je suis le propriétaire
    document.querySelector("#boutonSupprimer").addEventListener("click", async (e) => {
        const donnee = {
            id: e.target.parentElement.dataset.id,
        };
        if (confirm("Voulez-vous vraiment supprimer ce produit ?")) {
            const requete = await fetch("/produit/suppression-produit", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(donnee),
            });
            if (requete.ok) {
                const reponse = await requete.json();
                if (reponse.suppression) {
                    window.location.href = "/";
                } else {
                    if (reponse.raison == "erreur supression") {
                        document.querySelector(`#${e.originalTarget.parentElement.attributes.id.value} #divErreur`).innerHTML = /*html*/ `<p class="mt-2 mb-0">Erreur lors de la suppression de l'élément de la base de données</p>`;
                    } else if (reponse.raison == "erreur supression fichier") {
                        document.querySelector("#divErreur").innerHTML = /*html*/ `<p class="mt-2 mb-0">Erreur lors de la suppression de l'image du serveur</p>`;
                    } else if (reponse.raison == "autre") {
                        window.location.href = "/";
                    }
                }
            } else {
                document.querySelector("#divErreur").innerHTML = /*html*/ `<p>Une erreur est survenue</p>`;
            }
        }
    });
}
