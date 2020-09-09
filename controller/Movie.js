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
    queries.getAllUserMovies(req.user.user_id)
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
    if (!req.body.api_id) {
			return res.status(400).send({'message': 'Some values are missing'});
		}	else {
			const movie = [{
				movie_id: uuidv4(),
				user_id: req.user.user_id,
				api_id: req.body.api_id,
				created_date: moment(new Date())
			}];
			queries.addMovie(movie)
			.then(function() {
				return res.status(201).send({'message':'Movie successfully added to database'})
			})
			.catch(function(error) {
				next(error);
			})
		}
  },
  delete(req, res, next) {
    queries.getSingleMovieId(req.params.api_id)
		.then(function(movie) {
			if (req.user.user_id === movie.user_id) {
				queries.deleteMovie(req.params.api_id)
				.then(function() {
					return res.status(200).send({'message':'Movie successfully deleted'});
				})
				.catch(function(error) {
					next(error);
				})
			}	else {
				return res.status(401).send({'message':'Unauthorized request to delete movie'});
			}
		})
		.catch(function(error) {
			next(error);
		})
  }
}

module.exports = Movie;