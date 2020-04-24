const fs = require('fs')
const data = require('../data')
const form = require('../data.json')

exports.index = function (req, res){
    const index = req.params.index
    return res.render("admin/index", {recipes: data,index})
}

exports.create = function (req, res){
    return res.render("admin/create")
}

exports.post = function (req, res){
    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] = ""){
        return res.send("Por favor, preencha todos os campos")
        } 
    }

    fs.writeFile("data.json", JSON.stringify(data, 2, null), function (err){
        if (err) return res.send("Erro")
    
        return res.redirect("/index")
    })

}