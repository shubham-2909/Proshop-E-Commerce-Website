import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc  fetch all products
// @route /api/products
// @access Public
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.status(200).json(products)
})

// @desc  fetch single product
// @route /api/products/:id
// @access Public
const getSingleProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.status(200).json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export { getAllProducts, getSingleProduct }
