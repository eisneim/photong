import { h, Component } from 'preact'
import { Layout, Navigation, Icon } from 'preact-mdl'
import { route } from 'preact-router'
import styles from './Sidebar.scss'

export default class Sidebar extends Component {
  shouldComponentUpdate() {
    return false
  }

  componentDidMount() {
    setTimeout(() => {
      this.$backdrop = document.querySelector('.mdl-layout__obfuscator')
    })
  }

  hide = () => {
    this.base.classList.remove('is-visible')
    console.log('this.$backdrop:', this.$backdrop)
    if (this.$backdrop) {
      this.$backdrop.classList.remove('is-visible')
    }
  }
  render() {
    return (
      <Layout.Drawer onClick={this.hide}>
        <Layout.Title>Photong</Layout.Title>
        <Navigation class={styles.nav}>
          <Navigation.Link href="/" route={route}><Icon icon="home"/> Home</Navigation.Link>
          <Navigation.Link href="/about" route={route}><Icon icon="account_circle"/> About</Navigation.Link>
          <Navigation.Link href="/contact" route={route}><Icon icon="perm_contact_calendar"/> Contact</Navigation.Link>
          <Navigation.Link href="/manage" route={route}><Icon icon="settings"/> Manage</Navigation.Link>
          <Navigation.Link href="/profile" route={route}>Profile</Navigation.Link>
          <Navigation.Link href="/profile/john" route={route}>John</Navigation.Link>
        </Navigation>
      </Layout.Drawer>
    )
  }
}
