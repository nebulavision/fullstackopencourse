import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import blogsRouter from './controller/blogsV1.js'
import logger from './config/logger.js'
import { MONGODB_URI } from './config/dotenv.js'

const app = express()

mongoose.set('strictQuery', false)

logger.info('Connecting to', MONGODB_URI)

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    logger.info('Connected to MongoDB')
  })
  .catch((error) => {
    logger.error('Error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())

app.use('/api', blogsRouter)

export default app
