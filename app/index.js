import React from 'react'
import { render } from 'react-dom'
import { createHashHistory } from 'history'
import { Router, Route, hashHistory, browserHistory, useRouterHistory } from 'react-router'
import { App } from './components'
import './assets/bootstrap-sass-3.3.6/stylesheets/_bootstrap.scss'
import './assets/css/base.scss'
import './favicon.ico'
import './robots.txt'

var routes = (
  <Route>
    <Route name='map view' path="/:zoom/:lat/:lng/:bearing/:pitch/app" view='map' component={ App } />
    <Route name='fallback view' path="*" view='fallback' component={ App } />
  </Route>
)

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })

render(
  <Router history={ appHistory } routes={ routes } />,
  document.getElementById('app')
)
