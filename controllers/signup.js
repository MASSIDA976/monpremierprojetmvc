// controllers/signup.js

module.exports = {
    signupViews : (req, res) => {
        res.render("signup");
        /*res.render('formulaire', {
            user: req.session.user || {},   // Valeurs saisies par l'utilisateur, si disponibles
            errors: req.session.errors || {} // Messages d'erreur, si disponibles
        });*/
    }
};
