import { getFileSize } from '../utils/util.common.js'
// import { Link } from 'react-router'
import React, { Component } from 'react'
import FABButton from 'react-mdl/lib/FABButton'
import Icon from 'react-mdl/lib/Icon'
import IconButton from 'react-mdl/lib/IconButton'
import Menu, { MenuItem } from 'react-mdl/lib/menu'
import { connect } from 'react-redux'
import styles from './Album.scss'
import * as actions from '../actionCreators'

const debug = require('debug')('ph:Album')

function mapStateToProps(state) {
  return {
    albums: state.albums,
    requestingAlbum: state.meta.requestingAlbum,
  }
}

@connect(mapStateToProps, actions)
export default class Album extends Component {

  static contextTypes = {
    router: React.PropTypes.object,
  }

  $requestAlbum(album) {
    setTimeout(()=> {
      this.props.$getAlbum(album._id, album.token)
    }, 0)
  }

  jumpTo(index) {
    const { albums } = this.props
    const nextAlbum = albums[index]
    // debug('this.context', this.context)
    debug('nextAlbum', nextAlbum)
    this.context.router.push(`/album/${nextAlbum._id}`)
  }

  $getExif(exif) {
    if (!exif || !exif.image || !exif.exif) return null

    return (
      <div className={styles.mainExif}>
        <span><Icon name="camera_alt"/>{exif.image.Make + ' ' + exif.image.Model}</span>
        <span><Icon name="camera"/> f/{exif.exif.FNumber || 'unknown'}</span>
        <span><Icon name="timer"/> S {(1 / exif.exif.ExposureTime) || 'unknown'}</span>
        <span><Icon name="wb_incandescent"/> ISO {exif.exif.ISO || 'unknown'}</span>
        <span><Icon name="lens"/>{exif.exif.LensModel || 'unknown'}</span>
      </div>
    )
  }

  $renderResoures(album) {
    if (!album) return null

    return album.resources.map(res => {
      return (
        <div key={res._id} className={styles.imgWraper}>
          <div className={styles.resourceMenu}>
            <IconButton name="more_vert" id={'menu' + res._id}/>
            <Menu target={'menu' + res._id} align="right">
              <MenuItem><a href={res.original} target="_blank">Download Full Size({getFileSize(res.size)})</a></MenuItem>
              <MenuItem>Remove From This Album</MenuItem>
              <MenuItem>Full exif info</MenuItem>
              <MenuItem disabled>Delete</MenuItem>
            </Menu>
          </div>
          <img className="mdl-shadow--4dp" src={res.src}/>
          <div className={styles.infoBox}>
            <h2>{res.name}</h2>
            {res.descritpion ? <p>{res.descritpion}</p> : null}
            {this.$getExif(res.exif)}
          </div>
        </div>
      )
    })
  }

  render() {
    const { albums, params, requestingAlbum } = this.props
    if (requestingAlbum)
      return <span>Loading...</span>
    const { albumId } = params
    /* eslint-disable eqeqeq */
    const index = albums.findIndex(a => a._id == albumId)
    const isLast = index >= albums.length - 1

    const album = albums[index]
    if (!album || typeof album.resources[0] === 'string') {
      this.$requestAlbum(albums[index])
      return <span>Loading...</span>
    }

    return (
      <div className={styles.root}>
        { this.$renderResoures(album) }
        {
          index > 0 ?
          <FABButton onClick={() => this.jumpTo(index - 1)} ripple className={styles.prevBtn} fab><Icon name="chevron_left"/></FABButton> :
          null
        }
        {isLast ? null :
          <FABButton onClick={() => this.jumpTo(index + 1)} ripple className={styles.nextBtn} fab><Icon name="chevron_right"/></FABButton>
        }
      </div>
    )
  }
}


