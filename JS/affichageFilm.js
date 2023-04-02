export function recuperationId() {
    const ensembleFilm = document.querySelectorAll(".listeFilm button");
    for (let i = 0; i < ensembleFilm.length; i++) {
        //Récupération de l'id
        ensembleFilm[i].addEventListener("click", async function (event) {
            const id = event.target.id;
            
            console.log(ensembleFilm[i])
            //Requete auprès de l'API
            let infoFilm = await fetch("http://localhost:8000/api/v1/titles/"+id);
            infoFilm = await infoFilm.json()
            //console.log (infoFilm)
        
            //Affichage du résultat
            const affichageFilm = document.createElement("p");
            affichageFilm.innerText = infoFilm.description;
            affichageFilm.setAttribute("id","resultatdufilm")
            const sectionFilm = document.querySelector("#resultatfilm");
            sectionFilm.appendChild(affichageFilm);
        })
    };
         
 }