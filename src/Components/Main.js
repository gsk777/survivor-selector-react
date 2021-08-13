import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import MyWatchlist from './MyWatchlist';
import Logout from './Logout';

const Main = () => {
    return (
        <Switch>
            <Route exact path='/' component={Home}></Route>
            <Route exact path='/login' component={Login}></Route>
            <Route exact path='/mywatchlist' component={MyWatchlist}></Route>
            <Route exact path='/logout' component={Logout}></Route>
        </Switch>
    )
}

export default Main;