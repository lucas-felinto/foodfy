const ChefModel = require('../models/chef');
const RecipeModel = require('../models/recipe');

module.exports = {
  async about(req, res) {
    try {
      return res.render('site/about');
    } catch (e) {
      return res.status(500).send(e.message);
    }
  },
  async recipes(req, res) {
    try {
      const recipes = (await RecipeModel.recipeInformations()).rows;
      return res.render('site/recipes', { recipes });
    } catch (e) {
      return res.status(500).send(e.message);
    }
  },
  async recipe(req, res) {
    try {
      const { id } = req.params;
      const recipe = (await RecipeModel.find(id)).rows[0];
      if (!recipe) return res.redirect('/not-found');

      return res.render('site/recipe', { recipe });
    } catch (e) {
      return res.status(500).send(e.message);
    }
  },
  async chefs(req, res) {
    try {
      const chefs = (await ChefModel.all()).rows;
      return res.render('site/chefs', { chefs });
    } catch (e) {
      return res.status(500).send(e.message);
    }
  },
  async chef(req, res) {
    try {
      const { id } = req.params;
      const chef = (await ChefModel.find(id)).rows[0];
      if (!chef) return res.redirect('/not-found');

      // let recipes = (await Recipe.recipeInformations).rows
      // Arrumar a variável recipes

      return res.render('admin/chefs/chef', { chef });
    } catch (e) {
      return res.status(500).send(e.message);
    }
  },
  search(req, res) {
    try {
      const { filter } = req.query;
      RecipeModel.findBy(filter, (recipes) => res.render('site/search', { filter, recipes }));
    } catch (e) {
      res.status(500).send(e.message);
    }
  },
};
