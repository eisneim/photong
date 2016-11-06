import React, { Component } from 'react'
import { Layout, Header, Navigation, Drawer, Content } from 'react-mdl/lib/layout'
import FABButton from 'react-mdl/lib/FABButton'
import Icon from 'react-mdl/lib/Icon'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import * as actions from '../actionCreators'

function mapStateToProps(state) {
  return {
    isAuthenticated: state.meta.isAuthenticated,
    siteTitle: state.config.siteTitle,
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
    const { isAuthenticated, siteTitle } = this.props

    return (
      <Layout fixedHeader>
        <Header title={siteTitle || 'PHOTONG'} style={{ color: 'white' }}>
          <Navigation>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
          </Navigation>
        </Header>
        <Drawer title="Navigation">
          <Navigation>
            <Link to="/about">about</Link>
            { isAuthenticated ? <Link to="/manage/upload">Manage</Link> : null }
            {
              isAuthenticated ? <a onClick={this.onLogout} href="">Logout</a> :
              <Link to="/login">Login</Link>
            }
          </Navigation>
        </Drawer>
        <Content >
          {this.props.children}
        </Content>
        {
          isAuthenticated ?
            <FABButton onClick={()=> this.context.router.push('/manage/upload')}
              colored ripple
              style={{ position: 'fixed', 'right': '20px', 'bottom': '20px', zIndex: 99 }}>
              <Icon name="add"/>
            </FABButton>
          : null
        }
      </Layout>
    )
  }
}