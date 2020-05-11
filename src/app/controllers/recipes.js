const fs = require('fs')
const data = require('../../../data.json')
const recipe = require('../models/recipe')

module.exports = {
    index (req, res) {
        const index = req.params.index
        return res.render("admin/recipes/recipes", {recipes: data.recipes, index})
    },
    create (req, res) {
        recipe.chefSelectOptions(function(options) {
            return res.render("admin/recipes/create", { chefOptions: options })
        })
    },
    show (req, res) {
        const index = req.params.index
        const foundRecipe = data.recipes[index]

        if (!foundRecipe) return res.send('recipe not found')

        return res.render("admin/recipes/recipe", {items: data.recipes, index})
    },
    edit (req, res) {
        const index = req.params.index

        return res.render("admin/recipes/edit", {recipe: data.recipes, index})
    },
    post (req, res) {
        recipe.create(req.body, function() {
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