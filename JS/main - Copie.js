// Appel de l'API via un bouton
const boutontest = document.querySelector(".test");
boutontest.addEventListener("click", async function () {

    // appel de l'API
    const reponseServeur = await fetch('http://localhost:8000/api/v1/titles/9');
    // mise en json de la réponse API
    const reponseJson = await reponseServeur.json();
    // choisir les parametres json à afficher
    const balise = document.createElement("img");
    balise.src = reponseJson.image_url;
    const sectionFilm = document.querySelector("#meilleurfilm")
    sectionFilm.appendChild(balise)
    await console.log (reponseJson.title + reponseJson.date_published)
})

const balise = document.createElement("img");
balise.src = "https://m.media-amazon.com/images/M/MV5BMTYwOTEwNjAzMl5BMl5BanBnXkFtZTcwODc5MTUwMw@@._V1_UX182_CR0,0,182,268_AL_.jpg";
const sectionFilm = document.querySelector("#meilleurfilm")
sectionFilm.appendChild(balise)