document.addEventListener("DOMContentLoaded", async () => {
    //Permet de prendre en compte les modficiations du panier
    if (localStorage.getItem("panier") != null && localStorage.getItem("panier") != "") {
        let contenuProduit = "";
        let compteurTotal = 0;
        let panierSplit = localStorage.getItem("panier").split("_");
        //Permet de faire générer chaque ligne du tableau
        for (let i = 0; i < panierSplit.length - 1; i++) {
            const produitSplit = panierSplit[i].split("-");
            const donnee = {
                idProduit: produitSplit[0],
            };
            const requete = await fetch("/produit/verification-produit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(donnee),
            });
            if (requete.ok) {
                const reponse = await requete.json();
                if (reponse.existant) {
                    const prixTotal = Number(produitSplit[1]) * Number(reponse.prix);
                    compteurTotal += prixTotal;
                    contenuProduit += /*html*/ `
                    <tr data-idproduit=${reponse.id}>
                        <td>${reponse.nom}</td>
                        <td><input type="text" min="1" value="${produitSplit[1]}" class="inputQuantite" data-prixunite="${reponse.prix}"></td>
                        <td>${reponse.prix} €</td>
                        <td>${prixTotal} €</td>
                        <td><img src="/public/img/poubelle.svg" alt="poubelle" class="supprimerElementPanier"></td>
                    </tr>`;
                }
            }
        }
        //Permet de faire d'afficher le tableau sur la page
        document.querySelector("#divResultat").innerHTML = /*html*/ `
        <table class="table mt-3">
            <thead >
                <tr class="border-b border-black">
                    <th scope="col">Nom</th>
                    <th scope="col">Quantité</th>
                    <th scope="col">Prix (/u)</th>
                    <th scope="col">Total</th>
                    <th scope="col">Supprimer</th>
                </tr>
            </thead>
            <tbody>
                ${contenuProduit}
            </tbody>
            <tfoot>
                <tr>
                    <td></td>
                    <td></td>
                    <td class="gras">Total :</td>
                    <td><span id="totalPanier">${compteurTotal}</span> €</td>
                </tr>
            </tfoot>
        </table>
        <div id="divErreur"></div>
        <a id="supprimerPanier" class="bouton mx-auto">Supprimer le panier</a>
        `;

        // GESTION DES EVENEMENTS
        // Ajoute une écoute sur le changement de valeur sur les input
        document.querySelectorAll(".inputQuantite").forEach((input) => {
            input.addEventListener("input", async (e) => {
                // Permet de modifier la valeur de la ligne
                ajouterProduitPanier(e.target.parentNode.parentNode.dataset.idproduit, e.data, "autre");
                e.target.parentNode.parentNode.children[3].innerText = (Number(e.target.dataset.prixunite) * Number(e.data)).toFixed(2) + " €";
                document.querySelector("#totalPanier").innerText = await compteurPanier("autre");
                document.querySelector("#prixPanier").innerText = await compteurPanier("autre");
            });
        });
        //Permet de supprimer le panier
        document.querySelector("#supprimerPanier").addEventListener("click", async (e) => {
            if (confirm("Voulez-vous supprimer l'entièreté de votre panier ?")) {
                localStorage.clear();
                window.location.href = "/";
            }
        });
        // Permet de supprimer une élément du panier
        document.querySelectorAll(".supprimerElementPanier").forEach((element) => {
            element.addEventListener("click", (e) => {
                if (confirm("Êtes-vous sûr de vouloir retirer cet élément de votre panier ?")) {
                    let panierSplit = localStorage.getItem("panier").split("_");
                    for (let i = 0; i < panierSplit.length - 1; i++) {
                        let produitSplit = panierSplit[i].split("-");
                        if (produitSplit[0] == e.target.parentNode.parentNode.dataset.idproduit) {
                            panierSplit.splice(i, 1);
                            break;
                        }
                    }
                    let panier = panierSplit.join("_");
                    localStorage.setItem("panier", panier);
                    location.reload(true);
                }
            });
        });
    } else {
        // Si jamais le panier est vide
        document.querySelector("#divResultat").innerHTML = /*html*/ `
        <div id="divPanierVide">
            <p class="my-4 text-center">Ton panier est vide</p>
            <a href="/" class="bouton">Aller à la page Produits</a>
        </div>`;
    }
});
