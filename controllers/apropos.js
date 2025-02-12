module.exports = {
    aproposViews: (req, res) => {
         req.getConnection((erreur, connection)=> { // Cette fonction établit une connexion avec la base de données MySQL grâce à `expreexpress-myconnection
        if(erreur) {
            console.log(erreur);
        } else {
            connection.query("SELECT * FROM equipe",[], (err, resultat) => { // Cette ligne exécute une requête SQL qui sélectionne toutes les colonnes de la table equipe.
                if (err) {
                   console.log(err);
                } else {
                    console.log("resultat : ", resultat);
                   res.render("apropos", {resultat});
                }
           });
        }
    })
   
    
    }
}
