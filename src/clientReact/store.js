import { createStore, applyMiddleware } from 'redux'
import { logger, requestPromise, readyStatePromise, thunk } from './middlewares'
import { routerReducer } from 'react-router-redux'
import { CREADENTIAL_KEY } from './_constants'
import { notify } from './utils/util.notify'
const debug = require('debug')('ph:store')
/* eslint-disable eqeqeq */
function reducerWraper(handlers, state = {}, action, ctx) {
  // store has not been initialized, do nothing
  if (!ctx.store) return state

  const { payload, type } = action
  const handler = handlers[type]

  return typeof handler === 'function' ?
    handler(state, payload, ctx, action) :
    state
}

const metaHandlers = {
  $LOGIN(meta, creadential, ctx, action) {
    if (!action.ready) return meta
    debug(action.result, creadential)
    const { err } = action.result
    if (err || action.error) {
      return meta
    }

    window.localStorage.setItem(CREADENTIAL_KEY, JSON.stringify(creadential))
    meta.isAuthenticated = true
    return meta
  },

  $LOGOUT(meta) {
    window.localStorage.setItem(CREADENTIAL_KEY, '')
    meta.isAuthenticated = false
    return meta
  },

  $UPLOAD(meta, payload, ctx, action) {
    const appState = ctx.store.getState()
    if (!action.ready) {
      meta.uploading = true
      return meta
    }
    // stop loading animation
    meta.uploading = false

    const resources = action.result.data
    debug('upload susccess', resources)

    if (!Array.isArray(appState.resources)) {
      appState.resources = resources
    } else {
      appState.resources = appState.resources.concat(resources)
    }

    meta.uploadTempFiles = meta.uploadTempFiles ?
      meta.uploadTempFiles.concat(resources) : resources

    return Object.assign({}, meta)
  },
  $CREATE_ALBUM(meta, payload, ctx, action) {
    if (!action.ready)
      return meta
    return Object.assign({}, meta, { uploadTempFiles: null })
  },

}

const albumHandlers = {
  $GET_ALBUMS(abs, payload, ctx, action) {
    if (!action.ready) return abs
    const albums = action.result.data
    albums.forEach(a => {
      const index = abs.findIndex(p => p._id == a._id)
      if (index < 0) {
        abs.push(a)
      } else {
        abs[index] = a
      }
    })
    ctx.store.getState().meta.albumsLoaded = true
    return abs.slice()
  },

  $GET_ALBUM(albums, payload, ctx, action) {
    const appState = ctx.store.getState()
    const { result, ready, params } = action
    if (!ready) {
      appState.meta.requestingAlbum = true
      return albums
    }
    if (result.err) {
      debug('encounter request err:, action.params', params)
      albums.forEach(aa => {
        if (aa._id === params.id) {
          appState.meta.requestingAlbum = false
          aa.requestingErr = result.err
        }
      })
      return albums.slice()
    }

    const album = result.data
    // to avoid dup request
    // album.isFresh = true
    album.authorized = true
    album.requestingErr = null
    const index = albums.findIndex(p => p._id == album._id)
    album.cover = album.resources.find(r => r._id === album.cover).thumb
    if (index > -1) {
      albums[index] = album
    } else {
      albums.push(album)
    }
    appState.meta.requestingAlbum = false
    return albums.slice()
  },
  $CREATE_ALBUM(albums, payload, ctx, action) {
    // const appState = ctx.store.getState()
    if (!action.ready) {
      return albums
    }
    const newAlbum = action.result.data

    albums.unshift(newAlbum)

    if (typeof payload === 'function') {
      debug('should invoke payload function')
      payload()
    }

    notify.success('susccessfully created an Album!')
    return albums.slice()
  },
  SET_ALBUM_TOKEN(albums, { _id, token }) {
    albums.forEach(a => {
      if (a._id === _id) a.token = token
    })
    return albums.slice()
  },
}

const resHandlers = {

}

export function regReducer(ctx) {
  return (state = {}, action) => {

    return {
      meta: reducerWraper(metaHandlers, state.meta, action, ctx),
      albums: reducerWraper(albumHandlers, state.albums, action, ctx),
      resources: reducerWraper(resHandlers, state.resources, action, ctx),
      routing: routerReducer(state.routing, action),
    }
  }
}

export default function makeStore(ctx, albums) {
  const creadential = window.localStorage.getItem(CREADENTIAL_KEY)

  const defaultState = {
    meta: {
      token: null,
      username: null,
      lastModified: 0,
      lastSaved: 0,
      isAuthenticated: creadential && creadential !== 'undefined',
    },
    albums: albums,
    resources: {},
  }

  const createStoreEnhanced = applyMiddleware(logger, requestPromise, readyStatePromise, thunk)(createStore)

  const store = createStoreEnhanced(regReducer(ctx), defaultState)
  store.dispatchAsync = (action, time) => setTimeout(() => {
    store.dispatch(action)
  }, time || 0)

  return store
}