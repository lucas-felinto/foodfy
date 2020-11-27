const Database = require('../../config/db');
const { date } = require('../../lib/utils');

module.exports = {
  create(data) {
    const query = `
            INSERT INTO recipes (
                image,
                title,
                ingredients,
                preparation,
                information,
                created_at,
                chef_id
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `;
    const values = [
      data.image,
      data.title,
      data.ingredients,
      data.preparation,
      data.information,
      date(Date.now()).format,
      data.chef_id,
    ];

    return Database.query(query, values);
  },
  chefSelectOptions() {
    return Database.query('SELECT chef_name, id FROM chefs ');
  },
  recipeInformations() {
    return Database.query(`
            SELECT recipes.*, chefs.chef_name AS chef_name
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            `);
  },
  find(id) {
    return Database.query(` 
        SELECT recipes.*, chefs.chef_name AS chef_name
        FROM recipes
        LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
        WHERE recipes.id = $1`, [id]);
  },
  findBy(filter, callback) {
    Database.query(`
            SELECT recipes.*, chefs.chef_name AS chef_name
            FROM recipes
            LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
            WHERE recipes.title ILIKE '%${filter}%'`, (err, results) => {
      // eslint-disable-next-line no-throw-literal
      if (err) throw `DATABASE ${err}`;

      callback(results.rows);
    });
  },
  update(data) {
    const query = `
            UPDATE recipes SET
                image = ($1),
                chef_id = ($2),
                title = ($3),
                ingredients = ($4),
                preparation = ($5),
                information = ($6)
            WHERE id = $7
            `;

    const values = [
      data.image,
      data.chef_id,
      data.title,
      data.ingredients,
      data.preparation,
      data.information,
      data.id,
    ];

    return Database.query(query, values);
  },
  delete(id) {
    return Database.query('DELETE FROM recipes WHERE id = $1', [id]);
  },
};
