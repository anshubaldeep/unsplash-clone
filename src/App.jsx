import './App.css';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { Home } from './pages/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/home" exact>
            <Home />
          </Route>
          <Route path="/">
            <Redirect to="/home" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
