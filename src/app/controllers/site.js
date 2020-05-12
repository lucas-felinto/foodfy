const data = require('../../../data.json')
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
            if (!recipe) return res.send("Recipe not found!")

            return res.render("site/recipe", {recipe} )
        })

    }
}