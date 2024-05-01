document.querySelector("form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(document.querySelector("form"));
    formData.append("id", e.target.dataset.id);

    const requete = await fetch("/produit/modification-produit", {
        method: "PUT",
        body: formData,
    });
    if (requete.ok) {
        const reponse = await requete.json();
        if (reponse.modifier) {
            window.location.href = `/produit/${e.target.dataset.id}`;
        } else {
            if (reponse.raison == "cookie") {
                window.location.href = "/";
            } else if ((reponse.raison = "mise a jour")) {
                document.querySelector("#divErreur").innerHTML = /*html*/ `<p>Une erreur est survenue lors de la mise à jour du produit</p>`;
            }
        }
    } else {
        document.querySelector("#divErreur").innerHTML = /*html*/ `<p>Une erreur est survenue lors de la mise à jour du produit</p>`;
    }
});
