import 'babel-polyfill';
import 'whatwg-fetch';
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerMiddleware, routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import thunkMiddleware from 'redux-thunk';

import emailConfirmation from './reducers/emailConfirmation'
import showDetails from './reducers/showDetails'

import App from './components/App'
import Layout from './components/Layout'
import NewRsvpContainer from './containers/NewRsvpContainer'

const store = createStore(
  combineReducers({
    showDetails,
    emailConfirmation,
    form: formReducer,
    routing: routerReducer
  }),
  applyMiddleware(thunkMiddleware, routerMiddleware(browserHistory))
)

const history = syncHistoryWithStore(browserHistory, store)

$(function() {
  let reactElement = document.getElementById('react-app');
  if (reactElement) {
    ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={Layout}>
          <IndexRoute component={App} />
          <Route path="/email_confirmation/:token" component={NewRsvpContainer} />
        </Route>
      </Router>
    </Provider>,
    reactElement
    );
  };
});
