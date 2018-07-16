import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import CommentApp from './containers/CommentApp';
import commentsReducer from './reducers/comments';
import passengerReducer from './reducers/passenger';


import './index.css'
import registerServiceWorker from './registerServiceWorker';



let reducer = combineReducers({comments: commentsReducer, passenger: passengerReducer});
const store = createStore(reducer)

ReactDOM.render(
  <Provider store={store}>
    <CommentApp />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();