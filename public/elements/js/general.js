//Récupération du menu hamburger
var menuHamburger = document.querySelector(".menuHamburger");
//Récupération du navlink
var navLinks = document.querySelector(".navLinks");
//Ajout de l'événment click sur l'image du menu hamburger
menuHamburger.addEventListener("click", () => {
    navLinks.classList.toggle("mobile-menu");
});
// Gestion du sous menus en responsive
if (document.querySelector(".nomSousMenus")) {
    document.querySelector(".nomSousMenus").addEventListener("click", () => {
        const sousListe = document.querySelector(".sousListe");
        const styleSousListe = window.getComputedStyle(sousListe);
        if (styleSousListe.display == "none") {
            sousListe.style.display = "block";
        } else {
            sousListe.style.display = "none";
        }
    });
}
if (document.querySelector("nav").dataset.connecte == "true") {
    // Gestion de la deconnexion
    document.querySelector("#lienDeconnexion").addEventListener("click", async () => {
        const requete = await fetch("/utilisateur/deconnexion", {
            method: "GET",
        });
        if (requete.ok) {
            window.location.href = "/";
        } else {
            alert("Une erreur est survenue lors de la déconnexion");
        }
    });
}

// Gestion du panier
document.addEventListener("DOMContentLoaded", () => compteurPanier("navbar"));
async function compteurPanier(mode) {
    if (localStorage.getItem("panier")) {
        let panierSplit = localStorage.getItem("panier").split("_");
        let prixPanier = 0;
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
                if (reponse.prix) {
                    prixPanier = prixPanier + Number(produitSplit[1]) * Number(reponse.prix);
                } else {
                    panierSplit.splice(i, 1);
                }
            }
        }
        const panier = panierSplit.join("_");

        localStorage.setItem("panier", panier);
        if (mode == "navbar") {
            document.querySelector("#prixPanier").innerText = prixPanier.toFixed(2);
        } else {
            return prixPanier.toFixed(2);
        }
    } else {
        if (mode == "navbar") {
            document.querySelector("#prixPanier").innerText = "0";
        } else {
            return "0";
        }
    }
}

function ajouterProduitPanier(idProduit, quantite, mode) {
    if (localStorage.getItem("panier") == "" || localStorage.getItem("panier") == null) {
        localStorage.setItem("panier", `${idProduit}-${quantite}_`);
    } else {
        let panierSplit = localStorage.getItem("panier").split("_");
        let produitTrouver = false;
        for (let i = 0; i < panierSplit.length; i++) {
            const produit = panierSplit[i];
            const produitSplit = produit.split("-");
            if (produitSplit[0] == idProduit) {
                if (mode == "ajout") {
                    const quantiteProduit = Number(quantite) + Number(produitSplit[1]);
                    panierSplit[i] = `${idProduit}-${quantiteProduit}`;
                } else {
                    panierSplit[i] = `${idProduit}-${quantite}`;
                }
                let panierModifier = panierSplit.join("_");
                localStorage.setItem("panier", panierModifier);
                produitTrouver = true;
            }
        }
        if (!produitTrouver) {
            localStorage.setItem("panier", `${localStorage.getItem("panier")}${idProduit}-${quantite}_`);
        }
    }
}
