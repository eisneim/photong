import React, { Component } from 'react'
// import FABButton from 'react-mdl/lib/FABButton'
// import { Card, CardText, CardTitle, CardActions } from 'react-mdl/lib/Card'
// import Icon from 'react-mdl/lib/Icon'
import Button from 'react-mdl/lib/Button'
// import TextField from 'react-mdl/lib/TextField'
// import { connect } from 'react-redux'
import styles from './Manage.scss'

import { connect } from 'react-redux'

function mapStateToProps(state) {
  return {
    meta: state.meta,
    albums: state.albums,
  }
}

@connect(mapStateToProps, dispatch => ({ dispatch }))
export default class Manage extends Component {

  render() {
    return (
      <div className={styles.root}>
        <Button> Manage page</Button>
      </div>
    )
  }

}