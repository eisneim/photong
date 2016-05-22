
import { h, Component } from 'preact'
import { Card } from 'preact-mdl'

export default class Profile extends Component {
  shouldComponentUpdate({ id }) {
    return id !== this.props.id
  }
  render({ id }) {
    return (
      <div class="profile">
        <Card shadow="3" class="wide">
          <Card.Title class="graphic">
            <Card.TitleText>User: { id }</Card.TitleText>
          </Card.Title>

          <Card.Text>
            <p>This is a profile for the user {id}.</p>
          </Card.Text>
        </Card>
      </div>
    )
  }
}
