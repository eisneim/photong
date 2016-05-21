/* eslint-disable no-unused-vars, eqeqeq */
export default function adminCtrl(app) {
  const wraper = fn => (ctx, next) => fn(app.store.getState(), ctx, next)

  function getAlbums(state, ctx) {
    ctx.json(null,
      state.albums
        .sort((a, b) => a.lastModified - b.lastModified)
        .map(a => {
          const newAlbum = Object.assign({}, a, {
            cover: state.resources[a.cover],
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
    ctx.body = 'get photo'
  }

  return {
    getAlbums: wraper(getAlbums),
    getAlbum: wraper(getAlbum),
    getResource: wraper(getResource),
  }
}