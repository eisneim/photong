import React, { Component } from 'react'
// import FABButton from 'react-mdl/lib/FABButton'
import { Card, CardText, CardTitle, CardActions } from 'react-mdl/lib/Card'
// import Icon from 'react-mdl/lib/Icon'
import Button from 'react-mdl/lib/Button'
import TextField from 'react-mdl/lib/TextField'
import styles from './Login.scss'
import { connect } from 'react-redux'
import * as actions from '../actionCreators'

function mapStateToProps(state) {
  return {
    isAuthenticated: state.meta.isAuthenticated,
  }
}

@connect(mapStateToProps, dispatch => ({ dispatch }))
export default class Login extends Component {

  static contextTypes = {
    router: React.PropTypes.object,
  }

  onInput = (name) => e => {
    if (!this.__creadential)
      this.__creadential = {}
    this.__creadential[name] = e.target.value
  }

  onConfirm = () => {
    this.props.dispatch(actions.$login(this.__creadential))
  }

  authCheck() {
    const { isAuthenticated } = this.props
    if (isAuthenticated)
      this.context.router.push('/manage')
  }

  componentDidMount() {
    this.authCheck()
  }

  componentDidUpdate() {
    this.authCheck()
  }

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
              onChange={this.onInput('username')}
            />
            <TextField
              name="token"
              label="token"
              loating-label
              placeholder="token"
              onChange={this.onInput('token')}
            />

          </CardText>
          <CardActions data-layout="row">
            <span data-flex/>
            <Button primary onClick={this.onConfirm}>Confirm</Button>
          </CardActions>
        </Card>
      </div>
    )
  }

}