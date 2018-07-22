import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import  ViewStagePage from './components/ViewStagePage';
import  ViewProfilePage from './components/ViewProfilePage';
import  HomePage from './components/HomePage';
import  ViewRecordPage from './components/ViewRecordPage';

ReactDOM.render(<ViewStagePage address = "0x11BA2A1440014A8219b91B324597Db1d61D71Fee"/>, document.getElementById('root'));
registerServiceWorker();
