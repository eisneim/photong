
import { h, Component } from 'preact'
import { Router, Link, route } from 'preact-router'
import { Layout, Navigation, Card, Button, Icon, TextField } from 'preact-mdl'

export default class App extends Component {
  fab() {
    console.log('You clicked New!')
  }

  render() {
    return (
      <div id="app">
        <Layout fixed-header fixed-drawer>
          <Header />
          <Sidebar />
          <Button id="fab" fab colored onClick={this.fab}><Icon icon="create" /></Button>
          <Layout.Content>
            <Router>
              <Home path="/" default />
              <Profile path="/profile" id="me" />
              <Profile path="/profile/:id" />
            </Router>
          </Layout.Content>

        </Layout>
      </div>
    )
  }

}

const Header = ({ onSearch }) => (
  <Layout.Header>
    <Layout.HeaderRow>
      <Layout.Title>
        <Link href="/">Example</Link>
      </Layout.Title>
      <Layout.Spacer />
      <TextField
        placeholder="Search"
        type="search"
        onSearch={onSearch}
        style="background-color:#FFF; color:#000; padding:10px;"
      />
    </Layout.HeaderRow>
  </Layout.Header>
)


class Sidebar extends Component {
  shouldComponentUpdate() {
    return false
  }
  hide() {
    this.base.classList.remove('is-visible')
  }
  render() {
    return (
      <Layout.Drawer onClick={this.hide}>
        <Layout.Title>Example App</Layout.Title>
        <Navigation>
          <Navigation.Link href="/" route={route}>Home</Navigation.Link>
          <Navigation.Link href="/profile" route={route}>Profile</Navigation.Link>
          <Navigation.Link href="/profile/john" route={route}>John</Navigation.Link>
        </Navigation>
      </Layout.Drawer>
    )
  }
}


class Home extends Component {
  shouldComponentUpdate() {
    return false
  }
  render() {
    return (
      <Card shadow="4">
        <Card.Title class="graphic">
          <Card.TitleText>Home</Card.TitleText>
        </Card.Title>
        <Card.Text style="text-align:center">
          <Icon icon="person" style="display:block; font-size:100px;" />
          <p>Nothing to see here.</p>
        </Card.Text>
        <Card.Actions style="text-align:right">
          <Button primary>Click Me</Button>
        </Card.Actions>
      </Card>
    )
  }
}


class Profile extends Component {
  shouldComponentUpdate({ id }) {
    return id !== this.props.id
  }
  render({ id }) {
    return (
      <div class="profile">
        <Card shadow="3" class="wide">
          <Card.Title class="graphic">
            <Card.TitleText>User: { id }</Card.TitleText>
          </Card.Title>

          <Card.Text>
            <p>This is a profile for the user {id}.</p>
          </Card.Text>
        </Card>
      </div>
    )
  }
}
