import { evenementModalFilm } from "./gestionFenetreModal.js";

export function recuperationId(api) {
    const ensembleFilm = document.querySelectorAll(".listeFilm button");
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