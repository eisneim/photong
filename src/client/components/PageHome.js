import { h, Component } from 'preact'
import { Link } from 'preact-router'
import styles from './PageHome.scss'

const debug = require('debug')('ph:home')

export default class Home extends Component {

  constructor(props) {
    super()
    this.state = {
      __loaded: props.albums && props.albums.length > 0,
    }
  }

  $requestAlbums() {
    const { store, actions } = this.context
    setTimeout(() => {
      store.dispatch(actions.$getAlbums())
    }, 100)
  }

  $renderAlbums(albums) {


    return albums.map(ab => {
      const cover = ab.cover && ab.cover._id ? ab.cover.thumb : ab.cover
      return (
        <Link href={'/album/' + ab._id} class={styles.item}>
          <img class={styles.item__image} src={cover} alt={ab.name}/>
          <h2 class={styles.item__title}>{ab.name} ({ab.resources.length})</h2>
        </Link>
      )
    })
  }

  render({ albums, albumsLoaded }) {
    if (!albumsLoaded) {
      this.$requestAlbums()
      return <span>loading.....</span>
    }

    if (!albums || albums.length === 0)
      return <h3>No photo has been uploaded yet</h3>

    return (
      <div class={styles.root}>
        <div class={styles.itemsWrap}>
          {this.$renderAlbums(albums)}
        </div>
      </div>
    )
  }
}