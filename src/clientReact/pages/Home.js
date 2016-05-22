import { Link } from 'react-router'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './Home.scss'

function mapStateToProps(state) {
  return {
    albums: state.albums,
  }
}


@connect(mapStateToProps, {})
export default class Home extends Component {

  $renderAlbums(albums) {
    return albums.map(ab => {
      const cover = ab.cover && ab.cover._id ? ab.cover.thumb : ab.cover
      return (
        <Link key={ab._id} to={'/album/' + ab._id} className={styles.item}>
          <img className={styles.item__image} src={cover} alt={ab.name}/>
          <h2 className={styles.item__title}>{ab.name} ({ab.resources.length})</h2>
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


