import { h, Component } from 'preact'
import { Icon, Button } from 'preact-mdl'
// import { Link } from 'preact-router'
import styles from './PageAlbum.scss'

export default class Album extends Component {
  render() {
    return (
      <div class={styles.root}>
        <div class={styles.imgWraper}>
          <img class="mdl-shadow--4dp" src="/img/header01.jpg"/>
          <div class={styles.infoBox}>
            <h2>name of img</h2>
            <p>some descritpion</p>
            <div class={styles.mainExif}>
              <span><Icon icon="camera_alt"/> Panasonic GH4</span>
              <span><Icon icon="camera"/> f/8</span>
              <span><Icon icon="timer"/> S 100</span>
              <span><Icon icon="wb_incandescent"/> ISO 200</span>
            </div>
          </div>
        </div>
        <div class={styles.imgWraper}>
          <img src="/img/header02.jpg"/>
          <div class={styles.infoBox}>
            <h2>a good speed</h2>
            <p>some descritpion</p>
            <div class={styles.mainExif}>
              <span><Icon icon="camera_alt"/> Panasonic GH4</span>
              <span><Icon icon="camera"/> f/5</span>
              <span><Icon icon="timer"/> S 200</span>
              <span><Icon icon="wb_incandescent"/> ISO 200</span>
            </div>
          </div>
        </div>
        <div class={styles.imgWraper}>
          <img class="mdl-shadow--4dp" src="/img/item01.jpg"/>
          <div class={styles.infoBox}>
            <h2>a good speed</h2>
            <p>some descritpion</p>
            <div class={styles.mainExif}>
              <span><Icon icon="camera_alt"/> Panasonic GH4</span>
              <span><Icon icon="camera"/> f/5</span>
              <span><Icon icon="timer"/> S 200</span>
              <span><Icon icon="wb_incandescent"/> ISO 200</span>
            </div>
          </div>
        </div>
        <Button class={styles.prevBtn} fab><Icon icon="chevron_left"/></Button>
        <Button class={styles.nextBtn} fab><Icon icon="chevron_right"/></Button>
      </div>
    )
  }
}