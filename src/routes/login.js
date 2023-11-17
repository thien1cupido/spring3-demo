const express = require('express');
const router = express.Router();
const authenticateController = require('../app/controllers/AuthenticateController');
router.get('/showPageLogin', authenticateController.showPageLogin);
router.post('/authentication', authenticateController.login);
module.exports = router;