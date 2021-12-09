const express = require('express');
const router = express.Router();

const SiteController = require('../app/controllers/SiteController');

router.get('/create', SiteController.create);
router.get('/delete', SiteController.deleteform);
router.get('/loginform', SiteController.loginform);
router.get('/', SiteController.index);

router.post('/store', SiteController.store);
router.post('/delete', SiteController.delete);
router.post('/login', SiteController.login);

module.exports = router;