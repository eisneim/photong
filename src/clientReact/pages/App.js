import React, { Component } from 'react'
import { Layout, Header, Navigation, Drawer, Content } from 'react-mdl/lib/layout'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import * as actions from '../actionCreators'

function mapStateToProps(state) {
  return {
    isAuthenticated: state.meta.isAuthenticated,
  }
}

@connect(mapStateToProps, dispatch => ({ dispatch }))
export default class App extends Component {

  static contextTypes = {
    router: React.PropTypes.object,
  }

  onLogout = e => {
    e.preventDefault()

    this.props.dispatch(actions.$logout())
    if (this.props.location.pathname === 'manage')
      this.context.router.push('/')
  }

  render() {
    const { isAuthenticated } = this.props

    return (
      <Layout fixedHeader>
        <Header title="PHOTONG" style={{ color: 'white' }}>
          <Navigation>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
          </Navigation>
        </Header>
        <Drawer title="Hellow">
          <Navigation>
            <Link to="/about">about</Link>
            { isAuthenticated ? <Link to="/manage">Manage</Link> : null }
            {
              isAuthenticated ? <a onClick={this.onLogout} href="">Logout</a> :
              <Link to="/login">Login</Link>
            }
          </Navigation>
        </Drawer>
        <Content >
          {this.props.children}
        </Content>
      </Layout>

    )
  }
}