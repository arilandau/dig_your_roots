import { createStore, combineReducers, applyMiddleware } from 'redux';
import { browserHistory } from 'react-router';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import emailConfirmation from './reducers/emailConfirmation';
import selectedVip from './reducers/selectedVip';
import showDetails from './reducers/showDetails';
import showFlash from './reducers/showFlash';
import showForgotPasswordForm from './reducers/showForgotPasswordForm';
import showSignInForm from './reducers/showSignInForm';
import user from './reducers/user';
import userLoggedIn from './reducers/userLoggedIn';

let configureStore = () => {
  let store = createStore(
    combineReducers({
      emailConfirmation,
      selectedVip,
      showDetails,
      showFlash,
      showForgotPasswordForm,
      showSignInForm,
      user,
      userLoggedIn,
      form: formReducer,
      routing: routerReducer
    }),
    applyMiddleware(thunkMiddleware, routerMiddleware(browserHistory))
  )

  return store
};

export default configureStore;
