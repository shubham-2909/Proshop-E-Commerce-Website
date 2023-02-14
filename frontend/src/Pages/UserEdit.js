import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import FormContainer from '../Components/FormContainer'
import { getUserAdmin, updateUser } from '../features/admin/adminSlice'
const UserEdit = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const dispatch = useDispatch()
  const { isLoading3, success3, user, isLoading4, error4 } = useSelector(
    (store) => store.admin
  )
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  useEffect(() => {
    if (!user.name || user._id !== id || !id || success3) {
      dispatch(getUserAdmin(id))
    } else {
      setName(user.name)
      setEmail(user.email)
    }
  }, [user, dispatch, id, success3])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(updateUser({ _id: id, name, email }))
  }
  return (
    <>
      <Link to={`/admin/userlist`} className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {isLoading3 && <Loader />}
        {isLoading4 ? (
          <Loader />
        ) : error4 ? (
          <Message variant={`danger`}>{'Not authorized'}</Message>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter Name'
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
            <Button type='submit' variant='light' className='my-3'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default UserEdit
