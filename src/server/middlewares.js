import bodyParser from 'koa-bodyparser'
import serve from 'koa-static'
import convert from 'koa-convert'
import compress from 'koa-compress'

/* eslint-disable no-console */
export default function regMiddleware(app) {
  // simple logger
  app.use(async (ctx, next) => {
    const start = ctx.__reqStart = new Date()
    await next()

    if (app.env !== 'development')
      return

    var ms = new Date() - start
    console.log('[34m%s %s - %sms[39m', ctx.method, ctx.url, ms)
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

  /**
   * attatch some useful functions
   * @param  {Object} async (ctx,next) ..
   * @return {Object}       ...
   */
  app.use(async (ctx, next) => {
    ctx.json = (errObj, data = []) => {
      const appState = app.store.getState() || {}
      var body = {
        info: {
          cost: (Date.now() - ctx.__reqStart) + ' ms',
          lastSaved: appState.meta.lastSaved,
          lastModified: appState.meta.lastModified,
        },
        data,
        err: errObj ? (errObj.message || errObj) : null,
      }
      if (errObj) {
        ctx.status = errObj.status || 400
      }

      ctx.body = body
    }

    ctx.modified = () => {
      if (app.store) {
        app.store.getState().meta.lastModified = Date.now()
      }
    }

    await next()
  })

  app.use(
    convert(serve(app.config.rootPath + '/public', {
      gzip: true,
      defer: true,
      maxage: app.env === 'development' ? 0 : 1000 * 60 * 60 * 24 * 5,
    }))
  )
}