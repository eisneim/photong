// import { Link } from 'react-router'
import React, { Component } from 'react'
// import Button from 'react-mdl/lib/Button'
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
            <p>Hi there! I'm a web developer, I love Parkour & Bodybuilding, photography, vfx and graphics design</p>
            <p>find my projects and portfolio at <a href="http://glexe.com" target="_blank">glexe.com</a></p>
            <p>shot me an email here: <em>eisneim1 at gmail.com</em></p>
          </CardText>
          <CardActions data-layout="row">
            <a className="mdl-button mdl-js-button" target="_blank" href="http://instagram.com/eisneim">Instagram</a>
            <a className="mdl-button mdl-js-button" target="_blank" href="https://vimeo.com/eisneim">Vimeo</a>
            <a className="mdl-button mdl-js-button" target="_blank" href="http://weibo.com/eisneim">微博</a>
            <a className="mdl-button mdl-js-button" target="_blank" href="https://www.zhihu.com/people/eisneim">知乎</a>
            <a className="mdl-button mdl-js-button" target="_blank" href="https://github.com/eisneim">github</a>
            <span data-flex/>
            <a className="mdl-button mdl-js-button mdl-button--primary" target="_blank" href="http://glexe.com">My Site</a>
          </CardActions>
        </Card>

      </div>
    )
  }
}
