const express = require('express');
const { createAd, getAds, deleteAd,updateAd,getAd,getMyAds } = require('../Controllers/adController');
const authMiddleware = require('../Middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createAd);
router.delete('/:id', deleteAd);
router.put('/:id', authMiddleware, updateAd);
router.get('/:id', getAd);
router.get("/my-ads/:id", getMyAds);
router.get('/', getAds);

module.exports = router;