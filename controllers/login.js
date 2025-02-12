module.exports = {
    loginViews: (req, res) => {
        req.getConnection((erreur, connection) => { 
            if (erreur) {
                console.error("Erreur de connexion à la base de données :", erreur);
                return res.status(500).send("Erreur interne du serveur");
            } 

            // Exécution de la requête SQL pour récupérer les utilisateurs
            connection.query("SELECT * FROM utilisateur", [], (err, resultat) => {
                if (err) {
                    console.error("Erreur lors de l'exécution de la requête SQL :", err);
                    return res.status(500).send("Erreur interne du serveur");
                } 

                console.log("Résultat :", resultat);
                res.render("login", { resultat, error: null });
            });
        });
    }
};
