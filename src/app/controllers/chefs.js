const Chef = require("../models/chef")
const Recipe = require('../models/recipe')

module.exports = {
    index (req, res) {

        Chef.all(function (chefs) {
            return res.render("admin/chefs/chefs", { chefs })
        })
        
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

            Recipe.recipeInformations(function (recipes) {

                return res.render("admin/chefs/chef", { chef, recipes })
            })
        })

    },
    edit (req, res) {

        Chef.find(req.params.id, function (chef) {
            if (!chef) return res.send("Chef Not Found!")

            Recipe.recipeInformations(function (recipes) {

                return res.render("admin/chefs/edit", { chef, recipes })
            })
        })

    },
    put (req, res) {
        
        Chef.update(req.body, function() {
            
            return res.redirect(`/admin/chefs/${req.body.id}`)
        })
    },
    delete (req, res) {

        Chef.delete(req.body.id, function() {

            return res.redirect("/admin/chefs")
        })

    }
}