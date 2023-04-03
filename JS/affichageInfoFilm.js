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
            affichageFilm(infoFilm)
        })
    };
         
}

export function affichageFilm(infoFilm){
    const affichageFilm = document.createElement("p");
    affichageFilm.innerText = infoFilm.description;
    affichageFilm.setAttribute("id","resultatdufilm")
    const sectionFilm = document.querySelector("#testcategorie");
    sectionFilm.innerHTML=""
    sectionFilm.appendChild(affichageFilm);
    const modalContainer = document.querySelector(".modal-container");
    modalContainer.classList.toggle("active")
}
