import 'SCSS/app.scss'
import { render } from 'react-dom'
import Routes from './Routes'
import makeStore from './store'
import { $get } from './utils/util.request'

window.phdebug = require('debug')
const debug = phdebug('ph:index')

var $container = document.getElementById('app')

var appCtx = {}

function init(initialData) {
  appCtx.store = makeStore(appCtx, initialData)

  render(Routes(appCtx), $container)
}

$get('/albums').then(result => init(result.data))


// debug only
window.appCtx = appCtx