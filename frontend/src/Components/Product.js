import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'

const Product = ({
  _id,
  name,
  image,
  description,
  brand,
  category,
  price,
  countInStock,
  rating,
  numReviews,
}) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${_id}`}>
        <Card.Img src={image} variant='top' />
      </Link>
      <Card.Body>
        <Link to={`/product/${_id}`} className='text-decoration-none'>
          <Card.Title as={`div`}>
            <strong>{name}</strong>
          </Card.Title>
          <Card.Text as='div'>
            <div className='my-3'>
              <Rating value={rating} text={`${numReviews} Reviews`} />
            </div>
          </Card.Text>
          <Card.Text as='h3'>${price}</Card.Text>
        </Link>
      </Card.Body>
    </Card>
  )
}

export default Product
