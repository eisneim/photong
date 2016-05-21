import koa from 'koa'
import middlewares from './middlewares'
import createAppStore from './store'
import regRoutes from './routes'
import setConfig from './config'

const debug = require('debug')('ph:server')

const app = new koa()
const { store, saveStore } = createAppStore(app)
app.store = app.context.store = store
app.saveStore = app.context.saveStore = saveStore

app.config = setConfig(app)

// register koa middlewares
middlewares(app)
regRoutes(app)

app.listen(3000, () => {
  debug('[32mserver started at port: %s[39m', 3000)
})

