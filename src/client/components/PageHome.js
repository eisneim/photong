import { h, Component } from 'preact'
// import { Card, Button, Icon } from 'preact-mdl'
import { Link } from 'preact-router'
import styles from './PageHome.scss'

export default class Home extends Component {
  shouldComponentUpdate() {
    return false
  }
  render() {
    return (
      <div class={styles.root}>
        <div class={styles.itemsWrap}>
          <Link href={'/album/1'} class={styles.item}>
            <img class={styles.item__image} src="/img/item01.jpg" alt="item01"/>
            <h2 class={styles.item__title}>Magnificence</h2>
          </Link>
          <Link href={'/album/1'} class={styles.item}>
            <img class={styles.item__image} src="/img/item02.jpg" alt="item01"/>
            <h2 class={styles.item__title}>2016-6-2</h2>
          </Link>
          <Link href={'/album/1'} class={styles.item}>
            <img class={styles.item__image} src="/img/item03.jpg" alt="item01"/>
            <h2 class={styles.item__title}>Electrifying</h2>
          </Link>
          <Link href={'/album/1'} class={styles.item}>
            <img class={styles.item__image} src="/img/item04.jpg" alt="item01"/>
            <h2 class={styles.item__title}>Dynamic</h2>
          </Link>
          <Link href={'/album/1'} class={styles.item}>
            <img class={styles.item__image} src="/img/item05.jpg" alt="item01"/>
            <h2 class={styles.item__title}>Awe-inspiring</h2>
          </Link>
          <Link href={'/album/1'} class={styles.item}>
            <img class={styles.item__image} src="/img/item06.jpg" alt="item01"/>
            <h2 class={styles.item__title}>Magnificence</h2>
          </Link>
          <Link href={'/album/1'} class={styles.item}>
            <img class={styles.item__image} src="/img/item07.jpg" alt="item01"/>
            <h2 class={styles.item__title}>Magnificence</h2>
          </Link>
        </div>
      </div>
    )
  }
}