const fs = require('fs')
const data = require('../../../data.json')

module.exports = {
    index (req, res) {
        const index = req.params.index
        return res.render("admin/recipes", {recipes: data.recipes, index})
    },
    create (req, res) {
        return res.render("admin/create")
    },
    show (req, res) {
        const index = req.params.index
        const foundRecipe = data.recipes[index]

        if (!foundRecipe) return res.send('recipe not found')

        return res.render("admin/recipe", {items: data.recipes, index})
    },
    edit (req, res) {
        const index = req.params.index

        return res.render("admin/edit", {recipe: data.recipes, index})
    },
    post (req, res) {
        data.recipes.push(req.body)

        fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
            if (err) return res.send("Erro")
            
            return res.redirect("/admin/recipes")
        })
    }, put (req, res) {
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
    }, delete (req, res) {
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