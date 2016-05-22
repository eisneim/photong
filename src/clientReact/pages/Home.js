import { Link } from 'react-router'
import React, { Component } from 'react'

export default class Home extends Component {
  render() {
    return (
      <div>
        <Link to="/about">about</Link>
        <Link to="/manage">manage</Link>
      </div>
    )
  }
}
