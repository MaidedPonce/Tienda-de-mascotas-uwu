const express = require('express')
const productsMocks = require('../../utils/mocks/products')
const router = express.Router()

router.get('/', function (req, res) {
    const { query } = req.query
    res.status(200).json({
        data: productsMocks,
        message: 'products listed'
    })
})

router.get('/:productId', function(req, res){
    const { productId } = req.params
    res.status(200).json({
        data: productsMocks,
        message: 'product listed'
    })
})

router.post('/', function(req, res){

    res.status(201).json({
        data: productsMocks[0],
        message: 'product created'
    })
})

router.put('/:productId', function(req, res){

    res.status(201).json({
        data: productsMocks,
        message: 'product created'
    })
})

router.delete('/', function (req, res){

    res.status(201).json({
        data: productsMocks[0],
        message: 'product deleted'
    })
})

module.exports = router
