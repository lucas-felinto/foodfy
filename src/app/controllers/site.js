const data = require('../../../data.json')

exports.about = function (req, res) {
    return res.render("site/about")
}

exports.recipes = function (req, res) {
    return res.render("site/recipes", { recipes: data.recipes })
}

exports.recipe = function (req, res){
    const index = req.params.index
    return res.render("site/recipe", {items: data.recipes, index})
}