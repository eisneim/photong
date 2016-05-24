import React, { Component } from 'react'
import reactDom from 'react-dom'
// import Icon from 'react-mdl/lib/Icon'
import Button from 'react-mdl/lib/Button'
// import TextField from 'react-mdl/lib/TextField'
// import { Link } from 'react-router'
import { CardTitle, CardActions } from 'react-mdl/lib/Card'
import styles from './Upload.scss'

const debug = require('debug')('ph:Upload')

// import { connect } from 'react-redux'

// function mapStateToProps(state) {
//   return {
//     meta: state.meta,
//     albums: state.albums,
//   }
// }

// @connect(mapStateToProps, dispatch => ({ dispatch }))
export default class Upload extends Component {

  // static contextTypes = {
  //   router: React.PropTypes.object,
  // }
  componentDidMount() {
    this.$base = reactDom.findDOMNode(this)
  }

  _onDragEnter = (e) => {
    this.$base.classList.add(styles.active)
    debug('dragEnter', e)
    e.stopPropagation()
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
    return false
  }

  _onDragLeave = (e) => {
    this.$base.classList.remove(styles.active)
    debug('dragLeave', e)
  }

  _onDrop = e => {
    debug('onDrop', e)
    e.preventDefault()
    e.stopPropagation()
    var files = e.dataTransfer.files
    debug('files:', files)
    return false
  }

  render() {
    return (
      <div className={styles.root}
        onDragOver={e => { e.preventDefault(); return false }}
        onDragEnter={this._onDragEnter}
        onDragLeave={this._onDragLeave}
        onDrop={this._onDrop}>
        <CardTitle>Drop your photoes to upload</CardTitle>
        <div className={styles.dropzone}>
        </div>
        <CardActions>
          <Button>sdfs</Button>
        </CardActions>
      </div>
    )
  }

}