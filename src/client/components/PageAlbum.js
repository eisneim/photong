/* eslint-disable eqeqeq */
import { h, Component } from 'preact'
import { Icon, Button, Spinner } from 'preact-mdl'
// import { Link } from 'preact-router'
import styles from './PageAlbum.scss'

var done = false

export default class Album extends Component {

  constructor({ albums, albumId }) {
    super()
    const album = albums.find(a => a._id == albumId)
    this.instanceId = Math.random()
    this.state = {
      __loaded: album && typeof album.resources[0] !== 'string',
    }
  }

  $requestAlbum() {
    const { store, actions } = this.context
    setTimeout(()=> {
      store.dispatch(actions.$getAlbum(this.props.albumId))
    }, 100)
  }

  $renderResoures(album) {
    if (!album) return null

    return album.resources.map(res => {

      return (
        <div key={res._id} class={styles.imgWraper}>
          <img class="mdl-shadow--4dp" src={res.src}/>
          <div class={styles.infoBox}>
            <h2>{res.name}</h2>
            {res.descritpion ? <p>{res.descritpion}</p> : null}
            <div class={styles.mainExif}>
              <span><Icon icon="camera_alt"/> Panasonic GH4</span>
              <span><Icon icon="camera"/> f/8</span>
              <span><Icon icon="timer"/> S 100</span>
              <span><Icon icon="wb_incandescent"/> ISO 200</span>
            </div>
          </div>
        </div>
      )
    })
  }

  render({ albums, albumId }, { __loaded }) {
    const album = albums.find(a => a._id == albumId)
    const ready = album && typeof album.resources[0] !== 'string'

    if (!__loaded && !ready && !done) {
      done = true
      setTimeout(() => this.setState({ __loaded: true }), 1000)
      this.$requestAlbum()
      return <div class="_centered_loader"><Spinner active/></div>
    }

    return (
      <div class={styles.root}>
        { this.$renderResoures(album) }
        <Button class={styles.prevBtn} fab><Icon icon="chevron_left"/></Button>
        <Button class={styles.nextBtn} fab><Icon icon="chevron_right"/></Button>
      </div>
    )
  }
}