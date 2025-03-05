/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import express from 'express'
import exitHook from 'async-exit-hook'
import { env } from './config/environment.js'
import { CONNECT_DB, GET_DB, CLOSE_DB } from './config/mongodb.js'

import { APIs_V1 } from './routes/v1/index.js'

const START_SERVER = () => {
  const app = express()

  app.use(express.json())
  app.use('/v1', APIs_V1)

  app.get('/', async (req, res) => {
    // Test Absolute import mapOrder
    console.log(await GET_DB().listCollections().toArray())
    // console.log('Hello')
    res.end('<h1>Hello World!</h1><hr>')
  })

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(
      `Hello ${env.AUTHOR},backend server is running at ${env.APP_HOST}:${env.APP_PORT}/`
    )
  })

  exitHook(() => {
    CLOSE_DB()
    // console.log('Closed DB')
  })
}
;(async () => {
  try {
    console.log('Connecting to MongoDB')
    await CONNECT_DB()
    console.log('Connected to MongoDB')
    START_SERVER()
  } catch (error) {
    console.log(error)
    process.exit(0)
  }
})()
