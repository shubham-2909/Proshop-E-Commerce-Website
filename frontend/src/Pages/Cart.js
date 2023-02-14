import React, { useEffect } from 'react'
import { Link, useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCartItems, removeCartItem } from '../features/cart/cartReducer'
import { Row, Col, Form, Image, ListGroup, Button, Card } from 'react-bootstrap'
import Message from '../Components/Message'
import { FaTrash } from 'react-icons/fa'
const Cart = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const [searchParams] = useSearchParams('')
  const { cartItems } = useSelector((store) => store.cart)
  const navigate = useNavigate()
  let qty = Number(searchParams.toString().split('=')[1])
  useEffect(() => {
    if (id) {
      dispatch(getCartItems({ id, qty }))
    }
  }, [id, dispatch, qty])
  const checkoutHandler = () => {
    navigate(`/login?redirect=shipping`)
  }
  if (cartItems && cartItems.length < 1) {
    return (
      <section className='text-center d-flex flex-column align-items-center justify-content-center mt-5'>
        <Message>Your cart is Empty</Message>
        <Link to={`/`} className='btn btn-light mx-4'>
          Go Back
        </Link>
      </section>
    )
  } else
    return (
      <Row>
        <Col md={8}>
          <h1>Your Shopping Cart</h1>
          <ListGroup variant='flush'>
            {cartItems.map((item) => {
              const { product, qty } = item
              return (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={3}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        fluid
                        rounded
                        className='mb-2'
                      />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as='select'
                        value={qty}
                        onChange={(e) => {
                          const id = product
                          const qty = Number(e.target.value)
                          dispatch(getCartItems({ id, qty }))
                        }}
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={1}>
                      <button
                        type='button'
                        className='btn btn-light btn-sm remove'
                        onClick={() => dispatch(removeCartItem(product))}
                      >
                        <FaTrash />
                        Remove Item
                      </button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )
            })}
          </ListGroup>
        </Col>
        <div className='col-md-4 cont mt-5'>
          <Card className='mt-3'>
            <ListGroup variant='flush' className='m-2'>
              <ListGroup.Item>
                <h3>
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  )
                </h3>
                $
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                  variant='light'
                >
                  Proceed To Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </div>
      </Row>
    )
}

export default Cart
