const express = require("express");
const router = express.Router();
const loginControllers = require('../controllers/login');

// Route pour afficher la page de connexion
router.get("/login", loginControllers.loginViews);

// Route pour traiter la connexion
router.post("/login", loginControllers.loginUser);

// Route pour la déconnexion
router.get("/logout", loginControllers.logoutUser);

module.exports = router;
