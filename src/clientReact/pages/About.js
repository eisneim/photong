import { Link } from 'react-router'
import React, { Component } from 'react'

export default class About extends Component {
  render() {
    return (
      <div>
        this is about page
        <Link to="/">home</Link>
      </div>
    )
  }
}
