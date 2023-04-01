import { miseEnFormeCategorie, creationCategorie } from "./requeteFilm.js";
import {recuperationCategorie} from "./requeteCategorie.js";


creationCategorie("Action","categorie1");
miseEnFormeCategorie("Action","categorie1");

creationCategorie("Romance","categorie2");
miseEnFormeCategorie("Romance","categorie2");

creationCategorie("Thriller","categorie3");
miseEnFormeCategorie("Thriller","categorie3");

// Appel de l'API via un bouton
const boutontest = document.querySelector(".choixcategorie");
let reponse =""
boutontest.addEventListener("click", async function () {
    reponse = recuperationCategorie()
    console.log (reponse)
})

