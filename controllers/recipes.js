const fs = require('fs')
const data = require('../data')

exports.index = function (req, res){
    const index = req.params.index
    return res.render("admin/index", {recipes: data,index})
}

exports.create = function (req, res){
    return res.render("admin/create")
}