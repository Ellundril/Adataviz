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

const cartes = document.querySelector(".cartes");

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
  nbDePrets.textContent = `Nombre de prêts : ${prets}`;
  carte.appendChild(titreLivre);
  carte.appendChild(auteurLivre);
  carte.appendChild(typeDeDoc);
  carte.appendChild(nbDePrets);
}

export { formaterListe, creerCarte, cartes };
