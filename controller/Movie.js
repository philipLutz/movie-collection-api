"use strict";
const express = require('express');
const moment = require('moment');
const uuidv4 = require('uuid/v4');
const cookieParser = require('cookie-parser');
const request = require('request');
const queries = require('../db/queries.js');
const Auth = require('../auth/authentication.js');

const Movie = {
  getPopular(req, res, next) {
    const options = {
      url: 'https://api.themoviedb.org/3/movie/popular?api_key='+ process.env.KEY,
      method: 'GET'
    };
    request(options).pipe(res)
  },
  getUserCollection(req, res, next) {
    queries.getAllUserMovies(req.params.user_id)
    .then(function(movies) {
			return res.status(200).send(movies);
		})
		.catch(function(error) {
			next(error);
		})
  },
  search(req, res, next) {
    const options = {
      url: 'https://api.themoviedb.org/3/search/movie?api_key='+ 
        process.env.KEY +
        '&query=' + req.params.movie_query,
      method: 'GET'
    };
    request(options).pipe(res)
  },
  add(req, res, next) {
  
  },
  delete(req, res, next) {
  
  }
}

module.exports = Movie;