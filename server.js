// Requiring express and nunjucks
const express = require('express');
const nunjucks = require('nunjucks')
// server const by express
const server = express()    

// configurate to get styles, images and scripts
server.use(express.static('public'))

// setting the server - template egineer
server.set("view engine", "njk")
// configurates of nunjucks
nunjucks.configure("views", {
    express: server
})

//server routes
server.get("/", function (req, res) {
    return res.render("index")
})

server.get("/about", function (req, res) {
    return res.render("about")
})

server.get("/receipes", function (req, res) {
    return res.render("receipes")
})


// server host
server.listen(5000, function(){
    console.log("server is running")
})