import {creationFilmCategorie, creationTitreCategorie} from "./creationCategorie.js";
import {recuperationCategorie, affichageCategorie} from "./requeteCategorie.js";

const genre1 = "Action"
const genre2 = "Romance"
const genre3 = "Music"
const api = "http://localhost:8000/api/v1"
// Ne pas dépasser 10 pour la constance nbrFilmAffiche
const nbrFilmAffiche = 4

//Mise en forme au démarrage des catégories
creationTitreCategorie(genre1, genre2, genre3);
creationFilmCategorie(api, nbrFilmAffiche, genre1, genre2, genre3)

// Choix de la categorie
const boutoncategorie = document.querySelector(".choixcategorie");
let reponse = []
boutoncategorie.addEventListener("click", async function () {
    reponse = await recuperationCategorie(api);
    affichageCategorie(reponse)
})


//Pour la fenetre modal
// Récupération du container
const modalContainer = document.querySelector(".modal-container");
//Selection de tous les éléments modal-trigger (qui permettent de fermer la fenetre)
// querySelectorAll crée une liste que l'on peux parcourir
const modalTriggers = document.querySelectorAll(".modal-trigger")

//Pour chaque déclencher (trigger on parcours la liste) on rajoute un évenement au clique
// a chaque click, sa déclenche la fonction toggleModal
modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal))

//Création de la fonction toggleModal
async function toggleModal(){
    //Rajoute la classe toggle "active" si elle existe sinon ca l'enleve
    reponse = await recuperationCategorie(api);
    affichageCategorie(reponse)
    modalContainer.classList.toggle("active")
}