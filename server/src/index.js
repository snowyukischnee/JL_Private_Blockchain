import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import  ViewProfilePage from './components/ViewProfilePage';
import  HomePage from './components/HomePage';

ReactDOM.render(<HomePage/>, document.getElementById('root'));
registerServiceWorker();
