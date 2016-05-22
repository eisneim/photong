import { createStore, applyMiddleware } from 'redux'
import { logger, requestPromise, readyStatePromise, thunk } from './middlewares'
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

}

const albumHandlers = {
  $GET_ALBUMS(state, payload, ctx, action) {
    if (!action.ready) return state
    const albums = action.result.data
    albums.forEach(a => {
      const index = state.findIndex(p => p._id == a._id)
      if (index < 0) {
        state.push(a)
      } else {
        state[index] = a
      }
    })
    return state
  },

  $GET_ALBUM(state, payload, ctx, action) {
    if (!action.ready) return state
    const album = action.result.data
    // to avoid dup request
    album.isFresh = true
    const index = state.findIndex(p => p._id == album._id)
    if (index > -1) {
      state[index] = album
    } else {
      state.push(album)
    }

    return state
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
    }
  }
}

export default function makeStore(ctx) {
  const defaultState = {
    meta: {
      token: null,
      username: null,
      lastModified: 0,
      lastSaved: 0,
    },
    albums: [],
    resources: {},
  }

  const createStoreEnhanced = applyMiddleware(logger, requestPromise, readyStatePromise, thunk)(createStore)

  const store = createStoreEnhanced(regReducer(ctx), defaultState)
  store.dispatchAsync = time => setTimeout(store.dispatch, time || 0)

  return store
}