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
        const ad = await Ad.findByIdAndDelete(req.params.id);
        if (!ad) return res.status(404).json({ message: 'Ad not found' });
        res.json({ message: 'Ad deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateAd = async (req, res) => {
    try {
        const { title, description, category, price, photo } = req.body;
        const ad = await Ad.findByIdAndUpdate(req.params.id, { title, description, category, price, photo }, { new: true });
        if (!ad) return res.status(404).json({ message: 'Ad not found' });
        res.json(ad);
    } catch (err) {
        res.status(500).json({ error: err.message });
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