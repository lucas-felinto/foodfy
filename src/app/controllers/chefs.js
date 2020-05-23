const Chef = require("../models/chef")
const Recipe = require('../models/recipe')

module.exports = {
    async index (req, res) {
        let chefs = (await Chef.all()).rows
        return res.render("admin/chefs/chefs", { chefs })
    },
    create (req, res) {
        return res.render("admin/chefs/create")
    }, 
    async post (req, res) {
        await Chef.create(req.body)
        return res.redirect("/admin/chefs")
    },
    async show (req, res) {
        const { id } = req.params 
        let chef = (await Chef.find(id)).rows[0] 
        if (!chef) return res.redirect("/not-found")

        let recipes = (await Recipe.recipeInformations()).rows

        return res.render("admin/chefs/chef", { chef, recipes })
    },
    async edit (req, res) {
        const { id } = req.params 
        let chef = (await Chef.find(id)).rows[0] 
        if (!chef) return res.redirect("/not-found")

        return res.render("admin/chefs/edit", { chef })
    },
    async put (req, res) {
        await Chef.update(req.body)
        return res.redirect(`/admin/chefs/${req.body.id}`)
    },
    async delete (req, res) {
        await Chef.delete(req.body.id)
        return res.redirect("/admin/chefs")
    }
}