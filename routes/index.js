const express = require('express');

const router = express.Router();

const homeController = require('../controllers/home_controller');

router.get('/', homeController.home);

// for user routers
router.use('/users', require('./users.js'));

// for posts router
router.use('/posts', require('./posts'));   // .js not required

// for any other routes, access using middleware
// app.use('/routerName', require('./routerFile'));

module.exports = router;
