const express = require('express');

const router = express.Router();

const postsApi = require('../../../controllers/api/v1/posts_api');
const passport = require('passport');

router.get('/', postsApi.index);

// 'jwt' => used to authenticate, && don't store session cookies
router.delete('/:id', passport.authenticate('jwt', {session: false}), postsApi.destroy);

module.exports = router;
