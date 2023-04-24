import {evenementCategorieGeneral} from "./evenementCategorie.js";

// Affichage de l'image du film (sous forme de bouton cliquable) par categorie
async function affichageFilm(categorie, NBRFILMSTOCK, nbrFilmAffiche, reponseServeur){
    genererFleche(categorie,"gauche")
    let baliseDiv = document.createElement("div")
        baliseDiv.setAttribute("class", "div-film-"+categorie.substring(1))
    for (let i=0; i<NBRFILMSTOCK && i<reponseServeur.length; i++){
        genererFilm(reponseServeur[i],(categorie),i+1, nbrFilmAffiche, baliseDiv)
    }
    genererFleche(categorie,"droite")
    affichageFleche(categorie)
}


// Création d'une image du film
function genererFilm(film,localisationBalise,position,nbrFilmAffiche,baliseDiv){
    let baliseBouton = document.createElement("button")
        baliseBouton.setAttribute("class","choixFilm film-"+position)
        baliseBouton.setAttribute("name",film.id)
        if (position<=nbrFilmAffiche){
            baliseBouton.style.display = "";
        }
        else{
            baliseBouton.style.display = "none";
        }
    let baliseImage = document.createElement("img");
        baliseImage.src = film.image_url;
        baliseImage.setAttribute("alt","image du film "+film.id)
    let sectionFilm = document.querySelector(localisationBalise)
    sectionFilm.appendChild(baliseDiv)
    baliseDiv.appendChild(baliseBouton)
    baliseBouton.appendChild(baliseImage)
}


// Création des fleches droite/gauche
function genererFleche (categorie,position){
    let baliseFleche = document.createElement("button")
        baliseFleche.setAttribute("class","fleche-"+position+" fleche"+" fleche-"+categorie.substring(1))
        if (position == "droite"){
            baliseFleche.innerText = ">"
        }
        else{
            baliseFleche.innerText = "<"
        }
    let sectionFilm = document.querySelector(categorie)
    sectionFilm.appendChild(baliseFleche)
}


// Affichage des fleches
// Si il n'y a pas de film à droite ou gauche alors la fleche est cachée
export function affichageFleche(categorie){
    let listeFilmActuel = document.querySelectorAll(categorie+" button")
    let flecheGauche = listeFilmActuel[0]
    let flecheDroite = listeFilmActuel[listeFilmActuel.length-1]
    let permierFilm = listeFilmActuel[1]
    let dernierFilm = listeFilmActuel[listeFilmActuel.length-2]
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
    let sectionFilm = document.querySelector("#ensemblefilm")
    sectionFilm.innerHTML=""
    for (let i=0; i<genres.length; i++){
        // Création d'un ensemble par categorie
        let generalCategorie = document.createElement ("section")
            generalCategorie.setAttribute ("class","listeFilm")
            generalCategorie.setAttribute ("id","categorie"+(i+1))
            sectionFilm.appendChild(generalCategorie)
        
        // Création du titre
        let nomCategorie = document.createElement("h4");
            nomCategorie.innerText = "Categorie "+(i+1)+" : "+genres[i];
            generalCategorie.appendChild(nomCategorie);
    }
}


// Fonction pour le film le mieux noté
export async function creationMeilleurFilm(API){
    let rechercheAPI = "&sort_by=-imdb_score"
    let categorie = ("#meilleurfilm")
    let reponseServeur = await requeteServeur(API, rechercheAPI, 1)
    console.log(reponseServeur)
    affichageFilm(categorie, 1, 1, reponseServeur)
    informationMeilleurFilm(categorie,reponseServeur[0].url) 
}


// Fonction pour la categorie Meilleur Film
async function informationMeilleurFilm(categorie,film){
    console.log(film)
    let infoFilm = await fetch(film);
        infoFilm = await infoFilm.json()
        console.log (infoFilm)

    let sectionMeilleurFilm = document.createElement("section")
        sectionMeilleurFilm.setAttribute ("class","informationMeilleurFilm")

    let titreTexte = document.createElement("p")
        titreTexte.setAttribute ("class","informationMeilleurFilm")
        titreTexte.innerText = "Résumé du film"

    let balisetexte = document.createElement("p")
        balisetexte.setAttribute("class","informationMeilleurFilm")
        balisetexte.innerText = infoFilm.description

    let titreFilm = document.createElement("h3")
        titreFilm.setAttribute("class","informationMeilleurFilm")
        titreFilm.innerText = infoFilm.title
    
    let sectionFilm = document.querySelector(categorie)
    console.log (sectionFilm)

    sectionFilm.appendChild(sectionMeilleurFilm)
    sectionMeilleurFilm.appendChild(titreFilm)
    sectionMeilleurFilm.appendChild(titreTexte)
    sectionMeilleurFilm.appendChild(balisetexte)
}


// Fonction pour le déroulé de l'affichage des films les mieux notés
export async function creationFilmMieuxNote(API,NBRFILMSTOCK, nbrFilmAffiche){
    let rechercheAPI = "&sort_by=-imdb_score"
    let categorie = ("#mieuxnote")
    let reponseServeur = await requeteServeur(API, rechercheAPI, NBRFILMSTOCK)
    affichageFilm(categorie, NBRFILMSTOCK, nbrFilmAffiche, reponseServeur)
}


// Fonction pour le déroulé de l'affichage des films par categorie
export async function creationFilmCategorie(API, NBRFILMSTOCK, nbrFilmAffiche, genres){   
    for (let i=0; i<genres.length;i++){ 
        let rechercheAPI = "&genre="+genres[i]+"&sort_by=-imdb_score"
        let categorie = ("#categorie"+(i+1))
        let reponseServeur = await requeteServeur(API, rechercheAPI, NBRFILMSTOCK)
        affichageFilm(categorie, NBRFILMSTOCK, nbrFilmAffiche, reponseServeur)
    }
    evenementCategorieGeneral(API, nbrFilmAffiche)
}


// Fonction pour récupérer les films de l'API
async function requeteServeur (API, rechercheAPI, NBRFILMSTOCK){
    let reponsePartielServeur = []
    for (let j=0; j<=(NBRFILMSTOCK/5);j++){
        reponsePartielServeur[j] = await fetch (API+"/titles/?page="+(j+1)+rechercheAPI);
        // Regarde si la page de l'API existe
        if (reponsePartielServeur[j].status!="404"){
            reponsePartielServeur[j] = await reponsePartielServeur[j].json();
            reponsePartielServeur[j] = reponsePartielServeur[j].results
        }
        // Sinon quitte la boucle
        else{
            break
        }
    }
    let reponseServeur = recuperationDonnees(reponsePartielServeur)
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
