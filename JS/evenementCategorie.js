import {evenementModalFilm} from "./gestionFenetreModal.js";
import {affichageFleche} from "./creationCategorie.js";

// Appel des autres fonction
export async function evenementCategorieGeneral(API, nbrFilmAffiche){
    evenementFilm(API)
    evenementFleche(nbrFilmAffiche)
}

// Permet de déclencher l'affichage des données du film lors du clic
async function evenementFilm(API) {
    let ensembleFilm = document.querySelectorAll(".listeFilm .choixFilm");
    for (let i = 0; i < ensembleFilm.length; i++) {
        // Récupération de l'id
        ensembleFilm[i].addEventListener("click", async function (event) {
            let name = event.target.name;
            // Correction d'un bug quand l'image est plus petite que le bouton
            if (name==""){
                name = event.target.parentElement.name;
            }

            // Requete auprès de l'API
            let infoFilm = await fetch(API+'/titles/'+name);
            infoFilm = await infoFilm.json()
            // Affichage du résultat
            evenementModalFilm(infoFilm)
        })
    };
         
}


// Declenche l'évènement lors du clic sur la fleche
function evenementFleche(nbrFilmAffiche){
    let ensemblefleche = document.querySelectorAll(".fleche")
    for (let i = 0; i < ensemblefleche.length; i++){
        ensemblefleche[i].addEventListener("click", function(){
            // Defini le sens de la fleche cliquée
            let classeActuel = recuperationCategorie(ensemblefleche[i].className)
            let sensFleche = recuperationSens(ensemblefleche[i].className)
            affichageFilm(classeActuel, sensFleche, nbrFilmAffiche)
            affichageFleche("#"+classeActuel)
        })
    }
}


// Boucle pour changer l'affichage des films (flechedroite ou flechegauche)
function affichageFilm(classeActuel, sensFleche, nbrFilmAffiche){
    let listeFilmActuel = document.querySelectorAll("#"+classeActuel+" .choixFilm")
    if (sensFleche == "droite"){    
        for (let i = 0; i<listeFilmActuel.length; i++){
            // Recherche le premier film avec un attribut display none 
            // Recherche le premier film caché
            if (listeFilmActuel[i].style.display == ""){
                listeFilmActuel[i].style.display = "none"
                listeFilmActuel[i+nbrFilmAffiche].style.display = ""
                break
            }
        }
    }
    else if (sensFleche == "gauche"){
        for (let i = listeFilmActuel.length-1; i>=0; i--){    
        // Recherche le dernier film avec un attribut display vide
        // Recherche en partant de la fin du premier film visible
            if (listeFilmActuel[i].style.display == ""){
                listeFilmActuel[i].style.display = "none"
                listeFilmActuel[i-nbrFilmAffiche].style.display = ""
                break
            }
        }
    }
}


// Fonction pour récupérer la categorie contenu dans la classe d'une fleche
function recuperationCategorie(classeEntiere){
    let classePartiel = ""
    for (let i=1; i<classeEntiere.length; i++){
        // Parcours le string à l'envers
        if (classeEntiere.at(-i)=="-"){
            classePartiel = classeEntiere.substr(classeEntiere.length-i+1)
            break
        }
    }
    return classePartiel
}


// Fonction pour récupérer le sens de la fleche
function recuperationSens(classeEntiere){
    let sensFleche = ""
        if (classeEntiere.indexOf("droite")!= -1){
            sensFleche = "droite"
        }
        else{
            sensFleche = "gauche"
        }
    return sensFleche
}
