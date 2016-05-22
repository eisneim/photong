import React, { Component } from 'react'
import { Layout, Header, Navigation, Drawer, Content } from 'react-mdl/lib/layout'
import { Link } from 'react-router'
import Button from 'react-mdl/lib/button'

export default class App extends Component {
  render() {
    return (
      <Layout fixedHeader>
        <Header title="PHOTONG" style={{ color: 'white' }}>
          <Navigation>
            <Link to="/about">about</Link>
            <Link to="/manage">manage</Link>
          </Navigation>
        </Header>
        <Drawer title="Hellow">
          <Navigation>
            <Link to="/about">about</Link>
            <Link to="/manage">manage</Link>
          </Navigation>
        </Drawer>
        <Content >
          <Button ripple accent={true} raised={true}>hellow!!!</Button>
          {this.props.children}
        </Content>
      </Layout>

    )
  }
}