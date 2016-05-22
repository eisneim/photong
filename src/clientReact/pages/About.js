// import { Link } from 'react-router'
import React, { Component } from 'react'
import Button from 'react-mdl/lib/Button'
import { Card, CardText, CardTitle, CardActions } from 'react-mdl/lib/Card'
import styles from './About.scss'

export default class About extends Component {
  render() {
    return (
      <div className={styles.root}>
        <Card shadow={8} className={styles.infoBox}>
          <CardTitle >
            About
          </CardTitle>
          <CardText>
            <p>Hello, this is some about me text</p>
          </CardText>
          <CardActions data-layout="row">
            <a className="mdl-button mdl-js-button" target="_blank" href="http://glexe.com">500px</a>
            <span data-flex/>
            <Button ripple primary>Click Me</Button>
          </CardActions>
        </Card>

      </div>
    )
  }
}
