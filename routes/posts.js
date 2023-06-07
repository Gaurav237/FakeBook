const express = require('express');

const router = express.Router();

const postsController = require('../controllers/posts_controller');
const passport = require('passport');

// controller level authentication added for posting.
router.post('/create', passport.checkAuthentication ,postsController.create);

// delete router
// params
router.get('/destroy/:id', passport.checkAuthentication, postsController.destroy);

module.exports = router;