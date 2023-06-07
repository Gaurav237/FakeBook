const express = require('express');

const router = express.Router();

const postsController = require('../controllers/posts_controller');
const passport = require('passport');

// controller level authentication added for posting.
router.post('/create', passport.checkAuthentication ,postsController.create);


module.exports = router;