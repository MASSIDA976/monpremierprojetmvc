const express = require("express");
const router = express.Router();
const loginControllers = require("../controllers/login");

// Afficher la page de connexion
router.get("/login", loginControllers.loginViews);

module.exports = router;
