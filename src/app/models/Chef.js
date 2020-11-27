const Database = require('../../config/database');
const { date } = require('../../lib/utils');

module.exports = {
  all() {
    return Database.query(`
            SELECT chefs.*, count(recipes.id) AS total_recipes
            FROM chefs
            LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
            GROUP BY chefs.id`);
  },
  create(data) {
    const query = `
            INSERT INTO chefs (
                chef_name,
                avatar_url,
                created_at
            ) VALUES ($1, $2, $3)
            RETURNING id
        `;
    const values = [
      data.chef_name,
      data.avatar_url,
      date(Date.now()).format,
    ];

    return Database.query(query, values);
  },
  find(id) {
    return Database.query(` 
            SELECT chefs.*, count(recipes.id) AS total_recipes
            FROM chefs
            LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
            WHERE chefs.id = $1
            GROUP BY chefs.id`, [id]);
  },
  update(data) {
    const query = `
            UPDATE chefs SET
                chef_name = ($1),
                avatar_url = ($2)
            WHERE id = $3
        `;

    const values = [
      data.chef_name,
      data.avatar_url,
      data.id,
    ];

    return Database.query(query, values);
  },
  delete(id) {
    return Database.query(' DELETE FROM chefs WHERE id = $1 ', [id]);
  },
};
