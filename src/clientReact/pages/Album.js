// import { Link } from 'react-router'
import React, { Component } from 'react'
import FABButton from 'react-mdl/lib/FABButton'
import Icon from 'react-mdl/lib/icon'
import { connect } from 'react-redux'
import styles from './Album.scss'
import * as actions from '../actionCreators'

function mapStateToProps(state) {
  return {
    albums: state.albums,
    requestingAlbum: state.meta.requestingAlbum,
  }
}

@connect(mapStateToProps, dispatch => ({ dispatch }))
export default class Album extends Component {
  $requestAlbum(albumId) {
    setTimeout(()=> {
      this.props.dispatch(actions.$getAlbum(albumId))
    }, 0)
  }

  $renderResoures(album) {
    if (!album) return null

    return album.resources.map(res => {
      return (
        <div key={res._id} className={styles.imgWraper}>
          <img className="mdl-shadow--4dp" src={res.src}/>
          <div className={styles.infoBox}>
            <h2>{res.name}</h2>
            {res.descritpion ? <p>{res.descritpion}</p> : null}
            <div className={styles.mainExif}>
              <span><Icon name="camera_alt"/> Panasonic GH4</span>
              <span><Icon name="camera"/> f/8</span>
              <span><Icon name="timer"/> S 100</span>
              <span><Icon name="wb_incandescent"/> ISO 200</span>
            </div>
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
    const album = albums.find(a => a._id == albumId)
    if (!album || typeof album.resources[0] === 'string') {
      this.$requestAlbum(albumId)
      return <span>Loading...</span>
    }

    return (
      <div className={styles.root}>
        { this.$renderResoures(album) }
        <FABButton ripple className={styles.prevBtn} fab><Icon name="chevron_left"/></FABButton>
        <FABButton ripple className={styles.nextBtn} fab><Icon name="chevron_right"/></FABButton>
      </div>
    )
  }
}


