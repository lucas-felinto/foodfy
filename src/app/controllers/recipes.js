const fs = require('fs')
const Recipe = require('../models/recipe')

module.exports = {
    index (req, res) {

        Recipe.recipeInformations(function (recipes) {
            return res.render("admin/recipes/recipes", { recipes })
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

        Recipe.find(req.params.id, function (recipe) {
            if (!recipe) return res.send("Recipe not found!")

            Recipe.chefSelectOptions(function(options) {

            return res.render("admin/recipes/edit", {recipe, chefOptions: options } )
            })
        })        
        
    },
    post (req, res) {
        Recipe.create(req.body, function() {
            return res.redirect("/admin/recipes")
        }) 
    }, 
    put (req, res) {

        Recipe.update(req.body, function() {
            return res.redirect(`/admin/recipes/${req.body.id}`)
        }) 

    }, 
    delete (req, res) {
        
        Recipe.delete(req.body.id, function() {
            return res.redirect("/admin/recipes/")
        })

    }
}