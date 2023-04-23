import {creationFilmCategorie,
        creationTitreCategorie,
        creationFilmMieuxNote,
        creationMeilleurFilm} from "./creationCategorie.js";
import {evenementModalCategorie,
        activationFenetre} from "./gestionFenetreModal.js";

let genre1 = "Action"
let genre2 = "Romance"
let genre3 = "Music"
let genres = [genre1, genre2, genre3]
const API = "http://localhost:8000/api/v1"
const NBRFILMSTOCK = 10
// Définition du nombre de film affiché suivant la taille de l'écran
let nbrFilmAffiche = 4
if (screen.width <= 1070){
    nbrFilmAffiche = 3
}


//Mise en forme au démarrage des catégories
creationMeilleurFilm(API)
creationFilmMieuxNote(API, NBRFILMSTOCK, nbrFilmAffiche)
creationTitreCategorie(genres);
creationFilmCategorie(API, NBRFILMSTOCK, nbrFilmAffiche, genres)


// Pour la fenetre modal
// Selection de tous les éléments modal-trigger (qui permettent de fermer la fenetre)
let modalTriggers = document.querySelectorAll(".modal-trigger")
// Pour chaque déclencher sa déclenche la fonction basculeModal
modalTriggers.forEach(trigger => trigger.addEventListener("click", basculeModal))

// Création de la fonction basculeModal
async function basculeModal(){
    // Active ou desactive la fenetre lors du clique
    activationFenetre()
}


// Permet de déclencher le choix de categorie lors du clique sur le bouton
const modalCategorie = document.querySelector(".choix-categorie")
    modalCategorie.addEventListener("click",function(){
        evenementModalCategorie(API, NBRFILMSTOCK, nbrFilmAffiche)
    })
