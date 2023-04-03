export async function recuperationCategorie(api){
    let compteur=1
    let reponseTotalCategorie = [];
    let reponsePartielleCategorie = await fetch(api+'/genres/?page=1');
    do{
        reponsePartielleCategorie = await reponsePartielleCategorie.json();
        reponsePartielleCategorie = reponsePartielleCategorie.results;
        // Récupération des valeurs pour les mettre dans une seule variable
        for (let i=0; i<reponsePartielleCategorie.length; i++){
            reponseTotalCategorie.push(reponsePartielleCategorie[i]);
        }

        compteur ++;
        reponsePartielleCategorie = await fetch(api+'/genres/?page='+compteur);
    }while (reponsePartielleCategorie.status!=404);
    
    return reponseTotalCategorie;
}

export function affichageCategorie(categorie){
    var baliseform = document.createElement("form")
        baliseform.setAttribute("method","get");
        baliseform.setAttribute("action","");
    
    const titresection = document.querySelector("#titremodal")
        titresection.innerHTML=""
        titresection.innerText = "Choix de la categorie"
    
    const sectionFilm = document.querySelector("#contenumodal")
    //remet à zero le texte
    sectionFilm.innerHTML="";
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