import React, { Component } from 'react'
import reactDom from 'react-dom'
import Icon from 'react-mdl/lib/Icon'
import Button from 'react-mdl/lib/Button'
import { notify } from '../../utils/util.notify.js'
import TextField from 'react-mdl/lib/Textfield'
// import { Link } from 'react-router'
import { CardActions } from 'react-mdl/lib/Card'
import styles from './Upload.scss'
import * as actions from '../../actionCreators'

const debug = require('debug')('ph:Upload')

import { connect } from 'react-redux'
function mapStateToProps(state) {
  return {
    meta: state.meta,
  }
}

const MAX_FILE_COUNT = 50

@connect(mapStateToProps, dispatch => ({ dispatch }))
export default class Upload extends Component {

  // static contextTypes = {
  //   router: React.PropTypes.object,
  // }
  constructor() {
    super()
    // this.state = {
    //   uploadTempFiles: null,
    // }
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

  _onDragLeave = () => {
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
    this.addFiles(this.$fileInput.files)
  }

  addFiles(files) {
    debug('add files:', files)
    if (files.length === 0)
      return
    // const { uploadTempFiles } = this.state
    const { uploadTempFiles } = this.props.meta

    this.$base.classList.remove(styles.active)

    const formData = new FormData()
    for (var ii = 0; ii < files.length; ii++) {
      formData.append('resources', files[ii], files[ii].name || ('file' + Math.random()))
      if (!uploadTempFiles)
        continue
      // should check duplication and limit file type
      for (var jj = 0; jj < uploadTempFiles.length; jj++) {
        const newFile = files[ii]
        const oldFile = uploadTempFiles[jj]
        if (newFile.name === oldFile.name && newFile.size === oldFile.size) {
          return notify.error(`repeated file: ${newFile.name}, please select again`)
        }
      }
    }

    this.props.dispatch(actions.$upload(formData))
    // const filesArray = Array.prototype.slice.call(files)
    // this.setState({
    //   uploadTempFiles: uploadTempFiles ? uploadTempFiles.concat(filesArray) : filesArray,
    // })
  }

  formFiled = field => e => {
    if (!this.__formData) this.__formData = {}
    this.__formData[field] = e.target.value
  }

  _submit = () => {
    const { uploadTempFiles } = this.props.meta
    const { name } = this.__formData
    if (name && name.length > 50)
      return notify.error('Album name might not longer thang 50 characters')
    this.__formData.resources = uploadTempFiles.map(f => f._id)

    debug('formData:', this.__formData)
    this.props.dispatch(
      actions.$createAlbum(this.__formData, () => {
        this.__formData = {}
        this.refs.albumForm.reset()
      })
    )
  }

  $form() {
    return (
      <form className={styles.form} ref="albumForm">
        <TextField
          floatingLabel
          onChange={this.formFiled('name')}
          label="Album Name" />
        <TextField
          floatingLabel
          onChange={this.formFiled('tags')}
          label="Tags(seperate by comma or space)" />
        <TextField
          floatingLabel
          type="password"
          onChange={this.formFiled('token')}
          label="password(is protected? optioanl)" />
        <TextField
          floatingLabel
          rows={3}
          onChange={this.formFiled('descritpion')}
          label="descritpion" />
      </form>
    )
  }

  render() {
    // const { uploadTempFiles } = this.state
    const { uploadTempFiles, uploading } = this.props.meta
    const len = uploadTempFiles ? uploadTempFiles.length : 0
    debug('should rerender upload page', this.props.meta)

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
        { len > 0 || uploading ? this.$form() : null }
        <CardActions data-layout="row">
          <span data-flex/>
          { len > 0 ?
            <Button colored raised onClick={this._submit}>Submit</Button> :
            null
          }
        </CardActions>
      </div>
    )
  }

}