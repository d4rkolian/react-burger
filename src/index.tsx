import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { socketMiddleware } from './services/middleware/socketMiddleware';
import { WS_URL } from './utils/endpoints';

import { Provider } from 'react-redux';
import { rootReducer } from './services/reducers/index';

import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';

import type { TIngredient } from './types/data';

// declare global {
//     interface Window {
//       __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
//     }
// }
// const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose; 

// according to https://stackoverflow.com/a/68212175 
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // extends React's HTMLAttributes
    product?: TIngredient;
    ingtype?: string;
    arraykey?: number;
    ref?: any;
    listkey?: number;
    index?: number;
    makeeditable?: string;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose; 

const enhancer:any = composeEnhancers(applyMiddleware(thunk, socketMiddleware(WS_URL)));
const store = createStore(rootReducer, enhancer);
export type TRootState = ReturnType<typeof store.getState>;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
