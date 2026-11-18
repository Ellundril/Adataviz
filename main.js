import {
  formaterListe,
  creerCarte,
  afficherNbdeResultat,
  creerFiltre,
} from "./utils.js";
const selectTypeDoc = document.getElementById("type-de-document");
const selectAuteur = document.getElementById("auteur");
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
    const listeLivres = formaterListe(resultat.results);
    listeLivres.forEach((livre) => {
      creerCarte(livre);
    });
    afficherNbdeResultat(listeLivres);
    creerFiltre(listeLivres, selectTypeDoc);
    creerFiltre(listeLivres, selectAuteur);
  } catch (erreur) {
    console.error(erreur.message);
  } finally {
    console.log("chargement terminé");
  }
}
//importation des fonctions de utils.js
getLivres();
