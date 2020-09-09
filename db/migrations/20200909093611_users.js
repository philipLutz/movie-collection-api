exports.up = function(knex) {
  let createQuery = `CREATE TABLE users(
  		user_id UUID PRIMARY KEY,
  		email VARCHAR(128) UNIQUE NOT NULL,
  		password VARCHAR(128) NOT NULL,
  		created_date TIMESTAMP
  	)`;
  	return knex.raw(createQuery);
};

exports.down = function(knex) {
  let dropQuery = `DROP TABLE users`;
 return knex.raw(dropQuery);
};
