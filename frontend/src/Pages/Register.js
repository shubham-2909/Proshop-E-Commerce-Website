import React, { useEffect, useState } from 'react'
import FormContainer from '../Components/FormContainer'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import { registerUser } from '../features/register/registerSlice'
import { loginUser } from '../features/login/loginSlice'
const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { userInfo, error, isLoading } = useSelector((store) => store.register)
  const [searchParams, setSearchParams] = useSearchParams('')
  const redirect = searchParams.toString().split('=')[1]
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  useEffect(() => {
    if (userInfo) {
      dispatch(loginUser({ email, password }))
      if (redirect) {
        navigate('/' + redirect)
      } else {
        navigate('/')
      }
    }
  }, [userInfo])
  const handleSublit = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords must be same')
    } else {
      dispatch(registerUser({ name, email, password }))
    }
  }
  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {isLoading && <Loader />}
      <Form onSubmit={handleSublit}>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password Address</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='light' className='mt-3'>
          Register
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Have an Account?{' '}
          <Link
            to={redirect ? `/login?redirect=${redirect}` : '/login'}
            className='text-decoration-none'
          >
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default Register
