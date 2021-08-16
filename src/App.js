import './App.css';
import React from 'react';
import Login from './Pages/login';
import Dashboard from './Pages/dashboard';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ThemeContextProvider from './contexts/ThemeContext';
import NavBar from './components/NavBar';
import ThemeToggle from './contexts/ThemeToggle';
import AuthContextProvider from './contexts/AuthContext';
import SubscriptionTypes from './Pages/subscriptionTypes';
import FeatureKeys from './Pages/featureKeys';
import FeatureKeyDetails from './Pages/featureKeyDetails'
import SubscriptionTypeDetails from './Pages/subscriptionTypeDetails';


function App() {
  return (

    <ThemeContextProvider>
      <AuthContextProvider>
        <React.Fragment>
          <Router>
            <div>
              <NavBar />

              <ThemeToggle />
              {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
              <Switch>

                <Route path="/subscription-type-details/new">
                  <SubscriptionTypeDetails />
                </Route>
                <Route path="/subscription-types">
                  <SubscriptionTypes />
                </Route>
                <Route path="/feature-keys">
                  <FeatureKeys />
                </Route>
                <Route path="/feature-key-details">
                  <FeatureKeyDetails />
                </Route>

                <Route path="/dashboard">
                  <Dashboard />
                </Route>
                <Route exact path="/">
                  <Login />
                </Route>

              </Switch>
            </div>
          </Router>
        </React.Fragment>
      </AuthContextProvider>
    </ThemeContextProvider>

  );
}

export default App;
