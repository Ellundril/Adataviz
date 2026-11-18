import { formaterListe, trierPrets } from "./utils.js";

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

function creerCarte(objetLivre) {
  const { titre, auteur, typeDoc, prets } = objetLivre;
  const carte = document.createElement("article");
  carte.classList.add("carte");
  cartes.appendChild(carte);
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
}

function afficherNbdeResultat(liste) {
  nbTotalLivres.textContent = `Nombre de livres affichés : ${liste.length}`;
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

function filtrerLivres(listeLivres, filtre, filtreValue) {
  cartes.innerHTML = "";
  if (filtreValue === "tous") {
    listeLivres.forEach((livre) => {
      creerCarte(livre);
    });
    afficherNbdeResultat(listeLivres);
  } else {
    const livresFiltres = listeLivres.filter(
      (livre) => livre[filtre.dataset.cle] === filtreValue,
    );
    livresFiltres.forEach((livre) => {
      creerCarte(livre);
    });
    afficherNbdeResultat(livresFiltres);
  }
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
    const listeLivres = formaterListe(resultat.results);
    //affichage
    listeLivres.forEach((livre) => {
      creerCarte(livre);
    });
    afficherNbdeResultat(listeLivres);
    creerFiltre(listeLivres, selectTypeDoc);
    creerFiltre(listeLivres, selectAuteur);
    //listener des filtres
    selectTypeDoc.addEventListener("change", (event) => {
      const eventValue = event.target.value;
      filtrerLivres(listeLivres, selectTypeDoc, eventValue);
    });
    selectAuteur.addEventListener("change", (event) => {
      const eventValue = event.target.value;
      filtrerLivres(listeLivres, selectAuteur, eventValue);
    });
    btnTricroissant.addEventListener("click", () => {
      const livresOrdonnes = trierPrets(listeLivres, "croissant");
      cartes.innerHTML = "";
      livresOrdonnes.forEach((livre) => {
        creerCarte(livre);
      });
    });
    btnTriDecroissant.addEventListener("click", () => {
      const livresOrdonnes = trierPrets(listeLivres, "décroissant");
      cartes.innerHTML = "";
      livresOrdonnes.forEach((livre) => {
        creerCarte(livre);
      });
    });
  } catch (erreur) {
    console.error(erreur.message);
  } finally {
    console.log("chargement terminé");
  }
}

//AFFICHAGE DES LIVRES
getLivres();

//AFFICHAGE DES FILTRES OU PAS EN MOBILE
boutonAfficherFiltre.addEventListener("click", () => {
  zoneFiltres.classList.toggle("cache");
  if (boutonAfficherFiltre.textContent === "Afficher les filtres") {
    boutonAfficherFiltre.textContent = "Cacher les filtres";
  } else {
    boutonAfficherFiltre.textContent = "Afficher les filtres";
  }
});
