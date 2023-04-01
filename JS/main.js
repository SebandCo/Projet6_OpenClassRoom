import { miseEnFormeCategorie, creationCategorie } from "./requeteFilm.js";
import {recuperationCategorie, affichageCategorie} from "./requeteCategorie.js";

//Mise en forme au démarrage des catégories
creationCategorie("Action","categorie1");
miseEnFormeCategorie("Action","categorie1");

creationCategorie("Romance","categorie2");
miseEnFormeCategorie("Romance","categorie2");

creationCategorie("Thriller","categorie3");
miseEnFormeCategorie("Thriller","categorie3");

// Choix de la categorie
const boutoncategorie = document.querySelector(".choixcategorie");
let reponse = []
boutoncategorie.addEventListener("click", async function () {
    reponse = await recuperationCategorie();
    affichageCategorie(reponse)
})

// Affichage des infos Film au clic
const boutonfilm = document.querySelector(".choixFilm");
boutonfilm.addEventListener("click", async function (){
    console.log (boutonfilm)
})