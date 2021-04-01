const express = require('express')
const ProductsService = require('../../services/products')
const validation = require('../../utils/middlewares/validationHandler')
const { productIdSchema, productTagSchema, createProductsSchema, updateProductSchema } = require('../../utils/schemas/products')
const { route } = require('../views/products')
const router = express.Router()

const productService = new ProductsService()

router.get('/', async function (req, res, next) {
  const { tags } = req.query
  try {
    const products = await productService.getProducts({ tags })
    res.status(200).json({
      data: products,
      message: 'products listed'
    })
  } catch (err) {
    next(err)
  }
})

router.get('/:productId', async function (req, res, next) {
  const { productId } = req.params
  try {
    const product = await productService.getProduct({ productId })
    res.status(200).json({
      data: product,
      message: 'product listed'
    })
  } catch (err) {
    next(err)
  }
})

router.post('/', validation(createProductsSchema), async function (req, res, next) {
  const { body: product } = req
  try {
    const createProduct = await productService.createProduct({ product })
    res.status(201).json({
      data: createProduct,
      message: 'product created'
    })
  } catch (err) {
    next(err)
  }
})

router.put('/:productId',
  validation({ productId: productIdSchema }, 'params'),
  validation(updateProductSchema),
  async function (req, res, next) {
    const { productId } = req.params
    try {
      const updateProduct = await productService.updateProduct({ productId })
      res.status(200).json({
        data: updateProduct,
        message: 'product updated'
      })
    } catch (err) {
      next(err)
    }
  })

router.delete('/:productId', async function (req, res, next) {
  const { productId } = req.params
  try {
    const productDelete = await productService.deleteProduct({ productId })
    res.status(200).json({
      data: productDelete,
      message: 'product deleted'
    })
  } catch (err) {
    next(err)
  }
})

router.patch('/')
module.exports = router
