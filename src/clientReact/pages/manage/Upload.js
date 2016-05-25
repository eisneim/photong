import React, { Component } from 'react'
import reactDom from 'react-dom'
import Icon from 'react-mdl/lib/Icon'
import Button from 'react-mdl/lib/Button'
import { notify } from '../../utils/util.notify.js'
// import TextField from 'react-mdl/lib/TextField'
// import { Link } from 'react-router'
import { CardActions } from 'react-mdl/lib/Card'
import styles from './Upload.scss'

const debug = require('debug')('ph:Upload')

// import { connect } from 'react-redux'

// function mapStateToProps(state) {
//   return {
//     meta: state.meta,
//     albums: state.albums,
//   }
// }

const MAX_FILE_COUNT = 50

// @connect(mapStateToProps, dispatch => ({ dispatch }))
export default class Upload extends Component {

  // static contextTypes = {
  //   router: React.PropTypes.object,
  // }
  constructor() {
    super()
    this.state = {
      selectedFiles: null,
    }
  }

  componentDidMount() {
    this.$base = reactDom.findDOMNode(this)
    this.$fileInput = reactDom.findDOMNode(this.refs.resources)
  }

  _onDragEnter = (e) => {
    this.$base.classList.add(styles.active)
    // debug('dragEnter', e)
    e.stopPropagation()
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
    return false
  }

  _onDragLeave = (e) => {
    this.$base.classList.remove(styles.active)
    // debug('dragLeave', e)
  }

  _onDrop = e => {
    debug('onDrop', e)
    e.preventDefault()
    e.stopPropagation()
    this.addFiles(e.dataTransfer.files)
    return false
  }

  _onDropzoneClick = () => {
    this.$fileInput.click()
  }

  _fileSelected = () => {
    this.addFiles(Array.prototype.slice.call(this.$fileInput.files))
  }

  addFiles(files) {
    debug('add files:', files)
    const { selectedFiles } = this.state
    // should check duplication and limit file type
    const filesArray = Array.prototype.slice.call(files)
    if (selectedFiles) {
      for (var ii = 0; ii < files.length; ii++) {
        for (var jj = 0; jj < selectedFiles.length; jj++) {
          const newFile = files[ii]
          const oldFile = selectedFiles[jj]
          if (newFile.name === oldFile.name && newFile.size === oldFile.size) {
            const index = indexOf(filesArray.newFile)
            filesArray.splice(index, 1)
          }
        }
      }
    }

    this.setState({
      selectedFiles: (this.state.selectedFiles || []).concat(filesArray),
    })
  }

  render() {
    const { selectedFiles } = this.state
    const len = selectedFiles ? selectedFiles.length : 0

    return (
      <div className={styles.root}
        onDragOver={e => { e.preventDefault(); return false }}
        onDragEnter={this._onDragEnter}
        onDragLeave={this._onDragLeave}
        onDrop={this._onDrop}>
        <div className={styles.dropzone} onClick={this._onDropzoneClick}>
          <input type="file"
            onChange={this._fileSelected}
            className={styles.fileInput}
            ref="resources"
            multiple="true"
            accept="image/*"
            name="resources"/>
          <div className={styles.dropzoneInner}>
            <Icon name="unarchive"/> {
              len > 0 ?
              `${len} selected, ${MAX_FILE_COUNT - len} more can be added to this album` :
              'Drop your photoes to upload'
            }
          </div>
        </div>
        <CardActions>
          <Button>sdfs</Button>
        </CardActions>
      </div>
    )
  }

}