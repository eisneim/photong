/* eslint-disable no-unused-vars */
export default function adminCtrl(app) {
  return {
    login(ctx) {
      ctx.body = 'login'
    },

    logout(ctx) {
      ctx.body = 'log out'
    },

    newAlbum(ctx) {
      ctx.body = 'create albums'
    },

    updateAlbum(ctx) {
      ctx.body = 'update albums'
    },

    deleteAlbum(ctx) {
      ctx.body = 'delete albums'
    },


    newResource(ctx) {
      ctx.body = 'upload pho'
    },

    deleteResource(ctx) {
      ctx.body = 'deleteResource'
    },

    updateResource(ctx) {
      ctx.body = 'updateResource'
    },
  }

}