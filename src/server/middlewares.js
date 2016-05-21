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


}