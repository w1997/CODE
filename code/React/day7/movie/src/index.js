import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import memorySave from './utils/memorySave'
import localstorageSave from './utils/localstorageSave'

const user=localstorageSave.getUser();
memorySave.user=user;

ReactDOM.render(<App />,document.getElementById('root'));

