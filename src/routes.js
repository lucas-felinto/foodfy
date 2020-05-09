const express = require('express')
const site = require('./app/controllers/site')
const recipes = require('./app/controllers/recipes')
const chefs = require('./app/controllers/chefs')
const routes = express.Router()

//site
routes.get("/", function (req, res) {
    return res.render("site/home")
})
routes.get("/site/about", site.about)
routes.get("/site/recipes", site.recipes)
routes.get("/site/recipe/:index", site.recipe)

//admin 

//recipes

routes.get("/admin", function (req, res) {
    return res.redirect("/admin/recipes")
})
routes.get("/admin/recipes", recipes.index)
routes.get("/admin/recipes/create", recipes.create)
routes.get("/admin/recipe/:index", recipes.show)
routes.get("/admin/recipes/:index/edit", recipes.edit)

routes.post("/admin/recipes", recipes.post)
routes.put("/admin/recipes/:index", recipes.put)
routes.delete("/admin/recipes/:index", recipes.delete)

//chefs

routes.get("/admin/chefs", chefs.index)
routes.get("/admin/chefs/create", chefs.create)
routes.post("/admin/chefs", chefs.post)

module.exports = routes