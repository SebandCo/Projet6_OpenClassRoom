import {evenementModalFilm} from "./gestionFenetreModal.js";
import {affichageFleche} from "./creationCategorie.js";

export async function evenementCategorieGeneral(api, nbrFilmAffiche){
    evenementFilm(api)
    evenementFleche(nbrFilmAffiche)
}

async function evenementFilm(api) {
    const ensembleFilm = document.querySelectorAll(".listeFilm .choixFilm");
    for (let i = 0; i < ensembleFilm.length; i++) {
        //Récupération de l'id
        ensembleFilm[i].addEventListener("click", async function (event) {
            const id = event.target.id;
            
            //Requete auprès de l'API
            let infoFilm = await fetch(api+'/titles/'+id);
            infoFilm = await infoFilm.json()
        
            //Affichage du résultat
            evenementModalFilm(infoFilm)
        })
    };
         
}

// Declenche l'évènement lors du clic que la fleche
function evenementFleche(nbrFilmAffiche){
    const ensemblefleche = document.querySelectorAll(".fleche")
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

// Boucle pour changer l'affichage des films (flechedroite)
function affichageFilm(classeActuel, sensFleche, nbrFilmAffiche){
    const listeFilmActuel = document.querySelectorAll("#"+classeActuel+" .choixFilm")
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