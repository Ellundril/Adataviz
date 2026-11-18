import {
  formaterListe,
  creerCarte,
  afficherNbdeResultat,
  creerFiltre,
  filtrerLivres,
} from "./utils.js";

//Elements du DOM
const selectTypeDoc = document.getElementById("type-de-document");
const selectAuteur = document.getElementById("auteur");
const boutonAfficherFiltre = document.querySelector(".btn-affichage-filtres");
const zoneFiltres = document.querySelector(".filtre-select");

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
    listeLivres.forEach((livre) => {
      creerCarte(livre);
    });
    afficherNbdeResultat(listeLivres);
    creerFiltre(listeLivres, selectTypeDoc);
    creerFiltre(listeLivres, selectAuteur);
    selectTypeDoc.addEventListener("change", (event) => {
      const eventValue = event.target.value;
      filtrerLivres(listeLivres, selectTypeDoc, eventValue);
    });
    selectAuteur.addEventListener("change", (event) => {
      const eventValue = event.target.value;
      filtrerLivres(listeLivres, selectAuteur, eventValue);
    });
  } catch (erreur) {
    console.error(erreur.message);
  } finally {
    console.log("chargement terminé");
  }
}

getLivres();

boutonAfficherFiltre.addEventListener("click", () => {
  zoneFiltres.classList.toggle("cache");
  if (boutonAfficherFiltre.textContent === "Afficher les filtres") {
    boutonAfficherFiltre.textContent = "Cacher les filtres";
  } else {
    boutonAfficherFiltre.textContent = "Afficher les filtres";
  }
});
