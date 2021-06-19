import './App.css';
import { Component } from 'react';
import ListComponent from './components/List/list';
import {
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
class App extends Component {
  render() {
    return (
      <div className="container">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/list">Todo List</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/list">
            <h1>To do list</h1>
            <ListComponent>
            </ListComponent>
          </Route>
          {/* <Route path="/users">
            <Users />
          </Route> */}
          <Route exact path="/">
            <Redirect to="/list" />
          </Route>
          <Route path="*">
            <h1>Page not found!</h1>
          </Route>
        </Switch>
      </div>
    );
  };
}

export default App;
