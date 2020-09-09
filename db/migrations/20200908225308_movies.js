exports.up = function(knex) {
  let createQuery = `CREATE TABLE movies(
		movie_id UUID PRIMARY KEY,
		user_id UUID NOT NULL,
		api_id INT NOT NULL,
		created_date TIMESTAMP
	)`;
	return knex.raw(createQuery);
};

exports.down = function(knex) {
  let dropQuery = `DROP TABLE movies`;
 return knex.raw(dropQuery);
};
