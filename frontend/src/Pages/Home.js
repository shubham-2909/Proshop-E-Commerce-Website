import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Product from '../Components/Product'
import { useSelector } from 'react-redux'
const Home = () => {
  const { products } = useSelector((store) => store.products)
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => {
          return (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product {...product} />
            </Col>
          )
        })}
      </Row>
    </>
  )
}

export default Home
