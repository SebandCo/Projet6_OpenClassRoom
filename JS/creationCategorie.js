import {evenementCategorieGeneral} from "./evenementCategorie.js";

// Affichage de l'image du film (sous forme de bouton cliquable) par categorie
async function affichageFilm(categorie, nbrFilmStock, nbrFilmAffiche, reponseServeur){
    genererFleche(categorie,"gauche")
    for (let i=0; i<nbrFilmStock && i<reponseServeur.length; i++){
        genererFilm(reponseServeur[i],(categorie),i+1, nbrFilmAffiche)
    }
    genererFleche(categorie,"droite")
    affichageFleche(categorie)
}

// Création d'une image du film
function genererFilm(film,localisationBalise,position, nbrFilmAffiche){
    const baliseBouton = document.createElement("button")
        baliseBouton.setAttribute("class","choixFilm film-"+position)
        if (position<=nbrFilmAffiche){
            baliseBouton.style.display = "";
        }
        else{
            baliseBouton.style.display = "none";
        }
    const baliseImage = document.createElement("img");
        baliseImage.src = film.image_url;
        baliseImage.setAttribute("id",film.id)
    const sectionFilm = document.querySelector(localisationBalise)
    sectionFilm.appendChild(baliseBouton)
    baliseBouton.appendChild(baliseImage)
}

// Création des fleches droite/gauche
function genererFleche (categorie,position){
    const baliseFleche = document.createElement("button")
        baliseFleche.setAttribute("class","fleche-"+position+" fleche"+" fleche-"+categorie.substring(1))
    const sectionFilm = document.querySelector(categorie)
    sectionFilm.appendChild(baliseFleche)
}

// Affichage des fleches
// Si il n'y a pas de film à droite ou gauche alors la fleche est cachée
export function affichageFleche(categorie){
    const listeFilmActuel = document.querySelectorAll(categorie+" button")
    const flecheGauche = listeFilmActuel[0]
    const flecheDroite = listeFilmActuel[listeFilmActuel.length-1]
    const permierFilm = listeFilmActuel[1]
    const dernierFilm = listeFilmActuel[listeFilmActuel.length-2]
    // Si le premier film est affiché alors la fleche de gauche est désactivée
    if (permierFilm.style.display == ""){
        flecheGauche.style.display = "none"
    }
    else{
        flecheGauche.style.display = ""
    }

    // Si le dernier film est affiché alors la fleche de droite est désactivée
    if (dernierFilm.style.display == ""){
        flecheDroite.style.display = "none"
    }
    else{
        flecheDroite.style.display = ""
    }
}


// Affichage du titre de chaque categorie
export function creationTitreCategorie (genres){
    const sectionFilm = document.querySelector("#ensemblefilm")
    sectionFilm.innerHTML=""
    for (let i=0; i<genres.length; i++){
        //Création d'un ensemble par categorie
        const generalCategorie = document.createElement ("section")
            generalCategorie.setAttribute ("class","listeFilm")
            generalCategorie.setAttribute ("id","categorie"+(i+1))
            sectionFilm.appendChild(generalCategorie)
        
            //Création du titre
        const nomCategorie = document.createElement("h3");
            nomCategorie.innerText = "Categorie "+(i+1)+" : "+genres[i];
            generalCategorie.appendChild(nomCategorie);
    }
}

// Fonction pour le film le mieux noté
export async function creationMeilleurFilm(api){
    const rechercheAPI = "&sort_by=-imdb_score"
    const categorie = ("#meilleurfilm")
    const reponseServeur = await requeteServeur(api, rechercheAPI, 1)
    affichageFilm(categorie, 1, 1, reponseServeur)
}

// Fonction pour le déroulé de l'affichage des films les mieux notés
export async function creationFilmMieuxNote(api,nbrFilmStock, nbrFilmAffiche){
    const rechercheAPI = "&sort_by=-imdb_score"
    const categorie = ("#mieuxnote")
    const reponseServeur = await requeteServeur(api, rechercheAPI, nbrFilmStock)
    affichageFilm(categorie, nbrFilmStock, nbrFilmAffiche, reponseServeur)
}

// Fonction pour le déroulé de l'affichage des films par categorie
export async function creationFilmCategorie(api, nbrFilmStock, nbrFilmAffiche, genres){   
    for (let i=0; i<genres.length;i++){ 
        const rechercheAPI = "&genre="+genres[i]+"&sort_by=-imdb_score"
        const categorie = ("#categorie"+(i+1))
        const reponseServeur = await requeteServeur(api, rechercheAPI, nbrFilmStock)
        affichageFilm(categorie, nbrFilmStock, nbrFilmAffiche, reponseServeur)
    }
    evenementCategorieGeneral(api, nbrFilmAffiche)
}

// Fonction pour récupérer les films de l'API
async function requeteServeur (api, rechercheAPI, nbrFilmStock){
    let reponsePartielServeur = []
    for (let j=0; j<=(nbrFilmStock/5);j++){
        reponsePartielServeur[j] = await fetch (api+"/titles/?page="+(j+1)+rechercheAPI);
        //Regarde si la page de l'API existe
        if (reponsePartielServeur[j].status!="404"){
            reponsePartielServeur[j] = await reponsePartielServeur[j].json();
            reponsePartielServeur[j] = reponsePartielServeur[j].results
        }
        //Sinon quitte la boucle
        else{
            break
        }
    }
    const reponseServeur = recuperationDonnees(reponsePartielServeur)
    return reponseServeur
}

// Fonction pour fusionner les tableaux en un seul
function recuperationDonnees(tableau){
    let tableauModifie = []
    for (let i=0; i<tableau.length;i++){
        for (let j=0; j<tableau[i].length;j++){
            tableauModifie.push (tableau[i][j])
        }
    }
    return (tableauModifie)
}