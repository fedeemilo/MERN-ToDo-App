import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AppMain from './components/AppM'

const Routes = () => {
    return (
        <Switch>
            <Route exact path='/' component={AppMain} />
        </Switch>
    )
}