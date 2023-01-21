import Footer from './Components/Footer'
import Header from './Components/Header'
import { Container } from 'react-bootstrap'
import Home from './Pages/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SingleProduct from './Pages/SingleProduct'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/product/:id' element={<SingleProduct />}></Route>
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
