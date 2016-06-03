import { yyyymmdd } from '../../_shared/utils/util.dateTime'
import { copyTo } from '../../_shared/utils/util.object'
import { batchParse, batchGetExif } from '../utils/util.image'
import assert from 'assert'
const debug = require('debug')('ph:adminCtrl')

/* eslint-disable no-unused-vars, eqeqeq */
export default function adminCtrl(app) {
  const wraper = fn => (ctx, next) => fn(app.store.getState(), ctx, next)

  function stripSysPath(path) {
    assert.ok(path && path.replace, 'pathname must be an string')
    return path.replace(app.config.rootPath + '/uploads/', 'static/')
  }


  async function login(state, ctx) {
    const { username, token } = app.config
    const { body } = ctx.request
    debug('posted body:', body)
    if (username !== body.username || token !== body.token) {
      return ctx.json({
        status: 401,
        message: 'invalid username or token',
      })
    }

    ctx.json(null, 'success')
  }

  function logout(state, ctx) {
    ctx.body = 'log out'
  }

  function saveStore(state, ctx) {
    app.saveStore()
    ctx.json(null, {
      albums: state.albums.length,
      resources: Object.keys(state.resources || {}).length,
    })
  }

  function newAlbumFn(state, data, id) {
    const newAlbum = Object.assign({}, data, {
      _id: id || state.meta.idCount++,
      lastModified: Date.now(),
    })

    if (!newAlbum.resources) newAlbum.resources = []
    if (!newAlbum.cover) newAlbum.cover = data.resources[0]
    if (!newAlbum.tags) newAlbum.tags = []

    state.albums.push(newAlbum)
    return newAlbum
  }

  function newAlbum(state, ctx) {
    const newAlbum = newAlbumFn(state, ctx.request.body)
    const { resources } = newAlbum
    if (resources && resources[0] && typeof resources[0] !== 'string')
      return json('resources must be array of resource id')

    const firstRes = state.resources[newAlbum.resources[0]]
    ctx.json(null, Object.assign({}, newAlbum, { cover: firstRes.thumb }))
    app.saveStoreAsync(50)
  }

  function updateAlbum(state, ctx) {
    const index = state.albums.findIndex(a => a._id == ctx.params.albumId)
    if (index === -1)
      return ctx.json('albumId does not match anything')
    const album = state.albums[index]
    state.albums[index] = Object.assign({}, album, ctx.request.body, {
      lastModified: Date.now(),
      _id: album._id,
    })
    ctx.modified()
    ctx.json(null, state.albums[index])
  }

  function deleteAlbum(state, ctx) {
    const index = state.albums.findIndex(a => a._id == ctx.params.albumId)
    if (index === -1)
      return ctx.json('can not find this albumId')
    ctx.json(null, state.albums.splice(index, 1))
    ctx.modified()
  }


  async function newResource(state, ctx) {
    const { files } = ctx.req
    if (!files || files.length === 0)
      return ctx.json('no file specified!')

    try {
      const imageInfos = await batchParse(files)
      const exifs = await batchGetExif(files)
      const resources = files.map((file, index) => {
        var date = Date.now()
        return {
          _id: 'img_' + state.meta.idCount++,
          uploaded: date,
          lastModified: date,
          original: stripSysPath(file.path),
          src: stripSysPath(file.resPath),
          thumb: stripSysPath(file.thumbPath),
          name: file.originalname,
          size: file.size,
          mimetype: file.mimetype,
          exif: exifs[index],
          imgInfo: copyTo({}, imageInfos[index], [
            'width', 'height', 'density', 'resizedWidth', 'resizedHeight',
          ]),
        }
      })
      debug('new resources:', resources)
      // save resouces to state
      resources.forEach(res => {
        state.resources[res._id] = res
      })

      ctx.json(null, resources)
      app.saveStoreAsync(50)
    } catch (e) {
      ctx.json(e)
    }
  }

  // async function newResource(state, ctx) {
  //   const { body } = ctx.req

  //   const albumId = state.meta.idCount++

  //   try {

  //     const albumData = {
  //       resources: resources.map(r => r._id),
  //       tags: body.tags ? body.tags.split(',') : [],
  //       cover: resources[0]._id,
  //       name: body.name,
  //       description: body.description,
  //       token: body.token,
  //     }

  //     if (!albumData.name) albumData.name = yyyymmdd()
  //     const newAlbum = newAlbumFn(state, albumData, albumId)

  //     ctx.json(null, {
  //       album: Object.assign({}, newAlbum, { cover: resources[0].thumb }),
  //       resources,
  //     })
  //     // ctx.modified()
  //     app.saveStoreAsync(50)
  //   } catch (e) {
  //     ctx.json(e)
  //   }
  // }

  function deleteResource(state, ctx) {
    const { resoureceId } = ctx.params
    const resource = state.resources[resoureceId]
    if (!resource)
      return ctx.json(`resourceId:${resoureceId} does not match anything`)
    state.resources[resoureceId] = undefined
    ctx.modified()
    ctx.json(null, resource)
  }

  function updateResource(state, ctx) {
    const { resoureceId } = ctx.params
    const resource = state.resources[resoureceId]
    if (!resource)
      return ctx.json('resourceId does not match anything')

    state.resources[resoureceId] = Object.assign({}, resource, ctx.request.body, {
      lastModified: Date.now(),
      _id: resource._id,
      albumId: resource.albumId,
    })
    ctx.modified()
    ctx.json(null, state.resources[resoureceId])
  }

  return {
    login: wraper(login),
    logout: wraper(logout),
    saveStore: wraper(saveStore),
    newAlbum: wraper(newAlbum),
    updateAlbum: wraper(updateAlbum),
    deleteAlbum: wraper(deleteAlbum),
    newResource: wraper(newResource),
    deleteResource: wraper(deleteResource),
    updateResource: wraper(updateResource),
  }

}