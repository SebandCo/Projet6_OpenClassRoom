export function affichageFilm(infoFilm){
    //Titre donné à la fenetre modal
    const texteTitre = "Description du Film"
    
    //Contenu de la fenetre
        //Variable pour contenir les différentes balises
        let balises = []    
        
        //Création de la balise paragraphe
        const affichageFilm = document.createElement("p");
        affichageFilm.innerText = infoFilm.description;
        affichageFilm.setAttribute("id","resultatdufilm")
        
        //Rajout de la affichageFilm à la liste des balises
        balises.push(affichageFilm)

    //Ajout des informations à la fenetre modal
    miseEnFormeTitre (texteTitre)
    miseEnFormeParagraphe (balises)

    //Activation de la Fenetre
    activationFenetre()
}

export function affichageCategorie(categorie){
    //Titre donné à la fenetre modal
    const texteTitre = "Choix de la categorie"
    
    //Contenu de la fenetre
        //Variable pour contenir les différentes balises
        let balises = []

        //Création de la liste à cocher à partir des différentes categories
        //Création de la balise à cocher
        var baliseACocher = document.createElement("form")
            baliseACocher.setAttribute("method","get");
            baliseACocher.setAttribute("action","");

        //Récupération des valeurs à cocher
        for (let i = 0; i<categorie.length;i++){
            var baliseinput = document.createElement("input");
                baliseinput.setAttribute("type", "checkbox");
                baliseinput.setAttribute("name", categorie[i].name);
            var baliselabel = document.createElement("label")
                baliselabel.innerText = categorie[i].name
            baliseACocher.appendChild(baliselabel)
            baliseACocher.appendChild(baliseinput)
        }
        //Rajout de la baliseACocher à la liste des balises
        balises.push(baliseACocher)

        //Création d'un bouton de validation
        var baliseValidation = document.createElement("button")
            baliseValidation.innerText = "Valider"
        //Rajout de la baliseValidation à la liste des balises
        balises.push(baliseValidation)   
    
    //Ajout des informations à la fenetre modal
    miseEnFormeTitre (texteTitre)
    miseEnFormeParagraphe (balises)

    //Activation de la Fenetre
    activationFenetre()
}

function activationFenetre(){
    const modalContainer = document.querySelector(".modal-container");
    modalContainer.classList.toggle("active")
}

function miseEnFormeTitre (texteTitre){
    const titresection = document.querySelector("#titremodal")
    titresection.innerHTML = ""
    titresection.innerText = texteTitre
}

function miseEnFormeParagraphe(balises){
    const sectionFilm = document.querySelector("#contenumodal")
    sectionFilm.innerHTML="";
    for (let i=0;i<balises.length;i++){
        sectionFilm.appendChild(balises[i])
    }
}