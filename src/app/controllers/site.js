const Chef = require("../models/chef")
const Recipe = require('../models/recipe')

module.exports = {
    about (req, res) {
        return res.render("site/about")
    },
    recipes (req, res) {
        Recipe.recipeInformations(function (recipes) {
            return res.render("site/recipes", { recipes: recipes })

        })
    },
    recipe (req, res) {

        Recipe.find(req.params.id, function (recipe) {
            if (!recipe) return res.redirect("/not-found")

            return res.render("site/recipe", {recipe} )
        })

    }, 
    chefs (req, res) {
        Chef.all(function (chefs) {
            return res.render("site/chefs", { chefs })
        })
    },
    chef (req, res) {

        Chef.find(req.params.id, function (chef) {
            if (!chef) return res.redirect("/not-found")

            Recipe.recipeInformations(function (recipes) {

            return res.render("site/chef", {chef, recipes} )
            })
        })
    },
    search (req, res) {
        
        let { filter } = req.query

        Recipe.findBy(filter, function (recipes){

            return res.render("site/search", { filter, recipes })
                
        })
    }
}