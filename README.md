# Adataviz

## Description

Adataviz est un site permettant de visualiser une partie des titres les plus prêtés dans les bibliothèques parisiennes en 2022. Il utilise pour cela l'API [Paris data](https://opendata.paris.fr)

L'objectif est d'apprendre à utiliser fetch, les promesses et les fonctions asynchrones.

## Langages utilisés

C'est un projet réalisé entièrement en **html**, **css** et **javaScript**. On utilise **jest** pour les tests unitaires.

## Contenu

- un fichier [index.html](index.html)
- un fichier [style.css](style.css)
- deux fichiers javascript [main.js](main.js) et [utils.js](utils.js)
- un fichier [utils.test.js](utils.test.js)
- un fichier [package.json](package.json)

## Lancement du projet

1. Cloner le repo github sur votre machine depuis votre CLI :

```bash
git clone git@github.com:Ellundril/Adataviz.git
```

2. Télécharger les paquets nécessaires

```bash
npm install
```

3. Lancer le projet dans le navigateur en local

```bash
npx live-server
```

## Fonctionnement du projet

1. Les filtres auteurs et types d'ouvrages permettent de filtrer les documents suivant le filtre choisi. Attention ces deux filtres sont indépendants.

2. La barre de recherche : permet d'effectuer une recherche que ce soit dans les titres ou les auteurs à partir de quelques caractères. Taper les caractères souhaités et appuyer sur la touche entrée pour valider.

3. Les couleurs des cartes correspondent au type de document.
