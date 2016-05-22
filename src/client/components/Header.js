import { h } from 'preact'
import { Layout, TextField } from 'preact-mdl'
import { Link } from 'preact-router'
import styles from './Header.scss'

export const Header = () => (
  <Layout.Header>
    <Layout.HeaderRow>
      <Layout.Title>
        <Link className={styles.logo} href="/">PHOTONG</Link>
      </Layout.Title>
      <Layout.Spacer />
      <TextField
        expandable
        icon="search"
        placeholder="Search"
        style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
      />
    </Layout.HeaderRow>
  </Layout.Header>
)

export default Header