import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import GamePage from '../GamePage/GamePage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import SignupPage from '../SignupPage/SignupPage';
import userService from '../../utils/userService';
import './App.css';

function App() {
    const [user, setUser] = useState(userService.getUser());

    const handleLogout = () => {
        userService.logout();
        setUser(null);
    };

    handleSignupOrLogin = () => {
        setUser(userService.getUser());
    };

    return (
        <div className="App">
            <Switch>
            <Route exact path='/' render={() => 
                <LandingPage
                user={user}
                handleLogout={handleLogout}
                />
            }/>
            <Route exact path='/game' render={() => 
                <GamePage 
                user={user}
                handleLogout={handleLogout}
                />
            }/>
            <Route exact path='/login' render={({ history }) => 
                <LoginPage 
                history={history}
                handleSignupOrLogin={handleSignupOrLogin}
                />
            }/>
            <Route exact path='/signup' render={({ history }) => 
                <SignupPage
                history={history}
                handleSignupOrLogin={handleSignupOrLogin}
                />
            }/>
            </Switch>
        </div>
    );
}

export default App;
