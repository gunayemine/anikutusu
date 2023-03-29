import React, { useReducer } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { Provider } from 'react-redux'
import { legacy_createStore as createStore, applyMiddleware, combineReducers} from 'redux'
//import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'


import './bootstrap.min.css'

import memoriesReducer from './reducers/memoriesReducer';
import usersReducer from './reducers/usersReducer';

const reducer = combineReducers({
  memories : memoriesReducer,
  user : usersReducer,
})

const store = createStore(reducer, /*composeWithDevTools(*/applyMiddleware(thunk)/*)*/)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
       <App />
    </Provider>
  </React.StrictMode>
)
