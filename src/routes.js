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
routes.get("/site/recipes/:id", site.recipe)
routes.get("/site/chefs", site.chefs)
routes.get("/site/chefs/:id", site.chef)
routes.get("/site/search", site.search)

//admin 

//recipes

routes.post("/admin/recipes", recipes.post)
routes.put("/admin/recipes", recipes.put)
routes.delete("/admin/recipes", recipes.delete)

routes.get("/admin", function (req, res) {
    return res.redirect("/admin/recipes")
})
routes.get("/admin/recipes", recipes.index)
routes.get("/admin/recipes/create", recipes.create)
routes.get("/admin/recipes/:id", recipes.show)
routes.get("/admin/recipes/:id/edit", recipes.edit)


//chefs

routes.post("/admin/chefs", chefs.post)
routes.put("/admin/chefs", chefs.put)
routes.delete("/admin/chefs", chefs.delete)

routes.get("/admin/chefs", chefs.index)
routes.get("/admin/chefs/create", chefs.create)
routes.get("/admin/chefs/:id", chefs.show)
routes.get("/admin/chefs/:id/edit", chefs.edit)

//NOT FOUND

routes.get("/not-found", function (req, res){
    return res.render("not-found")
})

module.exports = routes