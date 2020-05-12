const database = require('../../config/db')
const { date } = require('../../lib/utils')

module.exports = {
    create (data, callback) {

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
        `
        const values = [
            data.image,
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            date(Date.now()).format,
            data.chef_id
        ]

        database.query(query, values, function (err, results) {
            if (err) throw `DATABASE ERROR ${err}`

            callback(results.rows[0])
        })
    },
    chefSelectOptions (callbcack) {
        database.query(`
            SELECT chef_name, id FROM chefs 
        `, function (err, results) {
            if (err) throw `DATABASE ${err}`

            callbcack(results.rows)
        })
    },
    recipeInformations (callback) {
        database.query(`
            SELECT recipes.*, chefs.chef_name AS chef_name
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            `
            , function (err, results) {
                if (err) throw `Database ERROR ${err}`

                callback(results.rows)
        })
    },
    find (id, callback) {
        database.query(` 
        SELECT recipes.*, chefs.chef_name AS chef_name
        FROM recipes
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
        WHERE recipes.id = $1`, [id], function (err, results) {
            if (err) throw `DATABASE ${err}`

            callback(results.rows[0])
        })
    }
}