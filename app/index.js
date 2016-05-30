import React from 'react'
import { render } from 'react-dom'
import { createHashHistory } from 'history'
import { Route, hashHistory, browserHistory, useRouterHistory } from 'react-router'
import ReactStormpath, { Router, AuthenticatedRoute, LoginLink } from 'react-stormpath'
import { App, RegistrationPage } from './components'
import './assets/bootstrap-sass-3.3.6/stylesheets/_bootstrap.scss'
import './assets/css/base.scss'
import './favicon.ico'
import './robots.txt'

console.log(RegistrationPage)

var routes = (
  <Route>
    <Route path='/register' component={ RegistrationPage } />
    <Route path="/:zoom/:lat/:lng/:bearing/:pitch/app" view='map' component={ App } />
    <Route path="*" view='fallback' component={ App } />
  </Route>
)

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })

render(
  <Router history={ appHistory } routes={ routes } />,
  document.getElementById('app')
)
