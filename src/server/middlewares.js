import bodyParser from 'koa-bodyparser'
import serve from 'koa-static'
import convert from 'koa-convert'
import compress from 'koa-compress'

/* eslint-disable no-console */
export default function regMiddleware(app) {
  // simple logger
  app.use(async (ctx, next) => {
    const start = new Date()
    await next()

    if (app.env !== 'development')
      return

    var ms = new Date() - start
    console.log('[34m%s %s - %s[39m', ctx.method, ctx.url, ms)
  })

  app.use(bodyParser({
    onerror: (err, ctx) => {
      ctx.throw('invalid json post data', 422)
    },
  }))

  app.use(compress({
    // filter (contentType) {
    //   return /text/i.test(contentType)
    // },
    threshold: 2048,
    flush: require('zlib').Z_SYNC_FLUSH,
  }))

  app.use(
    convert(serve(app.config.rootPath + '/public', {
      gzip: true,
      defer: true,
      maxage: app.env === 'development' ? 0 : 1000 * 60 * 60 * 24 * 5,
    }))
  )
}