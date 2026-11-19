function formaterListe(liste) {
  const infosLivres = [];
  for (const livre of liste) {
    infosLivres.push({
      titre: livre.titre,
      auteur: livre.auteur,
      typeDoc: livre.type_de_document,
      prets: livre.prets,
    });
  }
  return infosLivres;
}

function creerCarte(objetLivre) {
  const { titre, auteur, typeDoc, prets } = objetLivre;
  const carte = document.createElement("article");
  carte.classList.add("carte");
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

function trierPrets(liste, ordre) {
  const listeTemp = liste.toSorted(
    (livre1, livre2) => livre1.prets - livre2.prets,
  );
  switch (ordre) {
    case "croissant":
      return listeTemp;
      break;
    case "décroissant":
      return listeTemp.reverse();
      break;
    default:
      return;
  }
}

function filtrerLivresAuteur(livres, filtreValue) {
  let listeFiltree = livres.filter((livre) => {
    livre.auteur === filtreValue;
  });
  return listeFiltree;
}
function filtrerLivresTypeDoc(livres, filtreValue) {
  let listeFiltree = livres.filter((livre) => {
    livre.typeDoc === filtreValue;
  });
  return listeFiltree;
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

export {
  formaterListe,
  creerCarte,
  trierPrets,
  filtrerLivresAuteur,
  filtrerLivresTypeDoc,
  filtrerLivres,
};
