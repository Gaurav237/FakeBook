const express = require('express');

const router = express.Router();

const commentsController = require('../controllers/comments_controller');
const passport = require('passport');

// controller level authentication added for commenting on post.
router.post('/create', passport.checkAuthentication , commentsController.create);

// router for deleting comment
router.get('/destroy/:id', passport.checkAuthentication , commentsController.destroy);

module.exports = router;