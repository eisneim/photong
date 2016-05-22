/**
 * in this cach factory, we gonna achieve few things:
 * 1. save to localstorage
 * 2. request cache auto expire
 * 3. full control of cache
 */
window.phCache = {}
var debug = require('debug')('ph:cache')

// provide localStorage like interface
class Cacher {
  constructor() {
    this._cacheStore = window.phCache
  }

  get length() {
    return Object.keys(this._cacheStore).length
  }

  key(key) {
    if (typeof key === 'number')
      return this._cacheStore[Object.keys(this._cacheStore)[key]]
    return this._cacheStore[key]
  }

  getItem(key) {
    return this._cacheStore[key]
  }

  setItem(key, val) {
    this._cacheStore[key] = val
  }

  removeItem(key) {
    this._cacheStore[key] = undefined
  }

  clear() {
    this._cacheStore = {}
  }
}

class CacheFactory {
  constructor(options) {
    // this.useLS = Boolean(options.useLocalStorage)|| process.env.NODE_ENV === 'production'
    this.useLS = true
    this._cache = this.useLS ? window.localStorage : new Cacher()

    this.expireType = options.expireType || 'time'// count, time,
    this.expireCount = options.expireCount || 5
    this.expireTime = options.expireTime || 60 * 1//  unit in second, default: 1 minute
  }
  get length() {
    return this._cache.length
  }

  set(key, val) {
    debug('set key:', key, val)
    this._cache.setItem(key, this.useLS ? JSON.stringify(val) : val)
    if (this.expireType === 'time') {
      this._cache.setItem(key + '_time', Date.now())
    } else if (this.expireType === 'count') {
      this._cache.setItem(key + '_count', 0)
    }

  }

  get(key) {
    // debug("get key:",key)
    if (this.expireType === 'time') {
      let timeStamp = this._cache.getItem(key + '_time')
      if (timeStamp && (Date.now() - timeStamp) / 1000 > this.expireTime)
        return this.expire(key)
    } else if (this.expireType === 'count') {
      let count = this._cache.getItem(key + '_count')
      if (count && count > this.expireCount)
        return this.expire(key)
    }
    var item = this._cache.getItem(key)
    return this.useLS ? JSON.parse(item) : item
  }

  remove(key) {
    this.expire(key)
  }

  expire(key) {
    debug('expire key:', key)
    this._cache.removeItem(key)
    this._cache.removeItem(key + '_time')
    this._cache.removeItem(key + '_count')
    return null
  }
  clear() {
    this._cache.clear()
  }
}

export default CacheFactory
export const defaultCache = new CacheFactory({
  expireType: 'time',
  expireTime: 60,
})

