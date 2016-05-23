import React, { Component } from 'react'
// import FABButton from 'react-mdl/lib/FABButton'
import { Card, CardText, CardTitle, CardActions } from 'react-mdl/lib/Card'
// import Icon from 'react-mdl/lib/Icon'
import Button from 'react-mdl/lib/Button'
import TextField from 'react-mdl/lib/TextField'
// import { connect } from 'react-redux'
import styles from './Login.scss'
import { connect } from 'react-redux'

function mapStateToProps(state) {
  return {
    isAuthenticated: state.meta.isAuthenticated,
  }
}

@connect(mapStateToProps, dispatch => ({ dispatch }))
export default class Login extends Component {

  render() {
    return (
      <div className={styles.login}>
        <Card shadow={4} className={styles.loginCard}>
          <CardTitle className={styles.loginHeader}>Welcome Back</CardTitle>
          <CardText className={styles.loginForm}>
            <TextField
              name="username"
              label="username"
              loating-label
              placeholder="username"
            />
            <TextField
              name="token"
              label="token"
              loating-label
              placeholder="token"
            />

          </CardText>
          <CardActions data-layout="row">
            <span data-flex/>
            <Button primary>Confirm</Button>
          </CardActions>
        </Card>
      </div>
    )
  }

}