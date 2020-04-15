const express = require('express');
const nunjucks = require('nunjucks')

const recipes = require('./data')
const server = express()

server.use(express.static('public'))

// setting the server - template egineer
server.set("view engine", "njk")

// nunjucks configurate
nunjucks.configure("views", {
    express: server,
    noCache: true
})

//server routes
server.get("/", function (req, res) {
    return res.render("index")
})

server.get("/about", function (req, res) {
    return res.render("about")
})

server.get("/receipes", function (req, res) {
    return res.render("receipes", { recipes })
})

server.get("/recipes/:index", function (req, res){
    const index = req.params.index
    return res.render("recipes", {items: recipes, index})
})

// server local
server.listen(5000, function(){
    console.log("server is running")
})