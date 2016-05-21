import 'SCSS/app.scss'
import 'material-design-lite/material.min.css'
import 'material-design-lite/material.js'
import { h, render } from 'preact'
import App from './App'



var $node
function renderApp(store) {
  $node = render(<App />, document.body, $node)
}

renderApp()
