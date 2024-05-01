document.querySelector("#pseudoForm").addEventListener("input", async (e) => {
    const donnee = {
        pseudo_utilisateur: document.querySelector("#pseudoForm").value,
    };
    const requete = await fetch("/utilisateur/disponibilite", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(donnee),
    });
    if (requete.ok) {
        const reponse = await requete.json();
        if (reponse.disponibilite) {
            document.querySelector("#boutonSubmit").style.display = "block";
            document.querySelector("#divErreur").innerHTML = "";
        } else {
            document.querySelector("#boutonSubmit").style.display = "none";
            document.querySelector("#divErreur").innerHTML = /*html*/ `<p id="pseudoUtiliser">Ce pseudo est déjà utiliser</p>`;
        }
    } else {
        document.querySelector("#divErreur").innerHTML = /*html*/ `<p>Une erreur est survenu lors de la verification de la disponibilite</p>`;
    }
});
document.querySelector("form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const donnees = {
        pseudo_utilisateur: document.querySelector("#pseudoForm").value,
        mdp_utilisateur: document.querySelector("#mdpForm").value,
    };
    const requete = await fetch("/utilisateur/enregistrement", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(donnees),
    });
    if (requete.ok) {
        const reponse = await requete.json();
        if (reponse.enregistrement == false) {
            document.querySelector("#divErreur").innerHTML = /*html*/ `<p>Une erreur est survenu lors de l'enregistrement</p>`;
        } else {
            window.location.href = "/mes-produits";
        }
    } else {
        document.querySelector("#divErreur").innerHTML = /*html*/ `<p>Une erreur est survenu lors de l'enregistrement</p>`;
    }
});
