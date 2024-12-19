const express = require('express');
const { register, login, deleteUser,updateUser,getUser } = require('../Controllers/authController');
const authMiddleware = require('../Middleware/authMiddleware');
const router = express.Router();


router.post('/register', register);
router.post('/login', login);
router.delete('/:id', authMiddleware, deleteUser);
router.put('/:id', authMiddleware, updateUser);
router.get('/me', authMiddleware, getUser);

module.exports = router;