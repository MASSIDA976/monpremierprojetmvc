const express = require("express");
const mysql2 = require("mysql2");
const myConnection = require("express-myconnection");
//const authRoutes = require('./routes/apropos');
const aproposRoutes = require('./routes/apropos');
const programmeTvRoutes = require('./routes/programmeTv');
const loginRoutes = require('./routes/login');
const signupRoutes = require('./routes/signup');

const app = express();

const optionConnection = { 
    host: "localhost",
    user: "root",
    password: "Tissianti976.", // Assurez-vous que ce mot de passe est correct
    port: 3306, // 3306 est le port par défaut de MySQL
    database: "chainetv"
};

// Middleware pour gérer la connexion MySQL
app.use(myConnection(mysql2, optionConnection, "pool"));

// Middleware pour gérer les formulaires
app.use(express.urlencoded({ extended: false }));

// Configuration des vues
app.set("views", "./views");
app.set("view engine", "ejs");

// Servir les fichiers statiques
app.use(express.static("public"));

//Cette ligne crée une route qui répond aux requêtes GET envoyées à l'URL "/apropos"
//app.get("/apropos", (req, res) => {

    //req.getConnection((erreur, connection)=> { // Cette fonction établit une connexion avec la base de données MySQL grâce à `expreexpress-myconnection
      //  if(erreur) {
       //     console.log(erreur);
       // } else {
          //  connection.query("SELECT * FROM equipe",[], (err, resultat) => { // Cette ligne exécute une requête SQL qui sélectionne toutes les colonnes de la table equipe.
           //     if (err) {
            //        console.log(err);
             //   } else {
             //       console.log("resultat : ", resultat);
            //        res.render("apropos", {resultat});
            //    }
          //  });
       // }
   // })
  //  });



// Route "Programme TV"
//app.get("/programmetv", (req, res) => {

   // req.getConnection((erreur, connection)=> { //Cette fonction établit une connexion avec la base de données MySQL grâce à `expreexpress-myconnection
       // if(erreur) {
       //     console.log(erreur);
       // } 
        //else {
            // connection.query exécute une requête SQL qui sélectionne toutes les lignes de la table programmediffusion.
         //   connection.query("SELECT * FROM programmediffusion",[], (err, resultat) => {   
           //     if (err) {
               //     console.log(err);
               // } else {
                //    console.log("resultat : ", resultat);
                 //   res.render("programmetv", {resultat});
                //}
            //});
       // }
    //})
   // });

// Route Accueil 
//app.get("/accueil", (req, res) => {
    //res.send("Bienvenue sur la page d'accueil !");
//});

// Route POST "Contact"
//app.post("/contact", (req, res) => {
   // res.send("Contactez-nous !");
//});









//app.use('/', authRoutes);
app.use('/',aproposRoutes);
app.use('/',programmeTvRoutes);
app.use('/', loginRoutes);
app.use('/', signupRoutes);

// Export du module pour utilisation dans `server.js`
module.exports = app;
