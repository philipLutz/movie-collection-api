"use strict";
const express = require('express');
const router = express.Router();
const Movie = require('../controller/Movie.js');
const Auth = require('../auth/authentication.js');

router.get('/', Auth.verifyToken, Movie.getPopular);
router.get('/search/:movie_query', Auth.verifyToken, Movie.search);
router.get('/collection', Auth.verifyToken, Movie.getUserCollection);
router.post('/collection', Auth.verifyToken, Movie.add);
router.delete('/collection/:api_id', Auth.verifyToken, Movie.delete);

module.exports = router;