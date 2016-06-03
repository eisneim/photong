import * as request from './utils/util.request.js'
import assert from 'assert'

// -------------------- album actions -----------------
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

export function $createAlbum(data, payload) {
  return {
    type: '$CREATE_ALBUM',
    payload,
    promise: request.$post('/admin/albums/', data),
  }
}

// -------------------- meat actions -----------------
export function $login(creadential) {
  return {
    type: '$LOGIN',
    payload: creadential,
    promise: request.$post('/admin/login', creadential),
  }
}

export function $logout() {
  return {
    type: '$LOGOUT',
    payload: null,
  }
}

export function $upload(formData, payload) {
  return {
    type: '$UPLOAD',
    payload,
    promise: request.$post('/admin/resources/', formData),
  }
}
