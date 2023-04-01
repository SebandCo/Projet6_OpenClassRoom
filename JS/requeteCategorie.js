export async function recuperationCategorie(){
    let compteur=1
    let reponseTotalCategorie = [];
    console.log(reponseTotalCategorie);
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


    console.log(reponseTotalCategorie);
}