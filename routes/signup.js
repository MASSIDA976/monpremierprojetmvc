const express = require("express");
const router = express.Router();
const signupControllers = require("../controllers/signup");

// Afficher la page d'inscription (GET)
router.get("/signup", signupControllers.signupViews);

// Gérer l'inscription (POST)
router.post("/signup", signupControllers.validationsignup);

module.exports = router;
