/* eslint-disable no-unused-vars */
export default function adminCtrl(app) {
  const wraper = fn => (ctx, next) => fn(app.store.getState(), ctx, next)

  async function login(state, ctx) {

    const p = new Promise((resolve) => {
      setTimeout(() => resolve(true), 1000)
    })
    await p
    ctx.body = 'login'
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

  function newAlbum(state, ctx) {
    const _id = state.meta.idCount++
    const newAlbum = Object.assign({}, ctx.request.body, {
      _id,
      lastModified: Date.now(),
    })
    if (!newAlbum.resources) newAlbum.resources = []
    if (!newAlbum.tags) newAlbum.tags = []

    state.albums.push(newAlbum)
    ctx.modified()
    ctx.json(null, newAlbum)
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


  function newResource(state, ctx) {
    ctx.body = 'upload pho'
    ctx.modified()
  }

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