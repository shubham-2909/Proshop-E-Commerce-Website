import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/connect.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import path from 'path'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
const app = express()
dotenv.config()

connectDB()
app.use(express.json())
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID)
})
// static paths
// app.use(express.static(path.join(__dirname, './frontend/build')))
// app.get('*', function (req, res) {
//   res.sendFile(path.join(__dirname, './frontend/build/index.html'))
// })
app.use(notFound)
app.use(errorHandler)
const PORT = process.env.PORT || 5000
app.listen(5000, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on the port ${PORT}`
      .green.bold
  )
})
