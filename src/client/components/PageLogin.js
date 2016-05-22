import { h, Component } from 'preact'
import { Card, Button, TextField } from 'preact-mdl'
// import { Link } from 'preact-router'
import styles from './PageLogin.scss'

export default class Login extends Component {

  render() {
    return (
      <div class={styles.login}>
        <Card shadow="2" class={styles.loginCard}>
          <Card.Title class={styles.loginHeader}>
            <Card.TitleText>Welcome Back</Card.TitleText>
          </Card.Title>
          <Card.Text class={styles.loginForm}>
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

          </Card.Text>
          <Card.Actions layout="row">
            <span flex/>
            <Button primary>Confirm</Button>
          </Card.Actions>
        </Card>
      </div>
    )
  }

}