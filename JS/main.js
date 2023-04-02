import {creationFilmCategorie, creationTitreCategorie} from "./creationCategorie.js";
import {recuperationCategorie, affichageCategorie} from "./requeteCategorie.js";
import {recuperationId} from "./affichageFilm.js";

const genre1 = "Action"
const genre2 = "Romance"
const genre3 = "Thriller"
const api = "http://localhost:8000/api/v1"
// Ne pas dépasser 10 pour la constance nbrFilmAffiche
const nbrFilmAffiche = 4

//Mise en forme au démarrage des catégories
creationTitreCategorie(genre1, genre2, genre3);
creationFilmCategorie(api, nbrFilmAffiche, genre1, genre2, genre3)
recuperationId()

// Choix de la categorie
const boutoncategorie = document.querySelector(".choixcategorie");
let reponse = []
boutoncategorie.addEventListener("click", async function () {
    reponse = await recuperationCategorie();
    affichageCategorie(reponse)
})
