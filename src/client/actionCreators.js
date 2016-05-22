import * as request from './utils/util.request.js'

export function $getAlbums() {
  return {
    type: '$GET_ALBUMS',
    promise: request.$get('/albums'),
  }
}

export function $getAlbum(id) {
  return {
    type: '$GET_ALBUM',
    promise: request.$get('/albums/' + id),
  }
}