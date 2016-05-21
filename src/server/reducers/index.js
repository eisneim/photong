import metaHandlers from './rd.meta'
import albumHandlers from './rd.albums'
import resHandlers from './rd.resources'
const debug = require('debug')('ph:reducers')
/**
 * reducerWraper free us from using tons of switch() case pair
 * @param  {Object} handlers an object with action.type as key, handler as value
 * @param  {Object} state    state[field], the subState of the state object
 * @param  {Object} action   action object
 * @param  {Object} ctx   ctx instance
 * @return {Object}          new state or old state
 */
function reducerWraper(handlers, state = {}, action, ctx) {
  // store has not been initialized, do nothing
  if (!ctx.store) return state

  const { payload, type } = action
  const handler = handlers[type]

  return typeof handler === 'function' ?
    handler(state, payload, ctx, action) :
    state
}


export default function regReducer(ctx) {
  debug('register reducers', ctx)
  return (state = {}, action) => {

    return {
      meta: reducerWraper(metaHandlers, state.meta, action, ctx),
      albums: reducerWraper(albumHandlers, state.albums, action, ctx),
      resources: reducerWraper(resHandlers, state.resources, action, ctx),
    }
  }
}