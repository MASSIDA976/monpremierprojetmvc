const express = require("express");
const router = express.Router();
const signupControllers = require("../controllers/signup");

// Afficher la page d'inscription
router.get("/signup", signupControllers.signupViews);

module.exports = router;
