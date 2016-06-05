import { Link } from 'react-router'
import React, { Component } from 'react'
import TextField from 'react-mdl/lib/TextField'
import Icon from 'react-mdl/lib/Icon'
import IconButton from 'react-mdl/lib/IconButton'
import { connect } from 'react-redux'
import styles from './Home.scss'
import * as actions from '../actionCreators'

function mapStateToProps(state) {
  return {
    albums: state.albums,
  }
}


@connect(mapStateToProps, dispatch => ({ dispatch }))
export default class Home extends Component {

  // constructor() {
  //   super()
  //   this.state = {
  //     tokens
  //   }
  // }
  changeToken = id => e => {
    actions.changeAlbumToken(id, e.target.value)
  }

  $renderAlbums(albums) {
    return albums.map(ab => {
      const cover = ab.cover && ab.cover._id ? ab.cover.thumb : ab.cover
      return (
        <Link key={ab._id} to={'/album/' + ab._id} className={styles.item}>
          <img className={styles.item__image} src={cover} alt={ab.name}/>
          <h2 className={styles.item__title}>{ab.name} ({ab.resources.length})</h2>
          { ab.isProtected && !ab.authorized ?
            <div className={styles.protected} onClick={e => { e.stopPropagation(); e.preventDefault() }}>
              <div className={styles.protectedIcon}>
                <Icon name="lock"/>
                <span>PROTECTED</span>
              </div>
              <div data-layout="row" className={styles.tokenForm}>
                <TextField
                  floatingLabel
                  onChange={this.changeToken(ab._id)}
                  value={ab.token || ''}
                  label="token"
                  data-flex
                  />
                <IconButton name="check"/>
              </div>
            </div> : null
          }
        </Link>
      )
    })
  }

  render() {
    const { albums } = this.props

    return (
      <div className={styles.root}>
        <div className={styles.itemsWrap}>
          {this.$renderAlbums(albums)}
        </div>
      </div>
    )
  }
}


