/**
 * 1. provide unified interface to wrap our ajax library,
 *   for now we are using fetch api: https://github.com/github/fetch https://www.npmjs.com/package/isomorphic-fetch
 * 2. attatch token for each request
 * 3. atuo start loading bar and hide if when done
 * 4. http error / app error notify
 */

/* eslint-disable no-console */
import { defaultCache } from './util.clientCache.js'
import { notify, loader } from './util.notify.js'
import { handleHttpError } from './util.errorHandler.js'
// import { getToken } from '../services/svc.clientAuthStore.js'
function getToken() {
  return 'sss'
}

const debug = require('debug')('ph:request')
// TODO: make this as a Queue
var requestingUrl = null

function responseParser(response) {
  // stop loading bar is so
  if (loader.isLoading) loader.stop()
  // reset requesting state
  requestingUrl = null

  const isJSON = /json/.test(response.headers.get('Content-Type'))
  try {
    var resPromise = isJSON ? response.json() : response.text()

    if (!response.ok || response.status >= 400) {
      let message = resPromise.err || response.statusText
      var error = new Error(message)
      error.response = response
      resPromise.then(data => handleHttpError(response, data))
      console.error(error)
    }

    return resPromise
  } catch (e) {
    console.error(e)
  }
}

function getFetchOption(method = 'GET') {
  return {
    method,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
    credentials: 'same-origin', // append cookie
  }
}


// store current requesting url,
// so we can decide if next request is a duplication
function setRequestingUrl(url, method = 'GET') {
  requestingUrl = {
    url,
    method,
    timeStamp: Date.now(),
  }
  return requestingUrl
}

// dumb http request debounce!!
// TODO: should use queue instead
function requestingDone(url, method) {
  if (!requestingUrl) return true
  if (requestingUrl.url !== url ||
    requestingUrl.method !== method ||
    Date.now() - requestingUrl.timeStamp >= 2000
  ) return true

  notify.info('网络请求中，请稍候')
  console.error('same request fired within 2 seconds', requestingUrl)
  return false
}

/**
 * GET method
 * @param  {string} url url
 * @param  {Object} opt options: noLoading, fresh, parallel
 * @return {promise}     response promise
 */
export function $get(url, opt = {}) {
  debug('$get()', url, opt)
  // limit request, prevent sencond call when internet is slow;
  if (!opt.parallel && !requestingDone(url, 'GET')) return null
  // cache check
  if (!opt.fresh) {
    var cc = defaultCache.get(url)
    debug('is cached::', cc)
    if (cc) {
      if (loader.isLoading) {
        isLoading.stop()
      }
      return Promise.resolve(cc)
    }
  }
  // start loading animation by default
  if (!opt.noLoading) loader.load()

  var fetchOption = getFetchOption('GET')
  setRequestingUrl(url, 'GET')

  try {
    return fetch(url, fetchOption)
      .then(responseParser)
      .then(data=>{
        if (data.ok !== false) defaultCache.set(url, data)
        return data
      })
  } catch (e) {
    console.error(e)
  }
}

/**
 * DELETE method
 * @param  {string} url url
 * @param  {Object} opt options: noLoading, fresh, parallel
 * @return {promise}     response promise
 */
export function $delete(url, opt = {}) {
  debug('$DELETE()', url, opt)
  // limit request, prevent sencond call when internet is slow;
  if (!opt.parallel && !requestingDone(url, 'DELETE')) return null
  // start loading animation by default
  if (!opt.noLoading) loader.load()

  var fetchOption = getFetchOption('DELETE')
  setRequestingUrl(url, 'DELETE')

  try {
    return fetch(url, fetchOption).then(responseParser)
  } catch (e) {
    console.error(e)
  }
}


/**
 * POST method
 * @param  {string} url url
 * @param  {Object} data json data
 * @param  {Object} opt options: noLoading, fresh, parallel
 * @return {promise}     response promise
 */
export function $post(url, data, opt = {}) {
  debug('$POST()', url, data, opt)
  // limit request, prevent sencond call when internet is slow;
  if (!opt.parallel && !requestingDone(url, 'POST')) return null
  // start loading animation by default
  if (!opt.noLoading) loader.load()

  var fetchOption = getFetchOption('POST')
  if (typeof data === 'object' && !(data instanceof FormData)) {
    fetchOption.headers['Content-Type'] = 'application/json'
    fetchOption.body = JSON.stringify(data)
  } else {
    fetchOption.body = data
  }
  setRequestingUrl(url, 'POST')

  try {
    return fetch(url, fetchOption).then(responseParser)
  } catch (e) {
    console.error(e)
  }
}

/**
 * PUT method
 * @param  {string} url url
 * @param  {Object} data json data
 * @param  {Object} opt options: noLoading, fresh, parallel
 * @return {promise}     response promise
 */
export function $put(url, data, opt = {}) {
  debug('$PUT()', url, data, opt)
  // limit request, prevent sencond call when internet is slow;
  if (!opt.parallel && !requestingDone(url, 'PUT')) return null
  // start loading animation by default
  if (!opt.noLoading) loader.load()

  var fetchOption = getFetchOption('PUT')
  if (typeof data === 'object' && !(data instanceof FormData)) {
    fetchOption.headers['Content-Type'] = 'application/json'
    fetchOption.body = JSON.stringify(data)
  } else {
    fetchOption.body = data
  }
  setRequestingUrl(url, 'PUT')

  try {
    return fetch(url, fetchOption).then(responseParser)
  } catch (e) {
    console.error(e)
  }
}
