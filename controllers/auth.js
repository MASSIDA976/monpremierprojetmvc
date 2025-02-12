const bcrypt = require("bcrypt"); // Importation du module bcrypt pour le hachage et la vérification des mots de passe

module.exports = {
    // Affichage du formulaire de connexion
    loginViews: async (req, res) => {
        try {
            // Rendu de la page de connexion avec une valeur nulle pour les erreurs initialement
            res.render("login", { error: null });
        } catch (error) {
            // En cas d'erreur, affichage du message dans la console et envoi d'un message d'erreur au client
            console.error("Erreur lors du chargement de la page de connexion :", error);
            res.status(500).send("Erreur interne du serveur");
        }
    },

    // Méthode POST pour la connexion
    loginUser: async (req, res) => {
        const { email, password } = req.body; // Récupération des valeurs envoyées dans le formulaire

        // Vérification si tous les champs sont remplis
        if (!email || !password) {
            return res.render("login", { error: "Tous les champs sont obligatoires" });
        }

        try {
            // Connexion à la base de données (Utilisation d'une promesse pour gérer l'asynchronisme)
            const connection = await new Promise((resolve, reject) => {
                req.getConnection((err, conn) => (err ? reject(err) : resolve(conn)));
            });

            // Requête SQL pour récupérer l'utilisateur correspondant à l'email fourni
            const results = await new Promise((resolve, reject) => {
                connection.query("SELECT * FROM utilisateur WHERE email = ?", [email], (err, rows) => {
                    if (err) reject(err); // En cas d'erreur dans la requête SQL
                    else resolve(rows); // Résultat de la requête
                });
            });

            // Vérification si l'utilisateur existe dans la base de données
            if (results.length === 0) {
                return res.render("login", { error: "Email ou mot de passe incorrect" });
            }

            const user = results[0]; // Récupération des informations de l'utilisateur

            // Comparaison du mot de passe fourni avec le mot de passe haché stocké en base de données
            const isMatch = await bcrypt.compare(password, user.mot_de_passe);
            if (!isMatch) {
                return res.render("login", { error: "Email ou mot de passe incorrect" });
            }

            // Si l'authentification réussit, on stocke certaines informations de l'utilisateur dans la session
            req.session.user = {
                id: user.id,
                email: user.email,
                nom: user.nom
            };

            // Redirection vers le tableau de bord après connexion réussie
            res.redirect("/dashboard");
        } catch (error) {
            // En cas d'erreur, affichage du message d'erreur dans la console et retour d'une erreur au client
            console.error("Erreur lors de l'authentification :", error);
            res.status(500).send("Erreur interne du serveur");
        }
    },

    // Déconnexion de l'utilisateur
    logoutUser: async (req, res) => {
        try {
            // Destruction de la session de l'utilisateur
            req.session.destroy(err => {
                if (err) {
                    console.error("Erreur lors de la déconnexion :", err);
                    return res.status(500).send("Erreur lors de la déconnexion");
                }
                // Redirection vers la page de connexion après la déconnexion
                res.redirect("/login");
            });
        } catch (error) {
            // Gestion des erreurs en cas de problème lors de la déconnexion
            console.error("Erreur lors de la déconnexion :", error);
            res.status(500).send("Erreur interne du serveur");
        }
    }
};
