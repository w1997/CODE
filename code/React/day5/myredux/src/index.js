import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from "./redux/store"
ReactDOM.render(
  <React.StrictMode>
    <App store= {store} />
  </React.StrictMode>,
  document.getElementById('root')
);
//页面上的状态跟着改变
store.subscribe(()=>{
  ReactDOM.render(
    <React.StrictMode>
      <App store= {store} />
    </React.StrictMode>,
    document.getElementById('root')
  );
})
