const express = require('express')
const ProductsService = require('../../services/products')
const router = express.Router()

const productService = new ProductsService()

router.get('/', async function (req, res, next) {
  const { tags } = req.query
  try {
    // throw new Error('This is an error')
    const products = await productService.getProducts({ tags })
    res.render('products', { products })
  } catch (err) {
    next(err)
  }
  // renderizar al template, lo que está entre comillas es el contenido y lo que esta entre llaves es el keyword del contenido
})

module.exports = router
