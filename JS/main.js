import { miseEnFormeCategorie, creationCategorie } from "./requete.js";
creationCategorie("Action","categorie1");
miseEnFormeCategorie("Action","categorie1");

creationCategorie("Romance","categorie2");
miseEnFormeCategorie("Romance","categorie2");

creationCategorie("Thriller","categorie3");
miseEnFormeCategorie("Thriller","categorie3");

// Appel de l'API via un bouton
const boutontest = document.querySelector(".test");

boutontest.addEventListener("click", async function () {
    creationCategorie("Action","categorie1");
    miseEnFormeCategorie("Action","categorie1");
})

