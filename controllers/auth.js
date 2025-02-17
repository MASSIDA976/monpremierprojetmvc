const bcrypt = require("bcrypt");

module.exports = {
    // Affichage du formulaire de connexion
    loginViews: (req, res) => {
        try {
            res.render("login", { error: null });
        } catch (error) {
            console.error("Erreur lors du chargement de la page de connexion :", error);
            res.status(500).send("Erreur interne du serveur");
        }
    },

    // Méthode POST pour la connexion
    loginPost: (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.render("login", { error: "Tous les champs sont obligatoires" });
        }

        req.getConnection((err, connection) => {
            if (err) {
                console.error("Erreur de connexion à la base de données :", err);
                return res.status(500).send("Erreur interne du serveur");
            }

            connection.query("SELECT * FROM utilisateur WHERE email = ?", [email], async (err, results) => {
                if (err) {
                    console.error("Erreur lors de la requête SQL :", err);
                    return res.status(500).send("Erreur interne du serveur");
                }
                
                if (results.length === 0) {
                    return res.render("login", { error: "Email ou mot de passe incorrect" });
                }
                
                const user = results[0];
                
                try {
                    const isMatch = await bcrypt.compare(password, user.password);
                    if (!isMatch) {
                        return res.render("login", { error: "Email ou mot de passe incorrect" });
                    }
                    
                    req.session.user = {
                        id: user.id,
                        email: user.email,
                        nom: user.nom
                    };
                    
                    res.redirect("/dashboard");
                } catch (error) {
                    console.error("Erreur lors de la vérification du mot de passe :", error);
                    res.status(500).send("Erreur interne du serveur");
                }
            });
        });
    },

    // Déconnexion de l'utilisateur
    logoutUser: (req, res) => {
        req.session.destroy(err => {
            if (err) {
                console.error("Erreur lors de la déconnexion :", err);
                return res.status(500).send("Erreur lors de la déconnexion");
            }
            res.redirect("/login");
        });
    }
};
