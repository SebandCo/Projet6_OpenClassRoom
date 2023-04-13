import {recuperationCategorie} from "./requeteCategorie.js";
import {creationFilmCategorie, creationTitreCategorie} from "./creationCategorie.js";
import {evenementCategorieGeneral} from "./evenementCategorie.js";

// Evenement lors du clic sur l'image d'un film
export function evenementModalFilm(infoFilm){
    //Titre donné à la fenetre modal
    const texteTitre = "Description du Film"
    //Contenu de la fenetre
        //Variable pour contenir les différentes balises
        let balises = []    
        //Variable intermediaire pour la récupération des données
        let informationTransitoire = ""
        
        //Création de la balise image pochette
            informationTransitoire = document.createElement("img");
            informationTransitoire.src = infoFilm.image_url;
            informationTransitoire.setAttribute("id","image-pochette")
            //Rajout à la liste des balises
            balises.push(informationTransitoire)
        
        //Création de la balise titre du film
            informationTransitoire = document.createElement("p");
            informationTransitoire.innerText = infoFilm.title;
            informationTransitoire.setAttribute("id","titre")
            //Rajout à la liste des balises
            balises.push(informationTransitoire)

        //Création de la balise genre du film
            informationTransitoire = document.createElement("p");
            informationTransitoire.innerText = infoFilm.genres;
            informationTransitoire.setAttribute("id","genre")
            //Rajout à la liste des balises
            balises.push(informationTransitoire)
                
        //Création de la balise date de sortie du film
            informationTransitoire = document.createElement("p");
            informationTransitoire.innerText = infoFilm.date_published;
            informationTransitoire.setAttribute("id","date-sortie")
            //Rajout à la liste des balises
            balises.push(informationTransitoire)
                        
        //Création de la balise rang du film
            informationTransitoire = document.createElement("p");
            informationTransitoire.innerText = infoFilm.rated;
            informationTransitoire.setAttribute("id","rang")
            //Rajout à la liste des balises
            balises.push(informationTransitoire)
                    
        //Création de la balise score Imdb du film
            informationTransitoire = document.createElement("p");
            informationTransitoire.innerText = infoFilm.imdb_score;
            informationTransitoire.setAttribute("id","imdb")
            //Rajout à la liste des balises
            balises.push(informationTransitoire)
                            
        //Création de la balise réalisateur du film
            informationTransitoire = document.createElement("p");
            informationTransitoire.innerText = infoFilm.directors;
            informationTransitoire.setAttribute("id","realisateur")
            //Rajout à la liste des balises
            balises.push(informationTransitoire)
        
        //Création de la balise liste acteur du film
            informationTransitoire = document.createElement("p");
            informationTransitoire.innerText = infoFilm.actors;
            informationTransitoire.setAttribute("id","liste-acteur")
            //Rajout à la liste des balises
            balises.push(informationTransitoire)        
        
        //Création de la balise durée du film
            informationTransitoire = document.createElement("p");
            informationTransitoire.innerText = infoFilm.duration;
            informationTransitoire.setAttribute("id","duree")
            //Rajout à la liste des balises
            balises.push(informationTransitoire)        
        
        //Création de la balise pays d'origine du film
            informationTransitoire = document.createElement("p");
            informationTransitoire.innerText = infoFilm.countries;
            informationTransitoire.setAttribute("id","pays-origine")
            //Rajout à la liste des balises
            balises.push(informationTransitoire)
        
        //Création de la balise résultat box office du film
            informationTransitoire = document.createElement("p");
            informationTransitoire.innerText = infoFilm.reviews_from_critics;
            informationTransitoire.setAttribute("id","box-office")
            //Rajout à la liste des balises
            balises.push(informationTransitoire)
        
        //Création de la balise résumé
            informationTransitoire = document.createElement("p");
            informationTransitoire.innerText = infoFilm.description;
            informationTransitoire.setAttribute("id","resume")
            //Rajout de la affichageFilm à la liste des balises
            balises.push(informationTransitoire)



    //Ajout des informations à la fenetre modal
    miseEnFormeTitre (texteTitre)
    miseEnFormeParagraphe (balises)

    //Activation de la Fenetre
    activationFenetre()
}

// Evenement lors de la validation de la fenetre modal sur les categories
export async function evenementModalCategorie(api, nbrFilmStock,nbrFilmAffiche){
    //Récupération des categories de l'API
    const categorie = await recuperationCategorie(api);
    affichageCategorie(categorie)
    //Activation de la Fenetre
    activationFenetre()
    //Evenement de lors de la validation
    const modalValidationCategorie=document.querySelector("#validationCategorie")
    modalValidationCategorie.addEventListener("click", function () {
        //Pour récupérer les genres séléctionnés
        let genres = []
        //Récupére tous les checkbox
        const rechercheBouton = document.querySelectorAll("input[type=checkbox]:checked")
        //Parcours la liste pour vérifier qu'elle checkbox est valide
        for (var checkbox of rechercheBouton) {  
            genres.push(checkbox.name)
        } 
        creationTitreCategorie(genres);
        creationFilmCategorie(api, nbrFilmStock, nbrFilmAffiche, genres)
        evenementCategorieGeneral(api, nbrFilmAffiche)
        activationFenetre()
    })
}

// Fonction pour l'affichage des categories
function affichageCategorie(categorie){
    //Titre donné à la fenetre modal
    const texteTitre = "Choix de la categorie"
    
    //Contenu de la fenetre
        //Variable pour contenir les différentes balises
        let balises = []

        //Création de la liste à cocher à partir des différentes categories
        //Création de la balise à cocher
        var baliseACocher = document.createElement("form")
            baliseACocher.setAttribute("method","get");
            baliseACocher.setAttribute("action","");
            baliseACocher.setAttribute("id", "liste-categorie");

        //Récupération des valeurs à cocher
        for (let i = 0; i<categorie.length;i++){
            var baliseinput = document.createElement("input");
                baliseinput.setAttribute("type", "checkbox");
                baliseinput.setAttribute("name", categorie[i].name);
                baliseinput.setAttribute("id", categorie[i].name);
            var baliselabel = document.createElement("label")
                baliselabel.setAttribute("for",categorie[i].name)
                baliselabel.innerText = categorie[i].name
            baliseACocher.appendChild(baliseinput)
            baliseACocher.appendChild(baliselabel)
        }
        //Rajout de la baliseACocher à la liste des balises
        balises.push(baliseACocher)

        //Création d'un bouton de validation
        var baliseValidation = document.createElement("button")
            baliseValidation.setAttribute("id","validationCategorie")
            baliseValidation.innerText = "Valider"
        //Rajout de la baliseValidation à la liste des balises
        balises.push(baliseValidation)   
    
    //Ajout des informations à la fenetre modal
    miseEnFormeTitre (texteTitre)
    miseEnFormeParagraphe (balises)
}

// Fonction pour afficher ou cacher la fenetre modal
export function activationFenetre(){
    const modalContainer = document.querySelector(".modal-container");
    modalContainer.classList.toggle("active")
}

// Mise en forme du titre de la fenetre modal
function miseEnFormeTitre (texteTitre){
    const titresection = document.querySelector("#titremodal")
    titresection.innerHTML = ""
    titresection.innerText = texteTitre
}

// Mise en forme du contenu de la fenetre modal
function miseEnFormeParagraphe(balises){
    const sectionFilm = document.querySelector("#contenumodal")
    sectionFilm.innerHTML="";
    for (let i=0;i<balises.length;i++){
        sectionFilm.appendChild(balises[i])
    }
}