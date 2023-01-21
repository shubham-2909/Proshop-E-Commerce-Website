import React from 'react'
import { Nav, Navbar, Container } from 'react-bootstrap'
import { BsFillCartFill } from 'react-icons/bs'
import { AiOutlineUser } from 'react-icons/ai'
import { LinkContainer } from 'react-router-bootstrap'
const Header = () => {
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
              <LinkContainer to={`/login`}>
                <Nav.Link>
                  <AiOutlineUser className='icon' />
                  Sign in
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
