import React from 'react';
import { Route, Switch } from 'react-router-dom';
import GamePage from '../GamePage/GamePage';
import LandingPage from '../LandingPage/LandingPage';
import './App.css';

function App() {
    return (
        <div className="App">
            <Switch>
            <Route exact path='/' render={() => 
                <LandingPage

                />
            }/>
            <Route path='/game' render={() => 
                <GamePage 
                
                />
            }/>
            </Switch>
        </div>
    );
}

export default App;
