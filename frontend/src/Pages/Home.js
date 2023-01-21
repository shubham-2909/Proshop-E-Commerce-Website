import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Product from '../Components/Product'
import axios from 'axios'
const Home = () => {
  const [products, setProducts] = useState([])

  React.useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products')
      setProducts(data)
    }
    fetchProducts()
  }, [])
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