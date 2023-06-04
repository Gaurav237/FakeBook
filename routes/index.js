const express = require('express');

const router = express.Router();

const homeController = require('../controllers/home_controller');

router.get('/', homeController.home);

// for other routers other than index.js i.e. home router
router.use('/users', require('./users.js'));

// for any other routes, access using middleware
// app.use('/routerName', require('./routerFile'));

module.exports = router;