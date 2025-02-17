const bcrypt = require("bcrypt");

module.exports = {
    // Affichage du formulaire de connexion
    loginViews: async (req, res) => {
        try {
            res.render("login", { error: null });
        } catch (error) {
            console.error("Erreur lors du chargement de la page de connexion :", error);
            res.status(500).send("Erreur interne du serveur");
        }
    },

    // Traitement du formulaire de connexion
    loginUser: async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.render("login", { error: "Tous les champs sont obligatoires" });
        }

        try {
            const connection = await new Promise((resolve, reject) => {
                req.getConnection((err, conn) => (err ? reject(err) : resolve(conn)));
            });

            const results = await new Promise((resolve, reject) => {
                connection.query("SELECT * FROM utilisateur WHERE email = ?", [email], (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                });
            });

            if (results.length === 0) {
                return res.render("login", { error: "Email ou mot de passe incorrect" });
            }

            const user = results[0];

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
            console.error("Erreur lors de l'authentification :", error);
            res.status(500).send("Erreur interne du serveur");
        }
    },

    // Déconnexion de l'utilisateur
    logoutUser: async (req, res) => {
        try {
            req.session.destroy(err => {
                if (err) {
                    console.error("Erreur lors de la déconnexion :", err);
                    return res.status(500).send("Erreur lors de la déconnexion");
                }
                res.redirect("/login");
            });
        } catch (error) {
            console.error("Erreur lors de la déconnexion :", error);
            res.status(500).send("Erreur interne du serveur");
        }
    }
};
