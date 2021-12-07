import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import MyWatchlist from './MyWatchlist';
import Logout from './Logout';
import Reset from './Reset';

// used by App.js as a switch for page routes/components
const Main = () => {
    return (
        <Switch>
            <Route exact path='/' component={Home}></Route>
            <Route exact path='/login' component={Login}></Route>
            <Route exact path= '/signup' component={SignUp}></Route>
            <Route exact path='/mywatchlist' component={MyWatchlist}></Route>
            <Route exact path='/logout' component={Logout}></Route>
            <Route exact path='/reset/:token' component={Reset}></Route>
        </Switch>
    )
}

export default Main;