import React from 'react'
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap'
import { BsFillCartFill } from 'react-icons/bs'
import { AiOutlineUser } from 'react-icons/ai'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../features/login/loginSlice'
import { removeAllCartItems } from '../features/cart/cartReducer'
import { cleanup } from '../features/register/registerSlice'
import { cleanupProfile } from '../features/profile/profileSlice'
import { cleanUsers } from '../features/admin/adminSlice'
const Header = () => {
  const dispatch = useDispatch()
  let { userInfo } = useSelector((store) => store.user)
  const { user } = useSelector((store) => store.profile)
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to={`/`}>
            <Navbar.Brand href='/'>Proshop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <LinkContainer to={`/cart`}>
                <Nav.Link>
                  <BsFillCartFill className='icon' />
                  Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown
                  title={user.name ? user.name : userInfo.name}
                  id='username'
                >
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Item
                    onClick={() => {
                      dispatch(removeAllCartItems())
                      dispatch(cleanup())
                      dispatch(cleanupProfile())
                      dispatch(cleanUsers())
                      dispatch(logOut())
                    }}
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to={`/login`}>
                  <Nav.Link>
                    <AiOutlineUser className='icon' />
                    Sign in
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to={`/admin/userlist`}>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to={`/admin/productlist`}>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to={`/admin/orderlist`}>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
