const data = require('../../../data.json')

module.exports = {
    about (req, res) {
        return res.render("site/about")
    },
    recipes (req, res) {
        return res.render("site/recipes", { recipes: data.recipes })
    },
    recipe (req, res) {
        const index = req.params.index
        return res.render("site/recipe", {items: data.recipes, index})
    }
}