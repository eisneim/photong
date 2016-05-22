import { notify } from './util.notify.js'

const debug = require('debug')('cy:util.errorHandler')

function statusErr(status, berr) {
  if (status === 400) {
    notify.error(JSON.stringify(berr), '格式不正确')
  } else if (status === 404) {
    notify.error('页面不存在', 404)
  } else if (status === 401) {
    notify.error('没有足够的权限', 401)
  } else if (status === 403) {
    notify.error('该操作是被禁止的', 403)

  } else if (status === 408) {
    notify.error('请求超时，请检查网络连接', 408)
  } else if (status === 410) {
    notify.error('资源已不存在', 410)
  } else if (status === 500 || status === 501 || status === 502 || status === 503) {
    notify.error('服务器内部错误，请稍候再试')
  } else if (status === 0) {
    notify.error('您的网络已断开，请刷新页面或检查网络连接')
  } else {
    /*
      500 501 502 503
     */
    notify.error(err)
  }
}

function bodyErr(berr) {
  if (!berr) return false

  if (berr && typeof berr === 'string') {
    if (/ValidationError\:/.test(berr)) {
      notify.error(berr.replace('ValidationError:', '').substr(0, 200))
      return true
    }
    notify.error(berr)
    return true
  }
  // validator error
  if (berr && Array.isArray(berr)) {
    notify.error(berr)
    return true
  }

  // mongoDB error
  if (berr && berr.name === 'MongoError') {
    var err = berr.errmsg
    // duplicate ckey
    if (berr.code === 11000) {
      var filed = err.match(/\{.+\}/g)
      debug(err)
      debug(filed)
      if (filed && filed[0])
        filed = filed[0].replace(/\{\s\:\s\"/, '').replace(/\"\s\}/, '')
      notify.error(filed + ' 已经存在且不能重复')
      return true
    }
    // mongodb validation error
  } else if (berr && berr.name === 'ValidationError') {
    notify.error(JSON.stringify(berr.errors))
    return true
  } else if (berr && berr.name === 'CastError') {
    notify.error('id格式不正确')
    return true
  }



  return notify.error(berr)
}

export function handleHttpError(res, data) {

  if (!res || !res.status) return notify.error('刷新一下试试？', '网络连接中断')
  if (res.type === 'text/html' || res.notFound) return notify.error('页面不存在了', 404)
  debug(data.err)
  return bodyErr(data.err) || statusErr(res.status, data.err)
}
