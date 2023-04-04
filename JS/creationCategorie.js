import { recuperationId } from "./affichageInfoFilm.js";


// Création d'une image du film
function genererFilm(film,localisationbalise){
    const baliseBouton = document.createElement("button")
        baliseBouton.setAttribute("class","choixFilm")
    const baliseimage = document.createElement("img");
        baliseimage.src = film.image_url;
        baliseimage.setAttribute("id",film.id)
    const sectionFilm = document.querySelector(localisationbalise)
    sectionFilm.appendChild(baliseBouton)
    baliseBouton.appendChild(baliseimage)
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
//Fonction pour le déroulé de l'affichage des films les mieux notés
export async function creationFilmMieuxNote(api,nbrFilmAffiche){
    let rechercheAPI = "&sort_by=-imdb_score"
    let categorie = ("#mieuxnote")
    const reponseServeur = await requeteServeur(api, rechercheAPI, nbrFilmAffiche)
    affichageFilm(categorie, nbrFilmAffiche, reponseServeur)
    
}

//Fonction pour le déroulé de l'affichage des films par categorie
export async function creationFilmCategorie(api, nbrFilmAffiche, genres){   
    
    for (let i=0; i<genres.length;i++){ 
        let rechercheAPI = "&genre="+genres[i]+"&sort_by=-imdb_score"
        let categorie = ("#categorie"+(i+1))
        const reponseServeur = await requeteServeur(api, rechercheAPI, nbrFilmAffiche)
        affichageFilm(categorie, nbrFilmAffiche, reponseServeur)
    }
    recuperationId(api)
}

//Affichage de l'image du film (sous forme de bouton cliquable) par categorie
async function affichageFilm(categorie, nbrFilmAffiche, reponseServeur){
    for (let i=0; i<nbrFilmAffiche && i<reponseServeur.length; i++){
        await genererFilm(reponseServeur[i],(categorie))
    }
}
async function requeteServeur (api, rechercheAPI, nbrFilmAffiche){
    let reponsePartielServeur = []
    for (let j=0; j<=(nbrFilmAffiche/5);j++){
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

function recuperationDonnees(tableau){
    let tableauModifie = []
    for (let i=0; i<tableau.length;i++){
        for (let j=0; j<tableau[i].length;j++){
            tableauModifie.push (tableau[i][j])
        }
    }
    return (tableauModifie)
}