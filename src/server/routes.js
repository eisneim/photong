const debug = require('debug')('ph:routes')
var router = require('koa-router')()

export default function regRoutes(app) {
  debug('initialize router')

  router.get('/', ctx => {
    ctx.body = 'it worksss'
  })


  app.use(router.routes())
    .use(router.allowedMethods())
}