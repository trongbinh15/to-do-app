import './App.css';
import { Component } from 'react';
import ListComponent from './components/List/list';
import {
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import UserList from './components/UserList/user-list';
import UserDetail from './components/UserDetail/user-detail';
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
          <Route path="/list" component={ListComponent} />
          <Route exact path="/users" component={UserList} />
          <Route path="/users/:id" component={UserDetail}>
          </Route>
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
