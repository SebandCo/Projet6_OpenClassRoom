import {creationFilmCategorie,
        creationTitreCategorie,
        creationFilmMieuxNote,
        creationMeilleurFilm} from "./creationCategorie.js";
import {recuperationCategorie} from "./requeteCategorie.js";
import {evenementModalCategorie,
        activationFenetre} from "./gestionFenetreModal.js";

const genre1 = "Action"
const genre2 = "Romance"
const genre3 = "Music"
const genres = [genre1, genre2, genre3]
const api = "http://localhost:8000/api/v1"
const nbrFilmStock = 10
const nbrFilmAffiche = 4

//Mise en forme au démarrage des catégories
creationMeilleurFilm(api)
creationFilmMieuxNote(api, nbrFilmStock, nbrFilmAffiche)
creationTitreCategorie(genres);
creationFilmCategorie(api, nbrFilmStock, nbrFilmAffiche, genres)


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
    activationFenetre()
}

const modalCategorie = document.querySelector(".choix-categorie")
    modalCategorie.addEventListener("click",function(){
        evenementModalCategorie(api, nbrFilmStock, nbrFilmAffiche)
    })

