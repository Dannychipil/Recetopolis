import mongoose from 'mongoose'

const MONGODB_URI = import.meta.env.MONGODB_URI

if (!MONGODB_URI) throw new Error('MONGODB_URI no definida en .env')

let isConnected = false

export async function connectDB() {
  if (isConnected) return

  await mongoose.connect(MONGODB_URI)
  isConnected = true
  console.log('MongoDB conectado')
}