document.querySelector("form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const nom = document.querySelector("#nomForm").value.split("");
    const description = document.querySelector("#descForm").value.split("");

    if (nom.length >= 4 && nom.length <= 40) {
        if (description.length >= 15 && description.length <= 220) {
            let valeurPrix = document.querySelector("#prixForm").value.replace(/,/g, ".");
            document.querySelector("#prixForm").value = valeurPrix;
            if (!isNaN(valeurPrix)) {
                const formData = new FormData(document.querySelector("form"));

                const requete = await fetch("/produit/ajout-produit", {
                    method: "POST",
                    body: formData,
                });
                if (requete.ok) {
                    const reponse = await requete.json();
                    if (reponse.enregistrement) {
                        window.location.href = `/produit/${reponse.fichier}`;
                    } else {
                        if (reponse.erreur == "MIME") {
                            document.querySelector("#divErreur").innerHTML = /*html*/ `<p>Le fichier doit être en .pnj, .jpeg ou .jpg</p>`;
                        } else if (reponse.erreur == "cookie") {
                            document.querySelector("#divErreur").innerHTML = /*html*/ `<p>Vous n'êtes pas authentifié</p>`;
                            setTimeout(() => {
                                window.location.href = `/connexion`;
                            }, 3000);
                        } else {
                            document.querySelector("#divErreur").innerHTML = /*html*/ `<p>Une erreur c'est produite</p>`;
                        }
                    }
                } else {
                    document.querySelector("#divErreur").innerHTML = /*html*/ `<p>Une erreur c'est produite</p>`;
                }
            } else {
                document.querySelector("#divErreur").innerText = "Merci de saisir un prix valide";
            }
        } else {
            document.querySelector("#divErreur").innerText = "La description doit faire entre 15 et 220 caractères";
        }
    } else {
        document.querySelector("#divErreur").innerText = "Le nom du produit doit faire entre 4 et 40 caractères";
    }
});
