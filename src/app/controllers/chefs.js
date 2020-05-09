const Chef = require("../models/chef")

module.exports = {
    index (req, res) {
        return res.render("admin/chefs/chefs")
    },
    create (req, res) {
        return res.render("admin/chefs/create")
    }, 
    post (req, res) {
        Chef.create(req.body, function() {
            return res.redirect("/admin/chefs")
        }) 
    }
}