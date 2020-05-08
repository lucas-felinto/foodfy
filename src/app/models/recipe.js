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
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
        `
        const values = [
            data.image,
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            date(Date.now()).format
        ]

        database.query(query, values, function (err, results) {
            if (err) throw `DATABASE ERROR ${err}`

            callback(results.rows[0])
        })
    }
}