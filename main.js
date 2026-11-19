import {
  formaterListe,
  trierPrets,
  creerCarte,
  filtrerLivres,
} from "./utils.js";

//Elements du DOM
const selectTypeDoc = document.getElementById("type-de-document");
const selectAuteur = document.getElementById("auteur");
const boutonAfficherFiltre = document.querySelector(".btn-affichage-filtres");
const zoneFiltres = document.querySelector(".filtre-select");
const cartes = document.querySelector(".cartes");
const nbTotalLivres = document.querySelector(".nb-total-livres");
const btnTriDecroissant = document.querySelector(
  ".tri-nb-de-prets-decroissant",
);
const btnTricroissant = document.querySelector(".tri-nb-de-prets-croissant");

function afficherNbdeResultat(liste) {
  nbTotalLivres.textContent = `Nombre de livres affichés : ${liste.length}`;
}
/* 
   listeLivres.forEach((livre) => {
     const carte = creerCarte(livre);
     cartes.appendChild(carte);
   }); */
function afficherCartes(listeLivres, container) {
  container.innerHTML = "";
  listeLivres.forEach((livre) => {
    const carte = creerCarte(livre);
    container.appendChild(carte);
  });
}
function creerFiltre(listeLivres, filtre) {
  let tabOptions = ["tous"];
  // je recup le data attribute du filtre qui match avec la cle
  listeLivres.forEach((livre) => {
    const option = livre[filtre.dataset.cle]; // je me sers du dataAttribute comme nom de cle
    tabOptions.push(option);
  });
  const setOption = new Set(tabOptions);
  setOption.forEach((choix) => {
    const option = document.createElement("option");
    option.value = choix;
    option.textContent = choix;
    filtre.appendChild(option);
  });
}

//recupération des données de l'API et affichage
async function getLivres() {
  const url =
    "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/les-titres-les-plus-pretes/records?limit=100";
  try {
    const reponse = await fetch(url);
    if (!reponse.ok) {
      throw new Error(`Statut de réponse : ${reponse.status}`);
    }
    const resultat = await reponse.json();
    return formaterListe(resultat.results);
  } catch (erreur) {
    console.error(erreur.message);
    cartes.textContent =
      " ! Une erreur s'est produite au chargement des fichiers ! ";
  } finally {
    console.log("chargement terminé");
  }
}

//AFFICHAGE DES LIVRES
async function main() {
  try {
    const listeLivres = await getLivres();
    afficherCartes(listeLivres, cartes);
    afficherNbdeResultat(listeLivres);
    creerFiltre(listeLivres, selectTypeDoc);
    creerFiltre(listeLivres, selectAuteur);

    //listener des filtres
    selectTypeDoc.addEventListener("change", (event) => {
      const eventValue = event.target.value;
      const livresFiltres = filtrerLivres(
        listeLivres,
        selectTypeDoc,
        eventValue,
      );
      afficherCartes(livresFiltres, cartes);
      afficherNbdeResultat(livresFiltres);
    });
    selectAuteur.addEventListener("change", (event) => {
      const eventValue = event.target.value;
      const livresFiltres = filtrerLivres(
        listeLivres,
        selectAuteur,
        eventValue,
      );
      afficherCartes(livresFiltres, cartes);
      afficherNbdeResultat(livresFiltres);
    });

    //listener des boutons tri
    btnTricroissant.addEventListener("click", () => {
      const livresOrdonnes = trierPrets(listeLivres, "croissant");
      afficherCartes(livresOrdonnes, cartes);
    });
    btnTriDecroissant.addEventListener("click", () => {
      const livresOrdonnes = trierPrets(listeLivres, "décroissant");
      afficherCartes(livresOrdonnes, cartes);
    });
  } catch {}
}

main();
/* 
//AFFICHAGE DES FILTRES OU PAS EN MOBILE
boutonAfficherFiltre.addEventListener("click", () => {
  zoneFiltres.classList.toggle("cache");
  if (boutonAfficherFiltre.textContent === "Afficher les filtres") {
    boutonAfficherFiltre.textContent = "Cacher les filtres";
  } else {
    boutonAfficherFiltre.textContent = "Afficher les filtres";
  }
});
 */
