import * as request from './utils/util.request.js'
import assert from 'assert'

export function $getAlbums() {
  return {
    type: '$GET_ALBUMS',
    promise: request.$get('/albums'),
  }
}


export function $getAlbum(id) {
  assert(id, '$getAlbum(id) id is requried')
  return {
    type: '$GET_ALBUM',
    promise: request.$get('/albums/' + id),
  }
}
