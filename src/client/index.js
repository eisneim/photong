import 'SCSS/app.scss'
import 'material-design-lite/material.min.css'
import 'material-design-lite/material.js'
import { h, render } from 'preact'
import App from './App'
import makeStore from './store'
window.phdebug = require('debug')
const debug = phdebug('ph:index')

var appCtx = {}
appCtx.store = makeStore(appCtx)

var $node, $container = document.getElementById('app')
function renderApp() {
  debug('stateChange')
  $node = render(<App store={appCtx.store}/>, $container, $node)
}

renderApp(appCtx.store)

appCtx.store.subscribe(renderApp)

window.appCtx = appCtx