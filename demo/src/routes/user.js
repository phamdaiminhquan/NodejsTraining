const express = require('express');
const router = express.Router();

const { authenToken } = require('../app/middlewares/auth')

const SiteController = require('../app/controllers/SiteController');

router.get('/', SiteController.index);
router.get('/me', authenToken, SiteController.me);

router.post('/store', SiteController.store);
router.post('/delete', SiteController.delete);
router.post('/login', SiteController.login);

module.exports = router;