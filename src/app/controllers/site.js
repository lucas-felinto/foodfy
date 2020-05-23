const Chef = require("../models/chef")
const Recipe = require('../models/recipe')

module.exports = {
    about (req, res) {
        return res.render("site/about")
    },
    async recipes (req, res) {
        let recipes = (await Recipe.recipeInformations()).rows
        return res.render("site/recipes", { recipes })
    },
    async recipe (req, res) {
        const { id } = req.params
        let recipe = (await Recipe.find(id)).rows[0]
        if (!recipe) return res.redirect("/not-found")
            
        return res.render("site/recipe", {recipe} )
    }, 
    async chefs (req, res) {
        let chefs = (await Chef.all()).rows
        return res.render("site/chefs", { chefs })
    },
    async chef (req, res) {
        const { id } = req.params 
        let chef = (await Chef.find(id)).rows[0] 
        if (!chef) return res.redirect("/not-found")

        // let recipes = (await Recipe.recipeInformations).rows
        // Arrumar a variável recipes

        return res.render("admin/chefs/chef", { chef })
    },
    search (req, res) {
        
        let { filter } = req.query

        Recipe.findBy(filter, function (recipes){

            return res.render("site/search", { filter, recipes })
                
        })
    }
}