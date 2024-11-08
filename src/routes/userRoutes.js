const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const { verifyToken } = require('../utils/jwt');
const authController = require('../controllers/authController');
const { cacheMiddleware } = require('../services/cacheService');

router.post('/login', authController.login);
router.post('/users' , userController.createUser);
router.get('/users/account/:accountNumber', cacheMiddleware, verifyToken, userController.getUserByAccountNumber);
router.get('/users/identity/:identityNumber', cacheMiddleware, verifyToken, userController.getUserByIdentityNumber);
router.patch('/users/:id', verifyToken, userController.updateUser);
router.delete('/users/:id', verifyToken, userController.deleteUser);

module.exports = router;
