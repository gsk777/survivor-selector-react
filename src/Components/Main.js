import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import MyWatchlist from './MyWatchlist';

const Main = () => {
    return (
        <Switch>
            <Route exact path='/' component={Home}></Route>
            <Route exact path='/mywatchlist' component={MyWatchlist}></Route>
        </Switch>
    )
}

export default Main;