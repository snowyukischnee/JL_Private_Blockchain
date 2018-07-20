import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Loadable from 'react-loadable';

import './css/App.css';

const Loading = () => <div>Loading...</div>;

const Hospital = Loadable({
    loader: () => import('./routes/Hospital'),
    loading: Loading,
});

const Patient = Loadable({
    loader: () => import('./routes/Patient'),
    loading: Loading,
});

class App extends Component {
    render() {
        return (
            <div>
                <header>
                    <h1 className="App-title">123456</h1>
                </header>
                <Router>
                    <div>
                        <Link to='/hospital'>AAAAAA</Link>
                        <Link to='/patient'>BBBBBB</Link>
                        <Switch>
                            <Route exact path='/hospital' component={Hospital}/>
                            <Route exact path='/patient' component={Patient}/>
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
