document.querySelector("#voirMdp").addEventListener("click", (e) => {
    const input = document.querySelector("#mdpForm");
    const illustration = document.querySelector("#voirMdp");
    if (input.type == "password") {
        input.type = "text";
        illustration.src = "/public/img/oeilOff.svg";
    } else {
        input.type = "password";
        illustration.src = "/public/img/oeil.svg";
    }
});
