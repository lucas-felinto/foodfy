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

            return callbcack(results.rows)
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
        LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
        WHERE recipes.id = $1`, [id], function (err, results) {
            if (err) throw `DATABASE ${err}`

            callback(results.rows[0])
        })
    },
    findBy (filter, callback) {

        database.query(`
            SELECT recipes.*, chefs.chef_name AS chef_name
            FROM recipes
            LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
            WHERE recipes.title ILIKE '%${filter}%'`, function (err, results) {
                if (err) throw `DATABASE ${err}`

                callback(results.rows)

            })

    },
    update (data, callback) {
        
        const query = `
            UPDATE recipes SET
                image = ($1),
                chef_id = ($2),
                title = ($3),
                ingredients = ($4),
                preparation = ($5),
                information = ($6)
            WHERE id = $7
            `

        const values = [
            data.image,
            data.chef_id,
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            data.id
        ]

        database.query(query, values, function (err, results) {
            if (err) throw `DATABASE ${err}`

            callback()
        })
    },
    delete (id, callback) {
        database.query(`DELETE FROM recipes WHERE id = $1`, [id], function(err) {
            if (err) throw `Database ERROR ${err}`

            return callback()
        })
    }
}