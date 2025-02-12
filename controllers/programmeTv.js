module.exports = {
    programmetvViews: (req, res) => {
    req.getConnection((erreur, connection)=> { //Cette fonction établit une connexion avec la base de données MySQL grâce à `expreexpress-myconnection
        if(erreur) {
            console.log(erreur);
        } 
        else {
            // connection.query exécute une requête SQL qui sélectionne toutes les lignes de la table programmediffusion.
            connection.query("SELECT * FROM programmediffusion",[], (err, resultat) => {   
                if (err) {
                    console.log(err);
                } else {
                    console.log("resultat : ", resultat);
                    res.render("programmetv", {resultat});
                }
            });
        }
    })
    }
    };