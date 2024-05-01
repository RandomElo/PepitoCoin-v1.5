document.querySelector("form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const donnees = {
        nom_admin: document.querySelector("#pseudoForm").value,
        mdp_admin: document.querySelector("#mdpForm").value,
    };
    const requete = await fetch("/administrateur/connexion-administrateur", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(donnees),
    });
    if (requete.ok) {
        const reponse = await requete.json();
        if (reponse.connexion) {
            window.location.href = "/administrateur/gestion";
        } else {
            window.location.href = "/";
        }
    } else {
        alert("Une erreur est survenue");
    }
});
