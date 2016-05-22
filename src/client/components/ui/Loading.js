import { h, Component } from 'preact'
import { Spinner } from 'preact-mdl'
import { $get } from '../../utils/util.request.js'
const debug = require('debug')('ph: Loading')
export default url => Node => class Loading extends Component {
  constructor(props) {
    super()
    this.state = {
      isLoading: true,
      error: null, resolved: null,
    }
  }

  componentDidMount() {
    debug('start request:', url)
    $get(url).then(
      resolved => this.setState({ isLoading: false, resolved }),
      error => this.setState({ error })
    )
  }

  render(props, { isLoading, error, resolved }) {
    if (isLoading) {
      return <div class="_centered_loader"><Spinner active/></div>
    } else if (error !== null) {
      return <p>{error}</p>
    } else if (resolved) {
      return <Node {...Object.assign({}, props, { resolved: resolved })}/>
    } else {
      return null
    }
  }
}