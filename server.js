// Importation du module HTTP de Node.js pour créer un serveur
const http = require('http');

// Importation de l'application Express définie dans 'app.js'
const app = require('./app');

// Définition du port sur lequel le serveur écoutera les requêtes
const numPort = 3008;

// Création du serveur HTTP en passant l'application Express comme gestionnaire des requêtes
const server = http.createServer(app);

// Création d'un objet Date pour afficher la date et l'heure du démarrage du serveur
const date = new Date();

// Configuration du port dans l'application Express
app.set("port", numPort);

// Mise en écoute du serveur sur le port défini
server.listen(numPort, () => {
    // Affichage de la date et de l'heure du démarrage du serveur dans la console
    console.log(date.toLocaleDateString(), " ", date.toLocaleTimeString());
    
    // Message de confirmation indiquant que le serveur est actif et sur quel port
    console.log("Le serveur est activé au port :", numPort);
});

