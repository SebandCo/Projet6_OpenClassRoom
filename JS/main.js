// Appel de l'API via un bouton
const boutontest = document.querySelector(".test");
boutontest.addEventListener("click", async function () {

    // appel de l'API
    const reponseServeur = await fetch('http://localhost:8000/api/v1/titles/499549');
    // mise en json de la réponse API
    const reponseJson = await reponseServeur.json();
    // choisir les parametres json à afficher
    await console.log (reponseJson.title + reponseJson.date_published)
})
