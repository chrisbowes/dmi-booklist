import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { StoreProvider } from './store/app.store';
import AppMain from './components/app-main/app-main.component';
import Login from './components/app-login/app-login.component';


function App() {
  return (
    <Router>
      <StoreProvider>
        <Route path="/" exact component={AppMain} />
        <Route path="/login" exact component={Login} />
        <Route path="/logout" exact component={Login} />
      </StoreProvider>
    </Router>
  );
}

export default App;
