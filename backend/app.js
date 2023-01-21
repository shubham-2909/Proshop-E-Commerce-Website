import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/connect.js'
import productRoutes from './routes/productRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
const app = express()
dotenv.config()

connectDB()
app.get('/', (req, res) => {
  res.send('Home page')
})
app.use('/api/products', productRoutes)

app.use(notFound)
app.use(errorHandler)
const PORT = process.env.PORT || 5000
app.listen(5000, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on the port ${PORT}`
      .green.bold
  )
})
