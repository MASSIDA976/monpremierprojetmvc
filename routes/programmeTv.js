// Importation du module 'express' qui permet de créer une application web avec Express.js
const express = require('express');

///méthode qui gère la vue de la page 'apropos
const programmetvControllers = require('../controllers/programmeTv'); 

// Création d'une instance du routeur d'Express pour gérer les routes
const router = express.Router();

// Définition d'une route GET pour la page d'accueil (ou la page apropos dans ce cas)
// Lorsque l'utilisateur accède à la route '/', la méthode 'aproposView' du contrôleur 'aproposcontroller' sera appelée


router.get('/programmeTv',programmetvControllers.programmetvViews);


module.exports = router;