document.querySelectorAll(".boutonSupprimer").forEach((bouton) => {
    bouton.addEventListener("click", async (e) => {
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
                    } else if (reponse.raison == "id différents") {
                        window.location.href = "/";
                    } else if (reponse.raison == "inexistant") {
                        window.location.href = "/";
                    }
                }
            } else {
                document.querySelector("#divErreur").innerHTML = /*html*/ `<p class="mt-2 mb-0">Une erreur est survenue lors de la suppression du produit</p>`;
            }
        }
    });
});
