const knex = require('./knex.js');

// Users
function Users() {
	return knex('users');
}

function getSingleUser(user_id) {
  return Users().where('user_id', user_id).first();
}

function getUserEmail(email) {
	return Users().where('email', email).first();
}

function addUser(user) {
	return Users().insert(user);
}

// Movies
function Movies() {
  return knex('movies');
}

function getAllUserMovies(user_id) {
  return Movies().where('user_id', user_id);
}

function addMovie(movie) {
  return Movies().insert(movie);
}

function deleteMovie(movie_id) {
  return Movies().where('movie_id', movie_id).del();
}

module.exports = {
  getSingleUser: getSingleUser,
  getUserEmail: getUserEmail,
  addUser: addUser,
  getAllUserMovies: getAllUserMovies,
  addMovie: addMovie,
  deleteMovie: deleteMovie
};