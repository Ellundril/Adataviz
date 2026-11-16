function formaterListe(liste) {
  const result = liste.results;
  const infosLivres = [];
  for (let i = 0; i < result.length; i++) {
    infosLivres.push({
      titre: result.titre,
      auteur: result.auteur,
      typeDoc: result.type_de_document,
      prets: result.prets,
    });
  }
  return infosLivres;
}

export { formaterListe };
