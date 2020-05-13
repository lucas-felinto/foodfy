const database = require('../../config/db')
const { date } = require('../../lib/utils')

module.exports = {
    all(callback) {
        database.query(`
            SELECT chefs.*, count(recipes.id) AS total_recipes
            FROM chefs
            LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
            GROUP BY chefs.id`, function (err, results) {
                if (err) throw `DATABASE ${err}`

                callback(results.rows)
            
        })
    },
    create (data, callback) {

        const query = `
            INSERT INTO chefs (
                chef_name,
                avatar_url,
                created_at
            ) VALUES ($1, $2, $3)
            RETURNING id
        `
        const values = [
            data.chef_name,
            data.avatar_url,
            date(Date.now()).format
        ]

        database.query(query, values, function(err, results){
            if (err) throw `DATABASE ERROR ${err}`

            callback(results.rows[0])
        })
    },
    find (id, callback) {
        database.query(` 
        SELECT chefs.*, count(recipes.id) AS total_recipes
        FROM chefs
        LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
        WHERE chefs.id = $1
        GROUP BY chefs.id`, [id], function (err, results) {
            if (err) throw `DATABASE ${err}`

            callback(results.rows[0])
        })
    },
    update (data, callback) {
        
        const query = `
            UPDATE chefs SET
                chef_name = ($1),
                avatar_url = ($2)
            WHERE id = $3
        `
        
        const values = [
            data.chef_name,
            data.avatar_url,
            data.id
        ]

        database.query(query, values, function (err, results) {
            if (err) throw `DATABASE ${err}`

            callback()
        })
    },
    delete (id, callback) {
        
        database.query(` DELETE FROM chefs WHERE id = $1 `, [id], function (err) {
            if (err) throw `DATABASE ${err}`

            return callback()
        })

    }
}