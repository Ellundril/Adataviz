import {
  formaterListe,
  trierPrets,
  formatNbdeResultat,
  recherche,
} from "./utils.js";

describe("formaterListe", () => {
  it("retourne une liste d'objet contenant seulement les propriétés titre, auteur, type de document et nb de prêts", () => {
    const liste = [
      {
        type_de_document: "Bande dessinée jeunesse",
        titre: "Les petits rats de l'Opéra",
        prets: 1179,
        auteur: "Guibert, Emmanuel",
        nombre_de_localisations: 43,
        nombre_de_pret_total: 3663,
        nombre_d_exemplaires: 77,
      },
      {
        type_de_document: "Bande dessinée jeunesse",
        prets: 555,
        titre: "Naruto. 59",
        auteur: "Kishimoto, Masashi",
        nombre_de_localisations: 44,
        nombre_de_pret_total: 2735,
        nombre_d_exemplaires: 53,
      },
      {
        type_de_document: "Bande dessinée jeunesse",
        prets: 668,
        titre: "Coke en stock",
        auteur: "Hergé",
        nombre_de_localisations: 51,
        nombre_de_pret_total: 4654,
        nombre_d_exemplaires: 75,
      },
    ];
    const result = formaterListe(liste);
    expect(result).toEqual([
      {
        titre: "Les petits rats de l'Opéra",
        auteur: "Guibert, Emmanuel",
        typeDoc: "Bande dessinée jeunesse",
        prets: 1179,
      },
      {
        titre: "Naruto. 59",
        auteur: "Kishimoto, Masashi",
        typeDoc: "Bande dessinée jeunesse",
        prets: 555,
      },
      {
        titre: "Coke en stock",
        auteur: "Hergé",
        typeDoc: "Bande dessinée jeunesse",
        prets: 668,
      },
    ]);
  });
  it("retourne une liste vide si la liste de départ est vide", () => {
    const liste = [];
    const result = formaterListe(liste);
    expect(result).toEqual([]);
  });
});

describe("trierPrets", () => {
  it("trie la liste dans l'ordre décroissant du nombre de prêts lorsque ordre est égal à décroissant", () => {
    const tab = [
      {
        titre: "Les petits rats de l'Opéra",
        auteur: "Guibert, Emmanuel",
        typeDoc: "Bande dessinée jeunesse",
        prets: 1179,
      },
      {
        titre: "Naruto. 59",
        auteur: "Kishimoto, Masashi",
        typeDoc: "Bande dessinée jeunesse",
        prets: 555,
      },
      {
        titre: "Coke en stock",
        auteur: "Hergé",
        typeDoc: "Bande dessinée jeunesse",
        prets: 668,
      },
    ];
    const result = trierPrets(tab, "décroissant");
    expect(result).toEqual([
      {
        titre: "Les petits rats de l'Opéra",
        auteur: "Guibert, Emmanuel",
        typeDoc: "Bande dessinée jeunesse",
        prets: 1179,
      },
      {
        titre: "Coke en stock",
        auteur: "Hergé",
        typeDoc: "Bande dessinée jeunesse",
        prets: 668,
      },
      {
        titre: "Naruto. 59",
        auteur: "Kishimoto, Masashi",
        typeDoc: "Bande dessinée jeunesse",
        prets: 555,
      },
    ]);
  });
  it("trie la liste dans l'ordre croissant du nombre de prêts lorsque ordre est égal à croissant", () => {
    const tab = [
      {
        titre: "Les petits rats de l'Opéra",
        auteur: "Guibert, Emmanuel",
        typeDoc: "Bande dessinée jeunesse",
        prets: 1179,
      },
      {
        titre: "Naruto. 59",
        auteur: "Kishimoto, Masashi",
        typeDoc: "Bande dessinée jeunesse",
        prets: 555,
      },
      {
        titre: "Coke en stock",
        auteur: "Hergé",
        typeDoc: "Bande dessinée jeunesse",
        prets: 668,
      },
    ];
    const result = trierPrets(tab, "croissant");
    expect(result).toEqual([
      {
        titre: "Naruto. 59",
        auteur: "Kishimoto, Masashi",
        typeDoc: "Bande dessinée jeunesse",
        prets: 555,
      },
      {
        titre: "Coke en stock",
        auteur: "Hergé",
        typeDoc: "Bande dessinée jeunesse",
        prets: 668,
      },
      {
        titre: "Les petits rats de l'Opéra",
        auteur: "Guibert, Emmanuel",
        typeDoc: "Bande dessinée jeunesse",
        prets: 1179,
      },
    ]);
  });
});

//test à compléter
describe("formatNbdeResultat", () => {
  it("Retourne une phrase indiquant la longueur de la chaine", () => {
    const liste = [
      {
        type_de_document: "Bande dessinée jeunesse",
        titre: "Les petits rats de l'Opéra",
        prets: 1179,
        auteur: "Guibert, Emmanuel",
        nombre_de_localisations: 43,
        nombre_de_pret_total: 3663,
        nombre_d_exemplaires: 77,
      },
      {
        type_de_document: "Bande dessinée jeunesse",
        prets: 555,
        titre: "Naruto. 59",
        auteur: "Kishimoto, Masashi",
        nombre_de_localisations: 44,
        nombre_de_pret_total: 2735,
        nombre_d_exemplaires: 53,
      },
      {
        type_de_document: "Bande dessinée jeunesse",
        prets: 668,
        titre: "Coke en stock",
        auteur: "Hergé",
        nombre_de_localisations: 51,
        nombre_de_pret_total: 4654,
        nombre_d_exemplaires: 75,
      },
    ];
    const result = formatNbdeResultat(liste);
    expect(result).toBe(`Nombre de livres affichés : 3`);
  });
  it("Retourne une phrase indiquant que le nombre de livres est 0 si la liste est vide", () => {
    const liste = [];
    const result = formatNbdeResultat(liste);
    expect(result).toBe(`Nombre de livres affichés : 0`);
  });
});

describe("recherche", () => {
  it("retourne une tableau de livre contenant les caractères présent dans la recherche soit dans le titre soit dans l'auteur", () => {
    //arrange
    const input = "her";
    const listeLivres = [
      {
        titre: "Coke en stock",
        auteur: "Hergé",
        typeDoc: "Bande dessinée jeunesse",
        prets: 668,
      },
      {
        titre: "Les mabouls déboulent !",
        auteur: "Cohen,  Jaqueline",
        typeDoc: "Bande dessinée jeunesse",
        prets: 638,
      },
      {
        titre: "Les cahiers d'Esther. 3. Histoire de mes 12 ans",
        auteur: "Sattouf,  Riad",
        typeDoc: "Bande dessinée adulte",
        prets: 658,
      },
      {
        titre: "Naruto. 19",
        auteur: "Kishimoto,  Masashi",
        typeDoc: "Bande dessinée jeunesse",
        prets: 655,
      },
    ];

    //act
    const result = recherche(input, listeLivres);
    //assert
    expect(result).toEqual([
      {
        titre: "Coke en stock",
        auteur: "Hergé",
        typeDoc: "Bande dessinée jeunesse",
        prets: 668,
      },
      {
        titre: "Les cahiers d'Esther. 3. Histoire de mes 12 ans",
        auteur: "Sattouf,  Riad",
        typeDoc: "Bande dessinée adulte",
        prets: 658,
      },
    ]);
  });
  it("retourne une liste vide si aucun ne correspond à la recherche", () => {
    const input = "xzwy";
    const listeLivres = [
      {
        titre: "Coke en stock",
        auteur: "Hergé",
        typeDoc: "Bande dessinée jeunesse",
        prets: 668,
      },
      {
        titre: "Les mabouls déboulent !",
        auteur: "Cohen,  Jaqueline",
        typeDoc: "Bande dessinée jeunesse",
        prets: 638,
      },
      {
        titre: "Les cahiers d'Esther. 3. Histoire de mes 12 ans",
        auteur: "Sattouf,  Riad",
        typeDoc: "Bande dessinée adulte",
        prets: 658,
      },
      {
        titre: "Naruto. 19",
        auteur: "Kishimoto,  Masashi",
        typeDoc: "Bande dessinée jeunesse",
        prets: 655,
      },
    ];

    //act
    const result = recherche(input, listeLivres);
    //assert
    expect(result).toEqual([]);
  });
  it("retourne les livres contenant l'expression recherchée indépendamment de la casse", () => {
    const input = "hEr";
    const listeLivres = [
      {
        titre: "Coke en stock",
        auteur: "Hergé",
        typeDoc: "Bande dessinée jeunesse",
        prets: 668,
      },
      {
        titre: "Les mabouls déboulent !",
        auteur: "Cohen,  Jaqueline",
        typeDoc: "Bande dessinée jeunesse",
        prets: 638,
      },
      {
        titre: "Les cahiers d'Esther. 3. Histoire de mes 12 ans",
        auteur: "Sattouf,  Riad",
        typeDoc: "Bande dessinée adulte",
        prets: 658,
      },
      {
        titre: "Naruto. 19",
        auteur: "Kishimoto,  Masashi",
        typeDoc: "Bande dessinée jeunesse",
        prets: 655,
      },
    ];

    //act
    const result = recherche(input, listeLivres);
    //assert
    expect(result).toEqual([
      {
        titre: "Coke en stock",
        auteur: "Hergé",
        typeDoc: "Bande dessinée jeunesse",
        prets: 668,
      },
      {
        titre: "Les cahiers d'Esther. 3. Histoire de mes 12 ans",
        auteur: "Sattouf,  Riad",
        typeDoc: "Bande dessinée adulte",
        prets: 658,
      },
    ]);
  });
});
