document.querySelector("form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const donnees = {
        pseudo_utilisateur: e.target[0].value,
        mdp_utilisateur: e.target[1].value,
    };
    const requete = await fetch("/utilisateur/connexion", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(donnees),
    });
    if (requete.ok) {
        const reponse = await requete.json();
        if (reponse.connecte) {
            window.location.href = "/mes-produits";
        } else {
            if (reponse.mdpIncorrect) {
            } else {
                document.querySelector("#divErreur").innerHTML = /*html*/ `<p>Une erreur est survenu lors de l'enregistrement</p>`;
            }
        }
    } else {
        document.querySelector("#divErreur").innerHTML = /*html*/ `<p>Une erreur c'est produite</p>`;
    }
});