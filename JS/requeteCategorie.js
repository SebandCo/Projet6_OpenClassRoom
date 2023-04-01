export async function recuperationCategorie(){
    let compteur=1
    let reponseTotalCategorie = [];
    let reponsePartielleCategorie = await fetch("http://localhost:8000/api/v1/genres/?page=1");
    do{
        reponsePartielleCategorie = await reponsePartielleCategorie.json();
        reponsePartielleCategorie = reponsePartielleCategorie.results;
        // Récupération des valeurs pour les mettre dans une seule variable
        for (let i=0; i<5; i++){
            reponseTotalCategorie.push(reponsePartielleCategorie[i]);
        }

        compteur ++;
        reponsePartielleCategorie = await fetch("http://localhost:8000/api/v1/genres/?page="+compteur);
    }while (reponsePartielleCategorie.status!=404);
    return reponseTotalCategorie;
}

export function affichageCategorie(categorie){
    var baliseform = document.createElement("form")
        baliseform.setAttribute("method","get");
        baliseform.setAttribute("action","");
    const sectionFilm = document.querySelector("#testcategorie")
    sectionFilm.appendChild(baliseform)
    for (let i = 0; i<categorie.length;i++){
        var baliseinput = document.createElement("input");
            baliseinput.setAttribute("type", "checkbox");
            baliseinput.setAttribute("name", categorie[i].name);
        var baliselabel = document.createElement("label")
            baliselabel.innerText = categorie[i].name
        baliseform.appendChild(baliselabel)
        baliseform.appendChild(baliseinput)
    }
    
}


// Création d'une image du film
export function genererFilm(film,localisationbalise){
    const balise = document.createElement("img");
    balise.src = film.image_url;
    const sectionFilm = document.querySelector("#"+localisationbalise)
    sectionFilm.appendChild(balise)
}