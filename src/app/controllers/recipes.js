const fs = require('fs')
const Recipe = require('../models/recipe')

module.exports = {
    async index (req, res) {
        let recipes = (await Recipe.recipeInformations()).rows
        return res.render("admin/recipes/recipes", { recipes })
    },
    async create (req, res) {
        let chefOptions = (await Recipe.chefSelectOptions()).rows
        return res.render("admin/recipes/create", { chefOptions })
    },
    async show (req, res) {
        const { id } = req.params
        let recipe = (await Recipe.find(id)).rows[0]
        if (!recipe) return res.redirect("/not-found")

        return res.render("admin/recipes/recipe", {recipe} )
    },
    async edit (req, res) {
        const { id } = req.params 
        let recipe = (await Recipe.find(id)).rows[0] 
        if (!recipe) return res.redirect("/not-found")

        let chefOptions = (await Recipe.chefSelectOptions()).rows

        return res.render("admin/recipes/edit", {recipe, chefOptions } )
    },
    async post (req, res) {
        await Recipe.create(req.body)
        return res.redirect("/admin/recipes")
    }, 
    async put (req, res) {
        await Recipe.update(req.body)
        return res.redirect(`/admin/recipes/${req.body.id}`)
    }, 
    async delete (req, res) {
        await Recipe.delete(req.body.id)
        return res.redirect("/admin/recipes/")
    }
}