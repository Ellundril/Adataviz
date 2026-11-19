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

function trierPrets(liste, ordre) {
  const listeTemp = liste.toSorted(
    (livre1, livre2) => livre1.prets - livre2.prets,
  );
  switch (ordre) {
    case "croissant":
      return listeTemp;
    case "décroissant":
      return listeTemp.reverse();
    default:
      return;
  }
}

function formatNbdeResultat(liste) {
  return `Nombre de livres affichés : ${liste.length}`;
}

export { formaterListe, trierPrets, formatNbdeResultat };
