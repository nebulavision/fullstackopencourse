import os from 'os'
import app from './app.js'
import { PORT } from './config/dotenv.js'
import logger from './config/logger.js'

const interfaces = os.networkInterfaces()
let localIp = 'localhost'

// Buscar la IP de la red local
for (const name of Object.keys(interfaces)) {
  for (const iface of interfaces[name]) {
    if (iface.family === 'IPv4' && !iface.internal) {
      localIp = iface.address
      break
    }
  }
}

app.listen(PORT, () => {
  logger.info('Server runing on:')
  logger.info(`- Local: http://localhost:${PORT}`)
  logger.info(`- Network: http://${localIp}:${PORT}`)
})
