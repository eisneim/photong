import koa from 'koa'
import middlewares from './middlewares'
import createAppStore from './store'
import regRoutes from './routes'
import setConfig from './config'
import fs from 'fs'

const debug = require('debug')('ph:server')

const app = new koa()
app.config = setConfig(app)

const { store, saveStore, saveStoreAsync } = createAppStore(app)
app.store = app.context.store = store
app.saveStore = app.context.saveStore = saveStore
app.saveStoreAsync = app.context.saveStoreAsync = saveStoreAsync

// register koa middlewares
middlewares(app)
regRoutes(app)

let uploadDir = app.config.rootPath + '/uploads'
if (!fs.existsSync(uploadDir)) {
  debug('uploads directory not exits, create new one')
  fs.mkdirSync(uploadDir)
}
/* eslint-disable no-console */
app.listen(app.config.port, () => {
  console.log('[32mserver started at port: %s[39m', app.config.port)
})

