import Footer from './Components/Footer'
import Header from './Components/Header'
import { Container } from 'react-bootstrap'
import Home from './Pages/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SingleProduct from './Pages/SingleProduct'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getProducts } from './features/products/productReducer'
import Loader from './Components/Loader'
import Cart from './Pages/Cart'
import Login from './Pages/Login'
import Register from './Pages/Register'
import ProfileScreen from './Pages/ProfileScreen'
import Shipping from './Pages/Shipping'
import Payment from './Pages/Payment'
import OrderScreen from './Pages/OrderScreen'
import PayOrder from './Pages/PayOrder'
import UserList from './Pages/UserList'
import UserEdit from './Pages/UserEdit'
const App = () => {
  const dispatch = useDispatch()
  const { isLoading } = useSelector((store) => store.products)
  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  if (isLoading) {
    return <Loader />
  }
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='product/:id' element={<SingleProduct />} />
            <Route path='cart' element={<Cart />} />
            <Route path='/cart/:id' element={<Cart />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/profile' element={<ProfileScreen />} />
            <Route path='/shipping' element={<Shipping />} />
            <Route path='/payment' element={<Payment />} />
            <Route path='/placeorder' element={<OrderScreen />} />
            <Route path='/order/:id' element={<PayOrder />} />
            <Route path='/admin/userlist' element={<UserList />} />
            <Route path='/admin/user/:id/edit' element={<UserEdit />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
