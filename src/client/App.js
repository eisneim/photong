
import { h, Component } from 'preact'
import { Router } from 'preact-router'
import { Layout, Button, Icon } from 'preact-mdl'
import * as actions from './actionCreators.js'

import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Profile from './components/PageProfile'
import Home from './components/PageHome'
import About from './components/PageAbout'
import Album from './components/PageAlbum'
import Manage from './components/PageManage'

const debug = require('debug')('ph:App')

export default class App extends Component {
  constructor(props) {
    super()
    this.context = {
      store: props.store,
      actions,
    }
  }

  fab() {
    console.log('You clicked New!')
  }

  render({ store }) {
    const state = store.getState()
    const currentPath = window ? window.location.pathname : Math.random()
    debug('currentPath', currentPath)
    return (
      <div id="app">
        <Layout fixed-header>
          <Header />
          <Sidebar />
          <Button id="fab" fab colored onClick={this.fab}><Icon icon="create" /></Button>
          <Layout.Content key={currentPath}>
            <Router >
              <Home albums={state.albums} albumsLoaded={state.meta.albumsLoaded} path="/" default />
              <About path="/about"/>
              <Album albums={state.albums} path="/album/:albumId" />
              <Manage path="/manage" />

              <Profile path="/profile" id="me" />
              <Profile path="/profile/:id" />
            </Router>
          </Layout.Content>

        </Layout>
      </div>
    )
  }

}
