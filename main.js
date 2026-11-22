import {
  formaterListe,
  trierPrets,
  formatNbdeResultat,
  recherche,
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
const champRecherche = document.getElementById("champ-recherche");

function creerCarte(objetLivre) {
  const { titre, auteur, typeDoc, prets } = objetLivre;

  const carte = document.createElement("article");
  carte.classList.add("carte");
  switch (typeDoc) {
    case "Bande dessinée jeunesse":
      carte.classList.add("bd-jeunesse");
      break;
    case "Bande dessinée adulte":
      carte.classList.add("bd-adulte");
      break;
    case "Livre jeunesse":
      carte.classList.add("livre-jeunesse");
      break;
    case "Livre adulte":
      carte.classList.add("livre-adulte");
      break;
    default:
      break;
  }

  const titreLivre = document.createElement("h2");
  titreLivre.classList.add("titre-livre");
  titreLivre.textContent = titre;

  const auteurLivre = document.createElement("p");
  auteurLivre.classList.add("auteur");
  auteurLivre.textContent = auteur;

  const typeDeDoc = document.createElement("p");
  typeDeDoc.textContent = typeDoc;

  const nbDePrets = document.createElement("p");
  nbDePrets.classList.add("prets");
  nbDePrets.textContent = `Nombre de prêts : ${prets}`;

  carte.appendChild(titreLivre);
  carte.appendChild(auteurLivre);
  carte.appendChild(typeDeDoc);
  carte.appendChild(nbDePrets);

  return carte;
}

function afficherCartes(listeLivres, container) {
  container.innerHTML = "";
  listeLivres.forEach((livre) => {
    const carte = creerCarte(livre);
    container.appendChild(carte);
  });
}

function afficherNbdeResultat(phrase) {
  nbTotalLivres.textContent = phrase;
}

function filtrerLivres(listeLivres, filtre, filtreValue) {
  let newListeLivres;
  if (filtreValue === "tous") {
    newListeLivres = listeLivres;
  } else {
    const livresFiltres = listeLivres.filter(
      (livre) => livre[filtre.dataset.cle] === filtreValue,
    );
    newListeLivres = livresFiltres;
  }
  return newListeLivres;
}

function creerFiltre(listeLivres, filtre) {
  let tabOptions = ["tous"];
  // je recup le data attribute du filtre qui match avec la cle
  listeLivres.forEach((livre) => {
    // je me sers du dataAttribute comme nom de cle
    const option = livre[filtre.dataset.cle];
    if (option) {
      tabOptions.push(option);
    }
  });
  const setOption = new Set(tabOptions);
  setOption.forEach((choix) => {
    const option = document.createElement("option");
    option.value = choix;
    option.textContent = choix;
    filtre.appendChild(option);
  });
}

function activationListener(listeLivres) {
  //Bouton afficher/cacher les filtres
  boutonAfficherFiltre.addEventListener("click", () => {
    zoneFiltres.classList.toggle("cache");
    if (boutonAfficherFiltre.textContent === "Afficher les filtres") {
      boutonAfficherFiltre.textContent = "Cacher les filtres";
    } else {
      boutonAfficherFiltre.textContent = "Afficher les filtres";
    }
  });

  //listener des filtres
  selectTypeDoc.addEventListener("change", (event) => {
    const eventValue = event.target.value;
    const livresFiltres = filtrerLivres(listeLivres, selectTypeDoc, eventValue);
    afficherCartes(livresFiltres, cartes);
    afficherNbdeResultat(formatNbdeResultat(livresFiltres));
  });
  selectAuteur.addEventListener("change", (event) => {
    const eventValue = event.target.value;
    const livresFiltres = filtrerLivres(listeLivres, selectAuteur, eventValue);
    afficherCartes(livresFiltres, cartes);
    afficherNbdeResultat(formatNbdeResultat(livresFiltres));
  });

  //listener des boutons tri
  btnTricroissant.addEventListener("click", () => {
    const livresOrdonnes = trierPrets(listeLivres, "croissant");
    afficherCartes(livresOrdonnes, cartes);
    afficherNbdeResultat(formatNbdeResultat(livresOrdonnes));
  });
  btnTriDecroissant.addEventListener("click", () => {
    const livresOrdonnes = trierPrets(listeLivres, "décroissant");
    afficherCartes(livresOrdonnes, cartes);
    afficherNbdeResultat(formatNbdeResultat(livresOrdonnes));
  });

  champRecherche.addEventListener("change", (event) => {
    const inputValue = event.target.value;
    const resultats = recherche(inputValue, listeLivres);
    afficherCartes(resultats, cartes);
    afficherNbdeResultat(formatNbdeResultat(resultats));
  });
}

//recupération des données de l'API
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
    afficherNbdeResultat(formatNbdeResultat(listeLivres));
    creerFiltre(listeLivres, selectTypeDoc);
    creerFiltre(listeLivres, selectAuteur);

    activationListener(listeLivres);
  } catch (erreur) {
    console.error(erreur.message);
  }
}

main();
