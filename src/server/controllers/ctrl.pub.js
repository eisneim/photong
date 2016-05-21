/* eslint-disable no-unused-vars */
export default function adminCtrl(app) {
  return {
    getAlbums(ctx) {
      ctx.body = 'get albums'
    },

    getAlbum(ctx) {
      ctx.body = ' get one album'
    },

    getResource(ctx) {
      ctx.body = 'get photo'
    },
  }

}