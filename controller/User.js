"use strict";
const express = require('express');
const moment = require('moment');
const uuidv4 = require('uuid/v4');
const queries = require('../db/queries.js');
const Auth = require('../auth/authentication.js');

const User = {
	register(req, res, next) {
		if (!req.body.email || !req.body.password) {
			return res.status(400).send({'message': 'Some values are missing'});
		}
		if (!Auth.isValidEmail(req.body.email)) {
			return res.status(400).send({'message': 'Please enter a valid email address'});
		}
		queries.getUserEmail(req.body.email)
		.then(function(user) {
			if (user !== undefined) {
				return res.status(400).send({'message': 'Please enter a different email address'});
			}	else {
				const hashPassword = Auth.hashPassword(req.body.password);
				const user = [{
					user_id: uuidv4(),
					email: req.body.email,
					password: hashPassword,
					created_date: moment(new Date())
				}];
				queries.addUser(user)
				.then(function() {
					res.status(201).send({'message': 'User successfully registered'});
				})
				.catch(function(error) {
					next(error);
				})
			}
		})
		.catch(function(error) {
			next(error);
		})
	},
	login(req, res, next) {
		if (!req.body.email || !req.body.password) {
			return res.status(400).send({'message': 'Some values are missing'});
		}
		if (!Auth.isValidEmail(req.body.email)) {
			return res.status(400).send({'message': 'Please enter a valid email address'});
		}
		queries.getUserEmail(req.body.email)
		.then(function(user) {
			if (!Auth.comparePassword(user.password, req.body.password)) {
				return res.status(400).send({'message': 'The credentials you provided are incorrect'});
			}	else {
				let expiry = new Date();
				expiry.setDate(expiry.getDate() + parseInt(process.env.EXPIRY.charAt(0)));
				const token = Auth.generateToken(user.user_id);
				return res.status(200).send({ token });
			}
		})
		.catch(function(error) {
			next(error);
		})
	}
}

module.exports = User;