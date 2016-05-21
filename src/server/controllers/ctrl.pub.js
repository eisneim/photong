// import { copyTo } from '../../_shared/utils/util.object'
import send from 'koa-send'
/* eslint-disable no-unused-vars, eqeqeq */
export default function adminCtrl(app) {
  const wraper = fn => (ctx, next) => fn(app.store.getState(), ctx, next)

  function getAlbums(state, ctx) {
    ctx.json(null,
      state.albums
        .sort((a, b) => a.lastModified - b.lastModified)
        .map(a => {
          const newAlbum = Object.assign({}, a, {
            cover: state.resources[a.cover].thumb,
          })
          return newAlbum
        })
    )
  }

  function getAlbum(state, ctx) {
    const album = state.albums.find(a => a._id == ctx.params.albumId)
    if (!album)
      return ctx.json(`albumId: ${ctx.params.albumId} does not match any album`)
    if (album.token && album.token !== ctx.query.albumToken)
      return ctx.json('albumToken is required to view this album')

    const joined = Object.assign({}, album)
    joined.resources = (joined.resources || [])
      .map(id => state.resources[id])

    ctx.json(null, joined)
  }

  function getResource(state, ctx) {
    const res = state.resources[ctx.params.resourceId]
    if (!res)
      return ctx.json({ status: 404 })
    ctx.json(null, res)
  }

  async function sendResource(state, ctx) {
    await send(ctx, ctx.path.replace('static', 'uploads'), {
      root: app.config.rootPath,
    })
  }

  return {
    getAlbums: wraper(getAlbums),
    getAlbum: wraper(getAlbum),
    getResource: wraper(getResource),
    sendResource: wraper(sendResource),
  }
}