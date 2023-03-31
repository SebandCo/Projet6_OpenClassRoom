
export function genererFilm(film,localisationbalise){
    const balise = document.createElement("img");
    balise.src = film.image_url;
    const sectionFilm = document.querySelector("#"+localisationbalise)
    sectionFilm.appendChild(balise)
}
export function creationCategorie (genreChoisi, localisation){
    const nomCategorie = document.createElement("h3");
    nomCategorie.innerText = "Categorie "+localisation.charAt(localisation.length -1)+" : "+genreChoisi;
    const sectionFilm = document.querySelector("#"+localisation);
    sectionFilm.appendChild(nomCategorie);
}

export async function miseEnFormeCategorie(genreChoisi,localisation){
    // appel de l'API
    // Page 1 par rapport au genre choisi et trié du meilleurs imdb au moins
    let reponseServeurP1 = await fetch('http://localhost:8000/api/v1/titles/?page=1&genre='+genreChoisi+'&sort_by=-imdb_score');
    // Mise en Json de la réponse API
    reponseServeurP1 = await reponseServeurP1.json();
    // Récupération de la categorie results de la requete Json
    reponseServeurP1 = reponseServeurP1.results
    // Idem sur Page 2
    let reponseServeurP2 = await fetch('http://localhost:8000/api/v1/titles/?page=2&genre='+genreChoisi+'&sort_by=-imdb_score');
    reponseServeurP2 = await reponseServeurP2.json();
    reponseServeurP2 = reponseServeurP2.results
    // concatenation des deux resultats JSON
    const reponseServeur = reponseServeurP1.concat(reponseServeurP2);
    // Affichage des 7 meilleurs films
    for (let i=0; i<7; i++){
        await genererFilm(reponseServeur[i],localisation)
}
}