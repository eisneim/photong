// import { Link } from 'react-router'
import React, { Component } from 'react'
// import Button from 'react-mdl/lib/Button'
import { Card, CardText, CardTitle, CardActions } from 'react-mdl/lib/Card'
import styles from './About.scss'
import { connect } from 'react-redux'

function mapStateToProps(state) {
  return {
    config: state.config,
  }
}

@connect(mapStateToProps, dispatch => ({ dispatch }))
export default class About extends Component {
  render() {
    const { aboutHTML, aboutLinks, mySiteLink } = this.props.config

    return (
      <div className={styles.root}>
        <Card shadow={8} className={styles.infoBox}>
          <CardTitle >
            About
          </CardTitle>
          <CardText>
            <div dangerouslySetInnerHTML={{ __html: aboutHTML }}/>
          </CardText>
          <CardActions data-layout="row">
            {
              aboutLinks.map((ll, idx) => <a key={idx} className="mdl-button mdl-js-button" target="_blank" href={ll.link}>{ll.text}</a>)
            }
            <span data-flex/>
            <a className="mdl-button mdl-js-button mdl-button--primary" target="_blank" href={mySiteLink.link}>{mySiteLink.text}</a>
          </CardActions>
        </Card>

      </div>
    )
  }
}
