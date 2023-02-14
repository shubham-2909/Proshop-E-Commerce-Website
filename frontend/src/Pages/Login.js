import React, { useEffect, useState } from 'react'
import FormContainer from '../Components/FormContainer'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import Loader from '../Components/Loader'
import { loginUser } from '../features/login/loginSlice'
import Message from '../Components/Message'
const LogIn = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [searchParams] = useSearchParams('')
  const dispatch = useDispatch()
  const { userInfo, isLoading, error } = useSelector((store) => store.user)
  const redirect = searchParams ? searchParams.toString().split('=')[1] : ''
  useEffect(() => {
    if (userInfo) {
      if (redirect) {
        navigate('/' + redirect)
      } else {
        navigate('/')
      }
    }
  }, [userInfo])

  const handleSubmit = (e) => {
    e.preventDefault()
    const obj = { email, password }
    dispatch(loginUser(obj))
  }
  return (
    <FormContainer>
      <h1>Sign in</h1>
      {error !== '' && <Message variant='danger'>{error}</Message>}
      {isLoading && <Loader />}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            value={email}
            placeholder='Enter email'
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            value={password}
            placeholder='Enter Password'
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='light' className='mt-3'>
          Sign In
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          New Customer?{' '}
          <Link
            to={redirect ? `/register?redirect=${redirect}` : '/register'}
            className='text-decoration-none'
          >
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LogIn
