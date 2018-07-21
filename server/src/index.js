import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import  ViewProfilePage from './components/ViewProfilePage';

ReactDOM.render(<ViewProfilePage address="0x67ECd2E10E4da7dfa10FD0508C05c4D6f80e9A11" />, document.getElementById('root'));
registerServiceWorker();
