import './App.css';
import { Component } from 'react';
import {
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import UserList from './components/UserList/user-list';
import UserDetail from './components/UserDetail/user-detail';
import { RootState } from './store/store';
import { fetchUsersAsync } from './store/slices/usersSlice';
import { connect, ConnectedProps } from 'react-redux';
class App extends Component<PropsFromRedux> {
  componentDidMount() {
    this.props.fetchUsersAsync();
  }
  render() {
    return (
      <div className="container">
        <nav>
          <ul>
            <li>
              <Link to="/users">Home</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>
        <Switch>
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

const mapState = (state: RootState) => ({
  counter: state.users
})

const mapDispatch = {
  fetchUsersAsync
}

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(App);
