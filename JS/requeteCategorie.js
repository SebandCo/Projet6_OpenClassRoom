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

