
import { h, Component } from 'preact'
import { Router } from 'preact-router'
import { Layout, Button, Icon } from 'preact-mdl'

import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Profile from './components/PageProfile'
import Home from './components/PageHome'
import About from './components/PageAbout'


export default class App extends Component {
  fab() {
    console.log('You clicked New!')
  }

  render() {
    return (
      <div id="app">
        <Layout fixed-header>
          <Header />
          <Sidebar />
          <Button id="fab" fab colored onClick={this.fab}><Icon icon="create" /></Button>
          <Layout.Content>
            <Router>
              <Home path="/" default />
              <About path="/about"/>
              <Profile path="/profile" id="me" />
              <Profile path="/profile/:id" />
            </Router>
          </Layout.Content>

        </Layout>
      </div>
    )
  }

}
