const recipes = require('../data')

exports.about = function (req, res) {
    return res.render("site/about")
}

exports.recipes = function (req, res) {
    return res.render("site/recipes", { recipes })
}

exports.recipe = function (req, res){
    const index = req.params.index
    return res.render("site/recipe", {items: recipes, index})
}