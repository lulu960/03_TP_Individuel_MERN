const express = require("express");
const { getUserById } = require("../Controllers/UserController");
const router = express.Router();

// Route pour récupérer un utilisateur par ID
router.get("/:id", getUserById);

module.exports = router;
