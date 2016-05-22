import { h, Component } from 'preact'
import { Card, Button } from 'preact-mdl'
import styles from './PageAbout.scss'

export default class About extends Component {

  render() {
    return (
      <div class={styles.root}>
        <Card shadow="8" class={styles.infoBox}>
          <Card.Title class="graphic">
            <Card.TitleText>About</Card.TitleText>
          </Card.Title>
          <Card.Text>
            <p>Hello, this is some about me text</p>
          </Card.Text>
          <Card.Actions data-layout="row">
            <a class="mdl-button mdl-js-button" target="_blank" href="http://glexe.com">500px</a>
            <span data-flex/>
            <Button primary>Click Me</Button>
          </Card.Actions>
        </Card>

      </div>
    )
  }
}