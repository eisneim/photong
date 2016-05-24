import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route, useRouterHistory, IndexRoute } from 'react-router'
import { createHistory } from 'history'
import { syncHistoryWithStore } from 'react-router-redux'

import App from './pages/App'
import Home from './pages/Home'
import About from './pages/About'
import Album from './pages/Album'
import Login from './pages/Login'
import Manage from './pages/Manage'


export default function AppFn(ctx) {
  // Create an enhanced history that syncs navigation events with the store
  const hist = useRouterHistory(createHistory)({
    basename: '/',
  })

  const history = ctx.history = syncHistoryWithStore(hist, ctx.store)

  return (
    <Provider store={ctx.store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Home}/>
          <Route path="/about" component={About}/>
          <Route path="/album/:albumId" component={Album}/>
          <Route path="/login" component={Login}/>
          <Route path="/manage" component={Manage} onEnter={(nextState, replace) => {
            const isAuthenticated = ctx.store.getState().meta.isAuthenticated
            if (!isAuthenticated) replace('/login')
          }}/>
        </Route>
      </Router>
    </Provider>
  )
}
//<Route path="/album/:albumId" component={Album}/>