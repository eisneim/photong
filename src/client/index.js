import 'SCSS/app.scss'
import 'material-design-lite/material.min.css'
import 'material-design-lite/material.js'
import { h, render } from 'preact'
import App from './App'
import makeStore from './store'

var appCtx = {}
appCtx.store = makeStore(appCtx)

var $node
function renderApp() {
  $node = render(<App store={appCtx.store}/>, document.body, $node)
}

renderApp(appCtx.store)

appCtx.store.subscribe(renderApp)

window.appCtx = appCtx