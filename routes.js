const express = require('express')
const site = require('./controllers/site')
const recipes = require('./controllers/recipes')
const routes = express.Router()

//site
routes.get("/", function (req, res) {
    return res.render("site/home")
})
routes.get("/about", site.about)
routes.get("/recipes", site.recipes)
routes.get("/recipe/:index", site.recipe)

//admin - recipes
routes.get("/index", recipes.index)
routes.get("/create", recipes.create)

module.exports = routes