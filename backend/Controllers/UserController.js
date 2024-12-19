const User = require("../Models/User");

// Récupère un utilisateur par son ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id, "username email"); // Sélectionne uniquement les champs nécessaires
    if (!user) {
      return res.status(404).json({ error: "Utilisateur introuvable" });
    }
    res.json(user); // Renvoie l'utilisateur trouvé
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};
