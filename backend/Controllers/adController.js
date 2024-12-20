const { TokenExpiredError } = require('jsonwebtoken');
const Ad = require('../Models/Ad');

exports.createAd = async (req, res) => {
    try {
        const { title, description, category, price,photo } = req.body;
        const ad = new Ad({
            title,
            description,
            category,
            price,
            author: req.user.id,
            photo,
        });
        await ad.save();
        res.status(201).json(ad);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAds = async (req, res) => {
    try {
        const ads = await Ad.find().populate('author', 'username email');
        res.json(ads);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteAd = async (req, res) => {
    try {
      const { id } = req.params; // Récupérer l'ID de l'annonce
      const ad = await Ad.findById(id); // Trouver l'annonce par son ID
  
      if (!ad) {
        return res.status(404).json({ error: "Annonce introuvable." });
      }
  
      // Vérifier que l'utilisateur connecté est l'auteur de l'annonce
      if (ad.author.toString() !== req.user.id) {
        return res.status(403).json({ error: "Action non autorisée." });
      }
  
      await ad.remove(); // Supprimer l'annonce
      res.json({ message: "Annonce supprimée avec succès." });
    } catch (err) {
      res.status(500).json({ error: "Erreur lors de la suppression de l'annonce." });
    }
  };

  exports.updateAd = async (req, res) => {
    try {
      const { id } = req.params; // Récupérer l'ID de l'annonce
      const { title, description, category, price, photo } = req.body; // Récupérer les données de mise à jour
  
      const ad = await Ad.findById(id); // Trouver l'annonce par son ID
  
      if (!ad) {
        return res.status(404).json({ error: "Annonce introuvable." });
      }
  
      // Vérifier que l'utilisateur connecté est l'auteur de l'annonce
      if (ad.author.toString() !== req.user.id) {
        return res.status(403).json({ error: "Action non autorisée." });
      }
  
      // Mettre à jour l'annonce
      ad.title = title || ad.title;
      ad.description = description || ad.description;
      ad.category = category || ad.category;
      ad.price = price || ad.price;
      ad.photo = photo || ad.photo;
  
      const updatedAd = await ad.save(); // Sauvegarder les modifications
      res.json(updatedAd);
    } catch (err) {
      res.status(500).json({ error: "Erreur lors de la mise à jour de l'annonce." });
    }
  };
  

exports.getAd = async (req, res) => {
    try {
        const ad = await Ad.findById(req.params.id);
        if (!ad) return res.status(404).json({ message: 'Ad not found' });
        res.json(ad);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.getMyAds = async (req, res) => {
    try {
      const { id } = req.params; // Récupérer l'ID de l'utilisateur depuis l'URL
  
      // Récupérer toutes les annonces associées à cet utilisateur
      const ads = await Ad.find({ author: id }); // Cherche les annonces avec l'ID de l'utilisateur dans le champ `author`
  
      if (ads.length === 0) {
        return res.status(404).json({ error: "Aucune annonce trouvée pour cet utilisateur." });
      }
  
      res.json(ads); // Retourne toutes les annonces liées à l'utilisateur
    } catch (err) {
      res.status(500).json({ error: "Erreur lors de la récupération des annonces." });
    }
  };