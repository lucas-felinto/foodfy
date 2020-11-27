const express = require('express');
const SiteController = require('./app/controllers/SiteController');
const RecipeController = require('./app/controllers/RecipeController');
const ChefController = require('./app/controllers/ChefController');

const routes = express.Router();

// site
routes.get('/', (req, res) => res.render('site/home'));
routes.get('/site/about', SiteController.about);
routes.get('/site/recipes', SiteController.recipes);
routes.get('/site/recipes/:id', SiteController.recipe);
routes.get('/site/chefs', SiteController.chefs);
routes.get('/site/chefs/:id', SiteController.chef);
routes.get('/site/search', SiteController.search);

// admin

// recipes
routes.get('/admin', (req, res) => res.redirect('/admin/recipes'));
routes.get('/admin/recipes', RecipeController.index);
routes.post('/admin/recipes', RecipeController.post);
routes.put('/admin/recipes', RecipeController.put);
routes.delete('/admin/recipes', RecipeController.delete);
routes.get('/admin/recipes/create', RecipeController.create);
routes.get('/admin/recipes/:id', RecipeController.show);
routes.get('/admin/recipes/:id/edit', RecipeController.edit);

// chefs
routes.get('/admin/chefs', ChefController.index);
routes.post('/admin/chefs', ChefController.post);
routes.put('/admin/chefs', ChefController.put);
routes.delete('/admin/chefs', ChefController.delete);
routes.get('/admin/chefs/create', ChefController.create);
routes.get('/admin/chefs/:id', ChefController.show);
routes.get('/admin/chefs/:id/edit', ChefController.edit);


// NOT FOUND
routes.get('/not-found', (req, res) => res.render('not-found'));

module.exports = routes;
