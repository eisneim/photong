/* eslint-disable no-multi-spaces */
const debug = require('debug')('ph:routes')
var router = require('koa-router')
import send from 'koa-send'
import serve from 'koa-static'
import convert from 'koa-convert'
import getAdminCtrl from './controllers/ctrl.admin'
import getPubCtrl from './controllers/ctrl.pub'
import createMulterMiddeware from './utils/util.multer'

export default function regRoutes(app) {
  debug('initialize router')

  const upload = createMulterMiddeware(app)

  // just a simple check
  async function authCheck(ctx, next) {
    const { token } = app.config
    if (ctx.query.token === token || ctx.request.body.token === token || ctx.header.token === token)
      return await next()

    ctx.status = 401
    ctx.body = 'you are Unauthorized'
    return null
  }

  const adminCtrl = getAdminCtrl(app)
  const admin = new router({
    prefix: '/admin',
  })

  admin.post('/login',                             adminCtrl.login)
  admin.get('/logout',                             adminCtrl.logout)
  admin.get('/save',                     authCheck, adminCtrl.saveStore)
  admin.post('/albums',                  authCheck, adminCtrl.newAlbum)
  admin.put('/albums/:albumId',          authCheck, adminCtrl.updateAlbum)
  admin.delete('/albums/:albumId',       authCheck, adminCtrl.deleteAlbum)

  admin.post('/resources', authCheck, upload.array('resources', 50), adminCtrl.newResource)
  admin.put('/resources/:resourceId',    authCheck, adminCtrl.updateResource)
  admin.delete('/resources/:resourceId', authCheck, adminCtrl.deleteResource)

  // --------------------------------------
  const pubCtrl = getPubCtrl(app)
  const pubRoute = new router({
    prefix: '',
  })

  pubRoute.get('/albums',                   pubCtrl.getAlbums)
  pubRoute.get('/albums/:albumId',          pubCtrl.getAlbum)
  pubRoute.get('/resources/:resourceId',    pubCtrl.getResource)
  pubRoute.get('/static/:folername/:filename', pubCtrl.sendResource)

  // ------------------
  app.use(admin.routes())
    .use(admin.allowedMethods())

  app.use(pubRoute.routes())
    .use(pubRoute.allowedMethods())

  app.use(
    convert(serve(app.config.rootPath + '/public', {
      gzip: true,
      defer: false,
      maxage: app.env === 'development' ? 0 : 1000 * 60 * 60 * 24 * 5,
    }))
  )

  async function pageNotFound(ctx, next) {
    await next()
    await send(ctx, 'index.html', {
      root: app.config.rootPath + '/public',
    })
  }
  app.use(pageNotFound)
}