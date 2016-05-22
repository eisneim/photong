import { h, Component } from 'preact'
import { Spinner } from 'preact-mdl'
import { Link } from 'preact-router'
import styles from './PageHome.scss'

export default class Home extends Component {

  constructor(props) {
    super()
    this.state = {
      __loaded: props.albums && props.albums.length > 0,
    }
  }

  $requestAlbums() {
    const { store, actions } = this.context
    store.dispatch(actions.$getAlbums())
  }

  $renderAlbums(albums) {
    if (!albums || albums.length === 0)
      return <h3>No photo has been uploaded yet</h3>

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

  render({ albums }, { __loaded }) {

    if (!__loaded && albums.length === 0) {
      setTimeout(() => this.setState({ __loaded: true }), 1000)
      this.$requestAlbums()
      return <div class="_centered_loader"><Spinner active/></div>
    }


    return (
      <div class={styles.root}>
        <div class={styles.itemsWrap}>
          {this.$renderAlbums(albums)}
        </div>
      </div>
    )
  }
}