const RecipeModel = require('../models/Recipe');

module.exports = {
  async index(req, res) {
    try {
      const recipes = (await RecipeModel.recipeInformations()).rows;
      return res.render('admin/recipes/recipes', { recipes });
    } catch (e) {
      return res.status(500).send(e.message);
    }
  },
  async create(req, res) {
    try {
      const chefOptions = (await RecipeModel.chefSelectOptions()).rows;
      return res.render('admin/recipes/create', { chefOptions });
    } catch (e) {
      return res.status(500).send(e.message);
    }
  },
  async show(req, res) {
    try {
      const { id } = req.params;
      const recipe = (await RecipeModel.find(id)).rows[0];
      if (!recipe) return res.redirect('/not-found');

      return res.render('admin/recipes/recipe', { recipe });
    } catch (e) {
      return res.status(500).send(e.message);
    }
  },
  async edit(req, res) {
    try {
      const { id } = req.params;
      const recipe = (await RecipeModel.find(id)).rows[0];
      if (!recipe) return res.redirect('/not-found');

      const chefOptions = (await RecipeModel.chefSelectOptions()).rows;

      return res.render('admin/recipes/edit', { recipe, chefOptions });
    } catch (e) {
      return res.status(500).send(e.message);
    }
  },
  async post(req, res) {
    try {
      await RecipeModel.create(req.body);
      return res.redirect('/admin/recipes');
    } catch (e) {
      return res.status(500).send(e.message);
    }
  },
  async put(req, res) {
    try {
      await RecipeModel.update(req.body);
      return res.redirect(`/admin/recipes/${req.body.id}`);
    } catch (e) {
      return res.status(500).send(e.message);
    }
  },
  async delete(req, res) {
    try {
      await RecipeModel.delete(req.body.id);
      return res.redirect('/admin/recipes/');
    } catch (e) {
      return res.status(500).send(e.message);
    }
  },
};
