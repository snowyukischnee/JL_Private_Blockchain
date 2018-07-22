import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';

const AppRoute = () => {
    <BrowserRouter>
        <div>
            <Switch>
                <Route path="/" component={HomePage} exact={true} />
                <Route path="/Home" component={HomePage} />
                <Route path="/ViewProfilePage/:address" component={ViewProfilePage} />
                <Route path="/ViewRecordPage/:address" component={ViewRecordPage} />
                <Route path="/ViewStagePage/:address" component={ViewStagePage} />
            </Switch>
        </div>


    </BrowserRouter>
}