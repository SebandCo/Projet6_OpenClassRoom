import {evenementModalFilm} from "./gestionFenetreModal.js";

export async function evenementCategorieGeneral(api){
    evenementFilm(api)
    evenementFleche()
}
async function evenementFilm(api) {
    const ensembleFilm = document.querySelectorAll(".listeFilm .choixFilm");
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

function evenementFleche(){
    const ensemblefleche = document.querySelectorAll(".fleche")
    console.log(ensemblefleche)
    for (let i = 0; i < ensemblefleche.length; i++){
        ensemblefleche[i].addEventListener("click", function(){
            console.log (ensemblefleche[i])
        })
    }
}

function affichageFilm(){
    
}