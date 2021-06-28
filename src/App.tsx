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
import { fetchTasksAsync } from './store/slices/taskSlice';
import { connect, ConnectedProps } from 'react-redux';
import Spinner from './components/Spinner/spinner';
import { uniqueLoadingSelector } from './store/slices/baseSlice';
class App extends Component<PropsFromRedux> {
  componentDidMount() {
    this.props.fetchUsersAsync();
    this.props.fetchTasksAsync();
  }

  render() {
    return (
      <>
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
              <Redirect to="/users" />
            </Route>
            <Route path="*">
              <h1>Page not found!</h1>
            </Route>
          </Switch>
          {this.props.loading ? <Spinner /> : ''}
        </div>
      </>
    );
  };
}

const makeMapState = () => {
  const loadingSelector = uniqueLoadingSelector();
  return (state: RootState) => {
    const loading = loadingSelector(state.base);
    return { loading };
  }
}

const mapDispatch = {
  fetchUsersAsync,
  fetchTasksAsync
}

const connector = connect(makeMapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(App);
