import 'dotenv/config'
import app from './app.js'
import mongoose from 'mongoose'

const PORT = process.env.PORT || 8080
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ems'

async function start() {
  try {
    await mongoose.connect(MONGO_URI)
    console.log('✅ Connected to MongoDB')

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`)
    })
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message)
    process.exit(1)
  }
}

start()