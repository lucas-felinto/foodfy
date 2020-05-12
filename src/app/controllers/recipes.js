const fs = require('fs')
const data = require('../../../data.json')
const database = require('../../config/db')
const Recipe = require('../models/recipe')

module.exports = {
    index (req, res) {

        Recipe.recipeInformations(function (recipes) {
            return res.render("admin/recipes/recipes", {recipes: recipes})
        })

    },
    create (req, res) {
        Recipe.chefSelectOptions(function(options) {
            return res.render("admin/recipes/create", { chefOptions: options })
        })
    },
    show (req, res) {

        Recipe.find(req.params.id, function (recipe) {
            if (!recipe) return res.send("Recipe not found!")

            return res.render("admin/recipes/recipe", {recipe} )
        })

    },
    edit (req, res) {
        const index = req.params.index

        return res.render("admin/recipes/edit", {recipe: data.recipes, index})
    },
    post (req, res) {
        Recipe.create(req.body, function() {
            return res.redirect("/admin/recipes")
        }) 
    }, 
    put (req, res) {
        const index = req.params.index
        const foundRecipe = data.recipes[index]

        if (!foundRecipe) return res.send('recipe not found')

        const recipe = {
            ...foundRecipe,
            ...req.body
        }

        data.recipes[index] = recipe

        fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
            if (err) return res.send("Write Files Error")

            return res.redirect(`/admin/recipes`)
        })  
    }, 
    delete (req, res) {
        const index = req.params.index
    
        function removeRecipe () {
        data.recipes.splice(index, 1)
        }

        removeRecipe()

        fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
            if (err) return res.send("Write Files Error")

            return res.redirect(`/admin/recipes`)
        })
    }
}