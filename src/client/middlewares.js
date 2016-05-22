/* eslint-disable valid-jsdoc, no-console, no-unused-vars */
/**
 * 记录所有被发起的 action 以及产生的新的 state。
 * @param  {Object} store {getState,dispatch}
 * @return {Object}       result is the action, you can modify this action
 */
export const logger = store => next => action => {
  if (!action) return null

  if (action.meta && action.meta.ignoreLog)
    return next(action)
  console.group(action.type)
  console.info('dispatching', action)
  let resultAction = next(action)
  const nextState = store.getState()
  console.log('next state', nextState.toJS ? nextState.toJS() : nextState)
  console.groupEnd(action.type)
  return resultAction
}

/* eslint-disable valid-jsdoc, no-console, no-unused-vars */

/**
 * checks if action.payload is an promise, if so, resolve it and diapatch another action
 * which the action.type will add a state(SUCCESS,FAIL) suffix
 * you can also specify "action.successCb" or "action.failCb", they will be invoked after promise is been resolved
 * @param  {Object} store ..
 * @return {Promise}      ..
 * @example
 * dispatch({type: LOAD_STH, playload: new Promise(...)})
 * // if success, "LOAD_STH_SUCCESS" will be dispatched
 * // if failed, "LOAD_STH_FAIL" will be dispatched
 * // and the 'action.payload' is the resolved data
 *
 * @example <caption>with callback</caption>
 * var promise = store.dispatch({
 *   type: "DO_IT", payload: Promise.resolve('good'),
 *   successCb(data){
 *     console.log(data)// data === 'good'
 *   }
 * })
 * // you can also use this returned promise
 * pormise.then(data => {
 *   console.log(data)// data === 'good'
 * })
 */
export const requestPromise = store => next => action => {
  if (!action.payload || typeof action.payload.then !== 'function') {
    return next(action)
  }

  return Promise.resolve(action.payload)
    .then(data => {
      store.dispatch({
        type: action.type + '_SUCCESS',
        meta: action.meta,
        payload: data,
      })
      // for notification only, if you want to change ui state, use state instead
      if (typeof action.successCb === 'function') action.successCb(data)
      return data
    }, err => {
      store.dispatch({
        type: action.type + '_FAIL',
        payload: err,
      })
      // for notification only, if you want to change ui state, use state instead
      if (typeof action.failCb === 'function') action.failCb(err)
      return Promise.reject(err)
    })
}

/**
 * 让你可以发起带有一个 { promise } 属性的特殊 action。
 * 这个 middleware 会在开始时发起一个 action，并在这个 `promise` resolve 时发起另一个成功（或失败）的 action。
 * 为了方便起见，`dispatch` 会返回这个 promise 让调用者可以等待。
 * @example
 * dispatch({
 *   type: 'SOME_TYPE',
 *   promise: fetch('/v2/api/url')
 * })
 * // then new ready  action will dispatch and will contain resolved data in action object
 * dispatch({
 *   type: 'SOME_TYPE',
 *   ready: true,
 *   result: { 'your data': true }
 *   error: 'if error exits'
 * })
 */
export const readyStatePromise = store => next => action => {
  if (!action.promise) {
    return next(action)
  }

  function makeAction(ready, data) {
    let newAction = Object.assign({}, action, { ready }, data)
    delete newAction.promise
    return newAction
  }

  next(makeAction(false))
  return action.promise.then(
    result => next(makeAction(true, { result })),
    error => next(makeAction(true, { error }))
  )
}

/* eslint-disable valid-jsdoc, no-console, no-unused-vars */

/**
 * 让你可以发起一个函数来替代 action。
 * 这个函数接收 `dispatch` 和 `getState` 作为参数。
 *
 * 对于（根据 `getState()` 的情况）提前退出，或者异步控制流（ `dispatch()` 一些其他东西）来说，这非常有用。
 *
 * `dispatch` 会返回被发起函数的返回值。
 */
export const thunk = store => next => action =>
  typeof action === 'function' ?
    action(store.dispatch, store.getState) :
    next(action)

/*
 onclick={dispatch( (dispatch, getState)=>{
    const state = getState()
    if(something wrong) return

    doSomeApiRequest( state.apiurl )
    .then(data=>{
      dispatch( requestSomeApiSuccess(data) )
    }, error => dispatch(requestSomeApiFail(e)) )
 })}
 */