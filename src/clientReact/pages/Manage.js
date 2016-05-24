import React, { Component } from 'react'
import cx from 'classnames'
// import FABButton from 'react-mdl/lib/FABButton'
import Icon from 'react-mdl/lib/Icon'
import Button from 'react-mdl/lib/Button'
// import TextField from 'react-mdl/lib/TextField'
import { Link } from 'react-router'
import styles from './Manage.scss'

import { connect } from 'react-redux'

function mapStateToProps(state) {
  return {
    meta: state.meta,
    albums: state.albums,
  }
}

@connect(mapStateToProps, dispatch => ({ dispatch }))
export default class Manage extends Component {

  static contextTypes = {
    router: React.PropTypes.object,
  }

  constructor() {
    super()
    this.menus = {
      'Upload': { url: '/manage/upload', icon: 'file_upload' },
      'Albums': { url: '/manage/Albums', icon: 'photo_album' },
      'Resources': { url: '/manage/resources', icon: 'photo' },
      'About': { url: '/manage/about', icon: 'account_circle' },
      'Theme': { url: '/manage/theme', icon: 'extension' },
      'Settings': { url: '/manage/settings', icon: 'settings' },
    }
  }

  $menu() {
    return Object.keys(this.menus).map(key => {
      const item = this.menus[key]
      return (
        <Link key={key} activeClassName={styles.active} to={item.url} className={cx(styles.menuItem, 'mdl-button')}>
          <Icon className='md-18' name={item.icon}/>
          {key}
        </Link>
      )
    })
  }

  render() {
    return (
      <div className={styles.root}>
        <div data-layout="row" className={styles.mainWraper}>
          <section className={styles.menu} >
            {this.$menu()}
          </section>
          <main data-flex>
            <div className={cx(styles.routeCard, 'mdl-card', 'mdl-shadow--4dp')} data-layout="row">
              {this.props.children}
            </div>
          </main>
        </div>
      </div>
    )
  }

}