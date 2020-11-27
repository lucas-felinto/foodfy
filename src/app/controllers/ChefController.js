const ChefModel = require('../models/Chef');
const RecipeModel = require('../models/Recipe');

module.exports = {
  async index(req, res) {
    try {
      const chefs = (await ChefModel.all()).rows;
      return res.render('admin/chefs/chefs', { chefs });
    } catch (e) {
      return res.status(500).send(e.message);
    }
  },
  create(req, res) {
    try {
      return res.render('admin/chefs/create');
    } catch (e) {
      return res.status(500).send(e.message);
    }
  },
  async post(req, res) {
    try {
      await ChefModel.create(req.body);
      return res.redirect('/admin/chefs');
    } catch (e) {
      return res.status(500).send(e.message);
    }
  },
  async show(req, res) {
    try {
      const { id } = req.params;
      const chef = (await ChefModel.find(id)).rows[0];
      if (!chef) return res.redirect('/not-found');

      const recipes = (await RecipeModel.recipeInformations()).rows;

      return res.render('admin/chefs/chef', { chef, recipes });
    } catch (e) {
      return res.status(500).send(e.message);
    }
  },
  async edit(req, res) {
    try {
      const { id } = req.params;
      const chef = (await ChefModel.find(id)).rows[0];
      if (!chef) return res.redirect('/not-found');

      return res.render('admin/chefs/edit', { chef });
    } catch (e) {
      return res.status(500).send(e.message);
    }
  },
  async put(req, res) {
    try {
      await ChefModel.update(req.body);
      return res.redirect(`/admin/chefs/${req.body.id}`);
    } catch (e) {
      return res.status(500).send(e.message);
    }
  },
  async delete(req, res) {
    try {
      await ChefModel.delete(req.body.id);
      return res.redirect('/admin/chefs');
    } catch (e) {
      return res.status(500).send(e.message);
    }
  },
};
