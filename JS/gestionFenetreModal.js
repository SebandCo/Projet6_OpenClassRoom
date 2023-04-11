import {recuperationCategorie} from "./requeteCategorie.js";
import {creationFilmCategorie, creationTitreCategorie} from "./creationCategorie.js";
import {evenementCategorieGeneral} from "./evenementCategorie.js";

export function evenementModalFilm(infoFilm){
    //Titre donné à la fenetre modal
    const texteTitre = "Description du Film"
    
    //Contenu de la fenetre
        //Variable pour contenir les différentes balises
        let balises = []    
        
        //Création de la balise paragraphe
        const affichageFilm = document.createElement("p");
        affichageFilm.innerText = infoFilm.description;
        affichageFilm.setAttribute("id","resultatdufilm")
        
        //Rajout de la affichageFilm à la liste des balises
        balises.push(affichageFilm)

    //Ajout des informations à la fenetre modal
    miseEnFormeTitre (texteTitre)
    miseEnFormeParagraphe (balises)

    //Activation de la Fenetre
    activationFenetre()
}

export async function evenementModalCategorie(api, nbrFilmStock){
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

        //Récupération des valeurs à cocher
        for (let i = 0; i<categorie.length;i++){
            var baliseinput = document.createElement("input");
                baliseinput.setAttribute("type", "checkbox");
                baliseinput.setAttribute("name", categorie[i].name);
            var baliselabel = document.createElement("label")
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

export function activationFenetre(){
    const modalContainer = document.querySelector(".modal-container");
    modalContainer.classList.toggle("active")
}

function miseEnFormeTitre (texteTitre){
    const titresection = document.querySelector("#titremodal")
    titresection.innerHTML = ""
    titresection.innerText = texteTitre
}

function miseEnFormeParagraphe(balises){
    const sectionFilm = document.querySelector("#contenumodal")
    sectionFilm.innerHTML="";
    for (let i=0;i<balises.length;i++){
        sectionFilm.appendChild(balises[i])
    }
}