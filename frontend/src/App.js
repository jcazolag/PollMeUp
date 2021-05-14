import React, { useState } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import {About} from './components/About'
import {Users} from './components/Users'
import {Navbar} from './components/Navbar'
import {Inicio} from './components/Inicio'
import {HomePage} from './components/HomePage'
import {LogIn} from './components/LogIn'

import {LogInContext} from './Helper/Context'
import {UserContext} from './Helper/Context'

function App() {

  const [LoggedIn,setLoggedIn] = useState(false);
  const [UserG,setUserG] = useState('');

  return (
    <LogInContext.Provider value={ {LoggedIn, setLoggedIn} }>
      <UserContext.Provider value={ {UserG, setUserG} }>
        <Router>
          <Navbar/>
          
          <div className="container p-4">
            <Switch>
              <Route path="/inicio" component = {Inicio} />
              <Route path="/about" component ={About} />
              <Route path="/Users" component = {Users} />
              <Route path="/LogIn" component = {LogIn} />
              <Route path="/" component = {HomePage} />
            
            </Switch>
          </div>

        </Router>
      </UserContext.Provider>
    </LogInContext.Provider>
  );
}

export default App;
