const express = require('express');
const { createAd, getAds, deleteAd,updateAd,getAd } = require('../Controllers/adController');
const authMiddleware = require('../Middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createAd);
router.get('/', getAds);
router.delete('/:id', authMiddleware, deleteAd);
router.put('/:id', authMiddleware, updateAd);
router.get('/:id', getAd);

module.exports = router;