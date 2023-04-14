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
        // valeur_balise = type_de_balise, lien_de_l'information, id de l'information, titre H4
        let valeur_balise = []
        let valeur_globale = []
        let valeur_provisoire = []
        // Création de la balise image pochette
        insertionGlobale(valeur_globale,"img", infoFilm.image_url,"image-pochette","Image Pochette" )            

        // Création de la balise titre du film
        insertionGlobale(valeur_globale,"p", infoFilm.title,"titre","Titre")

        // Création de la balise genre du film
        insertionGlobale(valeur_globale,"p", infoFilm.genres,"genre","Genre")

        //Création de la balise date de sortie du film
        insertionGlobale(valeur_globale,"p", infoFilm.date_published, "date-sortie", "Sortie le")
                    
        //Création de la balise rang du film
        insertionGlobale(valeur_globale,"p", infoFilm.rated, "rang", "Rang de sortie")

        //Création de la balise score Imdb du film
        insertionGlobale(valeur_globale,"p", infoFilm.imdb_score,"imdb", "Score imdb")
                        
        //Création de la balise réalisateur du film
        insertionGlobale(valeur_globale,"p", infoFilm.directors, "realisateur", "Réalisé par")

        //Création de la balise liste acteur du film
        insertionGlobale(valeur_globale,"p", infoFilm.actors,"liste-acteur", "Liste des acteurs")    

        //Création de la balise durée du film
        insertionGlobale(valeur_globale,"p", infoFilm.duration,"duree","Durée")       

        //Création de la balise pays d'origine du film
        insertionGlobale(valeur_globale,"p", infoFilm.countries, "pays-origine", "Pays d'origine")

        //Création de la balise résultat box office du film
        insertionGlobale(valeur_globale,"p", infoFilm.reviews_from_critics,"box-office", "Résultat au Box Office")

        //Création de la balise résumé
        insertionGlobale(valeur_globale,"p", infoFilm.description, "resume", "Résumé")

        //Intégration de toute les balises dans la balises générale
            for (let i=0; i<valeur_globale.length;i++){
                valeur_provisoire = creationTexte(valeur_globale[i])
                balises.push(valeur_provisoire[0])
                balises.push(valeur_provisoire[1])
                
            }

    //Ajout des informations à la fenetre modal
    miseEnFormeTitre (texteTitre,"film")
    miseEnFormeParagraphe (balises,"film")

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

// fonction pour créer les balises
function creationTexte(valeur){
    let informationTransitoire = document.createElement(valeur[0]);
        if (valeur[0]=="img"){
            informationTransitoire.src = valeur[1];
        }
        else{
            informationTransitoire.innerText = valeur[1];
        }
            informationTransitoire.setAttribute("id",valeur[2])
    let titreTransitoire = document.createElement("h4")
        titreTransitoire.innerText = valeur[3]
    return [titreTransitoire, informationTransitoire]
}

// fonction pour regrouper les valeurs dans un même tableau
function insertionGlobale (tableau, valeur1, valeur2, valeur3, valeur4){
    let tableauProvisoire = [valeur1, valeur2, valeur3, valeur4 ]
    tableau.push(tableauProvisoire)
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
                baliseinput.setAttribute("class", "checkbox-categorie")
            var baliselabel = document.createElement("label")
                baliselabel.setAttribute("for",categorie[i].name)
                baliselabel.setAttribute("class","checkbox-label")
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
    miseEnFormeTitre (texteTitre,"categorie")
    miseEnFormeParagraphe (balises,"categorie")
}


// Fonction pour afficher ou cacher la fenetre modal
export function activationFenetre(){
    const modalContainer = document.querySelector(".modal-container");
    modalContainer.classList.toggle("active")
}

// Mise en forme du titre de la fenetre modal
function miseEnFormeTitre (texteTitre,localisation){
    const titresection = document.querySelector("#titremodal")
    titresection.innerHTML = ""
    titresection.setAttribute("class", "titre-"+localisation)
    titresection.innerText = texteTitre
}

// Mise en forme du contenu de la fenetre modal
function miseEnFormeParagraphe(balises, localisation){
    const sectionFilm = document.querySelector("#contenumodal")
    sectionFilm.innerHTML="";
    sectionFilm.setAttribute("class", "contenu-"+localisation)
    for (let i=0;i<balises.length;i++){
        sectionFilm.appendChild(balises[i])
    }
}