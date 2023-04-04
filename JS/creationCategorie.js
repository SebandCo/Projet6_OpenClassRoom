import { recuperationId } from "./affichageInfoFilm.js";

// Création d'une image du film
export function genererFilm(film,localisationbalise){
    const baliseBouton = document.createElement("button")
        baliseBouton.setAttribute("class","choixFilm")
    const baliseimage = document.createElement("img");
        baliseimage.src = film.image_url;
        baliseimage.setAttribute("id",film.id)
    const sectionFilm = document.querySelector(localisationbalise)
    sectionFilm.appendChild(baliseBouton)
    baliseBouton.appendChild(baliseimage)
}

// Création du titre de categorie
export function creationTitreCategorie (genres){
    const sectionFilm = document.querySelector("#ensemblefilm") 
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


export async function creationFilmCategorie(api, nbrFilmAffiche, genres){   
    // appel de l'API
    for (let i=0; i<genres.length;i++){
        // Page 1 par rapport au genre choisi et trié du meilleurs imdb au moins
        let reponseServeurP1 = await fetch(api+'/titles/?page=1&genre='+genres[i]+'&sort_by=-imdb_score');
        // Mise en Json de la réponse API
        reponseServeurP1 = await reponseServeurP1.json();
        // Récupération de la categorie results de la requete Json
        reponseServeurP1 = reponseServeurP1.results
        // Idem sur Page 2
        let reponseServeurP2 = await fetch(api+'/titles/?page=2&genre='+genres[i]+'&sort_by=-imdb_score');
        reponseServeurP2 = await reponseServeurP2.json();
        reponseServeurP2 = reponseServeurP2.results
        // concatenation des deux resultats JSON
        const reponseServeur = reponseServeurP1.concat(reponseServeurP2);
        // Affichage des nbrFilmAffiche meilleurs films
        for (let j=0; j<nbrFilmAffiche; j++){
            await genererFilm(reponseServeur[j],("#categorie"+(i+1)))
        }
    }
    recuperationId(api)
}