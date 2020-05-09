const database = require('../../config/db')
const { date } = require('../../lib/utils')

module.exports = {
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
    }
}