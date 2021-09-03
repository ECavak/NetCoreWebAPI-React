import './App.css';
import React from 'react'
import {Home} from './Home';
import {User} from './User';
import {Navigation} from './Navigation';
import { BrowserRouter , Route, Switch } from 'react-router-dom'


function App() {
 
  return (
    
    <BrowserRouter>
    <div className="container" id="page-container"> 
      <Navigation/>
      <Switch>
          <Route path='/' component={Home} exact/>
          <Route className="nav" path='/User' component={User}/>
      </Switch>
    </div>
    
    </BrowserRouter>
    
  );
}

export default App;
