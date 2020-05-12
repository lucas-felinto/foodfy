const Chef = require("../models/chef")
const database = require('../../config/db')

module.exports = {
    index (req, res) {

        database.query (`
            SELECT chefs.*, count(recipes) AS total_recipes
            FROM chefs 
            LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
            GROUP BY chefs.id`, function (err, results) {
                if (err) throw `DATABASE ${err}`

                return res.render("admin/chefs/chefs", { chefs: results.rows })
            }
        )
    },
    create (req, res) {
        return res.render("admin/chefs/create")
    }, 
    post (req, res) {
        Chef.create(req.body, function() {
            return res.redirect("/admin/chefs")
        }) 
    },
    show (req, res) {
        
        Chef.find(req.params.id, function (chef) {
            if (!chef) return res.send("Chef Not Found!")
            
            return res.render("admin/chefs/chef", { chef })
        })
    }
}