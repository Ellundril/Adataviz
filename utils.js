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

function creerCarte(objetLivre, cartes) {
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

function afficherNbdeResultat(liste, element) {
  element.textContent = `Nombre de livres affichés : ${liste.length}`;
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

function filtrerLivres(
  listeLivres,
  filtre,
  filtreValue,
  cartes,
  nbTotalLivres,
) {
  cartes.innerHTML = "";
  if (filtreValue === "tous") {
    listeLivres.forEach((livre) => {
      creerCarte(livre, cartes);
    });
    afficherNbdeResultat(listeLivres, nbTotalLivres);
  } else {
    const livresFiltres = listeLivres.filter(
      (livre) => livre[filtre.dataset.cle] === filtreValue,
    );
    livresFiltres.forEach((livre) => {
      creerCarte(livre, cartes);
    });
    afficherNbdeResultat(livresFiltres, nbTotalLivres);
  }
}
export {
  formaterListe,
  creerCarte,
  afficherNbdeResultat,
  creerFiltre,
  filtrerLivres,
};
