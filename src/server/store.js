import { createStore } from 'redux' // applyMiddleware
import createReducers from './reducers'
import fs from 'fs'

const debug = require('debug')('ph:store')


export default function createAppStore(app) {
  const initState = {
    'meta': {
      'lastSaved': 0,
      'lastModified': 0,
      'idCount': 0,
      'token': 'photongToken',
      'username': 'photong',
    },
    'albums': [
     /*
      name: String,
      _id: String,
      lastModified: Date,
      cover: photoId,
      resources: [photoId],
      token: String,
      */
    ],
    'resources': {
    /*
      albumId: String,
      lastModified: Date,
      uploaded: Date,
      name: String,
      src: String,
      thumb: String,
      original: String,
      tags: [String],
      exif: {},
     */
    },
  }
  const dbState = require('../../db.json')
  const defaultState = dbState.meta ? dbState : initState
  if (!defaultState.resources) defaultState.resources = {}

  debug('defaultState:', defaultState)

  const store = createStore(createReducers(app), defaultState)
  store.dispatchAsyc = action => setTimeout(() => store.dispatch(action), 0)

  return {
    store,
    // save store data to json file
    saveStore() {
      const state = store.getState()
      state.meta.lastSaved = Date.now()
      fs.writeFile('db.json', JSON.stringify(state))
    },
  }
}