import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TestCases from './pages/TestCases';

import './App.global.css';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={TestCases} />
      </Switch>
    </Router>
  );
}
