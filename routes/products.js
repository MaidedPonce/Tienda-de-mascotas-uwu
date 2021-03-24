const express = require('express')
const productsMocks = require('../utils/mocks/products')
const router = express.Router()

router.get('/', function(req, res){
    // renderizar al template, lo que está entre comillas es el contenido y lo que esta entre llaves es el keyword del contenido
    res.render('products', { productsMocks })
})

module.exports = router
