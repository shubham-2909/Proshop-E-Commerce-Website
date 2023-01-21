import mongoose from 'mongoose'
import colors from 'colors'
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log(
      `Mongo DB Connected : ${connect.connection.host}`.cyan.underline
    )
  } catch (error) {
    console.log(`Error : ${error}`.red.underline)
    process.exit(1)
  }
}
export default connectDB
